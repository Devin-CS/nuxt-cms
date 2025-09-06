import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    navigation: defineCollection({
      type: 'page',
      source: 'navigation/**/*.md'
    })
    // content: defineCollection({
    //   type: 'page',
    //   source: '**/*.md'
    // })
  }
})
