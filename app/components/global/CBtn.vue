<template>
<q-btn
  :label="label"
  :flat="flat"
  :color="color"
  :icon-right="iconRight"
  :text-color="textColor"/>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** Button label shown on the button. Default: "Button" */
  label?: string
  /** Flat style (no background). Default: false */
  flat?: boolean
  /** Button color limited to brand palette plus white/black. Default: 'primary' */
  color?: 'primary' | 'secondary' | 'accent' | 'positive' | 'negative' | 'info' | 'warning' | 'white' | 'black'
  /** Toggle to show a right arrow icon. Default: false */
  arrow?: boolean
}>(), {
  label: 'Button',
  flat: false,
  color: 'white',
  arrow: false
})

const iconRight = computed(() => props.arrow ? 'o_arrow_right_alt' : undefined)

// Ensure readable contrast for solid white/black backgrounds
const textColor = computed(() => {
  if (props.flat) return undefined
  if (props.color === 'white') return 'black'
  if (props.color === 'black') return 'white'
  return undefined
})
</script>
