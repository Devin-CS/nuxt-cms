<template>
<section
  v-bind="passthroughAttrs"
  :class="[bgClass, textClass, paddingClass]"
  class="c-section">
  <div class="c-section__wrapper q-px-md q-mx-auto">
    <div
      v-if="$slots.header"
      :class="['c-section__header', containerAlignClass, alignClass, 'q-pt-md']">
      <slot name="header"/>
    </div>

    <div
      v-if="$slots.actions"
      :class="['c-section__actions', containerAlignClass, 'row', 'items-center', actionsJustifyClass, 'q-mb-xl']">
      <slot name="actions"/>
    </div>

    <div
      v-if="$slots.content">
      <slot name="content"/>
    </div>
  </div>
</section>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })
/**
 * CSection
 *
 * A simple section wrapper with optional title, description, and button area.
 * Content is provided via the default slot or named "content" slot.
 *
 * Optimized for Nuxt Studio editors: use props for title and description to avoid confusion.
 */
const { background = 'transparent', text, padding = 'none', align = 'center' } = defineProps<{
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
  /** Vertical padding applied to the section using Quasar spacing utilities */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Horizontal alignment for title, actions, and content */
  align?: 'left' | 'center' | 'right'
}>()

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
const paddingClass = computed(() => (!padding || padding === 'none') ? undefined : `q-py-${padding}`)
const alignClass = computed(() => `text-${align}`)
const containerAlignClass = computed(() => {
  if (align === 'center') return 'q-mx-auto'
  if (align === 'right') return 'q-ml-auto'
  return undefined
})
const actionsJustifyClass = computed(() => {
  if (align === 'left') return 'justify-start'
  if (align === 'right') return 'justify-end'
  return 'justify-center'
})
const attrs = useAttrs()

// Prevent unintended HTML tooltips from front-matter `title` attributes
// Nuxt Content may forward unknown front-matter keys as HTML attributes.
// We explicitly drop `title` so hovering the section doesn’t show a browser tooltip.
const passthroughAttrs = computed(() => {
  const rest = { ...(attrs as Record<string, unknown>) }
  // Remove any accidental HTML title passed via front-matter
  Reflect.deleteProperty(rest, 'title')
  return rest
})
</script>

<style lang="scss" scoped>
/* Wrapper: responsive max-width only. Horizontal centering handled via Quasar `q-mx-auto` */
.c-section__wrapper {
  max-width: 540px; /* xsmall */
}

@media (min-width: 600px) { /* small */
  .c-section__wrapper {
    max-width: 720px;
  }
}

@media (min-width: 1024px) { /* medium */
  .c-section__wrapper {
    max-width: 936px;
  }
}

@media (min-width: 1440px) { /* large */
  .c-section__wrapper {
    max-width: 1116px;
  }
}

/* Header and actions follow the previous QCard's max width */
.c-section__header,
.c-section__actions {
  max-width: 900px;
}
</style>
