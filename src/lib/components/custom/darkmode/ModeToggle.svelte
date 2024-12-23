<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Moon, Sun } from 'lucide-svelte';
	import { resetMode, setMode, mode } from 'mode-watcher';
	import {fly } from 'svelte/transition';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="w-9 px-0">
			{#if $mode == 'light'}
				<div in:fly={{y:10}}>
					<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
				</div>
			{:else}
				<div in:fly={{y:-10}}>
					<Moon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
				</div>
			{/if}
			<span class="sr-only">Toggle theme</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
