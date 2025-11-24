<template>
<div
	:class="['c-flow', direction, justifyClass, itemsClass]"
	:style="cssVars">
	<slot/>
	<!-- Note: prefer Quasar utility classes for layout; styles are minimal (width/height/gap) -->
</div>
</template>

<script lang="ts" setup>
/**
 * CFlow
 *
 * A lightweight flexbox container that favors Quasar utility classes
 * over custom CSS. It exposes common layout props and applies only
 * minimal inline styles for size and gap when necessary.
 */
const {
  width,
  height,
  /** Flex direction */
  direction = 'row',
  /** Main‑axis distribution (maps to Quasar justify-*) */
  justify,
  /** Cross‑axis alignment (maps to Quasar items-*) */
  items,
  /** Spacing between children. Use 'none' for no gap. */
  gap
} = defineProps<{
  width?: number | string
  height?: number | string
  direction?: 'row' | 'column'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  items?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()

const justifyClass = computed(() => (justify ? `justify-${justify}` : undefined))
const itemsClass = computed(() => (items ? `items-${items}` : undefined))

const cssVars = computed(() => {
  const vars: Record<string, string> = {}
  const w = toCssSize(width)
  const h = toCssSize(height)
  if (w) vars.width = w
  if (h) vars.height = h
  if (gap) vars.gap = gap === 'none' ? '0' : toGapSize(gap as 'xs' | 'sm' | 'md' | 'lg' | 'xl')
  return vars
})
</script>

<style lang="scss" scoped>
.c-flow {
  display: flex;
  /* No default gap; when provided via prop it becomes inline style */
}
</style>
