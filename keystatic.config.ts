// Admin panel at /keystatic. Locally it edits the files on disk; on the live site every save is a
// commit to GitHub, and Vercel rebuilds the site from it.
import { config, collection, fields } from '@keystatic/core';
import addons from './src/data/addons.json';

// Plain .md through the MDX editor: it writes GitHub-flavoured Markdown (tables included), which Starlight renders as is.
const content = (dir: string) =>
	fields.mdx({
		label: 'Content',
		extension: 'md',
		options: { image: { directory: `public/images/${dir}`, publicPath: `/images/${dir}/` } },
	});

const addonGuide = (label: string, path: string) =>
	collection({
		label,
		path: `${path}/*`,
		slugField: 'title',
		format: { contentField: 'content' },
		entryLayout: 'content',
		columns: ['title'],
		schema: {
			title: fields.slug({ name: { label: 'Title' } }),
			description: fields.text({ label: 'Description (SEO, ~155 characters)', multiline: true }),
			addon: fields.select({
				label: 'Addon (header with logo, clients and downloads)',
				options: addons.map((a) => ({ label: a.name, value: a.id })),
				defaultValue: addons[0].id,
			}),
			sidebar: fields.object({ order: fields.integer({ label: 'Order in the sidebar', defaultValue: 99 }) }),
			content: content('addons'),
		},
	});

const blog = (label: string, path: string) =>
	collection({
		label,
		path: `${path}/*`,
		slugField: 'title',
		format: { contentField: 'content' },
		entryLayout: 'content',
		columns: ['title', 'date'],
		schema: {
			title: fields.slug({ name: { label: 'Title' } }),
			description: fields.text({ label: 'Description (SEO, ~155 characters)', multiline: true }),
			date: fields.date({ label: 'Date', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
			authors: fields.text({ label: 'Author', defaultValue: 'pirson' }),
			tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }),
			excerpt: fields.text({ label: 'Excerpt (blog list)', multiline: true }),
			draft: fields.checkbox({ label: 'Draft (not published)', defaultValue: true }),
			content: content('blog'),
		},
	});

export default config({
	storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'github', repo: 'Pirson-s-Addons/wow.pirson.dev' },
	ui: { brand: { name: "Pirson's Addons" } },
	collections: {
		addonsEn: addonGuide('Addons (English)', 'src/content/docs/addons'),
		addonsEs: addonGuide('Addons (Español)', 'src/content/docs/es/addons'),
		blogEn: blog('Blog (English)', 'src/content/docs/blog'),
		blogEs: blog('Blog (Español)', 'src/content/docs/es/blog'),
	},
});
