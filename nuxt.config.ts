// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@cooperco/nuxt-layer-quasar'],
  modules: ['@nuxt/content'],

  css: ['~/assets/css/quasar.variables.scss'],

  content: {
    experimental: { nativeSqlite: true }
  },

  quasar: {
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
