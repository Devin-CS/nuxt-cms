<template>
<q-header
  elevated
  class="bg-primary text-white">
  <q-toolbar>
    <q-toolbar-title>
      <img
        alt="Logo"
        src="@/assets/logo.svg"
        width="300">
    </q-toolbar-title>

    <menu-btn
      v-for="{ title, children = [] } in menu"
      :key="title"
      class="gt-sm"
      :label="title"
      :card-data="children"/>

    <q-btn
      flat
      round
      icon="person"/>
    <q-btn
      flat
      round
      icon="search"/>
    <q-btn
      label="Find a Donor"
      color="secondary"/>

    <q-btn
      class="lt-md"
      dense
      flat
      round
      icon="menu"
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
defineProps<{ menu: Menu[] }>()
defineEmits<{ toggleDrawer: [] }>()
</script>
