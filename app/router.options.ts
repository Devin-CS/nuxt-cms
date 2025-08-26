import type { RouterConfig } from '@nuxt/schema'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const routeProps = (r: RouteLocationNormalizedLoaded) => ({ ...r })

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: () => [
    {
      path: '/',
      component: () => import('~/layouts/DefaultLayout.vue'),
      children: [
        {
          name: 'home',
          path: '',
          props: routeProps,
          component: () => import('~/pages/HomePage.vue')
        },
        {
          name: 'prose',
          path: 'prose',
          props: routeProps,
          component: () => import('~/pages/ProsePage.vue')
        },
        {
          name: 'slug',
          path: ':slug(.*)*',
          props: routeProps,
          component: () => import('~/pages/SlugPage.vue')
        }
      ]
    }

  ]
} satisfies RouterConfig
