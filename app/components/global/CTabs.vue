<template>
<div class="c-tabs">
  <q-tabs
    v-model="active"
    :align="align"
    class="text-juniper"
    indicator-color="juniper"
    active-color="juniper"
    :inline-label="true"
    :narrow-indicator="true"
    :dense="dense">
    <q-tab
      v-for="(label, i) in names"
      :key="`tab-${i}`"
      :name="i"
      :label="label"
      no-caps/>
  </q-tabs>

  <q-separator/>

  <q-tab-panels
    v-model="active"
    animated
    class="q-mt-md">
    <q-tab-panel
      v-for="(label, i) in names"
      :key="`panel-${i}`"
      :name="i"
      class="q-pa-none">
      <!--
        Provide two slot targets per panel for editor convenience:
        - By index:  <template #panel-0> ... </template>
        - By slug:   <template #panel-intro> ... </template>
        The slug is generated from the tab label.
      -->
      <slot :name="`panel-${i}`"/>
      <slot :name="`panel-${slugs[i]}`"/>
    </q-tab-panel>
  </q-tab-panels>
</div>
</template>

<script setup lang="ts">
/**
 * CTabs
 *
 * A thin wrapper around Quasar's QTabs and QTabPanels for use by Nuxt Studio
 * content editors. Pass an array of tab names via the `names` prop; the
 * component will render corresponding tabs and panels. Each panel exposes a
 * named slot so editors can place arbitrary content per tab.
 *
 * Slots per panel:
 *  - "panel-<index>" (e.g., panel-0)
 *  - "panel-<slug>" where slug is generated from the tab label (e.g., panel-get-started)
 *
 * Example (Markdown/Nuxt Content):
 *  ::CTabs {"names": ["Intro", "Details"]}
 *  :::panel-intro
 *  Intro content here
 *  :::
 *  :::panel-1
 *  Details content here
 *  :::
 *  ::
 */

const props = withDefaults(defineProps<{
  /** Ordered list of tab labels; one panel is created per label */
  names: string[]
  /** Align tabs within the tab bar */
  align?: 'left' | 'center' | 'right'
  /** Compact tab header */
  dense?: boolean
}>(), {
  align: 'left',
  dense: false
})

// Active tab is tracked by numeric index so labels can repeat safely
const active = ref<number>(0)

// Generate stable slugs from labels for named slots (panel-<slug>)
const slugs = computed(() => props.names.map(n => slugify(n)))

function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumerics
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/-+/g, '-') // collapse dashes
}
</script>

<style scoped>
.c-tabs {
  width: 100%;
}
</style>
