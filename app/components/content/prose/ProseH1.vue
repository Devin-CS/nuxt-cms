<template>
<h1
  :class="['text-h1', alignClass]"
  v-bind="$attrs">
  <slot/>
</h1>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** Text alignment for the H1. Defaults to 'left'. */
  align?: 'left' | 'center' | 'right'
}>(), {
  align: 'left'
})

// Only add a class when not the default 'left' to avoid overriding any incoming classes
const alignClass = computed(() => (props.align && props.align !== 'left') ? `text-${props.align}` : undefined)
</script>
