<template>
<!-- The slotted content should be the actual image (markdown image, q-img, inline SVG, etc.) -->
<div
  :class="['c-gallery-image', { 'pointer-none': pointerNone }]"
  :style="styleObject">
  <slot mdc-unwrap="p"/>
</div>
</template>

<script lang="ts" setup>
/**
 * CGalleryImage
 *
 * Positions its content within the closest CImageGallery using an API similar
 * to Quasar's QMenu: `anchor`, `self`, and `offset`.
 *
 * - `anchor`: point on the parent container to attach to (e.g., 'top left', 'center middle').
 * - `self`: point on this element that will align to the anchor (same value set as `anchor` by default).
 * - `offset`: [x, y] pixels or 'x,y' string; applied after alignment.
 * - width/height can be provided; otherwise content sizes itself.
 *
 * Tip: The stacking order follows DOM order: later siblings appear on top.
 */

type HPos = 'left' | 'middle' | 'right'
// Quasar allows both 'center' and 'middle' for horizontal/vertical; we map accordingly.
type VPos = 'top' | 'center' | 'bottom' | 'middle'

/** Position string like 'top left', 'center middle', etc. */
type AnchorString = `${VPos} ${HPos}` | 'center' | 'center middle' | 'middle center'

const {
  anchor = 'center middle',
  self,
  offset = [0, 0],
  width,
  height,
  zIndex,
  pointerNone = false
} = defineProps<{
  /** Parent point to attach to. Example: 'top left', 'center middle'. Default 'center middle'. */
  anchor?: AnchorString | string
  /** This element's point that aligns to the anchor. Defaults to `anchor`. */
  self?: AnchorString | string
  /** [x, y] pixel offset or comma string. */
  offset?: [number, number] | string
  /** Optional fixed width/height for the wrapper. Content can also size itself. */
  width?: number | string
  height?: number | string
  /** Optional z-index override. Normally DOM order controls stacking. */
  zIndex?: number | string
  /** If true, disables pointer events allowing clicks to pass through. */
  pointerNone?: boolean
}>()

const parseOffset = (v: [number, number] | string | undefined): [number, number] => {
  if (Array.isArray(v)) return [Number(v[0] || 0), Number(v[1] || 0)]
  if (typeof v === 'string') {
    const [x, y] = v.split(/[ ,]+/).map(Number)
    return [x || 0, y || 0]
  }
  return [0, 0]
}

const mapPos = (pos: string | undefined): { xPct: number, yPct: number } => {
  const s = String(pos || '').trim().toLowerCase()
  // Normalize shorthand 'center' or 'middle'
  const normalized = s === 'center' ? 'center middle' : s
  const [vRaw, hRaw] = normalized.split(/\s+/)
  const v = vRaw as VPos
  const h = hRaw as HPos
  const yPct = v === 'top' ? 0 : (v === 'bottom' ? 100 : 50)
  const xPct = h === 'left' ? 0 : (h === 'right' ? 100 : 50)
  return { xPct, yPct }
}

const styleObject = computed(() => {
  const a = mapPos(anchor)
  const s = mapPos(self ?? anchor)
  const [ox, oy] = parseOffset(offset)
  const w = toCssSize(width)
  const h = toCssSize(height)
  const zi = zIndex !== undefined ? String(zIndex) : undefined
  return {
    left: `${a.xPct}%`,
    top: `${a.yPct}%`,
    transform: `translate(${-s.xPct}%, ${-s.yPct}%) translate(${ox}px, ${oy}px)`,
    width: w,
    height: h,
    zIndex: zi
  } as Record<string, string | number | undefined>
})
</script>

<style scoped lang="scss">
.c-gallery-image {
  position: absolute;
  /* By default, let slotted content size naturally if width/height not set */
  display: inline-block;
}
.pointer-none { pointer-events: none; }
</style>
