// Refreshes src/data/addons.json from the org profile (Pirson-s-Addons/.github), which already
// keeps the addon catalog (texts in EN/ES) and the CurseForge numbers up to date every week.
// Usage: npm run sync
import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const RAW = 'https://raw.githubusercontent.com/Pirson-s-Addons/.github/main/profile/assets/';
const get = async (f) => {
	const res = await fetch(RAW + f);
	assert.ok(res.ok, `${f}: HTTP ${res.status}`);
	return res.json();
};

const [catalog, data] = await Promise.all([get('catalog.json'), get('data.json')]);
const byUrl = Object.fromEntries(Object.entries(data.addons).map(([cf, a]) => [a.url, { cf: Number(cf), ...a }]));

const addons = catalog.map((a) => {
	const live = byUrl[a.url] ?? {};
	const slug = a.url.split('/').pop();
	assert.ok(slug, `no slug for ${a.name}`);
	return {
		id: a.abbr,
		slug,
		name: a.name,
		repo: a.repo,
		url: a.url,
		color: a.color,
		cat: a.cat,
		one: a.one,
		en: a.en,
		es: a.es,
		clients: a.clients,
		downloads: live.downloads ?? 0,
		version: live.version ?? null,
	};
});

assert.equal(new Set(addons.map((a) => a.slug)).size, addons.length, 'duplicate slugs');
addons.sort((a, b) => b.downloads - a.downloads);
writeFileSync(new URL('../src/data/addons.json', import.meta.url), JSON.stringify(addons, null, '\t') + '\n');
console.log(`${addons.length} addons, ${addons.reduce((s, a) => s + a.downloads, 0)} downloads`);
