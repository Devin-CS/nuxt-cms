<template>
<article
  class="c-media-duo"
  :style="cssVars">
  <figure
    v-if="$slots.first"
    class="c-media-duo__first">
    <slot
      name="first"
      mdc-unwrap="p"/>
  </figure>
  <figure
    v-if="$slots.second"
    class="c-media-duo__second">
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
const { height, gap = 'none' } = defineProps<{
  /** Optional minimum height for the collage area. If omitted, the duo simply fills its parent height. */
  height?: number | string
  /** Spacing between the two images (design token only). Use 'none' for no gap. */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()

type GapToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const cssVars = computed(() => {
  const vars: Record<string, string> = {}
  vars['--c-media-duo-gap'] = gap === 'none' ? '0' : toGapSize(gap as GapToken)
  const min = toCssSize(height)
  if (min) vars['--c-media-duo-min'] = min
  return vars
})
</script>

<style scoped lang="scss">
.c-media-duo {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr; /* always two equal columns */
  grid-template-rows: 1fr; /* make the row fill the container height so overlay centers correctly */
  align-items: stretch; /* provides vertical space for start/end alignment */
  gap: var(--c-media-duo-gap, 0);
  height: 100%;
  min-height: var(--c-media-duo-min, 0);
  width: 100%;
}

/* Remove default figure margins to avoid unexpected gaps */
.c-media-duo__first,
.c-media-duo__second { margin: 0; }

/* Vertical alignment as requested */
.c-media-duo__first { align-self: start; }
.c-media-duo__second { align-self: end; }

/* Centered decorative element that sits above both images */
.c-media-duo__decorator {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none; /* decorative only */
  z-index: 3;
}
</style>
