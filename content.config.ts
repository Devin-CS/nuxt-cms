import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**/*.md',
        prefix: '/'
      }
    })
  }
})
