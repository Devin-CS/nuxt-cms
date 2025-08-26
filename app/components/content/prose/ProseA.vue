<template>
<NuxtLink
  v-if="isInternal"
  :to="href">
  <slot/>
  <Tooltip
    v-if="title"
    :text="title"/>
</NuxtLink>
<a
  v-else
  :href="href"
  :target="target || '_self'"
  :rel="rel">
  <slot/>
  <Tooltip
    v-if="title"
    :text="title"/>
</a>
</template>

<script setup lang="ts">
const { href, title, target, rel } = defineProps<{
  href: string
  title?: string
  target?: string
  rel?: string
}>()

const isInternal = computed(() => href?.startsWith('/') ?? false)
</script>

<style scoped>

</style>
