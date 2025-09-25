<template>
<!--
  XTabsSection renders Quasar tabs via existing CTabs by inspecting its
  default slot children (XTabContent nodes). Each child contributes a tab
  header (from its `label` prop) and the corresponding panel content.

  MDC (Nuxt Content) usage example:
   ::XTabsSection
   :::XTabContent{label="Intro"}
   Intro content
   :::
   :::XTabContent{label="Details"}
   Details content
   :::
   ::
-->
<c-tabs :names="items.map(i => i.label)" :align="align" :dense="dense">
  <!-- Forward each collected child into the appropriate CTabs panel slot -->
  <template v-for="(it, i) in items" :key="`panel-${it.key}`" #[`panel-${i}`]>
    <component :is="it.vnode"/>
  </template>
</c-tabs>
</template>

<script setup lang="ts">
/**
 * XTabsSection
 *
 * Parent convenience component that lets content authors define tabs by writing
 * XTabContent children with a `label` prop. It adapts them to CTabs' `names`
 * API and injects the children into each panel by index, so authors never need
 * to remember dynamic slot names.
 */


const {
  align = 'left',
  dense = false
} = defineProps<{
  /** Align tabs within the tab bar */
  align?: 'left' | 'center' | 'right'
  /** Compact tab header */
  dense?: boolean
}>()

const slots = useSlots()

const flatten = (children: ReadonlyArray<any>): any[] => {
  const out: any[] = []
  for (const ch of children) {
    if (isVNode(ch) && ch.type === Fragment && Array.isArray((ch as any).children)) {
      out.push(...flatten(((ch as any).children) as ReadonlyArray<any>))
    } else if (isVNode(ch)) {
      out.push(ch)
    }
  }
  return out
}

const isXTabContent = (v: any) => {
  if (!isVNode(v)) return false
  const t = v.type as { name?: string; __name?: string }
  const n = t?.name ?? t?.__name
  return n === 'XTabContent'
}

const items = computed(() => {
  const vnodes = flatten(slots.default?.() ?? [])
  return vnodes
    .filter(isXTabContent)
    .map((vnode, i) => {
      const p = (vnode.props ?? {}) as Partial<{ label: string; disabled: boolean; name: string | number }>
      return {
        key: vnode.key ?? i,
        label: p.label ?? `Tab ${i + 1}`,
        disabled: p.disabled ?? false,
        name: p.name ?? i,
        vnode
      }
    })
})
</script>
