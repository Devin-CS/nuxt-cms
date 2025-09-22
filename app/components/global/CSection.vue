<template>
<section
  :class="[bgClass, textClass]">
  <q-card
    class="transparent q-mx-auto"
    style="max-width: 900px"
    flat>
    <q-card-section>
      <h2 class="text-h2 text-center q-mb-sm">
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="text-subtitle1 text-center">
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
const {
  background,
  text
} = defineProps<{
  /** CTA title text */
  title: string
  /** CTA description text */
  description?: string
  /** Background color using custom brand palette or transparent */
  background?: 'transparent' | BrandColor
  /** Text color to apply to content; cascades to children */
  text?: BrandColor
}>()

const bgClass = computed(() => {
  if (!background) return undefined
  return background === 'transparent' ? 'bg-transparent' : `bg-${background}`
})

const textClass = computed(() => text ? `text-${text}` : undefined)
</script>

<style scoped lang="scss">

</style>
