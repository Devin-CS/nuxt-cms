<template>
<span>
  <slot/>
  <q-tooltip
    max-width="300px"
    transition-show="scale"
    transition-hide="scale">
    {{ text }}
  </q-tooltip>
</span>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>
