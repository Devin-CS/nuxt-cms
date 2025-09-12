export default defineAppConfig({
  // Configure Quasar's Vue plugin (with HMR support)
  nuxtQuasar: {
    brand: {
      primary: '#18332F',
      secondary: '#618B7E',
      accent: '#BD4D24',
      positive: '#0093B2'
    }
  },

  // Up to three global disclaimers editable in Nuxt Studio (see nuxt.schema.ts)
  disclaimers: {
    one: { enabled: false, text: '' },
    two: { enabled: false, text: '' },
    three: { enabled: false, text: '' }
  }
})
