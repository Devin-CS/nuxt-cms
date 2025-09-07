<template>
<q-page padding>
  <ContentRenderer
    v-if="page"
    :value="page"/>
  <div v-else>
    Page not found
  </div>
  {{ path }}
</q-page>
</template>

<script setup lang="ts">
const { path } = defineProps<{ path: string }>()

const { data: page } = await useAsyncData(path,
  () => queryCollection('content').path(path).first(),
  { watch: [() => path] }
)

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

<style scoped>

</style>
