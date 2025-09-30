<template>
<section :class="[bgClass, textClass]" class="mcs">
  <div class="mcs__grid" :style="gridStyle" :class="gridClass">
    <!-- Content first in DOM for accessibility; order flips visually via CSS -->
    <div class="mcs__content">
      <header v-if="$slots.title" class="mcs__header">
        <slot name="title"/>
      </header>
      <div v-if="$slots.content" class="mcs__body">
        <slot name="content"/>
      </div>
      <div v-if="$slots.actions" class="mcs__actions">
        <slot name="actions"/>
      </div>
    </div>
    <div class="mcs__media">
      <slot name="media"/>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
/**
 * CMediaContentSplit
 *
 * Side-by-side layout with media on one side and rich content on the other.
 * Props kept single-word for Nuxt Studio friendliness.
 */
const props = withDefaults(defineProps<{
  /** Which side shows the media */
  side?: 'left' | 'right'
  /** Breakpoint at which columns stack */
  stack?: 'sm' | 'md' | 'lg'
  /** Background color using brand palette or transparent */
  background?: 'transparent'
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Text color using brand palette */
  text?: 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  /** Vertical alignment for content column */
  align?: 'start' | 'center'
  /** CSS gap value between columns */
  gap?: string
}>(), {
  side: 'left',
  stack: 'md',
  background: 'transparent',
  text: 'pine',
  align: 'start',
  gap: '2.5rem'
})

const bgClass = computed(() => (!props.background || props.background === 'transparent' ? 'transparent' : `bg-${props.background}`))
const textClass = computed(() => props.text ? `text-${props.text}` : undefined)

const gridClass = computed(() => [
  `mcs--${props.side}`,
  `mcs--stack-${props.stack}`,
  props.align === 'center' ? 'mcs--center' : undefined
])

const gridStyle = computed(() => ({ gap: props.gap }))
</script>

<style scoped>
.mcs {
  width: 100%;
}
.mcs__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
}
.mcs--center .mcs__grid, .mcs--center .mcs__content { align-items: center; }

/* Visual ordering without changing DOM order */
.mcs--left .mcs__content { order: 2; }
.mcs--left .mcs__media { order: 1; }
.mcs--right .mcs__content { order: 1; }
.mcs--right .mcs__media { order: 2; }

.mcs__media img, .mcs__media picture, .mcs__media video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}
.mcs__header :deep(*) { margin: 0 0 0.5rem 0; }
.mcs__body :deep(p) { margin: 0 0 1rem 0; }
.mcs__body :deep(ul) { margin: 0 0 1.25rem 1.25rem; }
.mcs__actions { margin-top: 0.5rem; }

/* Stack behavior at breakpoints */
@media (max-width: 1024px) {
  .mcs--stack-lg .mcs__grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .mcs--stack-md .mcs__grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .mcs--stack-sm .mcs__grid { grid-template-columns: 1fr; }
}
</style>
