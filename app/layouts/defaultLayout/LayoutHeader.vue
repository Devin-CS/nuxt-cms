<template>
<q-header
  elevated
  height-hint="62"
  class="bg-pine text-shell">
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
      class="gt-sm self-center"
      :label="title"
      :card-data="children"/>

    <q-btn
      flat
      round
      size="md"
      padding="sm"
      icon="o_person"/>
    <q-btn
      class="gt-xs"
      flat
      round
      size="md"
      padding="sm"
      icon="o_search"/>
    <q-btn
      class="gt-xs"
      size="md"
      label="Find a Donor"
      color="aqua"/>

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
    class="bg-poppy"
    style="min-height: 12px; height: 12px"/>
</q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const { menu = [] } = defineProps<{ menu?: Menu[] }>()
defineEmits<{ toggleDrawer: [] }>()
const $q = useQuasar()
</script>
