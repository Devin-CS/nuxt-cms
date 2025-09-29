<template>
<section
  class="c-tabs-section q-py-lg"
  :class="[bgClass, textClass]">
  <q-tabs
    v-model="current"
    class="q-mb-md"
    :active-color="color"
    :indicator-color="color"
    align="left"
    narrow-indicator
    outside-arrows
    mobile-arrows>
    <q-tab
      v-for="(label, i) in tabs"
      :key="i"
      :name="i"
      :label="label"/>
  </q-tabs>

  <q-tab-panels
    v-model="current"
    animated>
    <q-tab-panel
      v-for="(label, i) in tabs"
      :key="i"
      :name="i"
      class="q-pa-none">
      <slot :name="`tab-${i + 1}`"/>
    </q-tab-panel>
  </q-tab-panels>
</section>
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

const props = withDefaults(defineProps<{
  /** Array of tab labels to render; one slot per index: tab-0, tab-1, ... */
  tabs: string[]
  /** Background color using custom brand palette or transparent */
  background?:
    | 'transparent'
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Text color to apply to content; cascades to children */
  text?:
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Quasar color used for active tab/indicator */
  color?:
    | 'pine' | 'elm' | 'eucalyptus' | 'willow' | 'birch'
    | 'juniper' | 'aqua' | 'violet' | 'poppy' | 'shadow'
    | 'fern' | 'sky' | 'aster' | 'saffron' | 'shell'
  /** v-model for the active tab index. Default: 0 */
  modelValue?: number
}>(), {
  background: 'transparent',
  color: 'juniper',
  modelValue: 0
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const current = computed({
  get: () => props.modelValue ?? 0,
  set: (val: number) => emit('update:modelValue', val)
})

const bgClass = computed(() => (!props.background || props.background === 'transparent' ? 'transparent' : `bg-${props.background}`))
const textClass = computed(() => props.text ? `text-${props.text}` : undefined)
</script>

<style scoped>
</style>
