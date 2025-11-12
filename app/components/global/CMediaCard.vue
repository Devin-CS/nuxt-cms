<template>
<q-card :class="[bgClass, textClass, centerClass]">
  <!-- Image slot -->
  <q-card-section
    v-if="$slots.media"
    class="no-padding">
    <slot
      mdc-unwrap="p"
      name="media"/>
  </q-card-section>

  <!-- Title slot with optional leading icon -->
  <div
    v-if="$slots.title"
    :class="['cmc-title', titleCenterClass]"
    :style="titleCssVars">
    <img
      v-if="icon"
      class="cmc-title__icon"
      :src="icon"
      :alt="iconAltFinal"
      :aria-hidden="iconAriaHiddenFinal"
      decoding="async">
    <slot name="title"/>
  </div>

  <!-- Content slot -->
  <div
    v-if="$slots.content"
    class="q-pa-md">
    <slot
      name="content"
      mdc-unwrap="p"/>
  </div>

  <q-card-actions
    v-if="$slots.actions"
    :align="actionsCenterValue">
    <slot name="actions"/>
  </q-card-actions>
</q-card>
</template>

<script lang="ts" setup>
/**
 * CMediaCard
 *
 * A simple media card with three areas:
 * 1) Image (media slot) — ideal for Markdown images (ProseImg / QImg)
 * 2) Title (title slot) — supports an optional leading icon via props
 * 3) Content (content slot) — ideal for body text and details
 *
 * Optimized for Nuxt Studio editors: use props for title and description to avoid confusion.
 */

const {
  center = false,
  background = 'transparent',
  text = 'pine',
  /** Optional icon displayed to the left of the title slot */
  icon,
  /** Icon size, number (px) or CSS size string. Default 40 */
  iconSize = 40,
  /** Gap between icon and title text. Number (px) or CSS size string. Default 12 */
  iconGap = 12,
  /** Alt text for the icon. Keep empty string for decorative icons */
  iconAlt = '',
  /** When true, sets aria-hidden on the icon image. Default true if alt is empty */
  iconAriaHidden
} = defineProps<{
  /** Centers all content */
  center?: boolean
  /** Background color using custom brand palette or transparent */
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
  /** Path to an icon (svg/png) to display next to the title */
  icon?: string
  iconSize?: number | string
  iconGap?: number | string
  iconAlt?: string
  iconAriaHidden?: boolean
}>()

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
const centerClass = computed(() => center ? 'text-center' : undefined)
const actionsCenterValue = computed(() => center ? 'center' : undefined)

// Title layout helpers
const titleCenterClass = computed(() => center ? 'cmc-title--center' : undefined)
const toCssSize = (val?: number | string): string | undefined => {
  if (val === undefined || val === null) return undefined
  return typeof val === 'number' ? `${val}px` : val
}
const titleCssVars = computed(() => ({
  '--cmc-icon-size': toCssSize(iconSize) ?? '40px',
  '--cmc-icon-gap': toCssSize(iconGap) ?? '12px'
}))
const iconAltFinal = computed(() => iconAlt ?? '')
const iconAriaHiddenFinal = computed(() => {
  return iconAriaHidden ?? (iconAltFinal.value === '')
})
</script>

<style lang="scss" scoped>
.cmc-title {
  display: flex;
  align-items: center;
  gap: var(--cmc-icon-gap, 12px);
}
.cmc-title__icon {
  width: var(--cmc-icon-size, 40px);
  height: var(--cmc-icon-size, 40px);
  flex: 0 0 auto;
}
/* Remove default margins from headings inside title slot */
.cmc-title :deep(h1),
.cmc-title :deep(h2),
.cmc-title :deep(h3),
.cmc-title :deep(h4),
.cmc-title :deep(h5),
.cmc-title :deep(h6) {
  margin: 0;
}
</style>
