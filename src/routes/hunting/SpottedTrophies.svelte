<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { photoStore } from "$lib/stores/photos";
  import TrophiesSkeleton from "./TrophiesSkeleton.svelte";
  import TrophyCarouselDesktop from "./TrophyCarouselDesktop.svelte";
  import TrophyCarouselMobile from "./TrophyCarouselMobile.svelte";

  let set_carousel: string = "0";
</script>

<div
  id="trophies_in_sight"
  class="link-to-placeholder h-14 bg-transparent"
></div>
<div class="bg-green-950 pb-36 lg:min-h-[82vh] 2xl:pt-4 relative">
  <h1 class="font-semibold mb-8 text-white mt-8 lg:mt-0 lg:text-5xl text-4xl">
    Trophies in Sight
  </h1>
  <section
    class="flex mx-6 flex-col align-center xl:my-4 2xl:my-6 h-full lg:max-w-[40vw] lg:mx-auto"
  >
    <!-- TODO: Make a shimmer loader for this / in each Svelte file? -->
    {#if $photoStore.separated.hunting}
      <TrophyCarouselDesktop {set_carousel} />

      <Button
        href="tel:+19792019082"
        variant="outline"
        class="text-xl text-white bg-transparent font-semibold my-8 w-[80%] mx-auto h-12 no-underline"
      >
        Book this Trophy Hunt
      </Button>

      <TrophyCarouselMobile
        on:set_carousel={(event) => {
          set_carousel = event.detail.value;
        }}
      />
      <!-- {:else} -->
      <TrophiesSkeleton />
    {:else}{/if}
  </section>
</div>
