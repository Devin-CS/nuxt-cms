<template>
<q-card flat>
  <q-card-section class="text-h4 text-weight-bold">
    {{ title }}
  </q-card-section>
  <q-card-section>
    <slot/>
  </q-card-section>
</q-card>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
