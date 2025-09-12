<template>
<q-header
  elevated
  height-hint="62"
  class="bg-primary text-white">
  <q-toolbar>
    <q-toolbar-title>
      <img
        alt="Logo"
        src="@/assets/logo.svg"
        :width="$q.screen.xs ? 246 : 300">
    </q-toolbar-title>

    <menu-btn
      v-for="{ title, path, children = [] } in menu"
      :key="title"
      :to="path"
      class="gt-sm"
      :label="title"
      :card-data="children"/>

    <q-btn
      flat
      round
      icon="o_person"/>
    <q-btn
      class="gt-xs"
      flat
      round
      icon="o_search"/>
    <q-btn
      class="gt-xs"
      label="Find a Donor"
      color="positive"/>

    <q-btn
      class="lt-md"
      dense
      flat
      round
      icon="o_menu"
      @click="$emit('toggleDrawer')"/>
  </q-toolbar>

  <q-toolbar
    inset
    class="bg-accent"
    color="accent"
    style="min-height: 12px; height: 12px"/>
</q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const { menu = [] } = defineProps<{ menu?: Menu[] }>()
console.log('menu: ', menu)
defineEmits<{ toggleDrawer: [] }>()
const $q = useQuasar()
</script>
