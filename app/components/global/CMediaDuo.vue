<template>
<article
  class="c-media-duo"
  :style="cssVars">
  <figure
    v-if="$slots.first"
    class="c-media-duo__first q-ma-none">
    <slot
      name="first"
      mdc-unwrap="p"/>
  </figure>
  <figure
    v-if="$slots.second"
    class="c-media-duo__second q-ma-none">
    <slot
      name="second"
      mdc-unwrap="p"/>
  </figure>
  <div
    v-if="$slots.decorator"
    class="c-media-duo__decorator">
    <slot
      name="decorator"
      mdc-unwrap="p"/>
  </div>
</article>
</template>

<script setup lang="ts">
/**
 * CMediaDuo
 *
 * Two side-by-side media slots with vertical alignment rules and a centered
 * decorative overlay. Intended to be used inside the media slot of
 * CMediaContentSplit. Optimized for Nuxt Studio: editors drop Markdown images
 * into the named slots and QImg handles sizing.
 */

const { height, gap = 'none', offset = 'xs' } = defineProps<{
  /** Optional minimum height for the collage area. If omitted, the duo simply fills its parent height. */
  height?: number | string
  /** Spacing between the two images (design token only). Use 'none' for no gap. */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Vertical stagger amount. Accepts tokens (none/xs/sm/md/lg/xl) or a CSS length/percentage.
   *  Token map → none=0%, xs=25%, sm=33.3333%, md=50%, lg=66.6667%, xl=100%. */
  offset?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number
}>()

const cssVars = computed((): Record<string, string> => {
  const vars: Record<string, string> = {}
  // Gap token handling without using `any`, and avoiding invalid union comparisons
  vars['--c-media-duo-gap'] = gap === 'none' ? '0' : toGapSize(gap as 'xs' | 'sm' | 'md' | 'lg' | 'xl')
  const minSize: string | undefined = toCssSize(height)
  if (minSize !== undefined) vars['--c-media-duo-min'] = minSize
  const off: string = toOffsetSize(offset)
  vars['--c-media-duo-offset'] = off
  // compute half-offset and padding block based on unit type (use shared util)
  const pct = isPercent(off)
  vars['--c-media-duo-half-offset'] = `calc(${off} / 2)`
  vars['--c-media-duo-pad-block'] = pct ? `calc(${off} / 4)` : `calc(${off} / 2)`
  return vars
})

const toOffsetSize = (value: string | number | undefined): string => {
  if (value == null) return '50%'
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase()
    // Token map: none=0%, xs=25%, sm=33.3333%, md=50%, lg=66.6667%, xl=100%
    const tokenMap = {
      none: '0%',
      xs: '25%',
      sm: '33.3333%',
      md: '50%',
      lg: '66.6667%',
      xl: '100%'
    } as const
    // Safely resolve token first; fall back to CSS size parsing, then default
    const tokenVal = (tokenMap as Record<string, string>)[v]
    if (tokenVal) return tokenVal
    const css = toCssSize(v)
    return css ?? '50%'
  }
  // numeric → px by toCssSize
  return toCssSize(value) ?? '50%'
}
</script>

<style scoped lang="scss">
.c-media-duo {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center; /* center images; stagger applied via transforms */
  gap: var(--c-media-duo-gap, 0);
  /* If a height prop is provided, it maps to --c-media-duo-min and wins */
  min-height: var(--c-media-duo-min, auto);
  /* Reserve space so transformed figures don’t overflow the container.
     We split the total offset evenly on top and bottom. When the offset is a %, this
     padding scales with the column width because each image is 50% of the duo. */
  padding-block: var(--c-media-duo-pad-block, 7.5%);
  width: 100%;
}

/* Stagger: translate up/down by half the offset so total separation equals `offset` */
.c-media-duo__first { transform: translateY(calc(0px - var(--c-media-duo-half-offset, 7.5%))); }
.c-media-duo__second { transform: translateY(var(--c-media-duo-half-offset, 7.5%)); }

/* Markdown rasters from ProseImg render as q-img → make them square and fill column */
.c-media-duo :deep(.q-img) {
  aspect-ratio: 1 / 1;
  width: 100%;
  display: block;
}

/* Centered decorative element above both images */
.c-media-duo__decorator {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
  z-index: 3;
}
</style>
