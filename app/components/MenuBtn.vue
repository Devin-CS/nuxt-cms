<template>
<q-btn
  :label
  :rounded="false"
  flat
  size="lg"
  padding="sm"
  class="text-weight-bold"
  :class="{ 'q-tab--active': menu }"
  @mouseenter="overBtn = true"
  @mouseleave="overBtn = false">
  <div
    class="q-tab__indicator absolute-bottom"/>

  <q-menu
    v-model="menu"
    :offset="[0, -12]"
    square
    class="bg-pine text-shell shadow-24"
    no-parent-event
    target=".q-header"
    fit
    @mouseenter="overMenu = true"
    @mouseleave="overMenu = false">
    <div
      class="bg-accent"
      style="height: 12px"/>
    <div class="row">
      <template v-for="{ title, path, description, header } in cardData">
        <menu-card
          v-if="header"
          :key="title"
          class="bg-pine col-4"
          :title
          :path>
          {{ description }}
        </menu-card>
      </template>
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
