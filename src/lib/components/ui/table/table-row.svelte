<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";
  import { fly } from "svelte/transition";

  type $$Props = HTMLAttributes<HTMLTableRowElement> & {
    "data-state"?: unknown;
    flyInDelay?: number;
  };

  let className: $$Props["class"] = undefined;
  export { className as class };
  export let flyInDelay = 0;
</script>

<tr in:fly={{ x: -150, delay: flyInDelay }} class={cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)} {...$$restProps} on:click on:keydown>
  <slot />
</tr>
