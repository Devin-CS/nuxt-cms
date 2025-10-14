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

  <!-- Content slot -->
  <q-card-section
    v-if="$slots.content"
    class=" text-weight-medium">
    <slot name="content"/>
  </q-card-section>

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
 * 2) Content (content slot) — ideal for title and description text
 *
 * Optimized for Nuxt Studio editors: use props for title and description to avoid confusion.
 */

const {
  center = false,
  background = 'transparent',
  text = 'pine'
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
}>()

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => text ? `text-${text}` : undefined)
const centerClass = computed(() => center ? 'text-center' : undefined)
const actionsCenterValue = computed(() => center ? 'center' : undefined)
</script>
