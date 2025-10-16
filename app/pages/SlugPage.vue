<template>
<q-page>
  <site-alert/>

  <c-media-content-split>
    <template #media>
      <h1 class="text-h1">
        Discover the power of possibilities
      </h1>
      <p>Building a family doesn’t have to be just a dream. Over the past 45 years, California Cryobank® has helped more than 75,000 parents achieve the family they’ve always wanted.</p>
      <c-button
        label="Get Started"
        arrow/>
    </template>
    <template #content>
      <c-image-gallery
        height="420"
        padding="16">
        <c-gallery-image
          width="318"
          height="318"
          anchor="center middle"
          self="center middle"
          offset="-140,0">
          <q-img src="/images/discover-power-possibilities-1.webp" fit="cover" style="width: 100%; height: 100%"/>
        </c-gallery-image>
        <c-gallery-image
          width="318"
          height="318"
          anchor="center middle"
          self="center middle"
          offset="150,24">
          <q-img src="/images/discover-power-possibilities-2.webp" fit="cover" style="width: 100%; height: 100%"/>
        </c-gallery-image>
        <c-gallery-image
          width="140"
          height="140"
          anchor="center middle"
          self="center middle"
          offset="60,0"
          z-index="5"
          pointer-none>
          <c-icon size="140" color="pine">
            <img src="/svg/apostrophe.svg" alt="" style="display:block;width:100%;height:100%;object-fit:contain"/>
          </c-icon>
        </c-gallery-image>
      </c-image-gallery>
    </template>
  </c-media-content-split>

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
