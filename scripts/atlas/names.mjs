// Localized names and tooltips for every item, quest, NPC, object and dungeon in src/data/atlas/addon.json,
// from Wowhead Forever's tooltip API, cached in src/data/atlas/wowhead/<lang>.json. Only what is not in
// the cache yet is fetched, so a new addon release asks for its new IDs only.
// Usage: npm run atlas:names            (LANGS=es,de to limit; REFRESH=1 to fetch everything again)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

// Wowhead locale ids; esES and esMX share one Spanish
export const LOCALES = { en: 0, es: 6, de: 3, fr: 2, it: 9, pt: 8, ru: 7, ko: 1, zh: 4, tw: 10 };

import { AREA } from '../../src/lib/atlas/area.mjs';

const DATA = new URL('../../src/data/atlas/', import.meta.url);
const d = JSON.parse(readFileSync(new URL('addon.json', DATA), 'utf8'));

// --- every entity the site shows ---
const ids = { item: new Set(), quest: new Set(), npc: new Set(), object: new Set(), zone: new Set() };
const add = (type, id) => id && ids[type].add(String(id));
const first = (e) => (Array.isArray(e) ? e[0] : e?.['1'] ?? e); // { id, flag = x } comes out as an object
for (const bosses of Object.values(d.Bosses)) {
	for (const b of bosses) {
		add('npc', b.npcID);
		for (const e of b.loot ?? []) add('item', first(e));
	}
}
for (const [id, q] of Object.entries(d.Quests)) {
	add('quest', id);
	for (const k of ['rewards', 'choice']) for (const e of q[k] ?? []) add('item', first(e));
	for (const e of q.need ?? []) add('item', first(e));
}
for (const key of Object.keys(d.Places)) {
	const [type, id] = key.split(':');
	if (type in ids) add(type, id);
}
for (const id of Object.keys(d.ItemPlaces ?? {})) add('item', id);
// a set is { CLASS = { piece1..piece8, name }, pieceQuest = {...} }: only the class tables hold items
for (const set of d.TierSets) {
	for (const [cls, pieces] of Object.entries(set)) {
		if (/^[A-Z]+$/.test(cls)) for (let i = 1; i <= 8; i++) add('item', pieces[i]);
	}
}
for (const dg of d.Dungeons) add('zone', AREA[dg.key]);

// --- fetch ---
const strip = (html) => html.replace(/<!--.*?-->/gs, '').replace(/\s+/g, ' ').trim();
// one tooltip: its JSON, null if Wowhead doesn't have it, undefined if it didn't answer
const tip = async (env, type, id, locale) => {
	for (let i = 0; i < 4; i++) {
		const res = await fetch(`https://nether.wowhead.com/${env}/tooltip/${type}/${id}?locale=${locale}`).catch(() => null);
		if (res?.status === 404) return null;
		if (res?.ok) {
			const j = await res.json();
			return j.error ? null : j;
		}
		await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
	}
	console.warn(`${env} ${type}/${id} locale ${locale}: no answer, retried on the next run`);
};
// "[Name]" is Wowhead's mark for "not translated yet"
const untranslated = (name) => /^\[.*\]$/.test(name);
const get = async (type, id, locale) => {
	const j = await tip('forever', type, id, locale);
	if (!j) return j;
	const z = type === 'npc' || type === 'object' ? { z: j.map?.zone ?? null } : {}; // zone, for "where"
	if (!untranslated(j.name)) return { n: j.name, q: j.quality, i: j.icon, t: strip(j.tooltip ?? ''), ...z };
	// Forever lacks many translations that Wowhead Classic has: only the name comes from there, since
	// Forever changed some stats and qualities; the page shows the English Forever tooltip
	const c = type === 'zone' ? null : await tip('classic', type, id, locale);
	const n = c && !untranslated(c.name) ? c.name : null;
	return { n, q: j.quality, i: j.icon, ...(n && { src: 'classic' }), ...z };
};

const langs = process.env.LANGS ? process.env.LANGS.split(',') : Object.keys(LOCALES);
mkdirSync(new URL('wowhead/', DATA), { recursive: true });
for (const lang of langs) {
	assert.ok(lang in LOCALES, `unknown lang ${lang}`);
	const file = new URL(`wowhead/${lang}.json`, DATA);
	const cache = existsSync(file) && !process.env.REFRESH ? JSON.parse(readFileSync(file, 'utf8')) : {};
	const todo = Object.entries(ids).flatMap(([type, set]) => [...set].map((id) => `${type}:${id}`)).filter(
		// untranslated ones are asked again each run; NPCs and objects cached before zones were kept, once more
		(k) => !(k in cache) || (cache[k] && (!cache[k].n || (/^(npc|object):/.test(k) && !('z' in cache[k])))),
	);
	// keeps only what the addon still uses, so removed IDs drop out of the cache
	const wanted = new Set(Object.entries(ids).flatMap(([type, set]) => [...set].map((id) => `${type}:${id}`)));
	const save = () =>
		writeFileSync(file, JSON.stringify(Object.fromEntries(Object.entries(cache).filter(([k]) => wanted.has(k)).sort())) + '\n');
	let done = 0;
	// 4 at a time: polite to Wowhead, about 1,000 per minute
	const queue = [...todo];
	await Promise.all(
		Array.from({ length: 4 }, async () => {
			for (let key; (key = queue.shift()); ) {
				const [type, id] = key.split(':');
				const v = await get(type, id, LOCALES[lang]);
				if (v !== undefined) cache[key] = v;
				if (++done % 250 === 0) {
					save();
					console.log(`${lang}: ${done}/${todo.length}`);
				}
			}
		}),
	);
	// the zones where the NPCs and objects stand, for their names in this language
	const zones = [...new Set(Object.values(cache).map((v) => v?.z).filter(Boolean))].map((z) => `zone:${z}`).filter((k) => !cache[k]?.n);
	for (const k of zones) {
		wanted.add(k);
		const v = await get('zone', k.slice(5), LOCALES[lang]);
		if (v !== undefined) cache[k] = v;
	}
	save();
	const failed = todo.filter((k) => !(k in cache)).length;
	if (failed) console.warn(`${lang}: ${failed} not answered`);
	const missing = Object.entries(cache).filter(([, v]) => !v?.n).length;
	console.log(`${lang}: ${Object.keys(cache).length} cached (${todo.length} new), ${missing} without a name in this language`);
}
