<template>
<q-card
  class="transparent"
  flat>
  <q-card-section horizontal>
    <div class="col-6">
      <slot
        v-if="$slots.media"
        name="media"
        mdc-unwrap="p"/>
    </div>

    <q-card-section>
      <slot
        v-if="$slots.content"
        name="content"/>
    </q-card-section>
  </q-card-section>
</q-card>
</template>

<script setup lang="ts">
</script>
