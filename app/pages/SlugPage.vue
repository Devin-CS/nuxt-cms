<template>
<q-page>
  <template v-if="page?.disclaimers">
    <template
      v-for="{ meta } in disclaimers"
      :key="meta.title">
      <disclaimer-msg
        v-if="meta.enabled"
        :description="meta.description"/>
    </template>
  </template>

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

const { data: disclaimers } = await useAsyncData('disclaimers', () => {
  return queryCollection('disclaimers').all()
})

useSeoMeta({
  title: page.value?.seo.title,
  description: page.value?.seo.description
})
</script>

<style scoped>

</style>
