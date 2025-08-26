<template>
<q-page padding>
  <ContentRenderer
    v-if="data"
    :value="data"/>
</q-page>
</template>

<script setup lang="ts">
const { path } = defineProps<{ path: string }>()

const { data } = await useAsyncData(
  () => queryCollection('content').path(path).first()
)

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description
})
</script>
