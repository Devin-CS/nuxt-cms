// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@cooperco/nuxt-layer-quasar'],
  modules: ['@nuxt/content'],

  css: [
    '~/assets/css/quasar.variables.scss',
    '~/assets/css/app.scss'
  ],

  content: {
    experimental: { nativeSqlite: true },
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  quasar: {
    iconSet: 'material-icons-outlined',
    sassVariables: true,
    components: {
      defaults: {
        QBtn: {
          noWrap: true,
          noCaps: true,
          size: 'lg',
          rounded: true,
          padding: 'sm xl'
        },
        QCard: {
          flat: true
        },
        QSeparator: {
          color: 'pine'
        },
        QTabs: {
          activeBgColor: 'aqua',
          activeColor: 'shell',
          align: 'justify',
          noCaps: true
        }
      }
    }
  }

})
