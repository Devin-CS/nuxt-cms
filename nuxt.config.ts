// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@cooperco/nuxt-layer-quasar'],
  modules: ['@nuxt/content'],

  css: ['~/assets/css/quasar.variables.scss'],

  content: {
    experimental: { nativeSqlite: true },
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  // hooks: {
  //   'components:extend': (components) => {
  //     const globals = components.filter(c => ['ContentBtn'].includes(c.pascalName))
  //
  //     globals.forEach(c => c.global = true)
  //   }
  // },

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
