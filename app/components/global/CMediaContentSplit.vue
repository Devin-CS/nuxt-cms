<template>
<q-card
  class="transparent"
  flat>
  <q-card-section horizontal>
    <div
      v-if="$slots.media"
      class="col-6">
      <slot
        mdc-unwrap="p"
        name="media"/>
    </div>

    <q-card-section v-if="$slots.content || $slots.actions">
      <slot name="content"/>
      <slot name="actions"/>
    </q-card-section>
  </q-card-section>
</q-card>
</template>
