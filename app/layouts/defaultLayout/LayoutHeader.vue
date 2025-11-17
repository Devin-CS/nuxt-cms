<template>
<q-header
  elevated
  height-hint="106"
  class="bg-pine text-shell">
  <q-toolbar style="height: 106px">
    <!-- Always shrink the title so the logo keeps its natural width on small screens -->
    <q-toolbar-title shrink>
      <!-- Use NuxtLink to avoid extra padding/margins from buttons on mobile -->
      <NuxtLink
        to="/"
        aria-label="Go to home"
        title="Home"
        class="inline-block"
        style="line-height:0">
        <img
          alt="Logo"
          src="@/assets/logo.svg"
          :width="$q.screen.xs ? 235 : 300"
          style="display:block">
      </NuxtLink>
    </q-toolbar-title>

    <!-- Nav row: links take remaining space, controls sit at far right -->
    <nav
      class="col row items-center no-wrap q-gutter-x-xs"
      style="min-width: 0">
      <!-- Primary nav links (visible gt-sm). These do NOT flex-grow; the spacer handles push -->
      <menu-btn
        v-for="{ title, path, children = [] } in menu"
        :key="title"
        :to="path"
        class="gt-sm self-center"
        :label="title"
        :card-data="children"/>

      <!-- Spacer claims the remaining space, pushing controls to the right -->
      <q-space/>

      <!-- Right controls -->
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
        label="Find a Donor"
        color="aqua"/>

      <q-btn
        class="lt-md"
        size="md"
        padding="sm"
        dense
        flat
        round
        icon="o_menu"
        @click="$emit('toggleDrawer')"/>
    </nav>
  </q-toolbar>

  <q-toolbar
    inset
    class="bg-poppy inset-shadow"
    style="min-height: 12px; height: 12px"/>
</q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const { menu = [] } = defineProps<{ menu?: Menu[] }>()
defineEmits<{ toggleDrawer: [] }>()
const $q = useQuasar()
</script>
