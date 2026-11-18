// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
	site: 'https://wow.pirson.dev',
	// Static pages; only the Keystatic admin (/keystatic, /api/keystatic) runs on the server.
	adapter: vercel(),
	integrations: [
		starlight({
			title: "Pirson's Addons",
			description: 'Guides for WoW addons by Pirson: WoW Forever, MoP Classic and more.',
			logo: { src: './src/assets/logo.webp', replacesTitle: false },
			favicon: '/favicon.png',
			head: [
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://wow.pirson.dev/og.png' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
			],
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				es: { label: 'Español', lang: 'es' },
			},
			// Starlight has no CurseForge icon; CurseForge links live in the page content instead.
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Pirson-s-Addons' }],
			editLink: { baseUrl: 'https://github.com/Pirson-s-Addons/wow.pirson.dev/edit/main/' },
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			components: { PageTitle: './src/components/PageTitle.astro' },
			sidebar: [
				{
					label: 'Start here',
					translations: { es: 'Empieza aquí' },
					items: [{ slug: 'install' }],
				},
				{
					label: 'Addons',
					items: [{ autogenerate: { directory: 'addons' } }],
				},
			],
			plugins: [
				starlightBlog({
					title: { en: 'Blog', es: 'Blog' },
					authors: {
						pirson: { name: 'Pirson', url: 'https://github.com/Pirson-s-Addons' },
					},
				}),
			],
		}),
		react(),
		keystatic(),
	],
});
