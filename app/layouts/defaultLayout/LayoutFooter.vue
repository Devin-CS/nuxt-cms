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
        v-for="(links, sectionName) in footerItems"
        :key="sectionName"
        class="nav">
        <p class="text-subtitle1">
          {{ sectionName }}
        </p>
        <q-list dense>
          <q-item
            v-for="(link, index) in links"
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

// Transform meta.body.sections (Array<Record<sectionName, FooterLink[]>>) into
// a single object: Record<sectionName, FooterLink[]>
const footerItems = computed(() => {
  const sections = (footerLinks.value?.meta?.body as { sections?: Array<Record<string, FooterLink[]>> } | undefined)?.sections
  if (!sections) return {}
  return sections.reduce((acc, section) => {
    const [name, links] = Object.entries(section)[0] ?? []
    if (name && Array.isArray(links)) acc[name] = links
    return acc
  }, {} as Record<string, FooterLink[]>)
})
</script>

<style scoped lang="scss">
.footer-links {
  display: flex;
  gap: 24px;
}
</style>
