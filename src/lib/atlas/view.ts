// Small helpers the Atlas pages share: icons, money, quest text and item tooltips from Wowhead, places.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { INTRO, fmt, type Lang } from './i18n';
import { addon, name, tip, zoneName, itemName, href, dungeonName } from './data';

// shortcut: icons are hotlinked from Wowhead's CDN; self-host them under public/ if it ever blocks hotlinks
export const icon = (file: string | undefined, size: 'small' | 'medium' | 'large' = 'medium') =>
	`https://wow.zamimg.com/images/wow/icons/${size}/${file ?? 'inv_misc_questionmark'}.jpg`;

export const money = (copper: number) => {
	const g = Math.floor(copper / 10000);
	const s = Math.floor((copper % 10000) / 100);
	const c = copper % 100;
	return [g && `${g}g`, s && `${s}s`, c && `${c}c`].filter(Boolean).join(' ');
};

const text = (html: string) =>
	html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<[^>]+>/g, '')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

// The quest tooltip: a header table (name, level), then the objective and " - thing x N" lines
export function questText(lang: Lang, id: number) {
	const t = tip(lang, `quest:${id}`)?.t ?? tip('en', `quest:${id}`)?.t;
	if (!t) return { objective: '', needs: [] as string[] };
	const body = t.split('</table>').slice(2).join('') || t;
	const [objective, rest = ''] = body.split('<span class="q">');
	const needs = [...text(rest).matchAll(/^\s*-\s*(.+)$/gm)].map((m) => m[1].trim());
	return { objective: text(objective).trim(), needs };
}

// Wowhead's item tooltip HTML, reduced to an allowlist of plain tags with Wowhead's quality and colour
// classes; anything else (attributes, links, scripts) is dropped. It comes from a third party.
const KEEP = new Set(['table', 'tr', 'td', 'th', 'b', 'span', 'br', 'div', 'small']);
export function tooltipHtml(lang: Lang, key: string) {
	const t = tip(lang, key)?.t ?? tip('en', key)?.t ?? '';
	return t
		.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
		// Wowhead's own lines ("Dropped by", "Drop Chance"): not in the game's tooltip
		.replace(/<div class="whtt-extra[^"]*">[\s\S]*?<\/div>/g, '')
		.replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (_, close: string, tag: string, attrs: string) => {
			tag = tag.toLowerCase();
			if (!KEEP.has(tag)) return '';
			if (close) return `</${tag}>`;
			const cls = attrs.match(/class="([\w -]+)"/)?.[1];
			return cls ? `<${tag} class="${cls}">` : `<${tag}>`;
		});
}

// Who or what starts or ends a quest: "npc:ID", "object:ID", "item:ID" or "name:Text"
export function place(lang: Lang, key: string) {
	const p = addon.Places[key];
	const [type, id] = key.split(':');
	if (type === 'item') return { name: itemName(lang, id), href: href(lang, { kind: 'item', id: +id }), where: '', point: undefined };
	const label = type === 'name' ? id : name(lang, key, p?.name);
	const where = p?.inside ? '' : [zoneName(lang, key), p?.x != null && `${p.x}, ${p.y}`].filter(Boolean).join(' · ');
	// a map point to copy for the game (CopyMenu): only places outside the dungeon have coordinates
	const point = p && !p.inside && p.mapID && p.x != null && p.y != null ? { label, mapID: p.mapID, x: p.x, y: p.y } : undefined;
	return { name: label, href: undefined, where, point };
}

export const quality = (lang: Lang, id: number) => tip(lang, `item:${id}`)?.q ?? tip('en', `item:${id}`)?.q ?? 1;
export const itemIcon = (id: number) => tip('en', `item:${id}`)?.i;

// A dungeon's picture: its card art (the Forever ones) or its first map floor
const pub = (f: string) => existsSync(join(process.cwd(), 'public', f));
const UI = '/atlas/ui/';
// The Journal file names per dungeon key (UI/Journal.lua): wings share their dungeon's art
const EJ: Record<string, string> = {
	SM_GY: 'SM', SM_LIB: 'SM', SM_ARM: 'SM', SM_CATH: 'SM', DM_E: 'DIREMAUL', DM_W: 'DIREMAUL', DM_N: 'DIREMAUL',
	STRAT_LIVE: 'STRAT', STRAT_UD: 'STRAT',
};
const ej = (key: string) => EJ[key] ?? key;
// The art of a dungeon or raid, first that exists, as in the addon (Core/Journal.lua): its own art
// (Art/UI), the Journal's, then the default background. kind: card (grid), lore (overview), bg (model)
export function art(key: string, kind: 'card' | 'lore' | 'bg' = 'card') {
	const own = `/atlas/art/${kind === 'bg' ? 'lore' : kind}_${key}.webp`;
	const game = `${UI}${kind}-${ej(key)}.webp`;
	if (pub(own)) return own;
	if (pub(game)) return game;
	if (kind !== 'card' && pub(`${UI}card-${ej(key)}.webp`)) return `${UI}card-${ej(key)}.webp`;
	return `${UI}ej-bg-default.webp`;
}
// the round icon of the book header: the LFG icon, else the addon's logo
export const bookIcon = (key: string) => (pub(`${UI}icon-${ej(key)}.webp`) ? `${UI}icon-${ej(key)}.webp` : '/atlas/art/logo_dqa.webp');
export const eventArt = (key: string, kind: 'card' | 'icon' = 'card') =>
	pub(`${UI}event-${kind === 'icon' ? 'icon-' : ''}${key}.webp`) ? `${UI}event-${kind === 'icon' ? 'icon-' : ''}${key}.webp` : `${UI}ej-bg-default.webp`;

// Bosses: the Journal's creature picture (128x64) when the game has one; the round portrait is
// Wowhead's thumbnail of the boss's model (display id), else a fitting icon as in the addon
const portraits = JSON.parse(readFileSync(join(process.cwd(), 'src/data/atlas/portraits.json'), 'utf8')) as Record<string, string>;
export const creature = (b: { name: string }) => (portraits[b.name] ? `${UI}${portraits[b.name]}.webp` : undefined);
export const portrait = (b: { name: string; display?: number; kind?: string }) => {
	if (b.display) return `https://wow.zamimg.com/modelviewer/live/webthumbs/npc/${b.display % 256}/${b.display}.webp`;
	const i = { trash: 'inv_misc_bone_humanskull_01', object: 'inv_box_01', recipes: 'inv_scroll_05' }[b.kind ?? ''];
	return icon(i ?? 'inv_misc_questionmark', 'large');
};

// The boss's model in 3D (scripts/atlas/models.py), when it was converted; humanoids are a character model
const kinds: Record<string, string> = pub('../src/data/atlas/models.json') ? JSON.parse(readFileSync(join(process.cwd(), 'src/data/atlas/models.json'), 'utf8')) : {};
export const humanoid = (b: { display?: number }) => kinds[b.display ?? 0] === 'humanoid';
// The camera for a boss's model: aimed at the centre of its Stand pose, back far enough for its largest side,
// so a dragon and a gnome fill the stage alike (frames.json, from models.py)
const frames: Record<string, number[]> = pub('../src/data/atlas/frames.json') ? JSON.parse(readFileSync(join(process.cwd(), 'src/data/atlas/frames.json'), 'utf8')) : {};
export function camera3d(b: { display?: number }) {
	const f = frames[b.display ?? 0];
	if (!f) return {};
	const [x, y, z, half, reach] = f;
	// 30° high field of view; the stage is about 1.7 times wider than high; some air around it
	const t = Math.tan((15 * Math.PI) / 180);
	const far = Math.max(half / t, reach / (t * 1.7)) * 1.15 + reach * 0.2;
	return { 'camera-target': `${x}m ${y}m ${z}m`, 'camera-orbit': `0deg 80deg ${far.toFixed(2)}m`, 'field-of-view': '30deg', 'min-camera-orbit': `auto auto ${(far * 0.35).toFixed(2)}m`, 'max-camera-orbit': `auto auto ${(far * 1.6).toFixed(2)}m` };
}
export const model3d = (b: { display?: number }) => (b.display && pub(`atlas/models/npc-${b.display}.glb`) ? `/atlas/models/npc-${b.display}.glb` : undefined);

// The slot and type line of an item ("Two-Hand, Axe"), from its tooltip
export function itemType(lang: Lang, id: number) {
	const t = tip(lang, `item:${id}`)?.t ?? tip('en', `item:${id}`)?.t ?? '';
	const m = t.match(/<table width="100%"><tr><td>([^<]*)<\/td><th>(?:<span[^>]*>)?([^<]*)/);
	return m ? [m[1], m[2]].filter(Boolean).join(', ') : '';
}
export const QUALITY = ['#9d9d9d', '#ffffff', '#1eff00', '#0070dd', '#a335ee', '#ff8000', '#e6cc80', '#e6cc80'];

// The intro paragraph of a dungeon, from its data: kind and levels, bosses and quests, the best quest
// reward and how many quests need a chain first. Returns text pieces and links for the page to render.
export function intro(lang: Lang, d: { key: string; name: string; minLevel: number; maxLevel: number; isForever: boolean; faction: string; quests: number[] }) {
	const t = INTRO[lang];
	const end = lang === 'zh' || lang === 'tw' ? '。' : '. ';
	const bosses = (addon.Bosses[d.key] ?? []).filter((b) => !b.kind);
	const bossName = (b: { npcID?: number; name: string }) => (b.npcID ? name(lang, `npc:${b.npcID}`, b.name) : b.name);
	const qs = d.quests.filter((id) => addon.Quests[id]);
	// the faction split, only when every quest belongs to one side
	const only = (f: string) => qs.filter((id) => addon.Quests[id].faction === f).length;
	const a = only('Alliance');
	const h = only('Horde');
	let s1 = fmt(t.kind[d.isForever ? 1 : 0], dungeonName(lang, d), `${d.minLevel}-${d.maxLevel}`);
	if (d.faction === 'Alliance') s1 += t.only[0];
	if (d.faction === 'Horde') s1 += t.only[1];
	let s2 = bosses.length ? fmt(t.bosses, bosses.length, bossName(bosses[0]), bossName(bosses.at(-1)!), qs.length) : '';
	if (s2 && a && h && a + h === qs.length) s2 += fmt(t.split, a, h);
	// the best reward: highest quality, then highest item level in its tooltip
	let best: { item: number; quest: number; score: number } | undefined;
	for (const id of qs) {
		const q = addon.Quests[id];
		for (const item of [...(q.choice ?? []), ...(q.rewards ?? [])]) {
			const ilvl = Number((tip('en', `item:${item}`)?.t ?? '').match(/Item Level (\d+)/)?.[1] ?? 0);
			const score = quality(lang, item) * 1000 + ilvl;
			if (!best || score > best.score) best = { item, quest: id, score };
		}
	}
	const chains = qs.filter((id) => Array.isArray(addon.Quests[id].chain) && (addon.Quests[id].chain as number[]).indexOf(id) > 0).length;
	return { lead: s1 + end + (s2 ? s2 + end : ''), best, bestText: t.best, chains: chains ? fmt(t.chains, chains) : '' };
}
