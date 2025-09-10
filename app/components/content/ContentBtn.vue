<template>
<q-btn
  :color
  :label
  :flat
  :icon-right="iconRight"/>
</template>

<script setup lang="ts">
const { arrow } = defineProps<{
  label: string
  flat?: boolean
  arrow?: 'o_arrow_right_alt' | string
  color: BrandColors
}>()

const iconRight = computed(() => arrow ? 'o_arrow_right_alt' : undefined)
</script>
