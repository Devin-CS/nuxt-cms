<template>
<q-btn
  :label
  :flat
  :icon-right="iconRight"/>
</template>

<script setup lang="ts">
const { arrow } = defineProps<{
  label: string
  flat?: boolean
  arrow?: boolean
}>()

const iconRight = computed(() => arrow ? 'o_arrow_right_alt' : undefined)
</script>
