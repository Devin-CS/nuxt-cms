<template>
<q-img
  :src="props.src"
  :alt="props.alt"/>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  alt?: string
}>(), {
  src: '',
  alt: ''
})

console.log('ProseImg props:', props)
</script>
