# Implementation Plan: Blog

**Branch**: `005-blog` | **Date**: 2026-05-02 | **Spec**: [specs/005-blog/spec.md](../005-blog/spec.md)  
**Input**: Feature specification from `/specs/005-blog/spec.md`

## Summary

Build a file-based markdown blog with blog index and single-post pages. No CMS, database, or external services — posts live as local files Joey can edit directly. Implement index page listing posts by date (newest first), single-post page with full content, and file-based publication workflow. All UI via shadcn/ui primitives. Accessible, mobile-readable, Vercel-deployable.

**How This Teaches**: Joey learns that structured data doesn't require a database (files are a content system) and how URLs map to pages (file → route → component), the core mental model of web applications.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Vite, React 18, React Router v6, markdown-to-jsx or remark  
**Storage**: File-based (Markdown or TypeScript files in `app/src/data/posts/`)  
**Testing**: Vitest (existing setup), manual browser verification  
**Target Platform**: Web browser (responsive, mobile-first)  
**Project Type**: React web application (frontend only)  
**Performance Goals**: Instant load (<100ms after Vite serves initial HTML)  
**Constraints**: No new environment variables; no paid services  
**Scale/Scope**: 1–50 blog posts initially; scrollable list (no pagination required for v1)

## Constitution Check

✓ **Human-First Learning** — Blog teaches file-based content and routing through real file edits. Joey practices sustainable authoring.  
✓ **Honest Story** — Blog is a transparent update surface for Joey's learning journey (requirement per Principle IV).  
✓ **Radically Simple** — No database, no build tooling for Joey; duplication + text edit + deploy is the workflow.  
✓ **Blog + Interactive** — This feature fulfills the blog surface from Principle IV.  
✓ **Vercel Deployable** — No new secrets, no third-party services, plain static build output.

**Gate Result**: PASS — No violations. Ready for Phase 1 design.

## Project Structure

### Documentation (this feature)

```
specs/005-blog/
├── plan.md              # This file
├── research.md          # Design decisions and alternatives
├── data-model.md        # Post structure and entity definitions
├── quickstart.md        # Local development guide
└── contracts/
    └── blog-interface.md # Public interface contract
```

### Source Code Structure

```
app/
├── src/
│   ├── pages/
│   │   ├── BlogIndexPage.tsx       # Blog index (route: /blog)
│   │   ├── BlogPostPage.tsx        # Single post (route: /blog/:slug)
│   │   └── BlogNotFoundPage.tsx    # 404 fallback for missing post
│   ├── components/
│   │   └── blog/
│   │       ├── PostCard.tsx        # Index entry component
│   │       ├── PostContent.tsx     # Single post renderer
│   │       ├── PostHeader.tsx      # Title + date header
│   │       └── EmptyBlogState.tsx  # Empty state when no posts
│   ├── data/
│   │   ├── posts/
│   │   │   ├── 001-first-post.md   # Example post (Markdown)
│   │   │   ├── 002-second-post.md
│   │   │   └── _post-template.md   # Template Joey duplicates
│   │   └── blog.ts                 # Post loader + index builder
│   └── App.tsx                     # Add blog route (/blog, /blog/:slug)
├── vite.config.ts                  # Ensure markdown loader support if needed
└── package.json                    # Add markdown-to-jsx or equivalent
```

## Key Design Decisions

1. **Post Format**: Markdown files with YAML frontmatter (`title`, `date`, `slug` optional)  
   — **Rationale**: Joey can open a `.md` file in any editor; Markdown is readable as-is.

2. **Routing**: Client-side React Router with parameterized post slug  
   — **Rationale**: Consistent with existing app routing; no server required; works on Vercel static builds.

3. **Post Loader**: Synchronous import of post metadata at build time  
   — **Rationale**: Posts compile into JS; zero runtime discovery overhead; list is static once deployed.

4. **UI Components**: shadcn/ui Card, Button, and Typography for consistency  
   — **Rationale**: Uses existing design system; no new CSS or dependencies.

5. **Mobile Strategy**: CSS Grid / Flexbox with responsive padding; single-column on mobile  
   — **Rationale**: Mobile-first; tests at 375px and 1280px; no JavaScript for layout.

## Technical Phases

### Phase 1: Core Structure
- [ ] Create `app/src/data/blog.ts` post loader and types
- [ ] Create `app/src/data/posts/` directory with template and example posts
- [ ] Implement `BlogIndexPage.tsx` (list all posts, order by date descending)
- [ ] Implement `BlogPostPage.tsx` (render single post, handle 404)
- [ ] Add routes to `App.tsx` (/blog, /blog/:slug)
- [ ] Styling: Card, responsive grid, mobile readability

### Phase 2: Refinement & Testing
- [ ] Manual accessibility audit (keyboard nav, screen reader)
- [ ] Mobile viewport testing (375px, 768px, 1280px)
- [ ] Empty state verification
- [ ] Missing post 404 verification
- [ ] Vercel deployment dry-run

### Phase 3: Documentation & Launch
- [ ] `data-model.md`: Post schema and index
- [ ] `quickstart.md`: Local dev setup, how to add a post, deploy steps
- [ ] `contracts/blog-interface.md`: Public blog API (query functions, types)
- [ ] Update main app navigation to link to `/blog`
- [ ] Merge to main and deploy

## Success Metrics (from spec)

- **SC-001**: First-time visitor finds and reads a blog post in <30s from index
- **SC-002**: Joey publishes a new post in <5 min (duplicate + edit + push)
- **SC-003**: Blog pages score ≥90 on accessibility audit
- **SC-004**: Readable at 375px (mobile) and 1280px (desktop) without horizontal scroll
- **SC-005**: Zero new environment variables or third-party services
- **SC-006**: Main branch remains deployable to Vercel after ship

## Assumptions

- Routing uses React Router (already in app dependencies)
- Post files live in `app/src/data/posts/` alongside source code
- Markdown parsing handled by markdown-to-jsx or similar (low-cost library)
- No pagination required at launch; simple scrollable list sufficient
- No categories, tags, search, or comments in scope for v1
- Joey already comfortable editing files and pushing to GitHub
