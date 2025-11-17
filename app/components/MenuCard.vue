<template>
<q-card flat>
  <q-card-section class="q-pb-none">
    <c-button
      color="shell"
      arrow
      size="lg"
      dense
      square
      padding="none sm"
      :label="title"
      :to="path"
      flat/>
  </q-card-section>
  <q-card-section class="q-px-md q-pt-sm">
    <slot/>
  </q-card-section>
</q-card>
</template>

<script setup lang="ts">
defineProps<{ title: string, path: string }>()
</script>

<style lang="scss" scoped>
/* Allow long button labels to wrap on small screens only (xs/sm)
   Quasar's q-btn labels are nowrap by default; we relax that here
   inside MenuCard so tall labels can flow onto multiple lines. */
@media (max-width: 1023.98px) {
  /* Target the internal content of the button rendered by <c-button> */
  :deep(.q-btn__content) {
    white-space: normal; /* allow wrapping */
  }
  /* Quasar may use .q-btn__label or plain spans with .block/.ellipsis */
  :deep(.q-btn__label),
  :deep(.q-btn .block),
  :deep(.q-btn .ellipsis) {
    white-space: normal;     /* remove nowrap */
    overflow-wrap: anywhere; /* wrap long words */
    word-break: normal;
    text-overflow: clip;
    line-height: 1.25;       /* comfortable multi-line */
  }
}
</style>
