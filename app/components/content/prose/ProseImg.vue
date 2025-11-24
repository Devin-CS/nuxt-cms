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
const { src, alt } = defineProps<{
  src?: string
  alt?: string
}>()

const isSvg = computed(() => {
  const s = src ?? ''
  return /\.svg(?:$|[?#])/i.test(s)
})
</script>
