<template>
<q-btn
  :label="label"
  :flat="flat"
  :color="color"
  :icon-right="iconRight"/>
</template>

<script setup lang="ts">
// Note: Inline unions are used so Nuxt Studio renders select lists for this prop.
const {
  label = 'Button',
  flat = false,
  color = 'juniper',
  arrow = false
} = defineProps<{
  /** Button label shown on the button. Default: "Button" */
  label?: string
  /** Flat style (no background). Default: false */
  flat?: boolean
  /** Button color limited to custom brand palette. Default: 'juniper' */
  color?:
    | 'pine' | 'elm' | 'eucalyptus' | 'willow' | 'birch'
    | 'juniper' | 'aqua' | 'violet' | 'poppy' | 'shadow'
    | 'fern' | 'sky' | 'aster' | 'saffron' | 'shell'
  /** Toggle to show a right arrow icon. Default: false */
  arrow?: boolean
}>()

const iconRight = computed(() => arrow ? 'o_arrow_right_alt' : undefined)
</script>
