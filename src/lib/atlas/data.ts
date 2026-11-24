// The Atlas model: the addon's data (src/data/atlas/addon.json) with the names of each language
// (src/data/atlas/wowhead/<lang>.json), and the URL of every page in every language.
// Read with fs at build time: the files are too big to bundle as modules.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LANGS, LANG, T, slug, type Lang, type Section } from './i18n';
import { AREA } from './area.mjs';

const DIR = join(process.cwd(), 'src/data/atlas');
const read = (f: string) => JSON.parse(readFileSync(join(DIR, f), 'utf8'));

type Tip = { n: string | null; q?: number; i?: string; t?: string; z?: number | null; src?: string } | null;
type Loot = [number, number?] | { 1: number; 2?: number; quest?: boolean; probable?: boolean; mobs?: string; all?: boolean; from?: unknown };
export type Boss = { name: string; npcID?: number; level?: number; kind?: string; loot?: Loot[]; faction?: string; optional?: boolean; display?: number };
export type Quest = {
	level?: number; minLevel?: number; faction?: string; classes?: string[]; chain?: number[] | true; after?: number[];
	rewards?: number[]; choice?: number[]; counts?: Record<string, number>; need?: [number, number][]; xp?: number; money?: number;
	starts?: string[]; ends?: string[]; name?: string; event?: string; repeatable?: boolean; unavailable?: boolean; breadcrumb?: boolean;
};
type Place = { name: string; npcID?: number; mapID?: number; x?: number; y?: number; inside?: boolean };
export type Raid = {
	key: string; name: string; size: number; isForever?: boolean; unlock?: string; season?: string; instanceID?: number;
	names?: Record<string, string>; bosses?: Boss[]; lootSource?: string; entrance?: { mapID: number; x: number; y: number };
	attunement?: { item: number; Alliance?: number[]; Horde?: number[] };
};
export type GameEvent = {
	key: string; names: Record<string, string>; quests: number[]; item?: number; hours?: number; monthly?: boolean;
	yearly?: [number, number, number]; dates?: [string, string][];
};
type TierSet = { key: string; pieceQuest?: number[]; quests?: number[]; questNames?: string[] } & Record<string, { name: string; [piece: number]: number }>;
export type Reputation = { id: number; name: string; zone?: string; side?: string; rewards?: number; raid?: string; dungeon?: string; icons?: string[] };
export type Dungeon = {
	key: string; name: string; minLevel: number; maxLevel: number; isForever: boolean; faction: string; quests: number[];
	names?: Record<string, string>; entrance?: { mapID: number; x: number; y: number };
};

export const addon = read('addon.json') as {
	version: string;
	Dungeons: Dungeon[];
	Quests: Record<string, Quest>;
	Bosses: Record<string, Boss[]>;
	Places: Record<string, Place>;
	Maps: Record<string, { id: number | string; pins?: [number, number, number][] }[]>;
	Raids: Raid[];
	EventList: GameEvent[];
	TierSets: TierSet[];
	Reputations: Reputation[];
};
export const texts = read('locales.json') as Record<Lang, Record<string, string>>;
const tips = Object.fromEntries(LANGS.map((l) => [l, read(`wowhead/${l}.json`)])) as Record<Lang, Record<string, Tip>>;

// a text of the addon in this language, English if it lacks it
export const L = (lang: Lang, key: string) => texts[lang][key] ?? texts.en[key] ?? key;
const ADDON_CODE: Record<Lang, string> = { en: 'enUS', es: 'esES', de: 'deDE', fr: 'frFR', it: 'itIT', pt: 'ptBR', ru: 'ruRU', ko: 'koKR', zh: 'zhCN', tw: 'zhTW' };

export const tip = (lang: Lang, key: string) => tips[lang][key] ?? null;
// translated in this language (not the English fallback)
export const has = (lang: Lang, key: string) => !!tips[lang][key]?.n;
export const name = (lang: Lang, key: string, fallback?: string) => tips[lang][key]?.n ?? tips.en[key]?.n ?? fallback ?? key;
export const questName = (lang: Lang, id: number | string) =>
	name(lang, `quest:${id}`, addon.Quests[id]?.name ?? L(lang, 'QUEST_FALLBACK').replace('%d', String(id)));
export const itemName = (lang: Lang, id: number | string) => name(lang, `item:${id}`, `#${id}`);
export const zoneName = (lang: Lang, key: string) => {
	const z = tips.en[key]?.z;
	return z ? name(lang, `zone:${z}`, '') : '';
};

export const dungeonName = (lang: Lang, d: Dungeon) => {
	if (lang === 'en') return d.name;
	const own = d.names?.[ADDON_CODE[lang]];
	if (own) return own;
	const zone = name(lang, `zone:${(AREA as Record<string, number>)[d.key]}`, d.name);
	const wing = T[lang].wings[d.key];
	return wing ? `${zone} (${wing})` : zone;
};

export const raidName = (lang: Lang, r: Raid) =>
	lang === 'en' ? r.name : (r.names?.[ADDON_CODE[lang]] ?? name(lang, `zone:${(AREA as Record<string, number>)[r.key]}`, r.name));
export const eventName = (lang: Lang, e: GameEvent) => e.names[ADDON_CODE[lang]] ?? e.names.enUS ?? e.key;
export const eventQuests = (e: GameEvent) => e.quests.filter((id) => addon.Quests[id]);

// --- chains: one page per last step (the longest list that ends there; faction or class branches that
// end in the same quest share it), named after that step ---
export const chains = (() => {
	const byEnd = new Map<number, number[]>();
	for (const q of Object.values(addon.Quests)) {
		const c = q.chain;
		if (Array.isArray(c) && c.length > 1 && c.length > (byEnd.get(c.at(-1)!)?.length ?? 0)) byEnd.set(c.at(-1)!, c);
	}
	// a chain that ends in a step of a longer one is part of it
	const all = [...byEnd.values()];
	return all.filter((c) => !all.some((o) => o.length > c.length && o.includes(c.at(-1)!)));
})();
// the quest's own chain list when it has one, else the longest chain page it is in
export const chainOf = (id: number) => {
	const own = addon.Quests[id]?.chain;
	const page = chains.filter((c) => c.includes(id)).sort((a, b) => b.length - a.length)[0];
	return Array.isArray(own) && own.length > 1 ? own : page;
};
// the chain page that holds these steps
export const chainPage = (steps: number[]) => chains.find((c) => c.includes(steps.at(-1)!)) ?? steps;

// --- where each quest and item appears ---
export const dungeonOfQuest = new Map<number, Dungeon[]>();
for (const d of addon.Dungeons) for (const id of d.quests) dungeonOfQuest.set(id, [...(dungeonOfQuest.get(id) ?? []), d]);

// where an item drops: a boss of a dungeon or of a raid
export type Source = { dungeon?: Dungeon; raid?: Raid; boss: Boss; chance?: number; quest?: boolean };
export const itemDrops = new Map<number, Source[]>();
export const itemRewards = new Map<number, number[]>();
export const itemNeeded = new Map<number, number[]>();
export const lootId = (e: Loot) => (Array.isArray(e) ? e[0] : e[1]);
export const lootChance = (e: Loot) => (Array.isArray(e) ? e[1] : e[2]);
const push = <K, V>(m: Map<K, V[]>, k: K, v: V) => m.set(k, [...(m.get(k) ?? []), v]);
for (const d of addon.Dungeons) {
	for (const boss of addon.Bosses[d.key] ?? []) {
		for (const e of boss.loot ?? []) push(itemDrops, lootId(e), { dungeon: d, boss, chance: lootChance(e), quest: !Array.isArray(e) && !!e.quest });
	}
}
for (const raid of addon.Raids) {
	for (const boss of raid.bosses ?? []) {
		for (const e of boss.loot ?? []) push(itemDrops, lootId(e), { raid, boss, chance: lootChance(e) });
	}
}
for (const [id, q] of Object.entries(addon.Quests)) {
	for (const i of [...(q.rewards ?? []), ...(q.choice ?? [])]) push(itemRewards, i, +id);
	for (const [i] of q.need ?? []) push(itemNeeded, i, +id);
}

// a boss's name; trash and recipe lists are not bosses (no page of their own)
export const bossName = (lang: Lang, b: Boss) => (b.kind === 'trash' ? L(lang, 'TRASH') : b.kind === 'recipes' ? L(lang, 'RECIPES') : b.npcID ? name(lang, `npc:${b.npcID}`, b.name) : b.name);
export const isBoss = (b: Boss) => !b.kind || b.kind === 'rare';
export const bossPages = () => [
	...addon.Dungeons.flatMap((d) => (addon.Bosses[d.key] ?? []).filter(isBoss).map((b) => ({ kind: 'boss', d, b }) as const)),
	...addon.Raids.flatMap((r) => (r.bosses ?? []).filter(isBoss).map((b) => ({ kind: 'boss', r, b }) as const)),
];

// --- pages: kind, id and URL in each language ---
export type Page =
	| { kind: 'home' }
	| { kind: 'dungeon'; d: Dungeon }
	| { kind: 'quest'; id: number }
	| { kind: 'item'; id: number }
	| { kind: 'chain'; steps: number[] }
	| { kind: 'raid'; r: Raid }
	| { kind: 'boss'; d?: Dungeon; r?: Raid; b: Boss }
	| { kind: 'event'; e: GameEvent }
	| { kind: 'tiers' }
	| { kind: 'reputations' }
	| { kind: 'search' }
	| { kind: 'raids' }
	| { kind: 'events' }
	| { kind: 'tutorials' };

const base = (lang: Lang, section?: Section) => '/' + [lang === 'en' ? '' : lang, section && LANG[lang].sections[section]].filter(Boolean).join('/');
const at = (lang: Lang, section: Section, s: string) => `${base(lang, section)}/${s}/`;

// the URL of a page in a language, or null when it has none there (an item without a translation lives
// only in English)
export function url(lang: Lang, p: Page): string | null {
	switch (p.kind) {
		case 'home':
			return base(lang, 'dungeons') + '/';
		case 'dungeon':
			return at(lang, 'dungeons', slug(dungeonName(lang, p.d)));
		case 'quest':
			return at(lang, 'quests', `${p.id}-${slug(questName(lang, p.id))}`);
		case 'item':
			if (lang !== 'en' && !has(lang, `item:${p.id}`)) return null;
			return at(lang, 'items', `${p.id}-${slug(itemName(lang, p.id))}`);
		case 'chain':
			return at(lang, 'chains', `${p.steps.at(-1)}-${slug(questName(lang, p.steps.at(-1)!))}`);
		case 'raid':
			return at(lang, 'raids', slug(raidName(lang, p.r)));
		case 'boss': {
			// under its dungeon or raid: /es/mazmorras/las-minas-de-la-muerte/rhahkzor/
			const home = url(lang, p.d ? { kind: 'dungeon', d: p.d } : { kind: 'raid', r: p.r! })!;
			return `${home}${slug(bossName(lang, p.b))}/`;
		}
		case 'event':
			return at(lang, 'events', slug(eventName(lang, p.e)));
		case 'tiers':
		case 'reputations':
		case 'search':
		case 'raids':
		case 'events':
		case 'tutorials':
			return base(lang, p.kind) + '/';
	}
}
// link to a page: the language's own, or the English one
export const href = (lang: Lang, p: Page) => url(lang, p) ?? url('en', p)!;

// tier set pieces: class -> [8 item ids], per set
export const tierPieces = (set: TierSet) =>
	Object.entries(set)
		.filter(([k]) => /^[A-Z]+$/.test(k))
		.map(([cls, p]) => ({ cls, name: (p as { name: string }).name, items: Array.from({ length: 8 }, (_, i) => (p as Record<number, number>)[i + 1]).filter(Boolean) }));
const tierItems = addon.TierSets.flatMap((s) => tierPieces(s).flatMap((c) => c.items));
export const allItems = [...new Set([...itemDrops.keys(), ...itemRewards.keys(), ...itemNeeded.keys(), ...tierItems])].filter((id) => tips.en[`item:${id}`]);

export function pages(): { lang: Lang; path: string; page: Page }[] {
	const list: Page[] = [
		{ kind: 'home' },
		...addon.Dungeons.map((d) => ({ kind: 'dungeon', d }) as const),
		...Object.keys(addon.Quests).map((id) => ({ kind: 'quest', id: +id }) as const),
		...allItems.map((id) => ({ kind: 'item', id }) as const),
		...chains.map((steps) => ({ kind: 'chain', steps }) as const),
		...addon.Raids.map((r) => ({ kind: 'raid', r }) as const),
		...bossPages(),
		...addon.EventList.filter((e) => eventQuests(e).length).map((e) => ({ kind: 'event', e }) as const),
		{ kind: 'tiers' },
		{ kind: 'reputations' },
		{ kind: 'search' },
		{ kind: 'raids' },
		{ kind: 'events' },
		{ kind: 'tutorials' },
	];
	const out = [];
	for (const page of list) {
		for (const lang of LANGS) {
			const u = url(lang, page);
			if (u) out.push({ lang, path: u.slice(1, -1), page });
		}
	}
	return out;
}
