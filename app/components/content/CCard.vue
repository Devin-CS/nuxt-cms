<template>
<q-card
  flat
  bordered
  square>
  <slot
    name="media"
    mdc-unwrap="p"/>

  <q-card-section class="text-h6">
    {{ title }}
  </q-card-section>

  <q-card-section class="q-pt-none">
    <slot mdc-unwrap="p">
      Card Description
    </slot>
  </q-card-section>
</q-card>
</template>

<script lang="ts" setup>
const { title = 'Card Title' } = defineProps<{
  title?: string
}>()
</script>
