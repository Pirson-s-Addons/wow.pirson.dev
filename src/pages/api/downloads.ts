// Live CurseForge download counts for every addon, { [projectId]: downloads, total }. cfwidget sends no CORS
// headers, so the browser asks us; Vercel's CDN keeps the answer an hour. A project cfwidget cannot
// answer right now is left out, and the page keeps the figure from the last build.
import type { APIRoute } from 'astro';
import addons from '../../data/addons.json';

export const prerender = false;

export const GET: APIRoute = async () => {
	const counts = await Promise.all(
		addons
			.filter((a) => a.cf)
			.map(async (a) => {
				try {
					const res = await fetch(`https://api.cfwidget.com/${a.cf}`, { signal: AbortSignal.timeout(8000) });
					const total = (await res.json())?.downloads?.total;
					return typeof total === 'number' ? [a.cf, total] : null;
				} catch {
					return null;
				}
			}),
	);
	const live: Record<string, number> = Object.fromEntries(counts.filter((c) => c !== null));
	// "total" too: live figures, the build's for any project left out
	live.total = addons.reduce((s, a) => s + (live[a.cf!] ?? a.downloads), 0);
	return new Response(JSON.stringify(live), {
		headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' },
	});
};
