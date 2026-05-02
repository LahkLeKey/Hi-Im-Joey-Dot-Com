# Feature Specification: Blog

**Feature Branch**: `005-blog`  
**Created**: 2026-05-02  
**Status**: Draft  
**Input**: User description: "Create a feature specification for 005-blog. Constitution Principle IV requires a blog for transparent updates and progress — this is a mandatory surface. Requirements: a blog index page listing posts, and a single post page showing full content. Keep it radically simple — no CMS, no database, no external API. Posts are local markdown or TypeScript files Joey can edit directly. Joey should be able to write a new post by duplicating a file and editing it — no build tooling knowledge needed beyond that. All UI via shadcn/ui primitives. Accessible and mobile-readable. Vercel-deployable."

---

## How This Teaches

> _Per Constitution Principle IV delivery workflow: each non-trivial feature includes a short "how this teaches" note._

This feature teaches Joey two foundational patterns by doing real work:

1. **File-based content**: Joey discovers that structured data does not require a database. A folder of files with a consistent shape is a content system. By creating a new post via file duplication, Joey directly touches how source code and content can be the same thing.
2. **Basic routing**: Joey sees how a URL maps to a page. By navigating from the blog index to a post, Joey observes the connection between a link, a route, and a rendered component — the core mental model of every web app.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browse the blog index (Priority: P1)

A visitor arrives at the blog section of the site and sees a list of all published posts. Each entry shows enough information to decide whether to read further.

**Why this priority**: Without an index, the blog surface does not exist at all. This is the minimum viable blog.

**Independent Test**: Can be fully tested by navigating to the blog index and confirming all post entries appear with titles and dates. Delivers standalone value as a discoverable list of writing.

**Acceptance Scenarios**:

1. **Given** a visitor loads the blog index, **When** the page renders, **Then** all published posts appear as a list ordered by date (newest first).
2. **Given** the blog index is loaded, **When** a visitor views a post entry, **Then** the entry displays at minimum: the post title and publication date.
3. **Given** the blog index is loaded, **When** a visitor clicks a post entry, **Then** they are navigated to that post's full-content page.
4. **Given** no posts exist, **When** the blog index loads, **Then** a friendly empty-state message is shown rather than a blank page.
5. **Given** the blog index is loaded on a mobile device, **When** the visitor scrolls through entries, **Then** all entries are readable and tappable without horizontal scrolling.

---

### User Story 2 — Read a single post (Priority: P2)

A visitor navigates to a post and reads the full content. The page is self-contained and readable on any screen size.

**Why this priority**: The index has no value without the ability to actually read a post. Together P1 and P2 form the complete blog experience.

**Independent Test**: Can be tested by navigating directly to any individual post URL and verifying the full post content renders correctly.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to a post page, **When** the page renders, **Then** the full post content is displayed.
2. **Given** a post page is loaded, **When** the visitor views the page, **Then** the post title and publication date are visible.
3. **Given** a post page is loaded, **When** the visitor views the page on a mobile screen, **Then** content is readable without horizontal scrolling and font sizes are comfortable.
4. **Given** a post page is loaded, **When** the visitor wants to return to the index, **Then** a clearly visible navigation link back to the blog index is present.
5. **Given** a visitor navigates to a post URL that does not exist, **When** the page renders, **Then** a clear not-found message is shown rather than a blank page or crash.

---

### User Story 3 — Joey publishes a new post (Priority: P3)

Joey writes a new blog post by duplicating an existing post file, renaming it, and editing its content. No terminal commands or build knowledge are required beyond saving the file.

**Why this priority**: The authoring workflow is what makes this surface sustainable. If publishing requires tooling expertise, the blog will go stale.

**Independent Test**: Can be tested by duplicating an existing post file, editing its title and body, and verifying the new post appears on the live blog without any steps other than file save and deploy.

**Acceptance Scenarios**:

1. **Given** Joey duplicates an existing post file and edits the title, date, and body, **When** the site builds, **Then** the new post appears on the blog index and is navigable.
2. **Given** Joey duplicates a post file, **When** they open it, **Then** the file's structure is self-explanatory — field names read as plain English, no code knowledge required to fill them in.
3. **Given** a new post file has been created, **When** Joey deploys to Vercel by pushing to the main branch, **Then** the new post is live without any additional configuration steps.

---

### Edge Cases

- What happens when a post file is missing required fields (e.g., title or date)? The site must not crash; either the post is skipped or a placeholder value is shown.
- What happens when two posts have the same slug or filename? The behavior must be predictable — either the most recently modified wins or both render under distinct URLs.
- What happens when post body content contains special characters or long unbroken strings? The layout must not break on any viewport size.
- What happens when the blog index contains many posts? The list must remain scrollable and performant without pagination at launch (acceptable to add later).

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST include a blog index page that lists all published posts.
- **FR-002**: The blog index MUST display each post's title and publication date at minimum.
- **FR-003**: The blog index MUST order posts by publication date, newest first.
- **FR-004**: The blog index MUST display a friendly empty-state message when no posts exist.
- **FR-005**: Each post entry on the index MUST link to that post's individual page.
- **FR-006**: The site MUST include a single-post page that renders the full content of one post.
- **FR-007**: The single-post page MUST display the post's title, publication date, and body content.
- **FR-008**: The single-post page MUST include a navigation link back to the blog index.
- **FR-009**: The single-post page MUST display a clear not-found message when the requested post does not exist.
- **FR-010**: All post content MUST be stored as local files (markdown or TypeScript) within the project repository — no external service, database, or CMS.
- **FR-011**: Each post file MUST have a consistent, self-documenting structure so that Joey can understand and fill it in without code knowledge.
- **FR-012**: Publishing a new post MUST require only: duplicating a post file, editing its content, and deploying — no additional configuration or tooling steps.
- **FR-013**: All blog UI components MUST use the project's existing shadcn/ui component library.
- **FR-014**: All blog pages MUST be accessible — readable by screen readers, keyboard-navigable, and meeting WCAG 2.1 AA contrast standards.
- **FR-015**: All blog pages MUST be readable on mobile devices without horizontal scrolling.
- **FR-016**: The blog MUST remain deployable to Vercel without additional environment variables or build configuration.
- **FR-017**: Blog routing MUST use a minimal client-side or hash-based approach consistent with the existing app routing pattern.

### Key Entities

- **Post**: A single blog entry. Key attributes: title (plain text), publication date, body content (prose), slug (derived from filename or explicit field). No required metadata beyond title and date.
- **Post Index**: The ordered collection of all published posts, derived at build time from the set of post files. Not a stored entity — computed from the file system.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can find and read a blog post within 30 seconds of landing on the blog index, with no instruction needed.
- **SC-002**: Joey can publish a new post in under 5 minutes — measured from "I have something to say" to "it is live on Vercel" — using only file duplication, text editing, and a git push.
- **SC-003**: All blog pages score 90 or above on accessibility audits run against the deployed site.
- **SC-004**: All blog pages render correctly and readably at 375px viewport width (entry-level mobile) and at 1280px (standard desktop).
- **SC-005**: The blog adds zero new required environment variables or third-party service accounts to the project.
- **SC-006**: The main branch remains deployable to Vercel after this feature ships — no new build failures introduced.

---

## Assumptions

- The project stack is Vite + React + TypeScript with shadcn/ui components; this feature builds within that existing stack without adding new frameworks.
- Routing uses a minimal client-side or hash-based approach; a complex router is explicitly out of scope.
- Post files live inside the `app/` directory tree and are committed to the repository alongside source code.
- No pagination is required at launch; a simple scrollable list is sufficient for the expected post volume.
- No post categories, tags, search, or comments are in scope for this feature — these may be added later.
- No author identity, avatar, or multi-author support is in scope.
- No RSS feed or SEO meta tags are required for v1, though they should not be structurally prevented.
- Joey has basic familiarity with editing text files in VS Code and pushing to GitHub; no other tooling knowledge is assumed.
- Deployment to Vercel from the main branch is already configured (per Constitution Principle V and spec 004-vercel-deployment).
