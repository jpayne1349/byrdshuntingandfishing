<script lang="ts">
  import PublicMainNav from "$lib/components/custom/navigation/PublicMainNav.svelte";
  import PublicMobileNav from "$lib/components/custom/navigation/PublicMobileNav.svelte";

  import logo from "$lib/photos/logo_original.png";
  import { onMount } from "svelte";

  // supports-[backdrop-filter]:bg-foreground/10 shadow-sm
  onMount(setObserver);

  //change style on 'stuck'
  function setObserver() {
    const observer = new IntersectionObserver(
      ([e]) => e.target.toggleAttribute("data-stuck", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(document.querySelector("header") as Element);
  }
</script>

<header
  class="sticky -top-1 z-50 w-full data-[stuck]:bg-foreground/20 data-[stuck]:shadow-sm data-[stuck]:backdrop-blur-sm
 flex justify-center"
>
  <div
    class="container h-16 w-full flex flex-row-reverse md:flex-row items-center justify-center"
  >
    <PublicMainNav />
    <PublicMobileNav />
  </div>
</header>

<style>
</style>
