<template>
<section class="grid">
  <slot/>
</section>
</template>

<script setup lang="ts">
const { minWidth = 240, gap = 16 } = defineProps<{
  gap?: number
  minWidth?: number
}>()

const gridGap = computed(() => `${gap}px`)
const minCol = computed(() => `${minWidth}px`)

console.log('gridGap: ', gridGap.value)
</script>

<style scoped>
.grid {
  display: grid;
  gap: v-bind(gridGap);
  align-items: stretch;
  grid-template-columns: repeat(auto-fit, minmax(v-bind(minCol), 1fr));
}
</style>
