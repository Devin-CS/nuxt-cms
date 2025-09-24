<template>
<section
  :class="[bgClass, textClass]">
  <q-card
    class="transparent q-mx-auto"
    style="max-width: 900px"
    flat>
    <q-card-section>
      <h2 class="text-h2 text-center q-mb-sm">
        {{ props.title }}
      </h2>
      <p
        v-if="props.description"
        class="text-subtitle1 text-center">
        {{ props.description }}
      </p>
    </q-card-section>
    <q-card-actions align="center">
      <slot name="buttons"/>
    </q-card-actions>
  </q-card>

  <slot name="content"/>
</section>
</template>

<script setup lang="ts">
/**
 * Note: Inline unions are used so Nuxt Studio renders select lists for these props.
 * Using a props object keeps reactivity and consistency with other components.
 */
const props = withDefaults(defineProps<{
  /** CTA title text */
  title: string
  /** CTA description text */
  description?: string
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
