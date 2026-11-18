import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) =>
				blogSchema(context).extend({
					// Addon pages: the catalog id (src/data/addons.json) that PageTitle uses for logo, clients and downloads.
					addon: z.string().optional(),
					// Addon pages: image for the header and the home cards (default: the first image of the guide).
					cover: z.string().optional(),
				}),
		}),
	}),
};
