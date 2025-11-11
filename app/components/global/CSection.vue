<template>
<section
  :class="[bgClass, textClass, paddingClass]"
  class="c-section">
  <div class="c-section__wrapper q-px-md">
    <q-card
      :class="['transparent', containerAlignClass]"
      flat
      style="max-width: 900px">
      <q-card-section
        v-if="$slots.title"
        :class="alignClass">
        <slot name="title"/>
      </q-card-section>

      <q-card-actions
        v-if="$slots.actions"
        :align="align"
        class="q-mb-xl">
        <slot name="actions"/>
      </q-card-actions>
    </q-card>

    <div
      v-if="$slots.content"
      :class="[containerAlignClass, alignClass]">
      <slot name="content"/>
    </div>
  </div>
</section>
</template>

<script lang="ts" setup>
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
</script>

<style lang="scss" scoped>
/* Centered wrapper with responsive max-width based on breakpoints */
.c-section__wrapper {
  margin-left: auto;
  margin-right: auto;
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
</style>
