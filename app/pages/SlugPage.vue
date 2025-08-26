<template>
<q-page padding>
  <ContentRenderer
    v-if="data"
    :value="data"/>
  <div v-else>
    Page not found
  </div>
  {{ path }}
</q-page>
</template>

<script setup lang="ts">
const { path } = defineProps<{ path: string }>()

console.log('path: ', path)

const { data } = await useAsyncData(
  () => queryCollection('content').path(path).first()
)

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description
})
</script>

<style scoped>

</style>
