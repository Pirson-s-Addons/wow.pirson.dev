# wow.pirson.dev

Guides for every addon of [Pirson's Addons](https://github.com/Pirson-s-Addons), in English and Spanish. Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build), a blog ([starlight-blog](https://github.com/HiDeoo/starlight-blog)) and an admin panel ([Keystatic](https://keystatic.com)).

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
| Addon data (downloads, clients, texts) | `src/data/addons.json`, refreshed with `npm run sync` from the org profile |
| Images | `public/images/<addons|blog>/<page slug>/` |

- New blog posts start as `draft: true`; untick **Draft** in Keystatic to publish.
- Images must be local (`npm run images` downloads any external one): Keystatic's editor turns external images into plain text when it saves.
- `npm run seed` creates the guide of a new addon from its README (sibling repo folder); it never overwrites an existing page.

## Admin panel in production

`/keystatic` on the live site commits to this repo through a GitHub App. First time: open `https://wow.pirson.dev/keystatic`, follow the setup to create the app, then add the `KEYSTATIC_*` variables it gives you to the Vercel project and redeploy.
