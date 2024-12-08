<script lang="ts">
  import PublicMainNav from "$lib/components/custom/navigation/PublicMainNav.svelte";
  import PublicMobileNav from "$lib/components/custom/navigation/PublicMobileNav.svelte";

  import logo from "$lib/photos/logo_original.png";
</script>

<header
  class="sticky top-0 h-0 z-50 w-full border-b bg-background/95
shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center"
>
  <div
    class="container h-0 w-full flex flex-row-reverse h-20 md:flex-row items-center justify-center"
  >
    <PublicMainNav />
    <PublicMobileNav />
  </div>
</header>

<style>
</style>
