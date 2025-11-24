<template>
<div
	class="c-collage"
	:style="rootStyle">
	<!-- 1st image -->
	<div
		v-intersection="intersectionFirst"
		class="c-collage__cell c-collage__first relative-position overflow-hidden"
		:class="{ 'is-visible': !animate || isFirstVisible, 'will-animate': animate }">
		<slot
			name="first"
			mdc-unwrap="p"/>
	</div>

	<!-- 2nd image -->
	<div
		v-intersection="intersectionSecond"
		class="c-collage__cell c-collage__second relative-position overflow-hidden"
		:class="{ 'is-visible': !animate || isSecondVisible, 'will-animate': animate }">
		<slot
			name="second"
			mdc-unwrap="p"/>
	</div>

	<!-- 3rd image -->
	<div
		v-intersection="intersectionThird"
		class="c-collage__cell c-collage__third relative-position overflow-hidden"
		:class="{ 'is-visible': !animate || isThirdVisible, 'will-animate': animate }">
		<slot
			name="third"
			mdc-unwrap="p"/>
	</div>

	<!-- 4th image -->
	<div
		v-intersection="intersectionFourth"
		class="c-collage__cell c-collage__fourth relative-position overflow-hidden"
		:class="{ 'is-visible': !animate || isFourthVisible, 'will-animate': animate }">
		<slot
			name="fourth"
			mdc-unwrap="p"/>
	</div>
</div>
</template>

<script lang="ts" setup>
/**
 * CCollage
 *
 * Four-slot responsive collage using CSS Grid anchored to specified gridlines.
 * The layout scales horizontally with container width while keeping a fixed
 * component height. Provide images via markdown in named slots: "first",
 * "second", "third", "fourth".
 *
 * Animations:
 * - Uses Quasar's v-intersection directive to slide/fade cells up as they enter the viewport.
 * - Controlled by the `animate` prop (default: true).
 */
const { height = 700, animate = true } = defineProps<{ height?: number | string, animate?: boolean }>()

const rootStyle = computed(() => {
  let h: string
  if (typeof height === 'number') {
    h = `${height}px`
  }
  else {
    const raw = String(height).trim()
    h = /^\d+$/.test(raw) ? `${raw}px` : raw
  }
  return { height: h }
})

// visibility flags for intersection-triggered reveal
const isFirstVisible = ref(false)
const isSecondVisible = ref(false)
const isThirdVisible = ref(false)
const isFourthVisible = ref(false)

// Quasar v-intersection directive configs (trigger once)
const commonIntersectionCfg = { threshold: 0.1, rootMargin: '0px 0px 0px 0px' }

const intersectionFirst = {
  handler: (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) isFirstVisible.value = true
  },
  cfg: commonIntersectionCfg,
  once: true
}
const intersectionSecond = {
  handler: (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) isSecondVisible.value = true
  },
  cfg: commonIntersectionCfg,
  once: true
}
const intersectionThird = {
  handler: (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) isThirdVisible.value = true
  },
  cfg: commonIntersectionCfg,
  once: true
}
const intersectionFourth = {
  handler: (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) isFourthVisible.value = true
  },
  cfg: commonIntersectionCfg,
  once: true
}
</script>

<style scoped lang="scss">
/*
Base grid is derived from a 1945x1380 reference.
Column interior gridlines at: 250, 680, 880, 1190, 1870 (px)
Row interior gridlines at:    180, 660, 740,  860, 1000, 1330 (px)
Converted to percentages of the reference and then expressed as segment sizes.
*/

.c-collage {
  position: relative;
  display: grid;
  width: 100%;

  /*
  Columns: 6 segments => 7 grid lines (including container edges)
  Segment percentages of width (approx):
   [0-250]   12.86%
   [250-680] 22.10%
   [680-880] 10.31%
   [880-1190]15.83%
   [1190-→c5] 33.10%   (tuned to move c5 left)
   [right gutter] 5.80%   (≈ vertical gap r2→r3)
  */
  grid-template-columns:
    [left] 12.86% [c1]
    22.10% [c2]
    10.31% [c3]
    15.83% [c4]
    32.60% [c5]
    6.30% [right];

  /*
  Rows: 7 segments => 8 grid lines (including container edges)
  Segment percentages of height (approx):
   [0-180]    13.04%
   [180-660]  34.78%
   [660-740]  5.80%
   [740-860]  8.70%
   [860-1000] 10.14%
   [1000-1330]23.91%
   [1330-100%]3.62%
  */
  grid-template-rows:
    [top] 13.04% [r1]
    34.78% [r2]
    5.80% [r3]
    8.70% [r4]
    10.14% [r5]
    23.91% [r6]
    3.62% [bottom];
}

/* Ensure grid items can shrink to track size and crop overflowing media */
.c-collage__cell {
  min-width: 0;
  min-height: 0; /* critical: allow rows to keep their defined sizes */
  display: block;
}

/* Reset MDC wrappers so they don't add margins or collapse height */
.c-collage__cell :deep(p),
.c-collage__cell :deep(figure) {
  margin: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* Ensure any media content fills and crops to its assigned area */
/* Quasar QImg wrappers should fill the grid cell */
.c-collage__cell :deep(.q-img),
.c-collage__cell :deep(.q-img__content) {
  width: 100%;
  height: 100%;
  display: block;
}
/* Media elements and QImg's inner image cover the area */
.c-collage__cell :deep(img),
.c-collage__cell :deep(picture),
.c-collage__cell :deep(video),
.c-collage__cell :deep(canvas),
.c-collage__cell :deep(.q-img__image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Reveal-on-scroll animation using Quasar v-intersection
   - Initial state: shifted down and transparent when `.will-animate` is present
   - Visible state: `.is-visible` removes shift and fades in
*/
.c-collage__cell.will-animate {
  opacity: 0;
  transform: translate3d(0, 64px, 0);
  transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 700ms ease-out;
  will-change: transform, opacity;
}
.c-collage__cell.will-animate.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
/* Staggered delays for a nicer cascade */
.c-collage__first.will-animate { transition-delay: 0ms; }
.c-collage__second.will-animate { transition-delay: 200ms; }
.c-collage__third.will-animate { transition-delay: 400ms; }
.c-collage__fourth.will-animate { transition-delay: 600ms; }

/* Accessibility: respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .c-collage__cell.will-animate {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}

/* Slot placements using CSS Grid line indices
   Note: Following your convention, interior gridlines are counted excluding the container edges.
   Mapping to CSS Grid lines (which include edges):
   - Columns have 5 interior lines → CSS Grid lines 2..6; left/right edges are 1 and 7.
   - Rows have 6 interior lines    → CSS Grid lines 2..7; top/bottom edges are 1 and 8.
*/
.c-collage__first {
  /* first image: left edge → 2nd column gridline; top → 1st row gridline; bottom → DevTools gridline 5 (named r4) */
  grid-column: left / c2;
  grid-row: r1 / r4;
  z-index: 3; /* should appear above second */
}

.c-collage__second {
  /* second image: left → 1st column gridline; right → edge; top → edge; bottom → DevTools gridline 3 (named r2) */
  grid-column: c1 / right;
  grid-row: top / r2;
  z-index: 2;
}

.c-collage__third {
  /* third image: left → 1st column gridline; right → 4th; top → 5th row gridline; bottom → edge */
  grid-column: c1 / c4;
  grid-row: r5 / bottom;
  z-index: 3; /* should appear above fourth */
}

.c-collage__fourth {
  /* fourth image: left → 3rd column gridline; right → 5th; top → 3rd row gridline; bottom → 6th */
  grid-column: c3 / c5;
  grid-row: r3 / r6;
  z-index: 2;
}
</style>
