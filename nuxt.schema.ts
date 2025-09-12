import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    parent: group({
      title: 'Disclaimer',
      description: 'UI configuration',
      icon: 'i-ph-palette-fill',
      fields: {
        enabled: field({
          type: 'boolean',
          title: 'Enabled',
          description: 'Primary color of your UI.',
          icon: 'i-ph-palette',
          default: 'false',
          required: ['sky', 'mint', 'rose', 'amber']
        })
      }
    })
  }
})
