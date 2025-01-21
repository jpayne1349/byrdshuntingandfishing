<script lang="ts">
  import { BadgeCheck, BadgeInfo, BadgeX, Loader2, X } from "lucide-svelte";
  import * as Alert from "$lib/components/ui/alert";
  import { fade } from "svelte/transition";
  import { alertStore, shiftAlertQueue } from "$lib/stores/alert";

  export let title: string;
  export let description: string;
  export let style: string;

  // TODO: ADD A CANCEL BUTTON for the current 'activeAlert' on the store

  function cancelCurrentAlert() {
    $alertStore.active?.destroyAlert();
    shiftAlertQueue();
  }
</script>

<Alert.Root class="w-96 relative" {style}>
  {#if style == "info"}
    <BadgeInfo class="h-5 w-5 -mt-0.5" />
  {:else if style == "success"}
    <BadgeCheck class="h-5 w-5 -mt-0.5 stroke-green-700" />
  {:else if style == "fail"}
    <BadgeX class="h-5 w-5 -mt-0.5 stroke-red-700" />
  {:else if style == "operation"}
    <Loader2 class="h-4 w-4  animate-spin" />
  {/if}
  <Alert.Title>{title}</Alert.Title>
  <Alert.Description>{description}</Alert.Description>
  <button
    class="absolute right-1 top-1 flex justify-end items-start w-6 h-6"
    on:click={cancelCurrentAlert}
  >
    <X class="w-4 h-4"></X>
  </button>
</Alert.Root>
