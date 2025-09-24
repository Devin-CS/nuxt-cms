<template>
<q-icon
  :size="iconSize"
  :class="textClass">
  <!-- Default slot: place inline SVG here so Studio editors can paste SVGs -->
  <slot/>
</q-icon>
</template>

<script setup lang="ts">
/**
 * CIcon
 *
 * Lightweight wrapper around Quasar's QIcon that:
 * - Accepts brand color tokens via `color` prop (applied as text-<color> class)
 * - Accepts `size` as number (px) or any CSS size string
 * - Scales any slotted inline SVG to match the icon size
 *
 * Optimized for Nuxt Studio editors.
 */

defineOptions({ name: 'CIcon' })

const props = withDefaults(defineProps<{
  /** Icon color using custom brand palette */
  color?:
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Icon size: number = px, Quasar tokens ('xs'|'sm'|'md'|'lg'|'xl'), or any CSS size string (e.g., '24px', '1.5rem') */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
}>(), {
  color: 'pine',
  size: '24px'
})

const iconSize = computed(() => {
  const s = props.size
  return typeof s === 'number' ? `${s}px` : s
})

const textClass = computed(() => props.color ? `text-${props.color}` : undefined)
</script>
