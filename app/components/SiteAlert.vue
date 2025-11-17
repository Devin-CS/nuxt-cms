<template>
<ClientOnly>
  <q-banner
    v-if="visible && config.enabled && config.message"
    style="height: 84px"
    :class="bannerClass"
    inline-actions
    class="center-banner-avatar bg-shell">
    <template #avatar>
      <q-icon
        :name="iconName"
        size="sm"/>
    </template>

    {{ config.message }}

    <template #action>
      <q-btn
        v-if="config.dismissible"
        flat
        round
        size="md"
        padding="sm"
        icon="o_close"
        @click="dismiss"/>
    </template>
  </q-banner>
</ClientOnly>
</template>

<script setup lang="ts">
import { LocalStorage } from 'quasar'

const appConfig = useAppConfig()

const config = computed(() => ({
  enabled: appConfig.alert?.enabled ?? false,
  id: appConfig.alert?.id ?? '',
  variant: appConfig.alert?.variant ?? 'info',
  message: appConfig.alert?.message ?? '',
  dismissible: appConfig.alert?.dismissible ?? true
}))

const storageKey = computed(() => {
  // Tie dismissal to both id and a normalized message so changing either resurfaces the alert.
  const id = config.value.id || 'default'
  const msg = (config.value.message || '')
  return `site-alert:${id}:${msg}`
})

const visible = ref(true)

onMounted(() => {
  try {
    const val = LocalStorage.getItem(storageKey.value)
    visible.value = val !== 'dismissed'
  }
  catch (_e) {
    // ignore read errors (e.g., SSR or disabled storage)
    visible.value = true
  }
})

const dismiss = () => {
  try {
    LocalStorage.set(storageKey.value, 'dismissed')
  }
  catch (_e) {
    // ignore write errors
  }
  visible.value = false
}

const bannerClass = computed(() => {
  const classes = []
  if (config.value.variant === 'warning' || config.value.variant === 'negative') {
    classes.push('text-poppy')
  }
  else if (config.value.variant === 'positive') {
    classes.push('text-juniper')
  }
  else {
    classes.push('text-shadow')
  }
  return classes.join(' ')
})

const iconName = computed(() => {
  switch (config.value.variant) {
    case 'warning':
      return 'o_warning'
    case 'positive':
      return 'o_check_circle'
    case 'negative':
      return 'o_error'
    default:
      return 'o_info'
  }
})
</script>

<style lang="scss">
.center-banner-avatar .q-banner__avatar {
  align-self: center !important;
}
</style>
