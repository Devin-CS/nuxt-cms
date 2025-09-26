<template>
<q-tabs v-model="selectedTab">
  <q-tab
    v-for="tab in tabs"
    :key="tab"
    :name="tab"
    :label="tab"/>
</q-tabs>

<q-tab-panels v-model="selectedTab">
  <slot/>
</q-tab-panels>
</template>

<script setup lang="ts">
defineProps<{ tabs: string[] }>()

const selectedTab = ref<string>()
</script>

<style scoped lang="scss">

</style>
