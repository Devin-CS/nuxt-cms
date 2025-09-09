<template>
<q-page>
  <ContentRenderer
    v-if="page"
    :value="page"/>
  <div v-else>
    Page not found
  </div>
</q-page>
</template>

<script setup lang="ts">
const { path } = defineProps<{ path: string }>()

const { data: page } = await useAsyncData(path,
  () => queryCollection('pages').path(path).first(),
  { watch: [() => path] }
)

console.log('page: ', page.value)

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

<style scoped>

</style>
