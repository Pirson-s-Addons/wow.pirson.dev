// Downloads every external image in the content into public/images/addons/ as WebP and points the
// Markdown at the local copy. Keystatic's editor only keeps images under its own publicPath: an
// external image is escaped into plain text on the next save.
// A YouTube thumbnail wrapped in a link becomes the local thumbnail plus a text link to the video.
// Usage: npm run images   (safe to re-run: already-local images are left alone)
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const docs = join(root, 'src/content/docs');
const outDir = join(root, 'public/images/addons');
mkdirSync(outDir, { recursive: true });

const files = (dir) =>
	readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(dir, e.name)) : e.name.endsWith('.md') ? [join(dir, e.name)] : []));

const local = new Map(); // url+slug -> public path, shared by the EN and ES pages of one addon
async function localize(url, slug) {
	const key = `${slug} ${url}`;
	if (local.has(key)) return local.get(key);
	// url hash: two images can share a file name (screenshot_1-png.png) under different attachment ids
	const hash = createHash('sha1').update(url).digest('hex').slice(0, 6);
	const name = `${basename(new URL(url).pathname).replace(/\.[a-z]+$/i, '').replace(/[^a-z0-9_-]/gi, '-')}-${hash}.webp`;
	// Keystatic only treats an image as one when it sits at <publicPath>/<entry slug>/<file>
	mkdirSync(join(outDir, slug), { recursive: true });
	const dest = join(outDir, slug, name);
	if (!existsSync(dest)) {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
		await sharp(Buffer.from(await res.arrayBuffer()), { animated: true }).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
	}
	const path = `/images/addons/${slug}/${name}`;
	local.set(key, path);
	return path;
}

const VIDEO = /\[!\[([^\]]*)\]\((https?:\/\/[^)]+)\)\]\((https?:\/\/[^)]+)\)/g;
const IMAGE = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
let changed = 0;
for (const file of files(docs)) {
	const slug = basename(file, '.md');
	let md = readFileSync(file, 'utf8');
	const before = md;
	for (const [all, alt, img, href] of [...md.matchAll(VIDEO)]) {
		md = md.replace(all, `![${alt}](${await localize(img, slug)})\n\n[▶ ${alt}](${href})`);
	}
	for (const [all, alt, img] of [...md.matchAll(IMAGE)]) {
		md = md.replace(all, `![${alt}](${await localize(img, slug)})`);
	}
	if (md !== before) {
		writeFileSync(file, md);
		changed++;
	}
}
console.log(`${changed} pages updated, ${local.size} images local`);
