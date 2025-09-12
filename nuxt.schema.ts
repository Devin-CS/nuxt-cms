export default defineNuxtSchema({
  appConfig: {
    disclaimers: {
      $schema: {
        title: 'Disclaimers',
        description: 'Up to three disclaimers that can be toggled on/off.',
        type: 'object',
        properties: {
          one: {
            type: 'object',
            title: 'Disclaimer 1',
            properties: {
              enabled: { type: 'boolean', title: 'Enabled', default: false },
              text: { type: 'string', title: 'Message' }
            }
          },
          two: {
            type: 'object',
            title: 'Disclaimer 2',
            properties: {
              enabled: { type: 'boolean', title: 'Enabled', default: false },
              text: { type: 'string', title: 'Message' }
            }
          },
          three: {
            type: 'object',
            title: 'Disclaimer 3',
            properties: {
              enabled: { type: 'boolean', title: 'Enabled', default: false },
              text: { type: 'string', title: 'Message' }
            }
          }
        }
      },
      default: {
        one: { enabled: false, text: '' },
        two: { enabled: false, text: '' },
        three: { enabled: false, text: '' }
      }
    }
  }
})
