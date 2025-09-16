<template>
<section>
  <q-card>
    <q-card-section>
      <h2 class="text-h2">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="text-subtitle2">
        {{ description }}
      </p>
    </q-card-section>
    <q-card-actions align="center">
      <slot name="buttons"/>
    </q-card-actions>
  </q-card>

  <slot name="content"/>
</section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  /** CTA title text */
  title: string
  /** CTA description text */
  description?: string
  /** Background color using brand palette or transparent */
  background?: | 'white' | 'black' | 'dark' | 'transparent' | 'primary' | 'secondary' | 'accent' | 'positive' | 'negative' | 'info' | 'warning'
}>(), {
  background: 'transparent'
})
</script>

<style scoped lang="scss">

</style>
