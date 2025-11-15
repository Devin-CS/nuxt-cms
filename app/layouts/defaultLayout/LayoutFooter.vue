<template>
<q-footer class="bg-pine q-pa-xl text-shell">
  <q-toolbar>
    <q-toolbar-title>
      <img
        alt="Logo"
        src="@/assets/logo.svg"
        :width="$q.screen.xs ? 246 : 300">
    </q-toolbar-title>

    <nav class="footer-links q-pa-xl">
      <div
        v-for="section in footerItems"
        :key="section.title"
        class="nav">
        <p class="text-subtitle1">
          {{ section.title }}
        </p>
        <q-list dense>
          <q-item
            v-for="(link, index) in section.links"
            :key="link.href || index"
            v-ripple
            :to="isInternal(link.href) ? link.href : undefined"
            :href="!isInternal(link.href) ? link.href : undefined"
            :target="!isInternal(link.href) ? '_blank' : undefined"
            :rel="!isInternal(link.href) ? 'noopener noreferrer' : undefined"
            dense
            clickable>
            <q-item-section>{{ link.name }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </nav>
  </q-toolbar>

  <q-btn
    v-for="item in socialItems"
    :key="item.href"
    flat
    round
    size="md"
    padding="sm"
    :href="item.href"
    :icon="`svguse:${item.icon}`"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="item.name"/>

  <q-separator
    color="elm"
    spaced="xl"/>

  © 2025 California Cryobank. All rights reserved.
</q-footer>
</template>

<script setup lang="ts">
const { data: footerLinks } = await useAsyncData('footer-links',
  () => queryCollection('footerLinks').first()
)

const footerItems = computed<FooterSection[]>(() => {
  const sections = (footerLinks.value as unknown as { sections?: FooterSection[] } | null)?.sections
  return sections ?? []
})

const { data: socialLinks } = await useAsyncData('social-links',
  () => queryCollection('socialLinks').first()
)

const socialItems = computed<SocialLink[]>(() => {
  const items = (socialLinks.value as unknown as { items?: SocialLink[] } | null)?.items
  return items ?? []
})
</script>

<style scoped lang="scss">
.footer-links {
  display: flex;
  gap: 24px;
}

.social-links {
  display: flex;
}
</style>
