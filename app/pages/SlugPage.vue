<template>
<q-page>
  <template v-if="page?.disclaimers">
    <template
      v-for="(d, i) in disclaimers"
      :key="i">
      <disclaimer-msg :description="d.text"/>
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

type Disclaimer = { enabled: boolean, text: string }
interface AppConf { disclaimers?: { one?: Disclaimer, two?: Disclaimer, three?: Disclaimer } }

const app = useAppConfig() as unknown as AppConf
const disclaimers = computed<Disclaimer[]>(() => {
  const d = app.disclaimers ?? {}
  const arr = [d.one, d.two, d.three].filter((x): x is Disclaimer => !!(x && x.enabled && x.text && String(x.text).trim().length))
  return arr
})

useSeoMeta({
  title: page.value?.seo.title,
  description: page.value?.seo.description
})
</script>

<style scoped>

</style>
