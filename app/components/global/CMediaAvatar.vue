<template>
<q-avatar
  :size="size"
  :color="color"
  :text-color="textColor"
  :rounded="isRounded"
  :square="isSquare">
  <!-- Default slot for the image/content. In Nuxt Studio, drag a media item here. -->
  <slot mdc-unwrap="p"/>
</q-avatar>
</template>

<script setup lang="ts">
/**
 * CMediaAvatar
 *
 * A lightweight wrapper around Quasar's QAvatar designed for content editors.
 *
 * Usage (Nuxt Studio):
 * - Drag an image (e.g., ProseImg, QImg, or NuxtImg) into the default slot below.
 * - Adjust size/shape via props.
 */

defineOptions({ name: 'CMediaAvatar' })

// Inline unions help Nuxt Studio render friendly select lists for these props.
const props = withDefaults(defineProps<{
  /** Avatar size preset */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Background color limited to brand palette */
  color?:
    | 'pine' | 'elm' | 'eucalyptus' | 'willow' | 'birch'
    | 'juniper' | 'aqua' | 'violet' | 'poppy' | 'shadow'
    | 'fern' | 'sky' | 'aster' | 'saffron' | 'shell'
  /** Text color limited to brand palette */
  textColor?:
    | 'pine' | 'elm' | 'eucalyptus' | 'willow' | 'birch'
    | 'juniper' | 'aqua' | 'violet' | 'poppy' | 'shadow'
    | 'fern' | 'sky' | 'aster' | 'saffron' | 'shell'
  /** Avatar shape */
  shape?: 'circle' | 'rounded' | 'square'
}>(), {
  size: 'md',
  color: 'shell',
  textColor: 'pine',
  shape: 'circle'
})

const isRounded = computed(() => props.shape === 'rounded')
const isSquare = computed(() => props.shape === 'square')
</script>

<style scoped lang="scss">
/* No additional styles by default. Customize via props above. */
</style>
