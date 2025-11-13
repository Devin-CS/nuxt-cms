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
    }),

    footerLinks: defineCollection({
      type: 'data',
      source: 'footer-links.yaml',
      schema: z.record(
        z.array(
          z.object({
            name: z.string(),
            href: z.string()
          })
        )
      )
    }),

    socialLinks: defineCollection({
      type: 'data',
      source: 'social-links.yaml',
      schema: z.array(
        z.object({
          name: z.string(),
          href: z.string(),
          icon: z.string().optional()
        })
      )
    })
  }
})
