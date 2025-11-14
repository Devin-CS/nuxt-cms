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
    ,

    // New: Studio-demo collections using fixed object schemas for visual editing in Nuxt Studio
    // These do NOT replace the existing collections; they are additional alongside them.
    footerLinksStudio: defineCollection({
      type: 'data',
      source: 'footer-links-studio.yaml',
      schema: z.object({
        categories: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            order: z.number().optional()
          })
        ),
        links: z.array(
          z.object({
            // Either reference a page route or provide a direct href
            page: z.string().optional(),
            href: z.string().optional(),
            title: z.string().optional(),
            categoryId: z.string(),
            order: z.number().optional(),
            enabled: z.boolean().optional(),
            target: z.string().optional(),
            rel: z.string().optional()
          })
        )
      })
    }),

    socialLinksStudio: defineCollection({
      type: 'data',
      source: 'social-links-studio.yaml',
      schema: z.object({
        links: z.array(
          z.object({
            name: z.string(),
            href: z.string(),
            icon: z.string().optional(),
            order: z.number().optional()
          })
        )
      })
    })
  }
})
