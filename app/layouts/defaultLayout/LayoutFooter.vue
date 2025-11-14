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
      </nav>
    </div>

    <!-- Social links row -->
    <div class="social-links q-px-xl q-pb-xl">
      <q-btn
        v-for="item in socialItems"
        :key="item.href"
        flat
        round
        :label="item.icon"
        size="md"
        class="q-mr-sm"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="item.name">
        <q-icon
          :name="resolveIcon(item.icon)"
          size="sm"/>
      </q-btn>
    </div>
  </q-toolbar>
</q-footer>
</template>

<script setup lang="ts">
const { data: footerLinks } = await useAsyncData('footer-links',
  () => queryCollection('footerLinks').first()
)

const { data: socialLinks } = await useAsyncData('social-links',
  () => queryCollection('socialLinks').first()
)

// With explicit schema, sections are: Array<{ title: string; links: FooterLink[] }>
interface FooterSection { title: string, links: FooterLink[] }
// For data collections with an explicit schema, fields are available at the top level of the item
// (not under `body`). Access `sections` directly to avoid type errors and missing data at runtime.
const footerItems = computed<FooterSection[]>(() => {
  const sections = (footerLinks.value as unknown as { sections?: FooterSection[] } | null)?.sections
  return sections ?? []
})

function isInternal(href?: string) {
  return !!href && href.startsWith('/')
}

// Social links
interface SocialLink { name: string, href: string, icon: string }
const socialItems = computed<SocialLink[]>(() => {
  const items = (socialLinks.value as unknown as { items?: SocialLink[] } | null)?.items
  return items ?? []
})

function resolveIcon(icon: string) {
  // Map common social keys to Material Design Icons by default
  const map: Record<string, string> = {
    facebook: 'mdi-facebook',
    instagram: 'mdi-instagram',
    x: 'mdi-twitter',
    youtube: 'mdi-youtube'
  }
  return map[icon] || icon
}
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
