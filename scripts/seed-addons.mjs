// One-time seed: turns each addon's README.md / README.es.md (sibling repos in ../) into a guide page.
// Never overwrites: once a page exists, the site (or Keystatic) is its source of truth.
// Usage: node scripts/seed-addons.mjs [path to the folder holding the addon repos, default ..]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('..', import.meta.url));
const repos = process.argv[2] ?? join(root, '..');
const addons = JSON.parse(readFileSync(join(root, 'src/data/addons.json'), 'utf8'));
const LANGS = { en: ['README.md', 'src/content/docs/addons'], es: ['README.es.md', 'src/content/docs/es/addons'] };

// README HTML -> plain Markdown, so Keystatic's editor can open the page without losing anything.
export function toMarkdown(md, repoUrl) {
	let out = md.replace(/\r\n/g, '\n');
	out = out.slice(out.indexOf('\n## ') + 1); // drop banner, language switch and download links
	out = out.replace(/\n*<br\/>\s*\n*<p align="center">[\s\S]*$/, '\n'); // drop footer banner
	// video thumbnail linking to YouTube -> clickable Markdown image
	out = out.replace(/<p align="center">\s*<a href="([^"]+)"><img src="([^"]+)"[^>]*alt="([^"]*)"><\/a><br>\s*<sub>[^<]*<\/sub>\s*<\/p>/g, '[![$3]($2)]($1)');
	out = out.replace(/<img src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*>\s*(?:<br>\s*<sub>([^<]*)<\/sub>)?/g, (_, src, alt, cap) => `\n\n![${cap || alt}](${src})\n\n`);
	out = out.replace(/<\/?(table|tr|td|p)(\s[^>]*)?>/g, '');
	out = out.replace(/<details>\s*<summary><b>([^<]+)<\/b><\/summary>/g, '### $1');
	out = out.replace(/<\/details>/g, '');
	const raw = repoUrl.replace('https://github.com/', 'https://raw.githubusercontent.com/');
	out = out.replace(/(!\[[^\]]*\])\((?!https?:|#|\/)([^)]+)\)/g, `$1(${raw}/main/$2)`); // repo-relative images: the file itself
	out = out.replace(/\]\((?!https?:|#|\/)([^)]+)\)/g, `](${repoUrl}/blob/main/$1)`); // repo-relative links
	out = out.replace(/\n{3,}/g, '\n\n').trim() + '\n';
	return out;
}

const yaml = (s) => JSON.stringify(s); // JSON strings are valid YAML scalars
let written = 0;
for (const [i, a] of addons.entries()) {
	for (const [lang, [file, dir]] of Object.entries(LANGS)) {
		const dest = join(root, dir, `${a.slug}.md`);
		if (existsSync(dest)) continue;
		const src = a.repo && join(repos, a.repo, file);
		const repoUrl = `https://github.com/Pirson-s-Addons/${a.repo}`;
		const body = src && existsSync(src) ? toMarkdown(readFileSync(src, 'utf8'), repoUrl) : `${a[lang]}\n`;
		mkdirSync(join(root, dir), { recursive: true });
		writeFileSync(dest, `---\ntitle: ${yaml(a.name)}\ndescription: ${yaml(a[lang])}\naddon: ${a.id}\nsidebar:\n  order: ${i + 1}\n---\n\n${body}`);
		written++;
	}
}
console.log(`${written} pages written`);

// self-check of the converter on the README shapes it meets
const sample = `<p align="center">banner</p>\n\n## Screenshots\n\n<p align="center">\n<a href="https://yt/v"><img src="https://yt/t.jpg" width="640" alt="How to"></a><br>\n<sub>How to</sub>\n</p>\n\n<table>\n<tr>\n<td align="center" width="50%"><img src="https://x/a.png" alt="A"><br><sub>Bar</sub></td>\n</tr>\n</table>\n\n<p align="center">\n<img src="https://x/g.gif" width="520" alt="Pad"><br>\n<sub>Pad</sub>\n</p>\n\n## Docs\n\n![Pic](.github/p.png)\n\nSee [the file](LICENSE).\n\n<details>\n<summary><b>Public API</b></summary>\n\ncode\n</details>\n\n<br/>\n\n<p align="center"><a href="x"><img src="f.svg"/></a></p>\n`;
const got = toMarkdown(sample, 'https://github.com/o/r');
assert.ok(got.startsWith('## Screenshots'));
assert.ok(got.includes('![Bar](https://x/a.png)'));
assert.ok(got.includes('![Pad](https://x/g.gif)'));
assert.ok(got.includes('[![How to](https://yt/t.jpg)](https://yt/v)'));
assert.ok(got.includes('[the file](https://github.com/o/r/blob/main/LICENSE)'));
assert.ok(got.includes('![Pic](https://raw.githubusercontent.com/o/r/main/.github/p.png)'));
assert.ok(got.includes('### Public API') && !/<[a-z]/.test(got), got);
