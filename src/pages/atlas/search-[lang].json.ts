// The search index of each language, read by the search page: [name, URL, type, level].
// Types: d dungeon, r raid, e event, c chain, q quest, i item. Items without a translation keep their
// English name and page.
import type { APIRoute } from 'astro';
import { LANGS, type Lang } from '../../lib/atlas/i18n';
import { addon, chains, allItems, eventQuests, href, dungeonName, raidName, eventName, questName, itemName } from '../../lib/atlas/data';

export const getStaticPaths = () => LANGS.map((lang) => ({ params: { lang } }));

export const GET: APIRoute = ({ params }) => {
	const lang = params.lang as Lang;
	const rows: [string, string, string, number?][] = [
		...addon.Dungeons.map((d) => [dungeonName(lang, d), href(lang, { kind: 'dungeon', d }), 'd', d.minLevel] as [string, string, string, number]),
		...addon.Raids.map((r) => [raidName(lang, r), href(lang, { kind: 'raid', r }), 'r'] as [string, string, string]),
		...addon.EventList.filter((e) => eventQuests(e).length).map((e) => [eventName(lang, e), href(lang, { kind: 'event', e }), 'e'] as [string, string, string]),
		...chains.map((steps) => [questName(lang, steps.at(-1)!), href(lang, { kind: 'chain', steps }), 'c'] as [string, string, string]),
		...Object.entries(addon.Quests).map(([id, q]) => [questName(lang, id), href(lang, { kind: 'quest', id: +id }), 'q', q.level] as [string, string, string, number?]),
		...allItems.map((id) => [itemName(lang, id), href(lang, { kind: 'item', id }), 'i'] as [string, string, string]),
	];
	return new Response(JSON.stringify(rows), { headers: { 'Content-Type': 'application/json' } });
};
