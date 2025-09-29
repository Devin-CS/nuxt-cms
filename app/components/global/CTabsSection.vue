<template>
<q-tabs v-model="selectedTab">
  <q-tab
    v-for="tab in tabs"
    :key="tab"
    :name="tab"
    :label="tab"/>
</q-tabs>

<q-tab-panels v-model="selectedTab">
  <!--  <slot :mdc-unwrap="true"/> -->
  <q-tab-panel
    v-for="(name, i) in tabs"
    :key="name"
    :name>
    <template #[i+1]>
      <!-- slot content here -->
    </template>
  </q-tab-panel>
</q-tab-panels>
</template>

<script setup lang="ts">
defineProps<{ tabs: string[] }>()

const selectedTab = ref<string>()

watch(selectedTab, (value) => {
  console.log('selectedTab: ', value)
})
</script>

<style scoped lang="scss">

</style>
