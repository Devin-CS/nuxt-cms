<template>
<div
  class="c-collage"
  :style="rootStyle">
  <!-- 1st image -->
  <div class="c-collage__cell c-collage__first">
    <slot name="first"/>
  </div>

  <!-- 2nd image -->
  <div class="c-collage__cell c-collage__second">
    <slot name="second"/>
  </div>

  <!-- 3rd image -->
  <div class="c-collage__cell c-collage__third">
    <slot name="third"/>
  </div>

  <!-- 4th image -->
  <div class="c-collage__cell c-collage__fourth">
    <slot name="fourth"/>
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
 */

const { height = 700 } = defineProps<{ height?: number | string }>()

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
   [1190-1870]35.04%
   [1870-100%]3.86%
  */
  grid-template-columns:
    [left] 12.86% [c1]
    22.10% [c2]
    10.31% [c3]
    15.83% [c4]
    35.04% [c5]
    3.86% [right];

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
  overflow: hidden; /* crop media to the cell */
  display: block;
  position: relative; /* enable z-index layering per cell */
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
.c-collage__cell :deep(img),
.c-collage__cell :deep(picture),
.c-collage__cell :deep(video),
.c-collage__cell :deep(canvas) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Slot placements using CSS Grid line indices
   Note: Following your convention, interior gridlines are counted excluding the container edges.
   Mapping to CSS Grid lines (which include edges):
   - Columns have 5 interior lines → CSS Grid lines 2..6; left/right edges are 1 and 7.
   - Rows have 6 interior lines    → CSS Grid lines 2..7; top/bottom edges are 1 and 8.
*/
.c-collage__first {
  /* first image: left edge → 2nd column gridline; top → 1st row gridline; bottom → 4th */
  grid-column: left / c2;
  grid-row: r1 / r4;
  z-index: 3; /* should appear above second */
}

.c-collage__second {
  /* second image: left → 1st column gridline; right → edge; top → edge; bottom → 2nd row gridline */
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
