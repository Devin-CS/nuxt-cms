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
        header: z.string()
      })
    }),

    footer: defineCollection({
      type: 'data',
      source: {
        include: 'pages/footer/**/*.md',
        prefix: '/'
      },
      schema: z.object({
        footer: z.string()
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
