<template>
<q-card
  flat
  class="q-pa-lg transparent">
  <!-- Title -->
  <q-card-section class="q-pt-none q-pb-sm text-h2 text-weight-bold">
    {{ props.title }}
  </q-card-section>

  <!-- Description -->
  <q-card-section class="q-pt-none q-pb-md text-body1">
    {{ props.description }}
  </q-card-section>

  <!-- Button slot (for CBtn or any action) -->
  <q-card-actions
    class="q-pt-sm"
    align="center">
    <slot/>
  </q-card-actions>
</q-card>
</template>

<script setup lang="ts">
/**
 * CCta
 *
 * A simple, centered Call-To-Action block with:
 * 1) Title (prop)
 * 2) Description (prop)
 * 3) Button area (named slot: `button`)
 *
 * Designed for Nuxt Content/Nuxt Studio editors. The button area is a slot so
 * editors can drop a CBtn (or any button) inside.
 */

defineOptions({ name: 'CCta' })

const props = withDefaults(defineProps<{
  /** CTA title text */
  title?: string
  /** CTA description text */
  description?: string
}>(), {
  title: '',
  description: ''
})
</script>
