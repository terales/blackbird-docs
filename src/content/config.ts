import { defineCollection, z} from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

import { locales } from '~/../i18n.config.mjs';

export const collections = {
	docs: defineCollection({ schema: docsSchema({
		extend: z.object({
			locale: z.enum(['', ...Object.keys(locales)]),
		  }),
	}) }),
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};
