# Research: Blog Technical Decisions

**Date**: 2026-05-02  
**Feature**: 005-blog  
**Status**: Complete

This document consolidates design research and decisions made during Phase 0 planning.

## Markdown Parser Selection

**Decision**: Use `markdown-to-jsx` (or `react-markdown` + `remark` plugins if more control needed)

**Rationale**:
- Seamless React component rendering (no extra HTML sanitization step)
- Lightweight; markdown-to-jsx is <5KB
- No external service calls; parses at build or runtime locally
- Already familiar from similar projects
- Satisfies WCAG with semantic HTML output

**Alternatives Considered**:
- Raw HTML in TypeScript files: requires Joey to write JSX syntax, violates "radically simple"
- MDX (markdown + JSX): powerful but adds complexity; file-based system doesn't need embedded components yet
- Marked.js: lighter but requires manual React wrapping; less native to React ecosystem
- External CMS: violates "no external service" requirement

**Chosen**: markdown-to-jsx — imports installed, tested with example post.

---

## Post Metadata Format

**Decision**: YAML frontmatter in Markdown files

```markdown
---
title: "Post Title"
date: 2026-05-01
slug: post-title-optional
---

# Post Title

Post body content here...
```

**Rationale**:
- Joey doesn't need to learn JavaScript object syntax; YAML reads like key-value pairs
- Easily parsed by gray-matter or similar library (<2KB)
- Compatible with static site generators; future-proof if blog expands
- One file per post keeps editing simple

**Alternatives Considered**:
- TypeScript files with default export object: requires code knowledge, violates simplicity
- Frontmatter in JSON: less readable than YAML for Joey; less common in markdown workflows
- Flat template duplicated for each post: works but less self-documenting than frontmatter

**Chosen**: YAML frontmatter — Joey duplicates template, edits title/date/slug/body.

---

## Routing Strategy

**Decision**: Client-side React Router v6 with parameterized routes

```typescript
// App.tsx or router config
<Route path="/blog" element={<BlogIndexPage />} />
<Route path="/blog/:slug" element={<BlogPostPage />} />
```

**Rationale**:
- No server required; works on Vercel static deployments
- Consistent with existing app routing (already using React Router)
- SEO-friendly URLs; slug in path is semantic
- Joey doesn't need to understand routing setup

**Alternatives Considered**:
- Hash-based routing (#/blog/:slug): works but SEO-hostile; URLs less shareable
- Static file routes (/blog/post-1.html): harder to generate dynamically; requires build step Joey understands
- Server-side rendering with API: adds complexity; not needed for static content

**Chosen**: React Router client-side — matches app conventions, zero config for Joey.

---

## Post Discovery Mechanism

**Decision**: Static import all posts at build time; compute index in `blog.ts`

```typescript
// app/src/data/blog.ts
import post1 from './posts/001-first-post.md?raw';
import post2 from './posts/002-second-post.md?raw';

export const POST_FILES = [post1, post2];
export const postIndex = parseAndSort(POST_FILES);
```

**Rationale**:
- No filesystem access at runtime (works on Vercel static)
- TypeScript tree-shaking removes unpublished posts
- Performance: index computed once at build; pages render instantly
- Future-proof: can switch to dynamic imports if post volume grows

**Alternatives Considered**:
- Runtime filesystem discovery with Node.js fs module: requires server; breaks on Vercel static
- Hardcoded index in JSON: requires manual sync when new post added; error-prone
- API route that serves index: adds server dependency; unnecessary for static content

**Chosen**: Static build-time imports — matches Vite conventions; zero overhead at runtime.

---

## Empty State and 404 Handling

**Decision**: Friendly messages, no crashes

- **No posts yet**: Show encouraging empty state with instructions on how to add first post
- **Post not found**: Show 404 page with link back to blog index

**Rationale**:
- Constitution requires radically simple experience
- User doesn't feel lost or broken; clear next step is provided
- Joey can test the 404 page by typo-ing a URL and know the fallback works

**Chosen**: Both states render explicit UI components — user empathy first.

---

## CSS & Styling

**Decision**: shadcn/ui components + utility CSS (existing Tailwind setup)

- Blog cards use shadcn Card with responsive padding
- Typography via shadcn Typography classes
- Mobile-first: single-column grid on mobile, wider cards on desktop
- No new fonts; consistent with site theme

**Rationale**:
- Reuses existing design system; no new CSS maintenance
- Tailwind responsive utilities handle 375px → 1280px naturally
- shadcn/ui built for Tailwind; minimal customization needed

**Chosen**: Existing shadcn/ui + Tailwind — zero new design decisions.

---

## Accessibility Approach

**Decision**: Semantic HTML, keyboard navigation, ARIA labels where needed

- Post list: `<article>` per post; `<a>` for title links
- Post page: `<h1>` for title; `<time>` for date
- Skip link to main content on index
- Focus visible on all interactive elements (buttons, links)
- Heading hierarchy: h1 (page title), h2 (post title), h3 (section headers in post body)

**Rationale**:
- Semantic HTML is the foundation; best practices first before ARIA
- Constitution requires WCAG 2.1 AA; heading hierarchy and links cover most cases
- shadcn/ui components ship with ARIA defaults; minimal manual work

**Testing**:
- Keyboard-only navigation: Tab through all links, verify focus visible
- Screen reader: NVDA or JAWS on Windows; verify post list readable
- Contrast: shadcn/ui default colors meet AA; verify in audit tool

**Chosen**: Semantic HTML + keyboard nav — simplest path to AA compliance.

---

## Deployment & Build

**Decision**: Vite static build; posts compiled into bundle; no additional env vars

```bash
# Vite build output
dist/
├── index.html
├── blog/
│   ├── index.html        (blog index page)
│   └── [post-slug].html  (generated for each post if SSG-friendly)
└── assets/
    ├── bundle.js
    └── style.css
```

**Rationale**:
- Vite SPA (single-page app) builds to `dist/`, ready for Vercel
- No build-time environment variables needed
- Existing deploy-to-Vercel workflow (spec 004) already handles this

**Deploy Steps**:
1. Joey edits post file locally
2. Joey runs `npm run build` or `npm run dev`
3. Joey pushes to main branch
4. Vercel sees push, runs `npm run build`, deploys dist/ → live

**Chosen**: Standard Vite + Vercel flow — Joey needs to know: edit, commit, push.

---

## Performance & Metrics

**Decision**: Lazy-load markdown parsing if needed; no image optimization yet

**Rationale**:
- Markdown files are small (<100KB per post initially)
- markdown-to-jsx is <5KB; negligible impact
- Vite's production build minifies bundle; no extra work needed

**Benchmarks** (not yet measured):
- Goal: Blog index page FCP <1s on 4G mobile
- Goal: Single post page FCP <1s on 4G mobile
- Test: Lighthouse audit post-merge

**Chosen**: Simple approach first; optimize if metrics show need.

---

## Testing Strategy

**Decision**: Manual testing first (no e2e automated yet); focus on user scenarios

### Manual Checklist
- [ ] Index page loads; all posts visible
- [ ] Newest post appears first
- [ ] Each post link works; clicks navigate to post
- [ ] Post page displays title, date, body
- [ ] Back link on post page returns to index
- [ ] Non-existent post URL shows 404
- [ ] Mobile viewport: no horizontal scroll at 375px
- [ ] Keyboard navigation: all interactive elements reachable via Tab
- [ ] Empty state: renders correctly when no posts

### Accessibility Audit
- [ ] Lighthouse Accessibility score ≥90
- [ ] WAVE tool: no WCAG errors

**Future** (Phase 2 or later):
- Automated testing with Vitest + React Testing Library
- E2E tests with Playwright if volume grows

**Chosen**: Manual testing sufficient for v1; document checklists; automate if feature expands.

---

## Future Extensibility (Out of Scope for v1)

These are intentionally NOT implemented to stay radically simple:
- ~~Categories or tags~~ — Can add later; index doesn't need filtering yet
- ~~Search~~ — Not needed at <50 posts; Ctrl+F works
- ~~Comments~~ — Joey owns blog; moderation would be manual anyway
- ~~RSS feed~~ — Semantic HTML links satisfy RSS readers; can add .xml feed later
- ~~Multi-author support~~ — Only Joey writes for now
- ~~Pagination~~ — Scrollable list sufficient; add if >100 posts
- ~~Edit history or versioning~~ — Git already does this; duplicative

**Why limited scope**: Constitution Principle III — radically simple by default.

---

## Decision Record

| Decision | Chosen | Tradeoff |
|----------|--------|----------|
| Parser | markdown-to-jsx | No embedded components yet (future if needed) |
| Metadata | YAML frontmatter | Slightly more parsing than hardcoded JS |
| Routing | Client-side React Router | No SEO meta tags yet (can add later) |
| Discovery | Static build-time imports | Limited to file count; no dynamic refresh (sufficient for Joey's pace) |
| Styling | shadcn/ui + Tailwind | No custom design; consistent with app theme |
| Deployment | Vite SPA → Vercel | No ISR or incremental static regeneration (not needed for Joey's pace) |

---

## Sign-Off

**Reviewed by**: Planning workflow  
**Status**: Complete — all NEEDS CLARIFICATION resolved. Ready for Phase 1 (data-model.md, contracts, quickstart).
