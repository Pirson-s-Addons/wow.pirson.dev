# wow.pirson.dev

Portfolio and guides for every addon of [Pirson's Addons](https://github.com/Pirson-s-Addons), in English and Spanish. Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build), a blog ([starlight-blog](https://github.com/HiDeoo/starlight-blog)) and an admin panel ([Keystatic](https://keystatic.com)). Deployed on Vercel; dark theme only.

## Develop

```sh
npm install
npm run dev        # http://127.0.0.1:4321, admin at /keystatic (edits the files on disk)
npm run build
```

## Content

| What | Where |
| --- | --- |
| Addon guides | `src/content/docs/addons/*.md` (EN), `src/content/docs/es/addons/*.md` (ES) |
| Blog posts | `src/content/docs/blog/*.md`, `src/content/docs/es/blog/*.md` (same file name in both languages) |
| Home, install page | `src/content/docs/index.mdx`, `install.mdx` (+ `es/`), built from components |
| Addon data (downloads, clients, texts, quality colour) | `src/data/addons.json`, refreshed with `npm run sync` from the org profile |
| Images | `public/images/<addons|blog>/<page slug>/` |

- New blog posts start as `draft: true`; untick **Draft** in Keystatic to publish.
- Images must be local (`npm run images` downloads any external one as WebP): Keystatic's editor turns external images into plain text when it saves, and only treats an image as one under `<publicPath>/<entry slug>/`.
- An addon's **cover** (home cards, page header) is its `cover` frontmatter field, else the first image of its English guide (`src/lib/covers.ts`).
- `npm run seed` creates the guide of a new addon from its README (sibling repo folder); it never overwrites an existing page.

## How the pages are built

| Piece | File |
| --- | --- |
| Route tweaks: no Starlight sidebar anywhere; addon guides become full-width pages with a hero (kept out of frontmatter because Keystatic rewrites it) | `src/routeData.ts` |
| Hero dispatcher: home loading-screen hero, addon store-page header, or compact page header | `src/components/Hero.astro` |
| Home: loading-screen hero (in-game zone clips cross-fading, zone name, embers, gilded title) + numbers bar | `HomeHero.astro` |
| Home chapters: 01 action bar, 02 lineup as item tooltips with version tabs, 03 videos (silent preview on hover, YouTube on click) + screenshot marquee, 04 principles and closing band over footage, 05 install; zone music switch | `HomeSections.astro` |
| Home media: zone clips (`bg/`, 1600 px H.264, no audio), video previews, zone music (`music/`, AAC 96k, off until the visitor turns it on), WoW icons, expansion logos (`eras/`, also the lineup filter) | `public/media/` |
| Addon guide header, sticky section nav, screenshot galleries + viewer | `AddonHero.astro` |
| Install page (method tabs, steps, folder finder, troubleshooting) | `InstallGuide.astro` |
| Site navigation rail / drawer | `SideNav.astro` |
| Footer: more-addons rail, site footer, XP reading bar, tilt / count-up / reveal effects | `Footer.astro` |
| Dark only; blog link in the theme picker's slot | `ThemeProvider.astro`, `ThemeSelect.astro` |
| Tokens, fonts (Marcellus + Manrope), shared styles | `src/styles/custom.css` |

Full-bleed sections use `margin-inline: calc(50% - 50vw)` plus `var(--rail-half)` in their padding so their content clears the navigation rail.

## Admin panel in production

`/keystatic` on the live site commits to `main` through the GitHub App `pirson-s-addons-keystatic` (owned by SrPirson). Its redirect URIs must include `https://wow.pirson.dev/api/keystatic/github/oauth/callback`; the `KEYSTATIC_*` variables live in the Vercel project. To create a new app, run `PUBLIC_KEYSTATIC_GITHUB=1 npm run dev` and open `/keystatic/setup` (setup only runs in dev).

Saves from the live panel are commits: run `git pull` before editing locally.
