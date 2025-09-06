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

    <mega-menu-btn
      v-for="menu in megaMenu"
      :key="menu.label"
      class="gt-sm"
      :label="menu.label"
      :card-data="menu.children"/>

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
defineProps<{ megaMenu: MegaMenu }>()
defineEmits<{ toggleDrawer: [] }>()
</script>
