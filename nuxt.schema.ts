export default defineNuxtSchema({
  appConfig: {
    disclaimers: {
      $schema: {
        title: 'Disclaimers',
        description: 'Zero or more disclaimers that can be toggled on/off.',
        type: 'array',
        items: {
          type: 'object',
          title: 'Disclaimer',
          properties: {
            enabled: { type: 'boolean', title: 'Enabled', default: true },
            text: { type: 'string', title: 'Message' }
          },
          required: ['text']
        },
        default: []
      },
      default: []
    }
  }
})
