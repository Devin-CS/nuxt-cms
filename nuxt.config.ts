// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@cooperco/nuxt-layer-quasar'],
  modules: ['@nuxt/content'],

  components: [
    { path: 'app/components/content' },
    { path: 'app/components/global', global: true }
  ],

  css: ['~/assets/css/quasar.variables.scss'],

  content: {
    experimental: { nativeSqlite: true },
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  // hooks: {
  //   'components:extend': (components) => {
  //     const globals = components.filter(c => ['ArrowBtn'].includes(c.pascalName))
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
