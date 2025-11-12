<template>
<article
  class="c-media-testimonial"
  :style="cssVars">
  <section class="content">
    <slot
      name="quote"
      mdc-unwrap="p"/>

    <footer
      v-if="$slots.attribution || author"
      class="attribution text-subtitle1 q-mt-md">
      <slot name="attribution">
        {{ author }}
      </slot>
    </footer>
  </section>

  <figure
    v-if="$slots.media"
    class="media no-margin">
    <slot
      name="media"
      mdc-unwrap="p"/>
  </figure>
</article>
</template>

<script lang="ts" setup>
/**
 * CMediaTestimonial
 *
 * Testimonial layout where large text overlaps adjacent media on desktop and
 * stacks cleanly on mobile. Content is always first (left on desktop / top on mobile)
 * to simplify authoring and code.
 */
const {
  /** Preset token for overlap amount, expressed as percent of the media column */
  overlap = 'lg',
  /** Optional author/attribution if not using the attribution slot. */
  author
} = defineProps<{
  overlap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  author?: string
}>()

// Map editor-friendly presets to percentage of the media column width
const overlapPctMap: Record<'none' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  none: 0,
  sm: 0.25,
  md: 0.5,
  lg: 0.75,
  xl: 1
}

const cssVars = computed(() => ({
  '--cmt-overlap': String(overlapPctMap[overlap] ?? 0)
}))
</script>

<style lang="scss" scoped>
.c-media-testimonial {
  /* Two equal columns on desktop */
  display: grid;
  grid-template-columns: 1fr 1fr; /* strict 50/50 like CMediaContentSplit */
  align-items: center;
  position: relative;
  gap: 0; /* tight so the overlap feels intentional; spacing via margins */

  .media {
    position: relative;
    z-index: 0; /* content sits above */
  }

  .content {
    position: relative;
    z-index: 1;
    padding-block: 16px; /* gentle breathing room */
    /* Overlap to the right: negative margin equals percent of this column's width (same as media column) */
    margin-right: calc(100% * var(--cmt-overlap) * -1);
  }

  /* Stack automatically at Quasar < md (<= $breakpoint-sm-max); reset margins */
  @media (max-width: $breakpoint-sm-max) {
    grid-template-columns: 1fr;
    .content { margin: 0; }
  }
}
</style>
