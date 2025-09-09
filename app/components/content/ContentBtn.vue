<template>
<q-btn
  :color
  :label
  :flat
  :icon-right/>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  flat?: boolean
  iconRight?: 'o_arrow_right_alt' | string
  color: 'primary' | 'secondary' | 'accent' | 'positive' | 'negative' | 'info' | 'warning' | 'dark'
}>()
</script>
