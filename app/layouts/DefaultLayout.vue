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
    <template
      v-for="{ meta } in disclaimers"
      :key="meta.title">
      <disclaimer-msg
        v-if="meta.enabled"
        :description="meta.description"/>
    </template>

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

const { data: menu } = await useAsyncData<Menu[]>('navigation', () => {
  return queryCollectionNavigation('pages', ['description'])
})

const { data: disclaimers } = await useAsyncData('disclaimers', () => {
  return queryCollection('disclaimers').all()
})

console.log('disclaimers: ', disclaimers.value)
</script>
