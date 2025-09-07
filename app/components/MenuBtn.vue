<template>
<q-btn
  :label
  :rounded="false"
  flat
  class="text-weight-bold"
  :class="{ 'q-tab--active': menu }"
  @mouseenter="overBtn = true"
  @mouseleave="overBtn = false">
  <div
    class="q-tab__indicator absolute-bottom"/>

  <q-menu
    v-model="menu"
    :offset="[0, -19]"
    square
    class="bg-primary text-white"
    no-parent-event
    target=".q-header"
    fit
    @mouseenter="overMenu = true"
    @mouseleave="overMenu = false">
    <div
      class="bg-accent q-mt-sm"
      style="height: 12px"/>
    <div class="row">
      <menu-card
        v-for="{ title, path, description } in cardData"
        :key="title"
        class="bg-primary col-4"
        :title
        :path>
        {{ description }}
      </menu-card>
    </div>
  </q-menu>
</q-btn>
</template>

<script setup lang="ts">
import { debounce } from 'quasar'

defineProps<{
  label: string
  cardData: Menu[]
}>()

const menu = ref(false)
const overBtn = ref(false)
const overMenu = ref(false)

const checkMenu = () => {
  menu.value = (overMenu.value || overBtn.value)
}

const debounceMenu = debounce(checkMenu, 150)

watch(overBtn, (newValue) => {
  if (newValue === false)
    debounceMenu()
  else checkMenu()
})
watch(overMenu, (newValue) => {
  if (newValue === false)
    debounceMenu()
  else checkMenu()
})
</script>

<style lang="scss" scoped>
.selected {
  border-bottom: inset 10px red;
}
</style>
