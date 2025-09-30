<template>
<section :class="[bgClass, textClass]">
  <q-card
    class="transparent q-mx-auto"
    style="max-width: 900px"
    flat>
    <q-card-section class="text-center">
      <slot
        v-if="$slots.header"
        name="header"/>
    </q-card-section>
    <q-card-actions align="center">
      <slot
        v-if="$slots.buttons"
        name="buttons"/>
    </q-card-actions>
  </q-card>

  <div
    style="max-width: 1272px"
    class="q-mx-auto">
    <slot
      v-if="$slots.content"
      name="content"/>
  </div>
</section>
</template>

<script setup lang="ts">
/**
 * CSection
 *
 * A simple section wrapper with optional title, description, and button area.
 * Content is provided via the default slot or named "content" slot.
 *
 * Optimized for Nuxt Studio editors: use props for title and description to avoid confusion.
 */
const props = withDefaults(defineProps<{
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
}>(), {
  background: 'transparent'
})

const bgClass = computed(() => (!props.background || props.background === 'transparent' ? 'transparent' : `bg-${props.background}`))
const textClass = computed(() => props.text ? `text-${props.text}` : undefined)
</script>

<style scoped lang="scss">

</style>
