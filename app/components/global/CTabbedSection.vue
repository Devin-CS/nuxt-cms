<template>
<q-tabs v-model="selectedTab">
  <q-tab
    v-for="(label, i) in tabs"
    :key="i"
    :name="i"
    :label="label"/>
</q-tabs>

<q-separator/>

<q-tab-panels v-model="selectedTab" class="transparent">
  <q-tab-panel
    v-for="(_, i) in tabs"
    :key="i"
    :name="i">
    <slot
      v-if="$slots[`tab-${i + 1}`]"
      :name="`tab-${i + 1}`"
      mdc-unwrap="p"/>
  </q-tab-panel>
</q-tab-panels>
</template>

<script setup lang="ts">
/**
 * CTabbedSection
 *
 * A tabbed section built with Quasar QTabs/QTabPanels.
 * Use the `tabs` prop to declare tab labels, and provide per-tab content
 * via named slots: tab-1, tab-2, ... matching indices + 1 in the tabs array.
 */
const { tabs } = defineProps<{ tabs: string[] }>()
const selectedTab = ref(0)
</script>
