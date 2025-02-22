<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import { photoStore } from "$lib/stores/photos";
  import TrophiesSkeleton from "./TrophiesSkeleton.svelte";
  import TrophyCarouselDesktop from "./TrophyCarouselDesktop.svelte";
  import TrophyCarouselMobile from "./TrophyCarouselMobile.svelte";

  let set_carousel: string = "0";

  let main_carousel_current: number;
</script>

<div
  id="trophies_in_sight"
  class="h-16
      lg:h-24
      "
></div>
<section
  class="bg-green-950 pb-32 relative pt-2 bg-opacity-90
            xs:pb-44
            sm:pb-40
            md:pb-6
            
            2xl:pt-4"
>
  <h1
    class="font-bold italic mb-8 text-white mt-4 container
              md:max-w-[42vw]"
  >
    Trophies in Sight
  </h1>
  <section
    class="flex mx-6 flex-col align-center
            sm:max-w-[60vw] sm:mx-auto
            md:max-w-[45vw]
            lg:max-w-[40vw]
            xl:max-w-[35vw]
            xl:my-4 2xl:my-6"
  >
    {#if $photoStore.separated.hunting}
      <TrophyCarouselDesktop
        {set_carousel}
        on:carousel_current={(event) => {
          main_carousel_current = event.detail.value;
        }}
      />

      <Button href="/contact?referrer=trophy_hunt_{main_carousel_current}" variant="outline" class="text-xl !text-white bg-transparent font-semibold my-8 w-[80%] mx-auto min-h-12 h-fit no-underline text-wrap text-center leading-6">Book this Trophy Hunt</Button>

      <TrophyCarouselMobile
        bigCarouselCurrent={main_carousel_current}
        on:set_carousel={(event) => {
          set_carousel = event.detail.value;
        }}
      />
    {:else}
      <div class="container flex justify-center">
        <Skeleton class="aspect-square w-full" />
      </div>
    {/if}
  </section>
</section>
