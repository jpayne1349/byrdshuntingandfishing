<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { BadgeInfo, ShieldHalf } from "lucide-svelte";

  let open = false;
  let destroyTimer: NodeJS.Timeout;
  let afterClickOpenDuration = 5000;

  /**
   * Allows for mobile use of the tooltip on click
   * Has a timer and clear timer setup
   */
  function toggleOpenState() {
    open = !open;
    if (destroyTimer) {
      clearTimeout(destroyTimer);
      console.log(destroyTimer);
    }

    destroyTimer = setTimeout(() => {
      if (open) {
        open = false;
      }
    }, afterClickOpenDuration);
  }
</script>

<Tooltip.Root bind:open>
  <Tooltip.Trigger>
    <button type="button" on:click={toggleOpenState}>
      <ShieldHalf class="h-4 w-4 stroke-muted-foreground"></ShieldHalf>
    </button>
  </Tooltip.Trigger>
  <Tooltip.Content class="text-muted-foreground">
    <p>All passwords must contain:</p>
    <ul class="ml-6 list-disc">
      <li>8 character minimum</li>
      <li>1 or more symbol ( !@#$%^&* )</li>
      <li>1 or more uppercase</li>
      <li>1 or more lowercase</li>
      <li>1 or more number</li>
    </ul>
  </Tooltip.Content>
</Tooltip.Root>

<style>
</style>
