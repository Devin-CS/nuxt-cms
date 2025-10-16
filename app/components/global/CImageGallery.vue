<template>
<div
  :class="[bgClass, textClass]"
  :style="cssVars"
  class="c-image-gallery">
  <!-- Multiple CGalleryImage children go into the default slot; order controls stacking -->
  <slot/>
</div>
</template>

<script lang="ts" setup>
/**
 * CImageGallery
 *
 * A positioned container that lets editors compose overlapping images using
 * CGalleryImage children. There is no limit on the number of images.
 *
 * - Children are stacked based on DOM order (later = above earlier). No extra z-index logic.
 * - Provide a single default slot that accepts multiple <c-gallery-image> children.
 */
const {
  background = 'transparent',
  text,
  height,
  padding = 0,
  overflow = 'visible'
} = defineProps<{
  /** Background color token (brand palette) */
  background?:
    | 'transparent'
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Optional text color to cascade to children */
  text?:
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Explicit height or CSS size string */
  height?: number | string
  /** Inner padding; token number = px, string allowed */
  padding?: number | string
  /** Container overflow policy. Default 'visible' to allow overlaps to extend. */
  overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
}>()

const cssVars = computed(() => ({
  '--c-image-gallery-height': toCssSize(height),
  '--c-image-gallery-padding': toCssSize(padding) ?? '0px',
  'overflow': overflow
}))

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
</script>

<style lang="scss" scoped>
.c-image-gallery {
  position: relative;
  width: 100%;
  height: var(--c-image-gallery-height, auto);
  padding: var(--c-image-gallery-padding, 0);
}
</style>
