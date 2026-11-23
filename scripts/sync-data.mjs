// Refreshes src/data/addons.json from the org profile (Pirson-s-Addons/.github), which keeps the addon
// catalog (texts in EN/ES) and the weekly CurseForge numbers, then today's downloads from cfwidget.
// Usage: npm run sync (also daily from .github/workflows/sync.yml)
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
		cf: live.cf ?? null, // CurseForge project id, for the live counts in /api/downloads
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

// today's downloads; cfwidget may answer "in queue" for a project it has not cached yet, so retry, and keep
// the weekly figure if it still has none
const live = async (id) => {
	for (let i = 0; i < 3; i++) {
		const res = await fetch(`https://api.cfwidget.com/${id}`).catch(() => null);
		const total = res?.ok ? (await res.json())?.downloads?.total : undefined;
		if (typeof total === 'number') return total;
		await new Promise((r) => setTimeout(r, 5000));
	}
};
await Promise.all(addons.map(async (a) => a.cf && (a.downloads = (await live(a.cf)) ?? a.downloads)));

assert.equal(new Set(addons.map((a) => a.slug)).size, addons.length, 'duplicate slugs');
addons.sort((a, b) => b.downloads - a.downloads);
writeFileSync(new URL('../src/data/addons.json', import.meta.url), JSON.stringify(addons, null, '\t') + '\n');
console.log(`${addons.length} addons, ${addons.reduce((s, a) => s + a.downloads, 0)} downloads`);
