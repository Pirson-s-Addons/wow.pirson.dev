// Cover image of each addon: the page's `cover` frontmatter, else the first image of its English guide.
const pages = import.meta.glob('/src/content/docs/addons/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const covers: Record<string, string | undefined> = Object.fromEntries(
	Object.entries(pages).map(([path, md]) => {
		const slug = path.split('/').pop()!.replace(/\.md$/, '');
		const cover = md.match(/^cover:\s*["']?([^"'\n]+)["']?$/m)?.[1] ?? md.match(/!\[[^\]]*\]\((\/images\/[^)]+)\)/)?.[1];
		return [slug, cover];
	}),
);
