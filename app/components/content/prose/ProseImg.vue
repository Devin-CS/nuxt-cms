<template>
<q-img
  :src
  :alt
  width="300px"
  fit="contain"
  :ratio="16/9">
  <div
    v-if="title"
    class="absolute-bottom text-subtitle1 text-center">
    {{ title }}
  </div>
  <template #error>
    <div class="bg-grey-3 text-grey-7 q-pa-md">
      Image not available
    </div>
  </template>
</q-img>
</template>

<script setup lang="ts">
defineProps<{ src: string, alt?: string, title?: string }>()
</script>
