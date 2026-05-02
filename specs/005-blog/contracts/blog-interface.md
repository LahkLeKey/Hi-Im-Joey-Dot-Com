# Contract: Blog Public Interface

**Feature**: 005-blog  
**Date**: 2026-05-02  
**Type**: TypeScript/API Interface Contract

This document defines the public interface of the blog module — the functions, types, and behaviors that consumers of the blog system should rely on.

---

## Module: `app/src/data/blog`

**Location**: `app/src/data/blog.ts`  
**Consumers**: `BlogIndexPage.tsx`, `BlogPostPage.tsx`, routing config

### Exported Types

```typescript
// ============================================================================
// Post Entity
// ============================================================================

/**
 * A single blog post with metadata and rendered content.
 *
 * @property title - Post title (plain text, 1–200 chars)
 * @property date - Publication date (ISO 8601, must be past/present)
 * @property slug - URL-safe identifier (a-z, 0-9, hyphens, max 100 chars)
 * @property body - Markdown source (unrendered)
 * @property bodyHtml - Rendered HTML (via markdown-to-jsx)
 * @property excerpt - Optional preview text (for index, future use)
 */
export interface Post {
  title: string;
  date: Date;
  slug: string;
  body: string;
  bodyHtml: string;
  excerpt?: string;
}

// ============================================================================
// Post Index
// ============================================================================

/**
 * Ordered collection of all published posts.
 * Computed at build time; read-only at runtime.
 *
 * @property posts - All posts sorted by date descending (newest first)
 * @property totalCount - Number of posts
 * @property lastUpdated - Timestamp of last index rebuild
 */
export interface PostIndex {
  posts: Post[];
  totalCount: number;
  lastUpdated: Date;
}
```

### Exported Functions

#### `getBlogIndex(): PostIndex`

**Purpose**: Retrieve the complete ordered blog index.

**Returns**:
- `PostIndex` object with all posts sorted by date descending

**Usage**:
```typescript
import { getBlogIndex } from '../data/blog';

function BlogIndexPage() {
  const index = getBlogIndex();
  return (
    <ul>
      {index.posts.map(post => (
        <li key={post.slug}>
          <a href={`/blog/${post.slug}`}>{post.title}</a>
          <span>{post.date.toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
}
```

**Behavior**:
- Loads all posts from `app/src/data/posts/`
- Validates frontmatter (title, date, slug required)
- Parses markdown to HTML
- Sorts by date descending
- Returns an empty index when no posts are found

**Performance**: O(n) where n = number of posts. Runs at build time.

**Error Handling**: If a post file is malformed:
- Build logs warning
- Post is skipped; index continues with valid posts
- If all posts invalid, returns empty index (not an error)

---

#### `getPostBySlug(slug: string): Post | null`

**Purpose**: Retrieve a single post by its slug.

**Parameters**:
- `slug` (string) — URL-safe post identifier, e.g., `"learning-react-state"`

**Returns**:
- `Post` object if found
- `null` if not found

**Usage**:
```typescript
import { getPostBySlug } from '../data/blog';

function BlogPostPage({ slug }) {
  const post = getPostBySlug(slug);
  
  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date.toLocaleDateString()}</time>
      <div>{post.bodyHtml}</div>
    </article>
  );
}
```

**Behavior**:
- Case-sensitive slug matching
- Returns first match if duplicates exist (alphabetically by filename)
- Does not throw error if slug not found (returns null)

**Performance**: O(n) lookup; consider caching if post count grows >1000

**Error Handling**: Returns `null` gracefully; consumer should render 404 UI

---

#### `getAllPostSlugs(): string[]`

**Purpose**: Get all post slugs (useful for static route generation or pre-fetching).

**Returns**:
- Array of slugs in order (matching getBlogIndex order)

**Usage**:
```typescript
import { getAllPostSlugs } from '../data/blog';

// Route generation
const slugs = getAllPostSlugs();
slugs.forEach(slug => {
  // Pre-generate or pre-fetch routes
});
```

**Behavior**:
- Returns slugs sorted by post date descending
- Empty array if no posts exist

**Performance**: O(n)

---

#### `getPostsByDate(): Post[]`

**Purpose**: Get all posts sorted by date (convenience function).

**Returns**:
- Array of posts, newest first (same as `getBlogIndex().posts`)

**Usage**:
```typescript
const posts = getPostsByDate();
```

**Behavior**:
- Equivalent to `getBlogIndex().posts`
- Convenience alias

**Performance**: O(n log n) at first call; cached afterward

---

### Component Interface

#### `PostCard`

**Location**: `app/src/components/blog/PostCard.tsx`  
**Props**:

```typescript
interface PostCardProps {
  post: Post;
  onNavigate?: (slug: string) => void; // Optional callback
}
```

**Renders**: A single post card on the blog index with title, date, and link.

---

#### `PostContent`

**Location**: `app/src/components/blog/PostContent.tsx`  
**Props**:

```typescript
interface PostContentProps {
  post: Post;
}
```

**Renders**: Full post content (title, date, HTML body).

---

## Route Contracts

### Blog Index Route

**Path**: `/blog`  
**Component**: `BlogIndexPage.tsx`  
**Responsibility**: Display blog index; list all posts with links

**Input**: None (derived from `getBlogIndex()`)  
**Output**: HTML list of posts

**State**: Stateless; purely derived from data

**Example URL**: `https://hi-im-joey.vercel.app/blog`

---

### Blog Post Route

**Path**: `/blog/:slug`  
**Component**: `BlogPostPage.tsx`  
**Responsibility**: Display single post; handle 404 for missing posts

**Input**: URL parameter `slug` (e.g., `/blog/learning-react-state`)  
**Output**: HTML post page or 404 message

**Behavior**:
1. Extract `:slug` from route
2. Call `getPostBySlug(slug)`
3. If found: render `PostContent` with post
4. If not found: render 404 page with link back to index

**Example URL**: `https://hi-im-joey.vercel.app/blog/learning-react-state`

---

## Data Format Contract

### Post File Format (YAML Frontmatter)

**File**: `app/src/data/posts/[slug].md`

```markdown
---
title: "Post Title"
date: YYYY-MM-DD
slug: post-slug
---

# Post Title

Markdown content here...
```

**Required Fields**:
- `title` (string, 1–200 chars)
- `date` (YYYY-MM-DD format)
- `slug` (a-z, 0-9, hyphens only)

**Content**: Standard Markdown (CommonMark)

**Validation**:
- Missing required field → post skipped with warning
- Invalid date → parse error; post skipped
- Duplicate slug → first alphabetically wins; warning logged
- Markdown parse error → post skipped; warning logged

---

## UI/UX Contract

### Blog Index Page Requirements

- **Display**: Ordered list of posts (newest first)
- **Per post**: Title, date, link to full post
- **Empty state**: Friendly message if no posts
- **Mobile**: Readable at 375px without horizontal scroll
- **Accessibility**: Keyboard-navigable; semantic HTML
- **Performance**: FCP <1s on 4G mobile

### Blog Post Page Requirements

- **Display**: Full post title, date, content
- **Navigation**: Clear link back to `/blog`
- **Missing**: 404 message with link to index
- **Mobile**: Content readable at 375px; no layout breakage
- **Accessibility**: Keyboard-navigable; heading hierarchy; readable with screen reader
- **Performance**: FCP <1s on 4G mobile

---

## Error & Edge Cases Contract

### Behavior When Post Missing

```typescript
const post = getPostBySlug('non-existent');
// Returns: null
// Consumer responsibility: Render 404 page

if (!post) {
  return <BlogNotFoundPage />;
}
```

### Behavior When No Posts Exist

```typescript
const index = getBlogIndex();
// Returns: { posts: [], totalCount: 0, lastUpdated: ... }
// Consumer responsibility: Render empty state

if (index.totalCount === 0) {
  return <EmptyBlogState />;
}
```

### Behavior With Malformed Post File

**File**: `app/src/data/posts/bad-post.md` (missing `title`)

```markdown
---
date: 2026-05-02
slug: bad-post
---

Content here...
```

**Behavior**:
- Build logs warning: `Post app/src/data/posts/bad-post.md missing required field 'title'`
- Post is excluded from index
- Build continues; site deploys
- Joey sees the warning and can fix the file

### Behavior With Large Blog

**Scenario**: 1000+ posts

**Current**: Acceptable (no pagination requirement for v1)  
**Future optimization**: Lazy-load post body, paginate index, add category filtering

---

## Testing Contract

### Minimum Test Coverage

- [ ] `getBlogIndex()` returns posts sorted by date descending
- [ ] `getPostBySlug(slug)` returns correct post or undefined
- [ ] `getAllPostSlugs()` returns array of all slugs
- [ ] Empty index handled gracefully (no crash)
- [ ] Malformed post skipped with warning (no crash)
- [ ] 404 page renders when post not found
- [ ] Mobile viewport readable at 375px
- [ ] Keyboard navigation works (Tab through all links)
- [ ] Screen reader can read post list and content

---

## Versioning & Breaking Changes

**Current Version**: 1.0

**Stability**: Stable; no breaking changes anticipated for v1.

**If Schema Changes** (e.g., add `category` field):
- Decision: Add optional field first; update contract; no breaking change
- Migration: Joey edits new posts with new field; old posts work without it
- Announcement: Update quickstart.md and notify Joey

---

## Sign-Off

**Defined by**: Planning workflow  
**Reviewed**: Architecture aligns with Constitution (radically simple, file-based, Vercel-deployable)  
**Status**: Ready for implementation

**Next Steps**: 
1. Implement `blog.ts` module with types and functions
2. Create components (`PostCard`, `PostContent`, etc.)
3. Add routes (`/blog`, `/blog/:slug`)
4. Verify against contract with manual tests
