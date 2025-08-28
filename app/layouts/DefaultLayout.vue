<template>
<q-layout view="hHh lpR fFf">
  <layout-header
    :mega-menu="megaMenu"
    @toggle-drawer="toggleDrawer"/>

  <layout-drawer
    :opened="drawerOpen"
    :mega-menu="megaMenu"
    @update="opened => drawerOpen = opened"/>

  <q-page-container>
    <router-view/>
  </q-page-container>

  <layout-footer/>
</q-layout>
</template>

<script setup lang="ts">
import LayoutDrawer from '~/layouts/defaultLayout/LayoutDrawer.vue'
import LayoutHeader from '~/layouts/defaultLayout/LayoutHeader.vue'
import LayoutFooter from '~/layouts/defaultLayout/LayoutFooter.vue'

const drawerOpen = ref(false)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const megaMenu: MegaMenu = [
  {
    label: 'Getting Started',
    path: '/getting-started',
    children: [
      {
        label: 'Sperm banking 101',
        path: '/getting-started/sperm-banking-101',
        description: 'Sperm banking basics, from its history to how it\'s used.\n'
      },
      {
        label: 'Medical and genetic considerations',
        path: '/getting-started/medical-genetic-considerations',
        description: 'Explore donor-screening information, genetics, and essential clinical insights.'
      },
      {
        label: 'Account onboarding and subscriptions',
        path: '/getting-started/account-onboarding-subscriptions',
        description: 'Set up your account, explore subscription options, and dive into donor details.'
      }
    ]
  },
  {
    label: 'Services',
    path: '/services',
    children: []
  },
  {
    label: 'Pricing',
    path: '/pricing',
    children: []
  },
  {
    label: 'About',
    path: '/about',
    children: []
  },
  {
    label: 'Learn',
    path: '/learn',
    children: []
  }
]
</script>
