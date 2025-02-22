<script lang="ts">
  import { goto } from "$app/navigation";
  import { cn } from "$lib/utils";

  export let href: string;
  export let open: boolean;
  export let bg_photo: string = "";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<button
  on:click={() => {
    goto(href);
    open = false;
  }}
  style="background-image:url({bg_photo});"
  class={cn("text-2xl font-semibold no-underline underline-offset-0 h-20 flex justify-start items-center p-2 bg-cover bg-center", className)}
  {...$$restProps}
>
  <slot />
</button>
