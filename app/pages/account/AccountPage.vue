<template>
<div class="q-pa-md">
	<h1 class="text-h5 q-mb-md">
		Account
	</h1>

	<div
		v-if="loggedIn"
		class="q-gutter-y-sm">
		<div>
			<b>Name:</b>
			{{ user?.name || user?.nickname || user?.email }}
		</div>
		<div>
			<b>Email:</b>
			{{ user?.email }}
		</div>

		<div class="q-mt-md">
			<q-separator/>
			<div class="text-caption text-grey-7">
				Raw session user
			</div>
			<pre style="white-space: pre-wrap">{{ user }}</pre>
		</div>
	</div>

	<div v-else>
		<q-banner
			dense
			class="bg-amber-2 text-amber-10">
			You are not logged in.
		</q-banner>
	</div>
</div>
</template>

<script setup lang="ts">
const { ready, loggedIn, user, fetch } = useUserSession()

if (!ready.value) {
  await fetch()
}
</script>
