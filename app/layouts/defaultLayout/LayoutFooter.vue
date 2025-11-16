<template>
<q-footer class="bg-pine q-pa-xl text-shell">
  <div class="footer-inner">
    <img
      class="footer-logo"
      alt="Logo"
      src="@/assets/logo.svg"
      :width="$q.screen.xs ? 246 : 300">

    <nav class="footer-links">
      <div
        v-for="section in footerItems"
        :key="section.title"
        class="footer-section">
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
  </div>

  <div class="footer-social q-mt-lg">
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
  </div>

  <q-separator
    color="elm"
    spaced="xl"/>

  <div class="q-mt-md">
    © 2025 California Cryobank. All rights reserved.
  </div>
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

<style scoped>
.footer-inner {
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  row-gap: 16px;
  column-gap: 32px;
}

@media (min-width: 600px) {
  .footer-inner {
    grid-template-columns: auto 1fr;
  }
}

.footer-logo {
  /* ensure logo area keeps its natural size and never squeezes */
  min-width: 0;
}

.footer-links {
  width: 100%;
  /* responsive columns for link groups */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px 24px;
}

.footer-social {
  display: flex;
  gap: 8px;
}
</style>
