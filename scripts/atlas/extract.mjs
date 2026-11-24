// Runs the Dungeon Quest Atlas locale and data files (Locales/*.lua, Data/*.lua, in TOC order) in a Lua VM
// and writes what they build in the addon's namespace to src/data/atlas/addon.json, and the addon's own
// texts in the site's languages to src/data/atlas/locales.json. The addon repo is read from DQA_DIR
// (default: ../DungeonQuestAtlas next to this repo).
// Usage: npm run atlas:extract
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { LuaFactory } from 'wasmoon';

const DIR = resolve(process.env.DQA_DIR ?? new URL('../../../DungeonQuestAtlas', import.meta.url).pathname);
const toc = readFileSync(`${DIR}/DungeonQuestAtlas.toc`, 'utf8');
const files = toc.split(/\r?\n/).filter((l) => /^(Locales|Data)[\\/].+\.lua$/.test(l.trim())).map((l) => l.trim().replace(/\\/g, '/'));
const version = toc.match(/^## Version:\s*(.+)$/m)?.[1].trim();
assert.ok(files.length && version, 'no Data files or version in the TOC');

const lua = await new LuaFactory().createEngine();
try {
	lua.global.set('GetLocale', () => 'enUS');
	// Every data file starts with `local _, ns = ...`; run each as a chunk with the same ns table.
	await lua.doString('__ns = {}');
	for (const f of files) {
		const src = readFileSync(`${DIR}/${f}`, 'utf8');
		await lua.doString(`assert(load(${JSON.stringify(src)}, "@${f}"))("DungeonQuestAtlas", __ns)`);
	}
	// Lua tables -> JSON in Lua itself: wasmoon's own conversion can't tell arrays from maps or keep integer keys.
	await lua.doString(`
		local function enc(v)
			local t = type(v)
			if t == "table" then
				local n, isArr = #v, true
				for k in pairs(v) do if type(k) ~= "number" or k < 1 or k > n or k % 1 ~= 0 then isArr = false break end end
				local out = {}
				if isArr then
					for i = 1, n do out[i] = enc(v[i]) end
					return "[" .. table.concat(out, ",") .. "]"
				end
				for k, x in pairs(v) do
					if type(x) ~= "function" then out[#out + 1] = string.format("%q", tostring(k)) .. ":" .. enc(x) end
				end
				return "{" .. table.concat(out, ",") .. "}"
			elseif t == "string" then
				return (string.format("%q", v):gsub("\\\\\\n", "\\\\n"))
			elseif t == "number" then
				return (v ~= v or v == math.huge or v == -math.huge) and "null" or (v % 1 == 0 and string.format("%d", v) or tostring(v))
			elseif t == "boolean" then
				return tostring(v)
			end
			return "null"
		end
		__json = enc(__ns)
	`);
	const ns = JSON.parse(lua.global.get('__json'));
	for (const k of ['Dungeons', 'Quests', 'Bosses', 'Places', 'Maps', 'Raids', 'EventList', 'Reputations', 'TierSets']) {
		assert.ok(ns[k], `ns.${k} missing`);
	}
	// the site's languages (src/lib/atlas/i18n.ts) by addon locale; English is the base the others fill
	const { L, LOCALES, ...data } = ns;
	const codes = { en: 'enUS', es: 'esES', de: 'deDE', fr: 'frFR', it: 'itIT', pt: 'ptBR', ru: 'ruRU', ko: 'koKR', zh: 'zhCN', tw: 'zhTW' };
	const texts = Object.fromEntries(Object.entries(codes).map(([lang, code]) => [lang, lang === 'en' ? L : LOCALES[code]]));
	for (const [lang, t] of Object.entries(texts)) assert.ok(t && Object.keys(t).length > 100, `no addon texts for ${lang}`);
	mkdirSync(new URL('../../src/data/atlas/', import.meta.url), { recursive: true });
	writeFileSync(new URL('../../src/data/atlas/addon.json', import.meta.url), JSON.stringify({ version, ...data }) + '\n');
	writeFileSync(new URL('../../src/data/atlas/locales.json', import.meta.url), JSON.stringify(texts) + '\n');
	console.log(`DQA ${version}: ${ns.Dungeons.length} dungeons, ${Object.keys(ns.Quests).length} quests, ${Object.keys(ns.Bosses).length} boss lists`);
} finally {
	lua.global.close();
}
