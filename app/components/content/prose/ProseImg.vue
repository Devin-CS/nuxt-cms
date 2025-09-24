<template>
<svg v-if="isSvg">
  <use :xlink:href="src"/>
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

const isSvg = computed(() => props.src?.toLowerCase().endsWith('.svg'))
</script>
