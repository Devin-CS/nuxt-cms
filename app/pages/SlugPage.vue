<template>
<q-page>
	<site-alert/>

	<content-renderer
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

useSeoMeta({
  title: page.value?.seo.title,
  description: page.value?.seo.description
})
</script>

<style scoped>

</style>
