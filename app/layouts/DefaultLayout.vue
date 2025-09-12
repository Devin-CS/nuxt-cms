<template>
<q-layout view="hHh lpR fFf">
  <layout-header
    :menu
    @toggle-drawer="toggleDrawer"/>

  <layout-drawer
    :opened="drawerOpen"
    :menu
    @update="opened => drawerOpen = opened"/>

  <q-page-container>
    <router-view/>
  </q-page-container>

<!--  <layout-footer/> -->
</q-layout>
</template>

<script setup lang="ts">
import LayoutDrawer from '~/layouts/defaultLayout/LayoutDrawer.vue'
import LayoutHeader from '~/layouts/defaultLayout/LayoutHeader.vue'
// import LayoutFooter from '~/layouts/defaultLayout/LayoutFooter.vue'

const drawerOpen = ref(false)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const { data: menu } = await useAsyncData<Menu[]>('navigation', () => {
  return queryCollectionNavigation('pages', ['description', 'header'])
})
</script>

<style lang="scss">
h1.text-h1 {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.015em;
}
</style>
