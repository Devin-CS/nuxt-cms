<template>
<svg
  v-if="isSvg"
  preserveAspectRatio="xMidYMid meet"
  aria-hidden="true">
  <use
    width="1em"
    height="1em"
    :href="src"
    :xlink:href="src"/>
</svg>
<q-img
  v-else
  :src="src"
  :alt="alt"/>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  alt?: string
}>(), {
  src: '',
  alt: ''
})

const isSvg = computed(() => {
  const url = props.src?.toLowerCase() || ''
  const base = url.split('#')[0].split('?')[0]
  return base.endsWith('.svg')
})
</script>
