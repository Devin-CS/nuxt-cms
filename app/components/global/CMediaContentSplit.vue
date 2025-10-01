<template>
<q-card
  class="my-card"
  flat
  bordered>
  <q-card-section horizontal>
    <slot
      v-if="$slots.media"
      name="media"
      class="col-6"/>

    <q-card-section>
      <slot
        v-if="$slots.content"
        name="content"/>
    </q-card-section>
  </q-card-section>
</q-card>
</template>
