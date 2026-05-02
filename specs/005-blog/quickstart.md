# Quickstart: Blog Development & Deployment

**Feature**: 005-blog  
**Date**: 2026-05-02

Get the blog running locally and learn how to add posts.

---

## Local Development Setup

### Prerequisites

- Node.js 18+ and `bun` installed
- Repository cloned locally
- VS Code or your preferred editor

### Step 1: Install Dependencies

From the `app/` directory:

```bash
cd app
bun install
```

### Step 2: Start Dev Server

```bash
bun run dev
```

Output:
```
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:5173/
```

Visit `http://localhost:5173/blog` in your browser. You should see the blog index page.

### Step 3: View Posts

1. Open the blog index at `/blog`
2. Click any post title to view the full post
3. Use the back link to return to the index

---

## How to Add a New Blog Post

### Step 1: Duplicate the Template

In VS Code's file explorer, navigate to `app/src/data/posts/`:

1. Right-click `_post-template.md`
2. Select "Copy"
3. Right-click in the empty space below
4. Select "Paste"
5. Rename the new file: `my-descriptive-post-name.md`

**Example**: `learning-react-hooks-today.md`

### Step 2: Open & Edit the File

1. Open your new file in VS Code
2. Edit the YAML frontmatter (the section between `---` lines):

```markdown
---
title: "My First Blog Post"
date: 2026-05-03
slug: my-first-blog-post
---
```

**Fields**:
- **title**: Your post title (required)
- **date**: Date in format YYYY-MM-DD (required)
- **slug**: URL identifier, lowercase with hyphens (required)

3. Delete the example markdown below and write your content:

```markdown
# My First Blog Post

Write your thoughts here.

## My Section

Add more paragraphs, code blocks, or links as needed.
```

### Step 3: Save & Test Locally

1. Save the file (Ctrl+S on Windows)
2. If dev server is running, the page auto-refreshes
3. Visit `/blog` in browser — your new post should appear in the list
4. Click the post title to view it

**Tip**: Newest posts appear first in the index.

### Step 4: Deploy to Live

1. Stage your file in Git:
   ```bash
   git add app/src/data/posts/my-descriptive-post-name.md
   ```

2. Commit with a descriptive message:
   ```bash
   git commit -m "blog: add post about learning react hooks"
   ```

3. Push to main:
   ```bash
   git push origin main
   ```

4. Vercel automatically detects the push, builds, and deploys
5. Check https://hi-im-joey.vercel.app/blog a few seconds later — your post is live

---

## Structure & File Locations

### Post Files

```
app/src/data/posts/
├── _post-template.md        (duplicate this to start)
├── 001-welcome-to-the-blog.md        (example)
├── 002-learning-react-basics.md      (example)
└── [your-post-name].md      (your new posts)
```

**File Naming**: Use descriptive names (the slug in the filename), e.g.:
- `learning-react-state.md` ✓
- `post1.md` ✗ (too vague)
- `My Post Name.md` ✗ (spaces not URL-friendly)

### Post Data Loader

The blog loads posts automatically from the directory above. No configuration needed.

**File**: `app/src/data/blog.ts`  
**Purpose**: Reads post files, extracts metadata, sorts by date

You don't need to edit this file to add posts.

---

## Markdown Tips

### Basic Formatting

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet list
- Another item

1. Numbered list
2. Another item

[Link text](https://example.com)

`inline code`

```code block```
```

### Code Examples

```markdown
# Example

Here's a snippet:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

This function returns a greeting.
```

### Images

```markdown
![Alt text](../path/to/image.png)
```

**Note**: Store images in `app/public/blog/` for easy reference.

---

## Troubleshooting

### Post doesn't appear in index

**Check**:
1. File is in `app/src/data/posts/` ✓
2. YAML frontmatter is valid (between `---` lines) ✓
3. `title` and `date` fields are present and not empty ✓
4. Dev server was restarted or auto-reloaded ✓

**Fix**:
- Open browser console (F12) → look for error messages
- Check `app/src/data/blog.ts` to see how posts are loaded

### Post shows but slug is wrong

**Check**: The `slug` field in your frontmatter matches the URL

**Expected**: `/blog/my-post-slug`  
**URL**: Check the browser address bar

**Fix**: Edit the `slug` field in your post's frontmatter, save, and reload.

### Markdown not rendering correctly

**Check**:
1. File is saved (Ctrl+S in VS Code)
2. Dev server is running (`bun run dev`)
3. Browser is refreshed (Ctrl+Shift+R for hard refresh)

**Common Issues**:
- **Missing blank line between sections**: Markdown expects blank lines between headers and paragraphs
- **Indentation**: Code blocks must be indented or wrapped in ` ```language ` markers
- **Special characters**: If you see `&` or `<` in output, they may need escaping in markdown

### Post won't deploy to Vercel

**Check**:
1. You committed the post file (`git add app/src/data/posts/xxx.md`)
2. You pushed to main (`git push origin main`)
3. File has no syntax errors (test locally first with `bun run dev`)

**Fix**:
1. Check Vercel build logs: https://vercel.com/dashboard → project → deployments → latest → view logs
2. Look for error messages in the build output
3. Fix the file locally, commit, and push again

---

## What Happens Behind the Scenes

1. **You save a post file**: File is written to `app/src/data/posts/`
2. **Dev server reloads**: Vite detects file change; app recompiles
3. **Blog loads posts**: `blog.ts` imports all `.md` files, parses frontmatter and markdown
4. **Index updates**: New post appears in `/blog` index, sorted by date
5. **You click the post**: React Router navigates to `/blog/:slug`, fetches the post, renders it

**On Vercel Deploy**:
1. You push to main branch
2. Vercel webhook triggers: runs `bun run build`
3. Vite bundles all posts into JavaScript
4. Output deployed to `https://hi-im-joey.vercel.app`
5. Your new post is live

---

## Next Steps

- **Add more posts**: Follow "How to Add a New Blog Post" above
- **Learn Markdown**: Practice headings, bold, lists, code blocks (see Markdown Tips)
- **Deploy frequently**: Each new post is a deploy; practice the git workflow
- **Share your blog**: Send the `/blog` URL to friends; invite feedback

---

## Getting Help

- **Stuck on deployment?** Check the [Git & Deployment Guide](../../README.md)
- **Markdown syntax?** Reference: [CommonMark.org](https://commonmark.org/)
- **Questions about design?** Read [data-model.md](./data-model.md) and [research.md](./research.md)
