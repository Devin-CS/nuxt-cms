<template>
<q-card :class="[bgClass, textClass, centerClass]">
  <!-- Image slot (default) -->
  <q-card-section class="q-pa-none">
    <slot
      v-if="$slots.default"
      mdc-unwrap="p"/>
  </q-card-section>

  <!-- Title -->
  <q-card-section class="q-pt-md q-pb-none text-weight-medium">
    <h2 class="text-h3 q-my-xs">
      {{ title }}
    </h2>
  </q-card-section>

  <!-- Description -->
  <q-card-section
    class="q-pt-sm text-body2">
    {{ description }}
  </q-card-section>

  <q-card-actions :align="actionsCenterValue">
    <slot
      v-if="$slots.actions"
      name="actions"/>
  </q-card-actions>
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

const {
  title = '',
  description = '',
  center = false,
  background = 'transparent',
  text = 'pine'
} = defineProps<{
  /** Card title text */
  title?: string
  /** Description paragraph */
  description?: string
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
}>()

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
const centerClass = computed(() => center ? 'text-center' : undefined)
const actionsCenterValue = computed(() => center ? 'center' : undefined)
</script>
