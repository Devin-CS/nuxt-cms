<template>
<q-icon
  :size="qSize"
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

defineOptions({ name: 'CIcon' })

const props = withDefaults(defineProps<{
  /** Icon size; number is px, string accepts any CSS size (e.g., '20px', '1.5rem') */
  size?: number | string
  /** Text color using custom brand palette */
  color?:
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
}>(), {
  size: 24,
  color: 'pine'
})

const toCssSize = (v?: number | string) => {
  if (v === undefined || v === null) return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const qSize = computed(() => toCssSize(props.size) || '24px')
</script>
