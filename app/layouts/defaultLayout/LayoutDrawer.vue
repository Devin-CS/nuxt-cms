<template>
<q-drawer
  class="bg-primary"
  :model-value="opened"
  side="left"
  overlay
  behavior="mobile"
  @hide="panel = 'home'"
  @update:model-value="$emit('update', $event)">
  <q-scroll-area class="fit">
    <q-toolbar>
      <q-toolbar-title>
        <img
          alt="Logo"
          src="@/assets/logo.svg"
          :width="246">
      </q-toolbar-title>
    </q-toolbar>

    <q-tab-panels
      v-model="panel"
      class="bg-primary text-white">
      <q-tab-panel name="home">
        <q-list>
          <q-item
            v-for="{ title, children = [] } in menu"
            :key="title"
            v-ripple
            active-class="text-white"
            clickable
            @click.stop.prevent="panel = title">
            <q-item-section>
              {{ title }}
            </q-item-section>
            <q-item-section
              v-if="children.length"
              avatar>
              <q-btn
                flat
                round
                icon="o_chevron_right"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <q-tab-panel
        v-for="{ title, children } in childPanels"
        :key="title"
        :name="title">
        <q-list>
          <!-- back button -->
          <q-item
            v-ripple
            clickable
            @click.stop.prevent="panel = 'home'">
            <q-item-section avatar>
              <q-btn
                flat
                round
                icon="o_chevron_left"/>
            </q-item-section>
            <q-item-section>
              {{ title }}
            </q-item-section>
          </q-item>

          <q-separator
            color="white"
            inset
            spaced="lg"/>

          <!-- child pages -->
          <q-item
            v-for="child in children"
            :key="child.title"
            v-ripple
            active-class="text-white"
            :to="child.path"
            clickable>
            <q-item-section>
              <q-item-label>
                {{ child.title }}
              </q-item-label>
              <q-item-label
                caption
                class="text-grey">
                {{ child.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>

    <q-separator
      color="white"
      inset
      spaced="lg"/>

    <div class="q-px-md">
      <q-btn
        class="full-width"
        label="Find a Donor"
        color="positive"/>
      <q-input
        v-model="searchText"
        placeholder="Search for donor by number"
        class="q-mt-md"
        square
        dense
        bg-color="white"
        filled>
        <template #append>
          <q-btn
            round
            dense
            flat
            icon="o_search"/>
        </template>
      </q-input>
    </div>
  </q-scroll-area>
</q-drawer>
</template>

<script setup lang="ts">
const { menu = [] } = defineProps<{
  opened: boolean
  menu?: Menu[]
}>()
defineEmits<{ update: [opened: boolean] }>()

const panel = ref('home')
const searchText = ref('')

const childPanels = computed(
  () => menu.filter(({ children = [] }) => children.length)
)
</script>
