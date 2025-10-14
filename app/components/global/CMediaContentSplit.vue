<template>
<article
  :style="cssVars"
  class="c-media-content-split">
  <figure
    v-if="$slots.media"
    class="no-margin">
    <slot
      mdc-unwrap="p"
      name="media"/>
  </figure>
  <section v-if="$slots.content">
    <slot name="content"/>
    <slot name="actions"/>
  </section>
</article>
</template>

<script lang="ts" setup>
/**
 * CMediaContentSplit
 *
 * A component that displays media and content side by side using CSS Grid.
 * Children have equal width (1fr) and fill available space, with a configurable
 * minimum width.
 */
const {
  min = 444
} = defineProps<{
  /** Minimum width for each child (px number or any CSS size). Default 444px */
  min?: number | string
}>()

const cssVars = computed(() => ({
  '--c-media-content-split-min': toCssSize(min) ?? '444px'
}))
</script>

<style lang="scss" scoped>
.c-media-content-split {
  display: grid;
  /* Auto-fit columns that wrap when items don't fit at min width */
  //grid-template-columns: repeat(auto-fit, minmax(var(--c-media-content-split-min, 444px), 1fr));
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--c-media-content-split-min, 444px)), 1fr)
  );
  gap: 16px;
}
</style>
