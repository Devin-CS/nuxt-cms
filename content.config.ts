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
      // Nuxt Studio form generation requires explicit object fields (not dynamic record keys).
      // Use an explicit shape so Studio can render nested forms:
      // {
      //   sections: Array<{
      //     title: string
      //     links: Array<{ name: string; href: string }>
      //   }>
      // }
      schema: z.object({
        sections: z.array(
          z.object({
            title: z.string(),
            links: z.array(
              z.object({
                name: z.string(),
                href: z.string()
              })
            )
          })
        )
      })
    }),

    socialLinks: defineCollection({
      type: 'data',
      source: 'social-links.yaml',
      // Wrap the array in a root `items` key for Studio compatibility
      schema: z.object({
        items: z.array(
          z.object({
            name: z.string(),
            href: z.string(),
            icon: z.string().editor({ input: 'media' })
          })
        )
      })
    })

  }
})
