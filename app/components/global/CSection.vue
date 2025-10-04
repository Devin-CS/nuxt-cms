<template>
<section
  :class="[bgClass, textClass]"
  class="c-section q-px-md">
  <q-card
    class="transparent q-mx-auto"
    flat
    style="max-width: 900px">
    <q-card-section
      v-if="$slots.title"
      class="text-center">
      <slot name="title"/>
    </q-card-section>

    <q-card-actions
      v-if="$slots.actions"
      align="center"
      class="q-mb-xl">
      <slot name="actions"/>
    </q-card-actions>
  </q-card>

  <div
    v-if="$slots.content"
    class="q-mx-auto"
    style="max-width: 1272px">
    <slot name="content"/>
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
const { background = 'transparent', text } = defineProps<{
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
}>()

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
</script>

<style lang="scss" scoped>
/* Responsive padding aligned with typical Quasar breakpoints */
@media (min-width: 600px) { /* sm */
  .c-section {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (min-width: 1024px) { /* md */
  .c-section {
    padding-left: 32px;
    padding-right: 32px;
  }
}

@media (min-width: 1440px) { /* lg */
  .c-section {
    padding-left: 48px;
    padding-right: 48px;
  }
}

@media (min-width: 1920px) { /* xl */
  .c-section {
    padding-left: 64px;
    padding-right: 64px;
  }
}
</style>
