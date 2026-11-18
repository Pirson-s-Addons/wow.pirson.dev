import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// Addon guides become full-width product pages: no sidebar or table of contents (the page hero
// brings its own section nav), and a `hero` so Starlight renders our Hero override for them.
// Done here rather than in frontmatter because Keystatic rewrites the guides' frontmatter.
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	if (!route.entry.data.addon) return;
	route.hasSidebar = false;
	route.toc = undefined;
	route.entry.data.hero = { title: route.entry.data.title, actions: [] };
});
