// plugins/force-dark.ts
export default defineNuxtPlugin(() => {
  const $q = useQuasar()
  // Force dark and keep it
  $q.dark.set(true)
})
