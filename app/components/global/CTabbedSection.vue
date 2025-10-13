<template>
<!-- MOBILE: Select variant (default) -->
<q-select
  v-if="showSelect"
  v-model="selectedTab"
  bg-color="aqua"
  filled
  hide-dropdown-icon
  popup-content-class="bg-aqua"
  :options="tabs">
  <template #selected-item="{ opt }">
    <span class="ellipses text-shell text-h4">{{ opt }}</span>
  </template>
  <template #append>
    <q-icon
      name="o_keyboard_arrow_down"
      class="text-shell"/>
  </template>
  <template #option="{ itemProps, selected, label }">
    <q-item
      v-bind="itemProps"
      :class="{ 'bg-shadow': selected }">
      <q-item-section>
        <q-item-label class="text-shell text-h4">
          {{ label }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </template>
</q-select>

<!-- MOBILE: Expansion (accordion) variant -->
<template v-else-if="showExpansion">
  <q-expansion-item
    v-for="(label, i) in tabs"
    :key="i"
    class="border-pine"
    :label="label"
    :group="expansionGroup"
    :default-opened="selectedTab === label"
    @show="selectedTab = label">
    <div class="q-px-lg">
      <slot
        v-if="$slots[`tab-${i + 1}`]"
        :name="`tab-${i + 1}`"
        mdc-unwrap="p"/>
    </div>
  </q-expansion-item>
</template>

<!-- DESKTOP/TABLET and forced mobile tabs -->
<q-tabs
  v-else
  v-model="selectedTab">
  <q-tab
    v-for="(label, i) in tabs"
    :key="i"
    :label="label"
    :name="label"/>
</q-tabs>

<q-separator v-if="showSeparator"/>

<!-- Hide panels when using expansion on mobile to avoid duplicate content -->
<q-tab-panels
  v-if="showPanels"
  v-model="selectedTab"
  class="transparent">
  <q-tab-panel
    v-for="(label, i) in tabs"
    :key="i"
    :name="label"
    class="q-px-none">
    <slot
      v-if="$slots[`tab-${i + 1}`]"
      :name="`tab-${i + 1}`"
      mdc-unwrap="p"/>
  </q-tab-panel>
</q-tab-panels>
</template>

<script lang="ts" setup>
/**
 * CTabbedSection
 *
 * A tabbed section built with Quasar QTabs/QTabPanels.
 * Use the `tabs` prop to declare tab labels, and provide per-tab content
 * via named slots: tab-1, tab-2, ... matching indices + 1 in the tabs array.
 *
 * On small screens, choose the navigation via `mobileVariant`:
 *  - 'select' (default) uses QSelect
 *  - 'expansion' uses QExpansionItem per tab
 *  - 'tabs' forces QTabs even on mobile
 */
const { tabs, mobile = 'select' } = defineProps<{
  tabs: string[]
  mobile?: 'select' | 'expansion' | 'tabs'
}>()

const initialTab = computed(() => (tabs.length > 0 ? (tabs[0] ?? null) : null))
const selectedTab = ref(initialTab.value)

const $q = useQuasar()
const isMobile = computed(() => $q.screen.lt.md)
const isDesktopOrTablet = computed(() => $q.screen.gt.sm)

// Use Quasar's accordion mode by grouping expansion items so only one is open at a time
const instance = getCurrentInstance()
const expansionGroup = `ctabbed-${instance ? instance.uid : '0'}`

const showSelect = computed(() => isMobile.value && mobile === 'select')
const showExpansion = computed(() => isMobile.value && mobile === 'expansion')
const showSeparator = computed(() => isDesktopOrTablet.value || (isMobile.value && mobile === 'tabs'))
const showPanels = computed(() => !(isMobile.value && mobile === 'expansion'))
</script>

<style lang="scss" scoped>
.border-pine {
  border: 1px solid $pine;
}
</style>
