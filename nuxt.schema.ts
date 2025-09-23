import { group, field } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    alert: group({
      title: 'Site Alert',
      description:
        'Configure a single, sitewide alert banner. Editors can toggle visibility, choose a style, and set the message.',
      // icon: 'i-ph-warning-circle',
      fields: {
        enabled: field({
          type: 'boolean',
          title: 'Show alert'
        }),
        id: field({
          type: 'string',
          title: 'Alert ID',
          description:
            'A short identifier for this alert (change when you need previously dismissed alerts to reappear).'
        }),
        variant: field({
          type: 'string',
          title: 'Style',
          description: 'Visual style of the alert banner',
          options: [
            { value: 'info', label: 'Info' },
            { value: 'warning', label: 'Warning' },
            { value: 'positive', label: 'Positive' },
            { value: 'negative', label: 'Negative' }
          ]
        }),
        message: field({
          type: 'string',
          title: 'Message',
          description: 'The alert content shown to users'
        }),
        dismissible: field({
          type: 'boolean',
          title: 'Allow dismiss',
          description:
            'If enabled, users can close the alert and it will not reappear for them unless the Alert ID changes.'
        })
      }
    })
  }
})
