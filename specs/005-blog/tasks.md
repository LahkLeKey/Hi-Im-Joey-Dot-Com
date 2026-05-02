# Tasks: Blog Feature (005-blog)

**Feature**: File-based markdown blog with index and single-post pages  
**Created**: 2026-05-02  
**Status**: Ready for implementation  
**Branch**: `005-blog`  

---

## Implementation Strategy

This feature is implemented incrementally, with each user story delivering independent value:

1. **Phase 1 (Setup)**: Project scaffolding — data directories, dependencies
2. **Phase 2 (Foundational)**: Core blog infrastructure — post loader, types, routing
3. **Phase 3 (US1 - P1)**: Blog index — list all posts, render with styling
4. **Phase 4 (US2 - P2)**: Single post — render full content, handle 404
5. **Phase 5 (US3 - P3)**: Authoring — template, documentation, examples
6. **Phase 6 (Polish)**: Accessibility, mobile testing, deployment validation

**MVP Scope**: Phases 1–4 deliver a complete, independently testable blog reading experience (US1 + US2).  
**Extension**: Phase 5 adds authoring (US3), enabling Joey to publish new posts without friction.

### Parallel Execution Opportunities

- **Phase 2 tasks**: T001–T006 can run in parallel (different components/files, no interdependencies until Phase 3)
- **Phase 3 tasks**: T007–T010 can run in parallel (different UI components, all depend on Phase 2 foundations)
- **Phase 4 tasks**: T011–T014 can run in parallel (page + helper components, depend on Phase 2–3)
- **Phase 5 tasks**: T015–T017 can run in parallel (documentation, no code dependencies)
- **Phase 6 tasks**: T018–T024 must run sequentially (testing depends on prior code completion)

---

## Phase 1: Setup — Project Initialization

**Goal**: Create directory structure and install markdown parsing dependencies.  
**Independent Test**: Confirm `app/src/data/posts/` exists and markdown-to-jsx is installed.

### Tasks

- [X] T001 Create directory structure for blog data at `app/src/data/posts/` (create parent directory `app/src/data/` if missing)
- [X] T002 Add `markdown-to-jsx` dependency to `app/package.json` (version ≥5.0.0) and run `bun install`
- [X] T003 Create `.gitkeep` file in `app/src/data/posts/` to ensure directory is tracked by Git
- [X] T004 Add `@types/markdown-to-jsx` to devDependencies in `app/package.json` for TypeScript support
- [X] T005 Verify post directory is importable by checking `app/tsconfig.app.json` includes `app/src/data/` in include paths

---

## Phase 2: Foundational — Core Infrastructure

**Goal**: Implement post loader, types, router setup, and example data.  
**Independent Test**: Can import `getBlogIndex()` and retrieve all posts; routes `/blog` and `/blog/:slug` are registered.

### Tasks

- [X] T006 [P] Create post type definitions and interfaces in `app/src/data/blog.ts`:
  - Export `Post` interface (title, date, slug, body, bodyHtml, excerpt?)
  - Export `PostIndex` interface (posts[], totalCount, lastUpdated)
  - Add validation rules as TypeScript types

- [X] T007 [P] Implement `getBlogIndex()` function in `app/src/data/blog.ts`:
  - Load posts from `app/src/data/posts/` (static imports)
  - Parse YAML frontmatter (gray-matter or similar)
  - Convert markdown body to HTML via markdown-to-jsx
  - Sort by date descending (newest first)
  - Return `PostIndex` object
  - Handle empty post list gracefully (return empty array, not error)

- [X] T008 [P] Implement `getPostBySlug(slug: string)` function in `app/src/data/blog.ts`:
  - Query blog index for post matching slug
  - Return `Post` or `null` if not found
  - Used by single-post page for fetching specific post

- [X] T009 [P] Set up React Router routes in `app/src/App.tsx`:
  - Replace single HomePage render with Router configuration
  - Add route: `<Route path="/blog" element={<BlogIndexPage />} />`
  - Add route: `<Route path="/blog/:slug" element={<BlogPostPage />} />`
  - Add route: `<Route path="/" element={<HomePage />} />` (home page fallback)
  - Wrap routes in BrowserRouter or HashRouter (use same router as existing app pattern)

- [X] T010 [P] Create example post files in `app/src/data/posts/`:
  - `001-welcome-to-the-blog.md` — Example post with title, date, slug, markdown body
  - `002-learning-react-basics.md` — Another example post to test sorting by date
  - Both files use YAML frontmatter format per data-model.md
  - Posts should have readable, self-explanatory content for Joey

- [X] T011 [P] Create `app/src/data/posts/_post-template.md`:
  - Template file with YAML frontmatter skeleton (title, date, slug fields)
  - Includes instructional comments for Joey to understand each field
  - Example markdown body structure with H1, paragraphs, lists as samples
  - Format: clear, plain-English field names (no code knowledge required)

---

## Phase 3: User Story 1 (P1) — Browse the Blog Index

**Goal**: Implement blog index page listing all posts with titles and dates.  
**Independent Test**: Navigate to `/blog` and verify all posts appear as a sorted list with clickable links.  
**Acceptance Criteria**:
1. All published posts appear on the index, ordered by date (newest first)
2. Each post entry shows title and publication date
3. Each entry links to that post's single-post page
4. Friendly empty-state message displays when no posts exist
5. Layout is readable on 375px (mobile) and 1280px (desktop) without horizontal scroll

### Tasks

- [X] T012 [P] [US1] Create `app/src/components/blog/PostCard.tsx` component:
  - Props: `post: Post`
  - Display: title, date (formatted with date-fns), excerpt (if available)
  - Render as clickable card using shadcn/ui Card component
  - Include hover/focus states for accessibility
  - Apply responsive padding via Tailwind utilities

- [X] T013 [P] [US1] Create `app/src/components/blog/EmptyBlogState.tsx` component:
  - Props: none
  - Display: friendly message when no posts exist (e.g., "No posts yet. Check back soon!")
  - Include encouraging tone per Constitution Principle IV
  - Render with centered layout using Tailwind

- [X] T014 [P] [US1] Create `app/src/pages/BlogIndexPage.tsx` component:
  - Import `getBlogIndex()` from `app/src/data/blog.ts`
  - Call `getBlogIndex()` to fetch all posts
  - If posts exist: render list of PostCard components in a responsive grid
  - If no posts: render EmptyBlogState component
  - Add heading "Blog" or similar title
  - Use shadcn/ui Typography classes for semantic markup
  - Apply responsive grid layout (1 column on mobile, 2–3 on desktop)
  - Sort posts by date descending (already done in getBlogIndex, but verify order)

- [X] T015 [US1] Add navigation link to blog in `app/src/pages/HomePage.tsx`:
  - Include Link to `/blog` in home page navigation or footer
  - Make link visible and discoverable (heading, button, or menu item)
  - Test that clicking link navigates to `/blog`

- [X] T016 [US1] Create responsive styling for blog index:
  - Use Tailwind utilities (no new CSS files needed; extend App.css if necessary)
  - Mobile viewport (375px): single-column layout, full-width cards with padding
  - Tablet viewport (768px): 2-column grid with balanced spacing
  - Desktop viewport (1280px): 2–3 column grid with max-width container
  - Verify no horizontal scrolling at any viewport width
  - Test font sizes are readable on small screens

---

## Phase 4: User Story 2 (P2) — Read a Single Post

**Goal**: Implement single-post page rendering full content.  
**Independent Test**: Navigate directly to `/blog/001-welcome-to-the-blog` (or any post slug) and verify full content renders.  
**Acceptance Criteria**:
1. Full post content displays when navigating to `/blog/:slug`
2. Post title and date are visible on the page
3. Back link to blog index is clearly visible
4. Layout is readable on 375px (mobile) and 1280px (desktop) without horizontal scroll
5. Clear not-found message displays for non-existent posts

### Tasks

- [X] T017 [P] [US2] Create `app/src/components/blog/PostHeader.tsx` component:
  - Props: `post: Post`
  - Display: post title (as H1), date (formatted), and optionally author (future: "Joey")
  - Use shadcn/ui Typography for semantic headings
  - Apply responsive font sizing via Tailwind
  - Include structured data readability for accessibility

- [X] T018 [P] [US2] Create `app/src/components/blog/PostContent.tsx` component:
  - Props: `post: Post`
  - Render `post.bodyHtml` as React component (output from markdown-to-jsx)
  - Sanitize HTML to prevent XSS (markdown-to-jsx should handle this, but verify)
  - Apply typography classes via shadcn/ui for consistent styling
  - Ensure code blocks (if present) are readable with syntax highlighting (CSS or library)
  - Links, lists, headings, and other markdown elements render correctly
  - Line length and padding ensure readability on mobile (375px min)

- [X] T019 [P] [US2] Create `app/src/pages/BlogPostPage.tsx` component:
  - Get slug from URL params (via React Router `useParams()`)
  - Call `getPostBySlug(slug)` to fetch post
  - If post exists: render PostHeader + PostContent + back link
  - If post not found: render BlogNotFoundPage (see T020)
  - Include back link to `/blog` using React Router Link
  - Add semantic HTML with `<article>` tag for main content

- [X] T020 [P] [US2] Create `app/src/pages/BlogNotFoundPage.tsx` component:
  - Display friendly 404 message (e.g., "Post not found")
  - Include link back to `/blog` to help user recover
  - Render with centered layout using Tailwind
  - Use appropriate heading hierarchy (H1 for "Post Not Found")

- [X] T021 [US2] Create responsive styling for single-post page:
  - Use Tailwind utilities for responsive typography and spacing
  - Mobile viewport (375px): full-width content area with generous padding (1rem–1.5rem)
  - Tablet/Desktop: constrained max-width (600–800px) for comfortable reading line length
  - Headers (H2, H3, etc.) scale appropriately per viewport
  - Code blocks (if present) have horizontal scrolling on mobile if needed (don't break layout)
  - Verify no horizontal scrolling for normal text content

---

## Phase 5: User Story 3 (P3) — Joey Publishes a New Post

**Goal**: Enable Joey to author and publish posts without tooling knowledge.  
**Independent Test**: Duplicate `_post-template.md`, edit title/date/body, and verify post appears on blog index.  
**Acceptance Criteria**:
1. Joey can duplicate a post file and understand each field without code knowledge
2. Publishing requires only: file duplication, text editing, and git push
3. Quickstart guide documents the complete workflow
4. New posts appear on index and are navigable after push to main branch
5. Post structure is self-documenting (field names, example values)

### Tasks

- [X] T022 [P] [US3] Verify `_post-template.md` meets authoring requirements:
  - Frontmatter fields are clearly labeled (title, date, slug) with example values
  - Instructions are plain-English comments (no code syntax)
  - Example markdown body is provided as a template Joey can replace
  - File is located in `app/src/data/posts/` alongside example posts
  - Test: Joey should understand what to fill in without reading developer docs

- [X] T023 [P] [US3] Create/update quickstart.md with authoring workflow:
  - Section: "How to Add a New Blog Post"
  - Step-by-step instructions: duplicate template, rename, edit frontmatter, write body
  - Screenshot or ASCII diagram showing file duplication in VS Code (recommended)
  - Example: before/after YAML frontmatter with clear field descriptions
  - Include troubleshooting: what if dev server doesn't refresh? (answer: manually refresh)
  - Include deployment note: changes go live when pushed to main branch

- [X] T024 [P] [US3] Create/update `data-model.md` with post validation and examples:
  - Document each Post field: title (length limits), date (ISO 8601 format), slug (URL-safe chars)
  - Show complete example frontmatter block
  - Explain filename-to-slug derivation rule
  - Include validation error messages (e.g., "Date cannot be in future")
  - Provide complete markdown example Joey can reference

- [X] T025 [P] [US3] Create/update `contracts/blog-interface.md`:
  - Document exported types: `Post`, `PostIndex`
  - Document exported functions: `getBlogIndex()`, `getPostBySlug(slug: string)`
  - Include usage examples (code snippets)
  - Document error handling and edge cases
  - Target audience: developers consuming the blog module (internal reference)

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Validate accessibility, mobile rendering, and deployment readiness.  
**Independent Test**: Run accessibility audit; verify pages on mobile/tablet/desktop; deploy to Vercel dry-run.

### Tasks

- [ ] T026 Accessibility audit for blog index and single-post pages:
  - Run audit using Lighthouse (DevTools) or axe DevTools browser extension
  - Target: ≥90 score on Lighthouse Accessibility
  - Verify: keyboard navigation (Tab, Enter) works on all interactive elements
  - Verify: screen reader (NVDA, JAWS, or VoiceOver) announces post titles, dates, links correctly
  - Check: color contrast meets WCAG 2.1 AA (4.5:1 for text, 3:1 for graphics)
  - Document: any accessibility fixes needed; create separate task if issues found

- [ ] T027 Mobile viewport testing — Blog index:
  - Test at 375px width (entry-level mobile): verify single-column layout, tappable cards (≥44px touch targets)
  - Test at 768px width (tablet): verify 2-column layout is readable
  - Test at 1280px width (desktop): verify 2–3 column grid is balanced
  - Verify: no horizontal scrolling at any viewport
  - Verify: font sizes are readable without zoom
  - Verify: spacing/padding looks intentional (no cramping)

- [ ] T028 Mobile viewport testing — Single post:
  - Test at 375px: verify single-column layout, readable line length, no horizontal scroll
  - Test at 768px: verify content has generous padding, line length is comfortable
  - Test at 1280px: verify content is constrained to readable max-width (not full page width)
  - Test: code blocks (if present in example posts) scroll horizontally or wrap appropriately
  - Test: headings, lists, and other markdown elements render correctly

- [X] T029 Empty state verification:
  - Temporarily remove all post files from `app/src/data/posts/` (except template)
  - Build and verify blog index shows friendly empty-state message
  - Restore post files
  - Verify: index repopulates correctly after restore

- [X] T030 Missing post (404) verification:
  - Navigate to `/blog/this-post-does-not-exist` manually in browser
  - Verify: BlogNotFoundPage renders with friendly message
  - Verify: back link to `/blog` is present and clickable
  - Test: navigating back returns to blog index

- [X] T031 Navigation link verification:
  - Verify: home page includes visible link to `/blog`
  - Test: clicking link navigates to blog index
  - Test: back link on blog pages (index and single post) navigate correctly
  - Verify: no broken links or 404 errors in blog navigation flow

- [ ] T032 Vercel deployment dry-run:
  - Verify: `app/src/data/posts/` directory is included in Vite build output
  - Run: `bun run build` from `app/` directory
  - Check: build succeeds with no errors or warnings related to blog
  - Verify: compiled HTML includes blog routes (`/blog`, `/blog/:slug`)
  - Verify: no new environment variables are required
  - Manual test: deploy to Vercel preview and verify blog pages load and render correctly

- [ ] T033 Production readiness checklist:
  - Verify: all tasks T001–T032 are complete and tested
  - Verify: no console errors or warnings in browser when viewing blog pages
  - Verify: page load time is <100ms for blog index (per plan.md performance goal)
  - Verify: no regressions in existing pages (home, about) after router changes
  - Final review: run accessibility audit one more time on deployed preview

### Open Validation Blockers

- T026 pending: Lighthouse/axe accessibility audit tools were not run in this session.
- T027 and T028 pending: integrated browser viewport emulation returned a fixed width, so true 375px/768px/1280px rendering checks could not be confirmed from automation.
- T032 pending (partial): `bun run build` passes, but Vercel preview deployment verification is still required.
- T033 pending: blocked on completion of T026–T028 and deployed preview checks.

---

## Dependencies & Completion Order

### Critical Path (Blocking)

1. **Phase 1** (T001–T005): Must complete before any other phase
2. **Phase 2** (T006–T011): Must complete before Phase 3 and 4
3. **Phase 3** (T012–T016): Must complete before deployment
4. **Phase 4** (T017–T021): Must complete before deployment
5. **Phase 6** (T026–T033): Final validation; can run after Phase 4 is code-complete

### Optional Dependencies (Non-Blocking)

- **Phase 5** (T022–T025): Documentation and authoring; can run in parallel with Phase 3–4 code work
- **Phase 6 tests** (T026–T033): Can run in parallel if code is complete in Phase 4

---

## Testing & Verification Strategy

### Per-User-Story Independent Testing

**US1 (Blog Index) - Complete when**:
- ✓ Navigate to `/blog`
- ✓ All example posts appear in reverse-date order (newest first)
- ✓ Each post entry displays title and date
- ✓ Clicking a post entry navigates to `/blog/:slug`
- ✓ Page is readable on 375px, 768px, and 1280px viewports

**US2 (Single Post) - Complete when**:
- ✓ Navigate to `/blog/{any-valid-post-slug}`
- ✓ Post title, date, and full markdown content render correctly
- ✓ Back link to `/blog` is present and clickable
- ✓ Page is readable on 375px, 768px, and 1280px viewports
- ✓ Navigating to `/blog/nonexistent-post` shows friendly 404

**US3 (Authoring) - Complete when**:
- ✓ Duplicate `_post-template.md` and rename to `test-post.md`
- ✓ Edit frontmatter (title, date, slug) and markdown body
- ✓ Run `bun run dev`; new post appears on `/blog` index
- ✓ Click new post; full content renders on `/blog/:slug`
- ✓ Quickstart.md clearly explains the workflow
- ✓ Joey can perform this workflow without asking for help

### Deployment Readiness

- ✓ `bun run build` succeeds with no errors
- ✓ Deployed preview on Vercel loads blog pages without 404s
- ✓ All blog routes (`/blog`, `/blog/:slug`) work on live Vercel URL
- ✓ Page performance (<100ms initial load) meets plan.md goals
- ✓ No regressions in existing pages

---

## Success Metrics (from spec)

| Metric | Target | Verification |
|--------|--------|--------------|
| SC-001: First-time visitor finds and reads blog post | <30s | Manual timed test from `/blog` to reading single post |
| SC-002: Joey publishes new post | <5 min | Timed test: duplicate template, edit, push; verify post appears live |
| SC-003: Accessibility score | ≥90 (Lighthouse) | Run Lighthouse audit on deployed pages |
| SC-004: Mobile viewport rendering | No scroll @ 375px, 1280px | Manual browser viewport testing |
| SC-005: Zero new environment variables | 0 new vars | Confirm no new `.env` entries required |
| SC-006: Main branch remains deployable | ✓ Deploy succeeds | `bun run build` succeeds; Vercel deploy succeeds |

---

## Files Created/Modified Summary

### New Files

| File | Purpose |
|------|---------|
| `app/src/data/blog.ts` | Post loader, types, index builder |
| `app/src/data/posts/001-welcome-to-the-blog.md` | Example post |
| `app/src/data/posts/002-learning-react-basics.md` | Example post |
| `app/src/data/posts/_post-template.md` | Template for authoring |
| `app/src/pages/BlogIndexPage.tsx` | Blog index page |
| `app/src/pages/BlogPostPage.tsx` | Single post page |
| `app/src/pages/BlogNotFoundPage.tsx` | 404 fallback page |
| `app/src/components/blog/PostCard.tsx` | Index entry component |
| `app/src/components/blog/PostContent.tsx` | Post body renderer |
| `app/src/components/blog/PostHeader.tsx` | Title + date component |
| `app/src/components/blog/EmptyBlogState.tsx` | Empty state component |

### Modified Files

| File | Change |
|------|--------|
| `app/package.json` | Add `markdown-to-jsx`, `@types/markdown-to-jsx` |
| `app/src/App.tsx` | Add React Router setup; register blog routes |
| `app/src/pages/HomePage.tsx` | Add link to `/blog` |
| `specs/005-blog/plan.md` | (Reference; no changes needed) |
| `specs/005-blog/spec.md` | (Reference; no changes needed) |
| `specs/005-blog/data-model.md` | (Verify complete; update if needed) |
| `specs/005-blog/quickstart.md` | (Verify complete; update if needed) |
| `specs/005-blog/contracts/blog-interface.md` | (Verify complete; update if needed) |

---

## Notes for Implementer

1. **Post Loader**: Use Vite's `?raw` import query to load markdown files as strings, then parse with gray-matter + markdown-to-jsx.
2. **Date Parsing**: Use `date-fns` (already in dependencies) for formatting dates consistently across components.
3. **Router Pattern**: Verify React Router v6 is installed; if not, add to dependencies. Use `useParams()` hook in `BlogPostPage.tsx` to access `:slug` param.
4. **Tailwind Utilities**: Use Tailwind responsive utilities (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) for layout instead of media queries.
5. **Accessibility**: Use semantic HTML (`<article>`, `<h1>`, `<a>`). Test with keyboard (Tab, Enter) and screen reader (browser built-in or NVDA).
6. **Mobile Testing**: Use browser DevTools responsive design mode (F12 → toggle device toolbar) to test 375px, 768px, 1280px viewports.
7. **Deployment**: Ensure `app/src/data/posts/` is in Vercel deploy source; Vite should include it automatically in build.

