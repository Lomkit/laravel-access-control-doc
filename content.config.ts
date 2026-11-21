import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'
import { docsFolder } from './shared/utils/docs'

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    // The pages of `content/<docsFolder>/**`, served at the root.
    docs: defineCollection(asSitemapCollection({
      type: 'page',
      source: {
        include: `${docsFolder}/**`,
        prefix: '/'
      },
      schema: z.object({
        updatedAt: z.string().optional(),
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional()
      })
    }))
  }
})
