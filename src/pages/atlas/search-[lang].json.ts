// The search index of each language, read by the search page: [name, URL, type, level, icon, quality].
// Types: d dungeon, r raid, e event, c chain, q quest, i item. Items without a translation keep their
// English name and page. Icons: Wowhead file names (items) or a path of ours.
import type { APIRoute } from 'astro';
import { LANGS, type Lang } from '../../lib/atlas/i18n';
import { addon, chains, allItems, eventQuests, href, dungeonName, raidName, eventName, questName, itemName } from '../../lib/atlas/data';
import { bookIcon, eventArt, itemIcon, quality } from '../../lib/atlas/view';

export const getStaticPaths = () => LANGS.map((lang) => ({ params: { lang } }));

type Row = [string, string, string, number?, string?, number?];
export const GET: APIRoute = ({ params }) => {
	const lang = params.lang as Lang;
	const quest = '/atlas/ui/quest-available.webp';
	const rows: Row[] = [
		...addon.Dungeons.map((d): Row => [dungeonName(lang, d), href(lang, { kind: 'dungeon', d }), 'd', d.minLevel, bookIcon(d.key)]),
		...addon.Raids.map((r): Row => [raidName(lang, r), href(lang, { kind: 'raid', r }), 'r', undefined, '/atlas/ui/lfg-raid.webp']),
		...addon.EventList.filter((e) => eventQuests(e).length).map((e): Row => [eventName(lang, e), href(lang, { kind: 'event', e }), 'e', undefined, eventArt(e.key, 'icon')]),
		...chains.map((steps): Row => [questName(lang, steps.at(-1)!), href(lang, { kind: 'chain', steps }), 'c', undefined, quest]),
		...Object.entries(addon.Quests).map(([id, q]): Row => [questName(lang, id), href(lang, { kind: 'quest', id: +id }), 'q', q.level, quest]),
		...allItems.map((id): Row => [itemName(lang, id), href(lang, { kind: 'item', id }), 'i', undefined, itemIcon(id), quality(lang, id)]),
	];
	return new Response(JSON.stringify(rows), { headers: { 'Content-Type': 'application/json' } });
};
