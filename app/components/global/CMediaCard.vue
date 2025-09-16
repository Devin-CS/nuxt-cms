<template>
<q-card
  flat
  bordered
  class="rounded-borders overflow-hidden">
  <!-- Image slot (default) -->
  <q-card-section class="q-pa-none">
    <slot mdc-unwrap="p"/>
  </q-card-section>

  <!-- Title -->
  <q-card-section class="q-pt-md q-pb-none text-h6 text-weight-medium text-primary">
    {{ props.title }}
  </q-card-section>

  <!-- Description -->
  <q-card-section
    class="q-pt-sm text-body2 text-secondary">
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

const props = withDefaults(defineProps<{
  /** Card title text */
  title?: string
  /** Description paragraph */
  description?: string
}>(), {
  title: '',
  description: ''
})
</script>
