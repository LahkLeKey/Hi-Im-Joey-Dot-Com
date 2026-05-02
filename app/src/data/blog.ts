const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface Post {
  title: string;
  date: Date;
  slug: string;
  body: string;
  bodyHtml: string;
  excerpt?: string;
}

export interface PostIndex {
  posts: Post[];
  totalCount: number;
  lastUpdated: Date;
}

type Frontmatter = {
  title?: unknown;
  date?: unknown;
  slug?: unknown;
  excerpt?: unknown;
};

type ParsedMarkdown = {
  data: Frontmatter; body: string;
};

function getPostSources(): Array<{path: string; raw: string}> {
  const modules = import.meta.glob('./posts/*.md', {
    eager: true,
    import: 'default',
    query: '?raw',
  }) as Record<string, string>;

  return Object.entries(modules)
      .filter(([path]) => {
        const name = path.split('/').pop() ?? '';
        return !name.startsWith('_') && name !== '.gitkeep';
      })
      .map(([path, raw]) => ({path, raw}));
}

function asTrimmedString(value: unknown): string|null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function slugFromFilename(path: string): string {
  const filename = (path.split('/').pop() ?? '').replace(/\.md$/i, '');
  return filename.replace(/^\d+-/, '').toLowerCase();
}

function markdownToPlainText(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]*`/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/[>#*_~-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
}

function parsePostDate(input: string): Date|null {
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1]);
    const month = Number(dateOnlyMatch[2]);
    const day = Number(dateOnlyMatch[3]);
    const parsed = new Date(year, month - 1, day);

    if (parsed.getFullYear() === year && parsed.getMonth() === month - 1 &&
        parsed.getDate() === day) {
      return parsed;
    }

    return null;
  }

  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseFrontmatter(raw: string): ParsedMarkdown {
  const normalized = raw.replace(/\r\n/g, '\n');

  if (!normalized.startsWith('---\n')) {
    return {data: {}, body: normalized};
  }

  const closingFenceIndex = normalized.indexOf('\n---\n', 4);
  if (closingFenceIndex === -1) {
    return {data: {}, body: normalized};
  }

  const frontmatterBlock = normalized.slice(4, closingFenceIndex).trim();
  const body = normalized.slice(closingFenceIndex + 5);
  const entries =
      frontmatterBlock.split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0 && !line.startsWith('#'));

  const data: Frontmatter = {};
  for (const entry of entries) {
    const separatorIndex = entry.indexOf(':');
    if (separatorIndex === -1) {
      continue;
    }

    const key = entry.slice(0, separatorIndex).trim();
    let value = entry.slice(separatorIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith('\'') && value.endsWith('\''))) {
      value = value.slice(1, -1);
    }

    if (key === 'title' || key === 'date' || key === 'slug' ||
        key === 'excerpt') {
      data[key] = value;
    }
  }

  return {data, body};
}

function buildPost(path: string, raw: string): Post|null {
  const parsed = parseFrontmatter(raw);
  const data = parsed.data;

  const title = asTrimmedString(data.title);
  const dateRaw = asTrimmedString(data.date);
  const slug = asTrimmedString(data.slug) ?? slugFromFilename(path);
  const body = parsed.body.trim();

  if (!title || title.length > 200) {
    return null;
  }

  if (!dateRaw) {
    return null;
  }

  const date = parsePostDate(dateRaw);
  if (!date || date.getTime() > Date.now()) {
    return null;
  }

  if (!SLUG_PATTERN.test(slug) || slug.length > 100) {
    return null;
  }

  if (!body) {
    return null;
  }

  const excerptFromFrontmatter = asTrimmedString(data.excerpt);
  const excerpt =
      excerptFromFrontmatter ?? markdownToPlainText(body).slice(0, 220);

  return {
    title,
    date,
    slug,
    body,
    bodyHtml: body,
    excerpt: excerpt.length > 0 ? excerpt : undefined,
  };
}

export function getBlogIndex(): PostIndex {
  const posts = getPostSources()
                    .map(({path, raw}) => buildPost(path, raw))
                    .filter((post): post is Post => post !== null)
                    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return {
    posts,
    totalCount: posts.length,
    lastUpdated: new Date(),
  };
}

export function getPostBySlug(slug: string): Post|null {
  return getBlogIndex().posts.find((post) => post.slug === slug) ?? null;
}

export function getAllPostSlugs(): string[] {
  return getBlogIndex().posts.map((post) => post.slug);
}

export function getPostsByDate(): Post[] {
  return getBlogIndex().posts;
}
