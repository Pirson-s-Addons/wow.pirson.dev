// UI words of the custom components (Starlight translates its own UI).
const words = {
	downloads: ['downloads', 'descargas'],
	download: ['Download on CurseForge', 'Descargar en CurseForge'],
	guide: ['Read the guide', 'Ver la guía'],
	total: ['downloads across all addons', 'descargas entre todos los addons'],
} as const;

export const t = (lang: string | undefined, key: keyof typeof words) => words[key][lang === 'es' ? 1 : 0];

// Link to a page in the reader's language: English lives at the root, Spanish under /es/.
export const href = (lang: string | undefined, path: string) => (lang === 'es' ? `/es/${path}/` : `/${path}/`);
