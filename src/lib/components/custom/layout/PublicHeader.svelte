<script lang="ts">
  import PublicDesktopNav from "$lib/components/custom/navigation/PublicDesktopNav.svelte";
  import PublicMobileNav from "$lib/components/custom/navigation/PublicMobileNav.svelte";
  import { page } from "$app/stores";
  import { afterNavigate } from "$app/navigation";

  // supports-[backdrop-filter]:bg-foreground/10 shadow-sm
  afterNavigate(setObserver);

  //change style on 'stuck'
  function setObserver() {
    const observer = new IntersectionObserver(
      ([e]) => e.target.toggleAttribute("data-stuck", e.intersectionRatio < 1),
      { threshold: [1] },
    );

    observer.observe(document.querySelector("header") as Element);
  }

  let invertHeader = true;

  page.subscribe((storeData) => {
    if (storeData.url.pathname.length > 1) {
      invertHeader = false;
      return;
    }
    invertHeader = true;
  });
</script>

{#if invertHeader}
  <header
    class="transition-all duration-500 sticky -top-1 z-50 w-full data-[stuck]:bg-foreground/20 data-[stuck]:shadow-sm data-[stuck]:backdrop-blur-sm
 flex justify-center"
  >
    <PublicDesktopNav color="white" />
    <PublicMobileNav color="white" />
  </header>
{:else}
  <header
    class="transition-all duration-500 sticky -top-1 z-50 w-full data-[stuck]:bg-background/40 data-[stuck]:shadow-sm data-[stuck]:backdrop-blur-sm
 flex justify-center"
  >
    <PublicDesktopNav color="black" />
    <PublicMobileNav color="black" />
  </header>
{/if}

<style>
</style>
