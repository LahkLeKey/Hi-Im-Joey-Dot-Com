# Data Model: Blog

**Date**: 2026-05-02  
**Feature**: 005-blog  
**Status**: Defined

This document specifies the structure, validation rules, and entity relationships for the blog system.

## Entity: Post

The fundamental unit of blog content. Each post is a Markdown file with YAML frontmatter.

### Schema

```typescript
interface Post {
  // Required
  title: string;           // Plain text, required, 1–200 characters
  date: Date;              // ISO 8601 string (parsed as Date), required
  slug: string;            // URL-friendly identifier, derived from filename or explicit in frontmatter

  // Content
  body: string;            // Markdown source (raw), required, >0 characters
  bodyHtml: string;        // Rendered HTML (derived at load time), required

  // Metadata
  excerpt?: string;        // Plain text, optional, 0–300 characters (for future index preview)
  author?: string;         // Plain text, optional, max 100 characters (always "Joey" in v1)
}
```

### Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `title` | Trim, length 1–200 | "Title must be 1–200 characters" |
| `date` | ISO 8601 string, must be past/present (not future) | "Date must be valid and not in the future" |
| `slug` | URL-safe characters (a-z, 0-9, hyphens), no spaces, max 100 | "Slug must be URL-safe and ≤100 characters" |
| `body` | Length >0; must parse as valid Markdown | "Post body cannot be empty" |
| `bodyHtml` | Generated; must not contain `<script>` or `on*` attributes | Sanitize during rendering |

### State Transitions

- **Draft** → **Published**: File added to `app/src/data/posts/` and committed to main branch
- **Published** → **Removed**: File deleted from `app/src/data/posts/`
- **Published** → **Updated**: File edited; new title, date, or body; slug remains stable
- **Published** → **Republished** (metadata only): Date may be edited (affects sort order)

### Example (YAML Frontmatter + Markdown)

**File**: `app/src/data/posts/001-learning-react-state.md`

```markdown
---
title: "Learning React State Today"
date: 2026-05-02
slug: learning-react-state-today
---

# Learning React State Today

Today I learned how components remember information.

When state changes, the component re-runs and produces a new view.

Here's a simple example...

```

### Derivation Rules

1. **Slug**: If not provided in frontmatter, derived from filename:
   - Filename: `001-learning-react-state.md`
   - Extracted: `learning-react-state`
   - Slug: `learning-react-state`

2. **bodyHtml**: Markdown parsed by markdown-to-jsx at load time:
   - Input: raw markdown string
   - Output: React JSX (inline rendered as HTML for accessibility)
   - Sanitization: No `<script>` tags or event handlers allowed

3. **excerpt**: Optional; if omitted, first 300 chars of body (stripped of markdown syntax) are used (future feature)

---

## Entity: PostIndex

Derived entity representing the ordered collection of all published posts.

### Schema

```typescript
interface PostIndex {
  posts: Post[];           // All published posts, sorted by date descending
  totalCount: number;      // Count of posts
  lastUpdated: Date;       // Timestamp of last rebuild (build time)
}
```

### Derivation

- **Source**: All `.md` files in `app/src/data/posts/`
- **Order**: By `date` descending (newest first)
- **Computation**: At build time by `blog.ts` loader
- **Availability**: Read-only; updated only by deploying new post files

### Query Functions (Exported from `app/src/data/blog.ts`)

```typescript
// Get full index with all posts
export function getBlogIndex(): PostIndex;

// Get a single post by slug
export function getPostBySlug(slug: string): Post | null;

// Get all post slugs (for route generation)
export function getAllPostSlugs(): string[];

// Get posts sorted by date (newest first)
export function getPostsByDate(): Post[];
```

---

## File Organization

### Post Storage

```
app/src/data/posts/
├── _post-template.md              # Template Joey duplicates
├── 001-first-post.md              # Shipped example
├── 002-second-post.md             # Shipped example
├── 003-my-new-learning.md         # Joey's first post
└── [slug-name].md                 # Additional posts
```

### Template

**File**: `app/src/data/posts/_post-template.md`

```markdown
---
title: "Your post title here"
date: 2026-05-02
slug: your-post-slug-here
---

# Your Post Title

Write your post content here.

## Section

More content...

```

**Purpose**: Joey duplicates this, edits title/date/slug/body, saves, commits, deploys.

---

## Relationships

### Post ↔ PostIndex

- **1:many** — One post is included in the index
- **Cardinality**: Each post must belong to exactly one index (all posts at build time)
- **Navigability**: 
  - From index: `index.posts[n]` → Post
  - From post: `getPostBySlug(post.slug)` queries the index

### Post ↔ Route

- **1:1** — One post maps to one URL slug
- **Route Formula**: `/blog/:slug` where `:slug = post.slug`
- **Example**: Post slug `learning-react-state-today` → `/blog/learning-react-state-today`

### PostIndex ↔ UI Pages

- **BlogIndexPage**: Uses `getBlogIndex()` to render list
- **BlogPostPage**: Uses `getPostBySlug(paramsSlug)` to fetch content for page route

---

## Edge Cases & Handling

### Missing Frontmatter

**Scenario**: File exists but title or date missing

**Handling**:
- Build logs warning: "Post XXX missing required field 'title'; skipping"
- Post is excluded from index
- Site continues to build and deploy
- Joey can inspect build logs to debug

### Invalid Date

**Scenario**: Date field is malformed (e.g., `2026-13-45`)

**Handling**:
- Parse fails; build error
- Post is excluded from index
- Build logs: "Post XXX date field is not valid ISO 8601"
- Joey corrects file and redeploys

### Duplicate Slugs

**Scenario**: Two files have the same slug

**Handling**:
- First file (alphabetically) wins; second is logged as warning
- Build succeeds with one post; joey alerted to duplicate
- Joey renames second post to unique slug and redeploys

### Post Body Too Large

**Scenario**: File contains very large markdown (e.g., 10MB ASCII art)

**Handling**:
- File parses; no hard limit at v1
- Bundle size warning if total posts exceed reasonable limit
- Future optimization: lazy-load post body, cache compiled HTML

### No Posts at All

**Scenario**: `app/src/data/posts/` is empty or contains only template

**Handling**:
- Index is empty array
- BlogIndexPage renders empty state component
- User sees friendly message: "No blog posts yet. Check back soon!"

---

## Validation & Constraints

### Data Validation Rules

All applied at load/build time:

1. **Title**: Non-empty, 1–200 UTF-8 characters
2. **Date**: Valid ISO 8601; parsed to Date object
3. **Slug**: Only a-z, 0-9, hyphens; no spaces or special chars; max 100 chars
4. **Body**: Non-empty markdown; no `<script>` tags after rendering
5. **Uniqueness**: Slug must be unique within one build
6. **Ordering**: By date descending (newest first)

### Security Constraints

- **XSS Prevention**: markdown-to-jsx escapes HTML by default; no raw `dangerouslySetInnerHTML`
- **No Server Access**: Posts are static; no runtime file discovery or admin access
- **No Secrets**: No environment variables in post files

---

## Import & Export

### Import (Load Posts into App)

```typescript
// app/src/data/blog.ts
import { getBlogIndex, getPostBySlug, getAllPostSlugs } from './blog';

// In a component
function BlogIndexPage() {
  const index = getBlogIndex();
  return (
    <div>
      {index.posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
```

### Export (Public Interface)

```typescript
// Public query functions exported from app/src/data/blog.ts
export { 
  getBlogIndex, 
  getPostBySlug, 
  getAllPostSlugs,
  getPostsByDate,
  type Post,
  type PostIndex,
};
```

---

## Testing Scenarios

### Scenario 1: Load blog index
- **Setup**: Two posts in `/posts/` directory
- **Action**: Call `getBlogIndex()`
- **Expected**: Array of 2 posts, ordered by date descending
- **Assertion**: `index.posts.length === 2 && index.posts[0].date > index.posts[1].date`

### Scenario 2: Get post by slug
- **Setup**: Post with slug `first-post` exists
- **Action**: Call `getPostBySlug('first-post')`
- **Expected**: Post object with matching slug
- **Assertion**: `post.slug === 'first-post' && post.title !== ''`

### Scenario 3: Get non-existent post
- **Setup**: No post with slug `non-existent`
- **Action**: Call `getPostBySlug('non-existent')`
- **Expected**: null
- **Assertion**: `post === null`

### Scenario 4: All slugs for routing
- **Setup**: Three posts with slugs: a, b, c
- **Action**: Call `getAllPostSlugs()`
- **Expected**: Array ['a', 'b', 'c']
- **Assertion**: `slugs.length === 3 && slugs.includes('a')`

---

## Versioning

**Version**: 1.0 (Initial release)
**Last Updated**: 2026-05-02

### Compatibility Notes

- No versioning in files themselves; posts are always latest format
- If schema changes in future (e.g., add `category` field), migration strategy TBD
- For now, assume schema is stable through v1
