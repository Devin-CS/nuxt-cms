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
        // Hint Nuxt Studio to show nicer labels for array items
        // Categories → use `title` as the item label
        categories: z
          .array(
            z
              .object({
                id: z.string(),
                title: z.string(),
                order: z.number().optional()
              })
              // Studio hint: item label for each object
              .meta({ studio: { itemLabel: 'title' } })
          )
          // Studio hint: default label field within this array
          .meta({ studio: { itemLabel: 'title' } }),

        // Links → prefer `title`; editors may leave it blank and rely on page/href
        links: z
          .array(
            z
              .object({
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
              .meta({ studio: { itemLabel: 'title' } })
          )
          .meta({ studio: { itemLabel: 'title' } })
      })
    }),

    socialLinksStudio: defineCollection({
      type: 'data',
      source: 'social-links-studio.yaml',
      schema: z.object({
        links: z
          .array(
            z
              .object({
                name: z.string(),
                href: z.string(),
                icon: z.string().optional(),
                order: z.number().optional()
              })
              .meta({ studio: { itemLabel: 'name' } })
          )
          .meta({ studio: { itemLabel: 'name' } })
      })
    })
  }
})
