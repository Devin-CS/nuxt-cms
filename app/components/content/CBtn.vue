<template>
<q-btn
  :color
  :label
  :flat
  :icon-right="iconRight"/>
</template>

<script setup lang="ts">
const { label = 'Button', arrow, color = 'primary' } = defineProps<{
  label?: string
  flat?: boolean
  arrow?: boolean
  color?: 'primary' | 'secondary' | 'accent' | 'positive' | 'negative' | 'info' | 'warning'
}>()

const iconRight = computed(() => arrow ? 'o_arrow_right_alt' : undefined)
</script>
