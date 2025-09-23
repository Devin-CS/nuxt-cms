export default defineAppConfig({
  // Configure Quasar's Vue plugin (with HMR support)
  nuxtQuasar: {
    brand: {
      // Default brand keys (kept as-is)
      // primary: '#18332F', // pine
      // secondary: '#618B7E', // juniper
      // accent: '#BD4D24',
      // positive: '#0093B2', // aqua

      // Extended brand palette from design spec
      pine: '#18332F',
      elm: '#5D7975',
      eucalyptus: '#9DB0AC',
      willow: '#BCC9C5',
      birch: '#E9EBE8',
      juniper: '#618B7E',
      aqua: '#0093B2',
      violet: '#772583',
      poppy: '#DC4405',
      shadow: '#373A36',
      fern: '#9AB9AD',
      sky: '#8BD3E6',
      aster: '#A77BCA',
      saffron: '#E87222',
      shell: '#FCF6EF'
    }
  },
  alert: {
    enabled: true,
    id: 'default',
    variant: 'info',
    message: 'We will be closed in observance of Labor Day. ',
    dismissible: false
  }
})