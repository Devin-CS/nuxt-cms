<template>
<q-card flat>
  <q-card-section class="text-h4 text-weight-bold q-pb-none">
    <c-btn
      arrow
      dense
      :label="title"
      :to="path"
      flat/>
  </q-card-section>
  <q-card-section class="q-px-md q-pt-sm">
    <slot/>
  </q-card-section>
</q-card>
</template>

<script setup lang="ts">
defineProps<{ title: string, path: string }>()
</script>
