<script lang="ts">
  import { page } from "$app/stores";
  import { cn } from "$lib/utils";

  export let href: string;
  export let open: boolean;
  export let bg_photo: string = "";

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<a
  {href}
  on:click={() => (open = false)}
  style="background-image:url({bg_photo});"
  class={cn(
    "text-2xl font-semibold no-underline underline-offset-0 h-16 flex justify-start items-center p-2 bg-cover bg-center",
    $page.url.pathname === href ? "text-foreground" : "text-foreground/60",
    className,
  )}
  {...$$restProps}
>
  <slot />
</a>
