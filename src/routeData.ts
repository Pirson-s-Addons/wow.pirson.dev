import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import addons from './data/addons.json';

// Share banner (og/twitter image): each addon guide has its own in public/og/<slug>-<lang>.jpg,
// every other page uses the site's home banner in its language.
function shareImage(route: { head: { tag: string; attrs?: Record<string, string | boolean | undefined> }[] }, url: string, alt: string) {
	const set = (key: 'property' | 'name', name: string, content: string) => {
		const meta = route.head.find((h) => h.tag === 'meta' && h.attrs?.[key] === name);
		if (meta) meta.attrs!.content = content;
		else route.head.push({ tag: 'meta', attrs: { [key]: name, content } });
	};
	set('property', 'og:image', url);
	set('property', 'og:image:width', '1200');
	set('property', 'og:image:height', '630');
	set('property', 'og:image:alt', alt);
	set('name', 'twitter:image', url);
}

// Structured data (JSON-LD) so search engines read each guide as a piece of software and the home as the
// site of an organization with its channels.
const ORG = {
	'@type': 'Organization',
	name: "Pirson's Addons",
	url: 'https://wow.pirson.dev/',
	logo: 'https://wow.pirson.dev/favicon.png',
	sameAs: [
		'https://www.curseforge.com/members/pirson/projects',
		'https://github.com/Pirson-s-Addons',
		'https://discord.gg/BM3hXNZXTh',
		'https://www.youtube.com/@SrPirson-Dev',
		'https://www.instagram.com/srpirson.wow/',
		'https://www.reddit.com/user/SrPirson/',
	],
};

function jsonLd(route: { head: { tag: string; attrs?: Record<string, string | boolean | undefined>; content?: string }[] }, data: object) {
	route.head.push({ tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON.stringify({ '@context': 'https://schema.org', ...data }) });
}

// Addon guides become full-width product pages: no sidebar or table of contents (the page hero
// brings its own section nav), and a `hero` so Starlight renders our Hero override for them.
// Done here rather than in frontmatter because Keystatic rewrites the guides' frontmatter.
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	route.hasSidebar = false; // our SideNav replaces Starlight's sidebar on every page
	const lang = route.lang === 'es' ? 'es' : 'en';
	const addon = addons.find((a) => a.id === route.entry.data.addon);
	shareImage(
		route,
		new URL(addon ? `/og/${addon.slug}-${lang}.jpg` : `/og/home-${lang}.jpg`, context.site).href,
		addon ? `${addon.name}: ${addon[lang]}` : "Pirson's Addons",
	);
	const page = new URL(context.url.pathname, context.site).href;
	if (addon)
		jsonLd(route, {
			'@type': 'SoftwareApplication',
			name: addon.name,
			description: addon[lang],
			url: page,
			image: new URL(`/og/${addon.slug}-${lang}.jpg`, context.site).href,
			applicationCategory: 'GameApplication',
			applicationSubCategory: `World of Warcraft addon · ${addon.cat[lang === 'es' ? 1 : 0]}`,
			operatingSystem: 'Windows, macOS',
			gamePlatform: addon.clients.map((c) => `World of Warcraft ${c[0]}`),
			...(addon.version && { softwareVersion: addon.version }),
			downloadUrl: addon.url,
			inLanguage: lang,
			author: ORG,
			interactionStatistic: { '@type': 'InteractionCounter', interactionType: 'https://schema.org/DownloadAction', userInteractionCount: addon.downloads },
		});
	else if (/^\/(es\/)?$/.test(context.url.pathname))
		jsonLd(route, { '@type': 'WebSite', name: "Pirson's Addons", url: page, inLanguage: lang, publisher: ORG });
	if (!route.entry.data.addon) return;
	route.toc = undefined;
	route.entry.data.hero = { title: route.entry.data.title, actions: [] };
});
