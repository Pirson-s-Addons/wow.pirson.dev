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
	if (!route.entry.data.addon) return;
	route.toc = undefined;
	route.entry.data.hero = { title: route.entry.data.title, actions: [] };
});
