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
    <slot name="decorator"/>
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
const { height = 520, gap = 'lg' } = defineProps<{
  /** Overall min-height for the collage area */
  height?: number | string
  /** Spacing between the two images (design token only) */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()

const cssVars = computed(() => ({
  '--c-media-duo-height': toCssSize(height) ?? '520px',
  '--c-media-duo-gap': toGapSize(gap)
}))
</script>

<style scoped lang="scss">
.c-media-duo {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr; /* always two equal columns */
  align-items: stretch; /* provides vertical space for start/end alignment */
  gap: var(--c-media-duo-gap, 16px);
  min-height: var(--c-media-duo-height, 520px);
  width: 100%;
}

/* Remove default figure margins to avoid unexpected gaps */
.c-media-duo__first,
.c-media-duo__second { margin: 0; }

/* Vertical alignment as requested */
.c-media-duo__first { align-self: start; }
.c-media-duo__second { align-self: end; }

/* Centered decorative element spanning both columns */
.c-media-duo__decorator {
  grid-column: 1 / -1;
  grid-row: 1; /* overlays the grid implicitly */
  display: grid;
  place-items: center;
  pointer-events: none; /* decorative only */
  z-index: 2;
}
</style>
