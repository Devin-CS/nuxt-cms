<template>
<q-drawer
  :model-value="opened"
  side="left"
  overlay
  behavior="mobile"
  @update:model-value="$emit('update', $event)">
  <q-scroll-area class="fit">
    <q-tab-panels v-model="panel">
      <q-tab-panel name="home">
        <q-list>
          <q-item
            v-for="{ title, path, children = [] } in menu"
            :key="title"
            v-ripple
            :to="path"
            clickable>
            <q-item-section>
              {{ title }}
            </q-item-section>
            <q-item-section
              v-if="children.length"
              avatar>
              <q-btn
                flat
                round
                icon="chevron_right"
                @click.stop.prevent="panel = title"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <q-tab-panel
        v-for="{ title, children } in childPanels"
        :key="title"
        :name="title">
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-btn
                flat
                round
                icon="chevron_left"
                @click="panel = 'home'"/>
            </q-item-section>
            <q-item-section>
              {{ title }}
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item
            v-for="{ title: childTitle, path } in children"
            :key="childTitle"
            v-ripple
            :to="path"
            clickable>
            <q-item-section>
              {{ childTitle }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
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

const childPanels = computed(
  () => menu.filter(({ children = [] }) => children.length)
)
</script>
