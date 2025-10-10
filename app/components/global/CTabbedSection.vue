<template>
<q-select
  v-if="$q.screen.lt.md"
  v-model="selectedTab"
  bg-color="aqua"
  filled
  hide-dropdown-icon
  popup-content-class="bg-aqua"
  :options="tabs">
  <template #selected-item="{ opt }">
    <span class="ellipses text-shell text-h4">{{ opt }}</span>
  </template>
  <template #append>
    <q-icon
      name="o_keyboard_arrow_down"
      class="text-shell"/>
  </template>
  <template #option="{ itemProps, selected, label }">
    <q-item
      v-bind="itemProps"
      :class="{ 'bg-shadow': selected }">
      <q-item-section>
        <q-item-label class="text-shell text-h4">
          {{ label }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </template>
</q-select>
<q-tabs
  v-else
  v-model="selectedTab">
  <q-tab
    v-for="(label, i) in tabs"
    :key="i"
    :label="label"
    :name="label"/>
</q-tabs>

<q-separator v-if="$q.screen.gt.sm"/>

<q-tab-panels
  v-model="selectedTab"
  class="transparent">
  <q-tab-panel
    v-for="(label, i) in tabs"
    :key="i"
    :name="label"
    class="q-px-none">
    <slot
      v-if="$slots[`tab-${i + 1}`]"
      :name="`tab-${i + 1}`"
      mdc-unwrap="p"/>
  </q-tab-panel>
</q-tab-panels>
</template>

<script lang="ts" setup>
/**
 * CTabbedSection
 *
 * A tabbed section built with Quasar QTabs/QTabPanels.
 * Use the `tabs` prop to declare tab labels, and provide per-tab content
 * via named slots: tab-1, tab-2, ... matching indices + 1 in the tabs array.
 *
 * On small screens, a dropdown (QSelect) is shown instead of tab buttons.
 */
const { tabs } = defineProps<{ tabs: string[] }>()
const initialTab = tabs.length > 0 ? tabs[0] : null
console.log('tabs: ', tabs)
const selectedTab = ref(initialTab)
</script>
