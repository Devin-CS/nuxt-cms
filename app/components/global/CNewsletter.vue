<template>
<section class="c-newsletter">
  <!-- Left: Content (markdown slot) over watercolor bg -->
  <div class="c-newsletter__left">
    <slot/>
  </div>

  <q-form
    class="c-newsletter__form flex items-center wrap q-gutter-xs q-py-xs-sm q-pa-xl"
    @submit.prevent="onSubmit">
    <q-input
      v-model="email"
      style="min-width: 275px"
      class="email-input"
      label="Enter your email"
      type="email"
      :error="showError"
      :error-message="errorMessage"/>
    <q-btn
      label="Subscribe"
      color="aqua"
      text-color="shell"
      type="submit"/>
  </q-form>
</section>
</template>

<script lang="ts" setup>
/**
 * CNewsletter
 *
 * Full-width, two-column newsletter sign-up section.
 * Left side renders arbitrary markdown (single default slot) over a
 * watercolor background that swaps on mobile. Right side contains a
 * simple email form. Button wraps under input when space is tight and
 * the whole section stacks on mobile.
 */
const emit = defineEmits<{
  // Emitted when the form is submitted with a valid email
  (e: 'submit', payload: { email: string }): void
}>()

const email = ref('')

const showError = ref(false)
const errorMessage = ref('Please enter a valid email address')

const onSubmit = () => {
  if (!isValidEmail(email.value)) {
    showError.value = true
    return
  }
  showError.value = false
  emit('submit', { email: email.value.trim() })
  email.value = ''
}
</script>

<style lang="scss" scoped>
.c-newsletter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  /* Prevent any child from creating horizontal scroll on small screens */
  overflow-x: clip;
}

.c-newsletter__left {
  /* Watercolor background only on left half */
  background-image: url('~/assets/backgrounds/watercolor-desktop.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left center;
  background-origin: border-box;
  /* Text must be readable over darker bg on desktop/tablet */
  color: $shell;
  padding: 24px 200px 24px 24px;
}

@media (max-width: $breakpoint-sm-max) { /* Mobile */
  .c-newsletter__left {
    /* Swap to mobile background and switch text color to pine */
    background-image: url('~/assets/backgrounds/watercolor-mobile.png');
    background-position: center -125px;
    color: $pine;
    padding: 100px 12px 0 12px;
  }

  .c-newsletter { grid-template-columns: 1fr; }

  .email-input {
    width: 100%;
  }
}
</style>
