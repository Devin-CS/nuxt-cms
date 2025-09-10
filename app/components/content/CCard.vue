<template>
<q-card
  flat
  bordered
  square>
  <slot name="media"/>

  <q-card-section class="text-h6">
    <slot name="title"/>
  </q-card-section>

  <q-card-section class="q-pt-none">
    <slot/>
  </q-card-section>
</q-card>
</template>
