<template>
<q-icon
  :size="sizeValue"
  :color="color">
  <slot mdc-unwrap="p"/>
</q-icon>
</template>

<script setup lang="ts">
/**
 * CIcon
 *
 * Wrapper around Quasar's QIcon to standardize sizing and color using the
 * project's brand palette. Accepts any QIcon props via attrs (e.g., name, left, right).
 */

const {
  size = 24,
  color = 'pine'
} = defineProps<{
  /** Icon size; number is px, string accepts any CSS size (e.g., '20px', '1.5rem') */
  size?: number | string
  /** Text color using custom brand palette */
  color?:
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
}>()

const sizeValue = computed(() => toCssSize(size) || '24px')
</script>
