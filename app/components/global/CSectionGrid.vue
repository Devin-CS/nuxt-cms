<template>
<section
  class="c-section q-py-lg"
  :class="[bgClass, textClass]"
  :style="cssVars">
  <slot v-if="$slots.default"/>
</section>
</template>

<script setup lang="ts">
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
  min = 240,
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
  /** Minimum width for each item (px number or any CSS size). Default 240px */
  min?: number | string
  /** Maximum width for each item (px number or any CSS size). Omit for no max (items take as much space as possible) */
  max?: number | string
}>()

const cssVars = computed(() => {
  const vars: Record<string, string> = {
    '--c-section-gap': toGapSize(gap),
    '--c-section-min': toCssSize(min) ?? '240px'
  }
  const maxSize = toCssSize(max)
  if (maxSize) {
    vars['--c-section-track-max'] = maxSize
    vars['--c-section-item-max'] = maxSize
  }
  else {
    // When no max is provided, allow tracks to grow to fill available space
    vars['--c-section-track-max'] = '1fr'
    // and leave item max unset so it falls back to 'none'
  }
  return vars
})

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
</script>

<style scoped lang="scss">
.c-section {
  width: 100%;
  display: grid;
  /* Auto-fit columns that never shrink below min width; items wrap naturally */
  grid-template-columns: repeat(auto-fit, minmax(var(--c-section-min, 240px), var(--c-section-track-max, 1fr)));
  gap: var(--c-section-gap, 16px);
  justify-content: center;

  /* Left/right padding only (content gutters). Keep a minimum on phones */
  padding-left: 16px;
  padding-right: 16px;

  /* Center items in their grid cell when a max width is set */
  justify-items: center;
}

/* Responsive gutters aligned with typical Quasar breakpoints */
@media (min-width: 600px) { /* sm */
  .c-section { padding-left: 24px; padding-right: 24px; }
}
@media (min-width: 1024px) { /* md */
  .c-section { padding-left: 32px; padding-right: 32px; }
}
@media (min-width: 1440px) { /* lg */
  .c-section { padding-left: 48px; padding-right: 48px; }
}
@media (min-width: 1920px) { /* xl */
  .c-section { padding-left: 64px; padding-right: 64px; }
}

/* Apply max width to all direct children (slotted) without extra wrappers */
.c-section :deep(> *) {
  width: 100%;
  max-width: var(--c-section-item-max, none);
}

/* XS phones: make items full width regardless of max */
@media (max-width: 599.98px) {
  .c-section {
    grid-template-columns: 1fr;
  }
  .c-section :deep(> *) {
    max-width: none;
  }
}
</style>
