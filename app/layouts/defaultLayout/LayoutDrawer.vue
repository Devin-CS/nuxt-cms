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
            v-for="menu in megaMenu"
            :key="menu.label"
            v-ripple
            :to="menu.path"
            clickable>
            <q-item-section>
              {{ menu.label }}
            </q-item-section>
            <q-item-section
              v-if="menu.children.length"
              avatar>
              <q-btn
                flat
                round
                icon="chevron_right"
                @click.stop.prevent="panel = menu.label"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <q-tab-panel
        v-for="childPanel in childPanels"
        :key="childPanel.label"
        :name="childPanel.label">
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
              {{ childPanel.label }}
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item
            v-for="menu in childPanel.children"
            :key="menu.label"
            v-ripple
            :to="menu.path"
            clickable>
            <q-item-section>
              {{ menu.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-scroll-area>
</q-drawer>
</template>

<script setup lang="ts">
const { megaMenu } = defineProps<{ opened: boolean, megaMenu: MegaMenu }>()
defineEmits<{ update: [opened: boolean] }>()

const panel = ref('home')
console.log('panel: ', panel.value)

const childPanels = computed(() => megaMenu.filter(menu => menu.children.length))
</script>
