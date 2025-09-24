<template>
<q-card
  flat
  :class="['overflow-hidden', bgClass, textClass]">
  <!-- Image slot (default) -->
  <q-card-section class="q-pa-none">
    <slot mdc-unwrap="p"/>
  </q-card-section>

  <!-- Title -->
  <q-card-section class="q-pt-md q-pb-none text-h6 text-weight-medium">
    {{ props.title }}
  </q-card-section>

  <!-- Description -->
  <q-card-section
    class="q-pt-sm text-body2">
    {{ props.description }}
  </q-card-section>
</q-card>
</template>

<script setup lang="ts">
/**
 * CMediaCard
 *
 * A simple media card with three areas:
 * 1) Image (default slot) — ideal for Markdown images (ProseImg / QImg)
 * 2) Title — provided via `title` prop
 * 3) Description — provided via `description` prop
 *
 * Optimized for Nuxt Studio editors: use props for title and description to avoid confusion.
 */

defineOptions({ name: 'CMediaCard' })

// Inline unions help Nuxt Studio render friendly select lists for these props.
const props = withDefaults(defineProps<{
  /** Card title text */
  title?: string
  /** Description paragraph */
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
  title: '',
  description: '',
  background: 'transparent',
  text: 'pine'
})

const bgClass = computed(() => (!props.background || props.background === 'transparent' ? 'transparent' : `bg-${props.background}`))
const textClass = computed(() => props.text ? `text-${props.text}` : undefined)
</script>
