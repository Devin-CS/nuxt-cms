<template>
<q-banner class="center-banner-avatar">
  <template #avatar>
    <q-icon
      name="o_info"
      size="sm"/>
  </template>
  {{ description }}
</q-banner>
</template>

<script setup lang="ts">
defineProps<{ description: string }>()
</script>

<style lang="scss">
.center-banner-avatar .q-banner__avatar {
  align-self: center !important;
}
</style>
