<template>
<q-avatar
  :size="sizeValue"
  :rounded="isRounded"
  :square="isSquare"
  :class="[bgClass, textClass]"
  :style="inlineStyle">
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
  /** Avatar size preset or pixel size (number or CSS size) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string
  /** Background color using custom brand palette or transparent */
  background?:
    | 'transparent'
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Text color to apply to content */
  text?:
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Font size (pixels or CSS size) applied to avatar content */
  fontSize?: number | string
  /** Avatar shape */
  shape?: 'circle' | 'rounded' | 'square'
}>(), {
  size: 'md',
  background: 'shell',
  text: 'pine',
  shape: 'circle'
})

const isRounded = computed(() => props.shape === 'rounded')
const isSquare = computed(() => props.shape === 'square')

// Helpers to convert numbers or numeric strings into px values
const toPx = (v?: number | string) => {
  if (v === undefined || v === null) return undefined
  if (typeof v === 'number') return `${v}px`
  const str = String(v).trim()
  return /^\d+(\.\d+)?$/.test(str) ? `${str}px` : str
}

const sizeValue = computed(() => toPx(props.size) ?? 'md')

const inlineStyle = computed(() => {
  const s: Record<string, string> = {}
  const fs = toPx(props.fontSize)
  if (fs) s.fontSize = fs
  return s
})

const bgClass = computed(() => props.background === 'transparent' ? 'bg-transparent' : `bg-${props.background}`)
const textClass = computed(() => props.text ? `text-${props.text}` : undefined)
</script>

<style scoped lang="scss">
/* No additional styles by default. Customize via props above. */
</style>
