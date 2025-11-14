<template>
<q-footer class="bg-pine text-shell">
  <q-toolbar>
    <q-toolbar-title>
      <img
        alt="Logo"
        src="@/assets/logo.svg"
        :width="$q.screen.xs ? 246 : 300">
    </q-toolbar-title>

    <div class="footer-links q-pa-xl">
      <nav
        v-for="section in footerItems"
        :key="section.title"
        class="nav">
        <p class="text-subtitle1">
          {{ section.title }}
        </p>
        <q-list dense>
          <q-item
            v-for="(link, index) in section.links"
            :key="index"
            v-ripple
            :to="link.href"
            dense
            clickable>
            <q-item-section>{{ link.name }}</q-item-section>
          </q-item>
        </q-list>
      </nav>
    </div>
  </q-toolbar>
</q-footer>
</template>

<script setup lang="ts">
const { data: footerLinks } = await useAsyncData('footer-links',
  () => queryCollection('footerLinks').first()
)

// With explicit schema, sections are: Array<{ title: string; links: FooterLink[] }>
interface FooterSection { title: string, links: FooterLink[] }
const footerItems = computed<FooterSection[]>(() => {
  const body = footerLinks.value?.meta?.body as { sections?: FooterSection[] } | undefined
  return body?.sections ?? []
})
</script>

<style scoped lang="scss">
.footer-links {
  display: flex;
  gap: 24px;
}
</style>
