<template>
<section
  :class="[bgClass, textClass]"
  class="c-collage-section q-ma-none">
  <div
    class="c-collage-section__grid q-pa-md"
    :style="cssVars">
    <section
      v-if="$slots.title || $slots.description || $slots.actions"
      class="content self-center q-mb-xl">
      <div
        v-if="$slots.title"
        class="text-h4 q-mb-sm">
        <slot name="title"/>
      </div>
      <div
        v-if="$slots.description"
        class="text-body1 q-mb-md">
        <slot name="description"/>
      </div>
      <div
        v-if="$slots.actions"
        class="row items-center q-gutter-sm q-gutter-y-sm q-mt-sm">
        <slot
          name="actions"
          mdc-unwrap="p"/>
      </div>
    </section>

    <figure
      v-if="$slots.media"
      class="media q-ma-none self-end">
      <!-- Allow markdown to unwrap <p> around the media slot -->
      <slot
        name="media"
        mdc-unwrap="p"/>
    </figure>
  </div>
</section>
</template>

<script lang="ts" setup>
/**
 * CCollageSection
 *
 * A two-column container tailored for the CCollage component:
 * - Content on the left, media (collage) on the right.
 * - Desktop split is 40/60 in favor of media.
 * - Asymmetric gutters: half padding on the left, zero padding on the right so
 *   media can sit flush with the viewport edge.
 * - Collage can bleed upward out of this section (default ~75px).
 */
const {
  /** Background color using custom brand palette or transparent */
  background = 'transparent',
  /** Optional text color token to cascade */
  text,
  /** Percent of width the content column takes on desktop (0–100). Default 40 */
  contentPct = 40,
  /** Upward bleed amount for media (px or any CSS size). Default ~38 (half of previous) */
  bleedTop = 38,
  /** Approximate container height (applied as min-height on desktop). Default 648 */
  height = 648
} = defineProps<{
  background?:
    | 'transparent'
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  text?:
    | 'aqua' | 'aster' | 'birch' | 'elm' | 'eucalyptus'
    | 'fern' | 'juniper' | 'pine' | 'poppy' | 'saffron'
    | 'shadow' | 'shell' | 'sky' | 'violet' | 'willow'
  contentPct?: number | string
  bleedTop?: number | string
  height?: number | string
}>()

const bgClass = computed(() => (!background || background === 'transparent' ? 'transparent' : `bg-${background}`))
const textClass = computed(() => (text ? `text-${text}` : undefined))

function toCssSize(v: number | string | undefined, fallback: string): string {
  if (v == null) return fallback
  if (typeof v === 'number') return `${v}px`
  const raw = String(v).trim()
  return /^\d+$/.test(raw) ? `${raw}px` : raw
}

const cssVars = computed(() => {
  // normalize content percentage as a number 0..100
  let pctNum: number
  if (typeof contentPct === 'number') {
    pctNum = contentPct
  }
  else {
    const n = parseFloat(String(contentPct))
    pctNum = isNaN(n) ? 40 : n
  }
  pctNum = Math.max(0, Math.min(100, pctNum))

  return {
    '--ccs-content-pct': `${pctNum}%`,
    '--ccs-media-pct': `${100 - pctNum}%`,
    '--ccs-bleed-top': toCssSize(bleedTop, '38px'),
    '--ccs-height': toCssSize(height, '648px')
  } as Record<string, string>
})
</script>

<style scoped lang="scss">
/* Break out to full viewport width so media can align to the right edge even
   when nested inside a centered/narrow parent container. */
.c-collage-section {
  position: relative;
  /* Keep vertical bleed visible; clip tiny horizontal overflow to prevent page scrollbars */
  overflow-y: visible;
  /* Provide broad fallback first; then use clip where supported */
  overflow-x: hidden;
  overflow-x: clip;
  /* Avoid 100vw scrollbar issues; keep element in normal flow */
  width: 100%;
  transform: none;
}

.c-collage-section__grid {
  display: grid;
  gap: 24px;
  /* Mobile/default: stack with comfortable side padding */
  grid-template-columns: 1fr;
}

/* Desktop layout: 40/60 with larger left gutter (≈3× previous) and zero right gutter */
  @media (min-width: 1024px) {
  .c-collage-section { min-height: var(--ccs-height, 648px); }
  .c-collage-section__grid {
    grid-template-columns: var(--ccs-content-pct, 40%) var(--ccs-media-pct, 60%);
    /* Use a scalable base padding; left is triple the previous (1.5× base), right is zero. */
    --_base-pad: clamp(24px, 6vw, 96px);
    padding: 0 0 0 calc(var(--_base-pad) * 1.5);
    /* Top-align items so the collage can bleed upward cleanly */
    align-items: start;
  }
}

/* Media (collage) column tweaks */
.media {
  position: relative;
  z-index: 1; /* ensure collage paints above neighbors when bleeding */
  /* Upward bleed */
  margin-top: calc(var(--ccs-bleed-top, 38px) * -1);
}

/* Ensure slotted collage spans full column; let it manage its own height/grid */
.media :deep(.c-collage) {
  width: 100%;
  /* do not override height or display; CCollage sets its own fixed height and display:grid */
}

/* Let content read comfortably; don’t constrain with a max-width here to honor the 40% column */
.content {
  min-width: 0; /* prevent overflow from long words */
}
</style>
