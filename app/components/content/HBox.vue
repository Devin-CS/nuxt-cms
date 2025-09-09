<template>
<section class="grid bg-primary">
  <slot/>
</section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.grid {
  display: grid;
  gap: 16px;
  align-items: stretch;

  /* Natural wrapping: as many columns as fit.
     Each column is at least 240px wide; cells expand to fill remaining space. */
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
</style>
