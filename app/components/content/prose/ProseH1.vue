<template>
<h1
  :id="id"
  class="text-h1">
  <a
    v-if="id"
    :href="`#${id}`"
    class="anchor"
    aria-label="Link to this section"/>
  <slot/>
</h1>
</template>

<script setup lang="ts">
const { id } = defineProps<{ id?: string }>()
</script>
