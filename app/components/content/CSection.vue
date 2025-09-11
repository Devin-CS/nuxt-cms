<template>
<section
  class="c-section q-py-lg"
  :class="bgClass"
  :style="cssVars">
  <slot/>
</section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** Background color using Quasar brand palette or transparent */
  background?: 'transparent' | 'primary' | 'secondary' | 'accent' | 'positive' | 'negative' | 'info' | 'warning'
  /** Gap between items (px number or any CSS size). Default 16px */
  gap?: number | string
  /** Minimum width for each item (px number or any CSS size). Default 240px */
  minItemWidth?: number | string
  /** Maximum width for each item (px number or any CSS size). Omit for no max (items take as much space as possible) */
  maxItemWidth?: number | string
}>(), {
  background: 'transparent',
  gap: 16,
  minItemWidth: 240
})

const toCssSize = (v?: number | string) => {
  if (v === undefined || v === null) return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const GAP_TOKEN_MAP: Record<string, string> = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '48px'
}

const toGapSize = (g?: number | string) => {
  if (g === undefined || g === null) return '16px'
  if (typeof g === 'number') return `${g}px`
  const key = String(g).trim().toLowerCase()
  const mapped = GAP_TOKEN_MAP[key]
  if (mapped) return mapped
  // if plain number-like string, treat as px
  if (/^\d+(\.\d+)?$/.test(key)) return `${key}px`
  return key
}

const cssVars = computed(() => {
  const vars: Record<string, string> = {
    '--c-section-gap': toGapSize(props.gap),
    '--c-section-min': toCssSize(props.minItemWidth) ?? '240px'
  }
  const max = toCssSize(props.maxItemWidth)
  if (max) {
    vars['--c-section-track-max'] = max
    vars['--c-section-item-max'] = max
  }
  else {
    // When no max is provided, allow tracks to grow to fill available space
    vars['--c-section-track-max'] = '1fr'
    // and leave item max unset so it falls back to 'none'
  }
  return vars
})

const bgClass = computed(() => props.background === 'transparent' ? 'bg-transparent' : `bg-${props.background}`)
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

/* XS phones: make items full width regardless of maxItemWidth */
@media (max-width: 599.98px) {
  .c-section {
    grid-template-columns: 1fr;
  }
  .c-section :deep(> *) {
    max-width: none;
  }
}
</style>
