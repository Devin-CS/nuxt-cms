<template>
<!-- Render children without adding extra wrappers -->
<div style="display: contents">
  <slot/>
</div>
</template>

<script setup lang="ts">
/**
 * XTabContent
 *
 * Marker component for author-friendly tab content. Use inside XTabsSection;
 * each instance represents one tab panel and provides its tab button label
 * via the `label` prop.
 *
 * MDC (Nuxt Content) usage example:
 *  ::XTabsSection
 *  :::XTabContent{label="Intro"}
 *  Intro content
 *  :::
 *  :::XTabContent{label="Details"}
 *  Details content
 *  :::
 *  ::
 */

defineProps<{
  /** Label shown on the associated tab button */
  label: string
  /** Optional disabled flag for future use */
  disabled?: boolean
  /** Optional explicit name/id for future routing/anchors */
  name?: string | number
}>()
</script>
