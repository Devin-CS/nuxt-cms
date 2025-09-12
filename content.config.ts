import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**/*.md',
        prefix: '/'
      },
      schema: z.object({
        disclaimers: z.boolean(),
        header: z.string()
      })
    }),

    disclaimers: defineCollection({
      schema: z.object({
        meta: z.object({
          title: z.string(),
          description: z.string(),
          enabled: z.boolean()
        })
      }),
      type: 'data',
      source: 'disclaimers/*.md'
    })
  }
})
