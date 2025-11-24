<template>
<span
	class="cursor-pointer"
	tabindex="0">
	<slot/>
	<q-tooltip
		class="bg-white text-pine text-body1 shadow-4"
		max-width="300px"
		transition-show="scale"
		transition-hide="scale">
		{{ text }}
	</q-tooltip>
</span>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>
