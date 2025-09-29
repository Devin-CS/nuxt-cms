<template>
<q-page>
  <site-alert/>

  <q-card
    class="my-card"
    flat
    bordered>
    <q-card-section horizontal>
      <q-img
        class="col-6"
        src="images/register-for-free-account.webp"/>

      <q-card-section>
        Card text
      </q-card-section>
    </q-card-section>
  </q-card>

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
