<template>
<q-card flat>
	<!-- Header link (no button) with arrow; text can wrap naturally -->
	<q-card-section class="q-pb-none">
		<NuxtLink
			:to="path"
			class="menu-card__header q-px-sm q-py-sm"
			aria-label="Go to section">
			<span class="menu-card__title text-weight-bold text-h4">{{ title }}</span>
			<q-icon
				name="o_arrow_right_alt"
				size="sm"
				class="menu-card__arrow"/>
		</NuxtLink>
	</q-card-section>

	<q-card-section class="q-px-md q-pt-sm">
		<slot/>
	</q-card-section>
</q-card>
</template>

<script setup lang="ts">
defineProps<{ title: string, path: string }>()
</script>

<style lang="scss" scoped>
/* MenuCard header as a plain link (not a button) that can wrap */
.menu-card__header {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: inherit; /* rely on parent text color (shell) */
}

.menu-card__title {
  white-space: normal;         /* allow wrapping when space is tight */
  overflow-wrap: anywhere;     /* break long words if needed */
  line-height: 1.25;
}

.menu-card__arrow {
  flex: 0 0 auto;              /* keep arrow compact */
}

/* Hover/focus affordance without button chrome */
.menu-card__header:focus-visible,
.menu-card__header:hover {
  text-decoration: none; /* no underline on hover/focus */
}

/* Arrow animation: on hover, shoot further to the right, then fade */
.menu-card__arrow {
  transition:
    transform 260ms cubic-bezier(.22,.61,.36,1), /* snappy ease-out */
    opacity 200ms ease 120ms;                    /* fade after motion starts */
}
.menu-card__header:hover .menu-card__arrow,
.menu-card__header:focus-visible .menu-card__arrow {
  transform: translateX(20px);
  opacity: 0;
}
</style>
