<template>
<q-tabs
  v-model="selectedTab"
  active-bg-color="aqua"
  active-color="shell"
  align="justify"
  no-caps>
  <q-tab
    v-for="(label, i) in tabs"
    :key="i"
    :name="i"
    :label="label"/>
</q-tabs>

<q-tab-panels
  v-model="selectedTab"
  class="transparent">
  <q-tab-panel
    v-for="(_, i) in tabs"
    :key="i"
    :name="i">
    <slot :name="`tab-${i + 1}`"/>
  </q-tab-panel>
</q-tab-panels>
</template>

<script setup lang="ts">
/**
 * CTabsSection
 *
 * A tabbed section built with Quasar QTabs/QTabPanels.
 * Use the `tabs` prop to declare tab labels, and provide per-tab content
 * via named slots: tab-0, tab-1, ... matching indices in the tabs array.
 *
 * Optimized for Nuxt Studio editors: declare tabs array in props.
 */

const { tabs } = defineProps<{
  /** Array of tab labels to render; one slot per index: tab-0, tab-1, ... */
  tabs: string[]
}>()

const selectedTab = ref(0)
</script>

<style scoped>
</style>
