<template>
<section
  :class="[bgClass, textClass]"
  :style="cssVars"
  class="c-section-grid q-py-lg">
  <slot v-if="$slots.default"/>
</section>
</template>

<script lang="ts" setup>
/**
 * CSectionGrid
 *
 * A responsive section layout that arranges slotted content in a grid of
 * cards or other items. The grid automatically adjusts the number of columns
 * based on available width, with configurable minimum and maximum item widths.
 */
const {
  background = 'transparent',
  text,
  gap = 'md',
  min = 200,
  max
} = defineProps<{
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
  /** Gap between items (token only: xs | sm | md | lg | xl). Default md (16px) */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Minimum width for each item (px number or any CSS size). Default 200px */
  min?: number | string
  /** Maximum width for each item (px number or any CSS size). Omit for no max (items take as much space as possible) */
  max?: number | string
}>()

const cssVars = computed(() => {
  const vars: Record<string, string> = {
    '--c-section-grid-gap': toGapSize(gap),
    '--c-section-grid-min': toCssSize(min) ?? '200px'
  }
  const maxSize = toCssSize(max)
  if (maxSize) {
    vars['--c-section-grid-track-max'] = maxSize
    vars['--c-section-grid-item-max'] = maxSize
  }
  else {
    // When no max is provided, allow tracks to grow to fill available space
    vars['--c-section-grid-track-max'] = '1fr'
    // and leave item max unset so it falls back to 'none'
  }
  return vars
})

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
</script>

<style lang="scss" scoped>
.c-section-grid {
  width: 100%;
  display: grid;
  /* Auto-fit columns that never shrink below min width; items wrap naturally */
  grid-template-columns: repeat(auto-fit, minmax(var(--c-section-grid-min, 240px), var(--c-section-grid-track-max, 1fr)));
  gap: var(--c-section-grid-gap, 16px);
  justify-content: center;

  /* Center items in their grid cell when a max width is set */
  justify-items: center;
}

/* Apply max width to all direct children (slotted) without extra wrappers */
.c-section-grid :deep(> *) {
  width: 100%;
  max-width: var(--c-section-grid-item-max, none);
}

/* XS phones: make items full width regardless of max */
@media (max-width: 599.98px) {
  .c-section-grid {
    grid-template-columns: 1fr;
  }
  .c-section-grid :deep(> *) {
    max-width: none;
  }
}
</style>
