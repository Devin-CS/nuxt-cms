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
interface FooterLink { name: string, href: string }
const { data: footerLinks } = await useAsyncData('footer-links',
  () => queryCollection('footerLinks').first()
)
const footerItems = computed(() => footerLinks.value?.meta.body as FooterLink[][])
</script>

<style scoped lang="scss">
.footer-links {
  display: flex;
  gap: 24px;
}
</style>
