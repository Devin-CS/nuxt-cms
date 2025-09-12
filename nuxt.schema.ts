import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    parent: group({
      title: 'Disclaimer',
      description: 'UI configuration',
      fields: {
        enabled: field({
          type: 'boolean',
          title: 'Enabled',
          description: 'Primary color of your UI.',
          default: 'false',
          required: ['sky', 'mint', 'rose', 'amber']
        })
      }
    })
  }
})
