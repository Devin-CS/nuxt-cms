<template>
<q-tab-panel :name="tab">
  <slot/>
</q-tab-panel>
</template>

<script setup lang="ts">
defineProps<{ tab: string }>()
</script>

<style scoped lang="scss">

</style>
