// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@cooperco/nuxt-layer-quasar'],
  modules: ['@nuxt/content'],

  css: ['~/assets/css/quasar.variables.scss'],

  content: {
    experimental: { nativeSqlite: true }
  },

  hooks: {
    'components:extend': (components) => {
      const globals = components.filter(c => [
        'QBtn', 'QCard'
      ].includes(c.pascalName))
      globals.forEach(c => c.global = true)
    }
  },

  quasar: {
    iconSet: 'material-icons-outlined',
    sassVariables: true,
    components: {
      defaults: {
        QBtn: {
          noWrap: true
        }
      }
    }
  }

})
