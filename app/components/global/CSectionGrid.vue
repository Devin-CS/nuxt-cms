<template>
<section
  :class="[bgClass, textClass, directionClass]"
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
 * (or rows, when direction is set to 'row') based on available width, with
 * configurable minimum and maximum item widths (or heights for row layout).
 */
const {
  background = 'transparent',
  text,
  gap = 'md',
  min = 200,
  max,
  direction = 'column'
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
  /** Layout direction: 'column' (default) arranges items in columns, 'row' arranges items in rows */
  direction?: 'column' | 'row'
}>()

const cssVars = computed(() => {
  const vars: Record<string, string> = {
    '--c-section-grid-gap': toGapSize(gap),
    '--c-section-grid-min': toCssSize(min) ?? '200px',
    '--c-section-grid-direction': direction
  }
  const maxSize = toCssSize(max)
  // Always use 1fr for track maximum to allow flexible space distribution
  vars['--c-section-grid-track-max'] = '1fr'
  // Apply max constraint to items only, not to grid tracks
  if (maxSize) {
    vars['--c-section-grid-item-max'] = maxSize
  }
  return vars
})

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
const directionClass = computed(() => direction === 'row' ? 'c-section-grid--row' : undefined)
</script>

<style lang="scss" scoped>
.c-section-grid {
  width: 100%;
  display: grid;
  /* Auto-fit columns that never shrink below min width; items wrap naturally */
  grid-template-columns: repeat(auto-fit, minmax(var(--c-section-grid-min, 200px), var(--c-section-grid-track-max, 1fr)));
  gap: var(--c-section-grid-gap, 16px);
  justify-content: center;

  /* Center items in their grid cell when a max width is set */
  justify-items: center;
}

/* Row layout: arrange items in rows instead of columns */
.c-section-grid--row {
  grid-template-columns: unset;
  grid-template-rows: repeat(auto-fit, minmax(var(--c-section-grid-min, 200px), var(--c-section-grid-track-max, 1fr)));
  align-content: center;
  align-items: center;
}

/* Apply max width to all direct children (slotted) without extra wrappers */
.c-section-grid :deep(> *) {
  width: 100%;
  max-width: var(--c-section-grid-item-max, none);
}

/* For row layout, apply max height instead of max width */
.c-section-grid--row :deep(> *) {
  height: 100%;
  max-height: var(--c-section-grid-item-max, none);
  max-width: none;
}

/* XS phones: make items full width regardless of max */
@media (max-width: 599.98px) {
  .c-section-grid {
    grid-template-columns: 1fr;
  }
  .c-section-grid :deep(> *) {
    max-width: none;
  }

  /* For row layout on small screens, use single row */
  .c-section-grid--row {
    grid-template-columns: unset;
    grid-template-rows: auto;
  }
  .c-section-grid--row :deep(> *) {
    max-height: none;
  }
}
</style>
