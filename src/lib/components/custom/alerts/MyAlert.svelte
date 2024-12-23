<script lang="ts">
	import { BadgeCheck, BadgeInfo, BadgeX, Loader2 } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { fade } from 'svelte/transition';

	export let title: string;
	export let description: string;
	export let style: string;
</script>

<Alert.Root class="w-96" {style}>
	{#if style == 'info'}
		<BadgeInfo class="h-5 w-5 -mt-0.5"/>
	{:else if style == 'success'}
		<BadgeCheck class="h-5 w-5 -mt-0.5 stroke-green-700" />
	{:else if style == 'fail'}
		<BadgeX class="h-5 w-5 -mt-0.5 stroke-red-700" />
	{:else if style == 'operation'}
		<Loader2 class="h-4 w-4  animate-spin" />
	{/if}
	<Alert.Title>{title}</Alert.Title>
	<Alert.Description>{description}</Alert.Description>
</Alert.Root>

