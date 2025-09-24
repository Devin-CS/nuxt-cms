<template>
<q-img
  :src="props.src"
  :alt="props.alt"
  :width="widthStyle"
  :height="heightStyle"
  v-bind="$attrs"/>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  testProp?: string
}>(), {
  src: '',
  alt: ''
})

const widthStyle = computed(() => props.width !== undefined
  ? (typeof props.width === 'number' ? `${props.width}px` : props.width)
  : undefined)

const heightStyle = computed(() => props.height !== undefined
  ? (typeof props.height === 'number' ? `${props.height}px` : props.height)
  : undefined)
</script>
