// Small helpers the Atlas pages share: icons, money, quest text and item tooltips from Wowhead, places.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Lang } from './i18n';
import { addon, name, tip, zoneName, itemName, href } from './data';

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
	if (type === 'item') return { name: itemName(lang, id), href: href(lang, { kind: 'item', id: +id }), where: '' };
	const where = p?.inside ? '' : [zoneName(lang, key), p?.x != null && `${p.x}, ${p.y}`].filter(Boolean).join(' · ');
	return { name: type === 'name' ? id : name(lang, key, p?.name), href: undefined, where };
}

export const quality = (lang: Lang, id: number) => tip(lang, `item:${id}`)?.q ?? tip('en', `item:${id}`)?.q ?? 1;
export const itemIcon = (id: number) => tip('en', `item:${id}`)?.i;

// A dungeon's picture: its card art (the Forever ones) or its first map floor
const pub = (f: string) => existsSync(join(process.cwd(), 'public', f));
export const art = (key: string) => {
	const card = `/atlas/art/card_${key}.webp`;
	const map = `/atlas/maps/${addon.Maps[key]?.[0]?.id ?? key}.webp`;
	return pub(card) ? card : pub(map) ? map : '/atlas/art/card_UPCOMING.webp';
};
