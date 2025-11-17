<template>
<q-header
  elevated
  height-hint="106"
  class="bg-pine text-shell">
  <q-toolbar style="height: 106px">
    <!-- Always shrink the title so the logo keeps its natural width on small screens -->
    <q-toolbar-title shrink>
      <!-- Use NuxtLink to avoid extra padding/margins from buttons on mobile -->
      <NuxtLink
        to="/"
        aria-label="Go to home"
        title="Home"
        class="inline-block"
        style="line-height:0">
        <img
          alt="Logo"
          src="@/assets/logo.svg"
          :width="$q.screen.xs ? 235 : 300"
          style="display:block">
      </NuxtLink>
    </q-toolbar-title>

    <!-- Nav row: links take remaining space, controls sit at far right -->
    <nav
      class="col row items-center no-wrap q-gutter-x-xs"
      style="min-width: 0">
      <!-- Primary nav links (visible gt-sm). These do NOT flex-grow; the spacer handles push -->
      <menu-btn
        v-for="{ title, path, children = [] } in menu"
        :key="title"
        :to="path"
        class="gt-sm self-center"
        :label="title"
        :card-data="children"/>

      <!-- Spacer claims the remaining space, pushing controls to the right -->
      <q-space/>

      <!-- Right controls -->
      <div>
        <q-btn
          flat
          round
          size="md"
          padding="sm"
          :icon="loggedIn ? 'o_person' : 'o_login'"
          :href="!loggedIn ? loginUrl : undefined">
          <q-menu
            v-if="loggedIn"
            anchor="bottom middle"
            self="top middle"
            class="bg-shell">
            <div
              class="column items-center row no-wrap q-pa-md"
              style="min-width: 220px">
              <q-avatar
                size="72px"
                color="juniper"
                text-color="shell">
                {{ avatarLetter }}
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">
                {{ userName || 'Account' }}
              </div>

              <q-btn
                v-close-popup
                unelevated
                color="juniper"
                label="Logout"
                push
                size="md"
                :href="logoutUrl"/>
            </div>
          </q-menu>
        </q-btn>
      </div>

      <q-btn
        class="gt-xs"
        flat
        round
        size="md"
        padding="sm"
        icon="o_search"/>
      <q-btn
        class="gt-xs"
        label="Find a Donor"
        color="aqua"/>

      <q-btn
        class="lt-md"
        size="md"
        padding="sm"
        dense
        flat
        round
        icon="o_menu"
        @click="$emit('toggleDrawer')"/>
    </nav>
  </q-toolbar>

  <q-toolbar
    inset
    class="bg-poppy inset-shadow"
    style="min-height: 12px; height: 12px"/>
</q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const { menu = [] } = defineProps<{ menu?: Menu[] }>()
defineEmits<{ toggleDrawer: [] }>()
const $q = useQuasar()

// Auth menu logic
const { ready, loggedIn, user, fetch } = useUserSession()
const route = useRoute()

onMounted(() => {
  if (!ready.value) {
    fetch()
  }
})

const loginUrl = computed(() => `/api/auth/auth0?returnTo=${encodeURIComponent(route.fullPath)}`)
const logoutUrl = computed(() => `/api/auth/logout?returnTo=${encodeURIComponent(route.fullPath)}`)
const userName = computed(() => {
  const u = user.value as unknown as {
    name?: string
    given_name?: string
    family_name?: string
    nickname?: string
    email?: string
  } | null
  if (!u) return ''
  // Strictly prefer a real name; avoid showing email unless nothing else exists
  const full = [u.given_name, u.family_name].filter(Boolean).join(' ')
  return u.name || (full || undefined) || u.nickname || ''
})

// First letter of the user's name, capitalized, for the avatar
const avatarLetter = computed(() => {
  const name = userName.value?.trim()
  return name?.charAt(0)?.toUpperCase() || ' '
})
</script>
