export default defineNuxtSchema({
  appConfig: {
    alert: {
      $schema: {
        title: 'Site Alert',
        description: 'Configure a single, sitewide alert banner. Editors can toggle visibility, choose a style, and set the message.',
        type: 'object',
        properties: {
          enabled: {
            type: 'boolean',
            title: 'Show alert'
          },
          id: {
            type: 'string',
            title: 'Alert ID',
            description: 'A short identifier for this alert (change when you need previously dismissed alerts to reappear).'
          },
          variant: {
            'type': 'string',
            'title': 'Style',
            'description': 'Visual style of the alert banner',
            'enum': ['info', 'warning', 'positive', 'negative'],
            'x-display': 'select'
          },
          message: {
            'type': 'string',
            'title': 'Message',
            'description': 'The alert content shown to users',
            'x-display': 'textarea'
          },
          dismissible: {
            type: 'boolean',
            title: 'Allow dismiss',
            description: 'If enabled, users can close the alert and it will not reappear for them unless the Alert ID changes.'
          }
        }
      },
      // Defaults
      enabled: false,
      id: '',
      variant: 'info',
      message: '',
      dismissible: true
    }
  }
})
