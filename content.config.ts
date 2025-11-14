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
      // YAML shape is an array of single-key objects, each key mapping to an array of link objects
      // Example:
      // - About:
      //   - { name: 'FAQS', href: '/learn/frequently-asked-questions' }
      // - Community/Resources:
      //   - { name: 'Events', href: '/account/settings' }
      schema: z.array(
        z.record(
          z.array(
            z.object({
              name: z.string(),
              href: z.string()
            })
          )
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
          icon: z.string()
        })
      )
    })

  }
})
