<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import Autoplay from "embla-carousel-autoplay";
  import { photoStore } from "$lib/stores/photos";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  let dispatch = createEventDispatcher();

  let carouselInstance: CarouselAPI;

  export let bigCarouselCurrent: number = 0;
</script>

<!-- MOBILE: THIS IS JUST THE SMALL CAROUSEL UNDERNEATH THE MAIN ONE  -->
<Carousel.Root
  bind:api={carouselInstance}
  opts={{
    loop: true,
  }}
  plugins={[
    Autoplay({
      delay: 3000,
    }),
  ]}
  class="w-full  absolute bottom-10 left-0 px-6
        md:hidden"
>
  <Carousel.Content class="">
    {#each $photoStore.separated?.hunting?.trophies as photoObject}
      <Carousel.Item
        class="basis-1/4 relative flex justify-center items-center overflow-visible
              sm:basis-1/6      
              "
      >
        <button
          class="flex w-full overflow-visible pb-4"
          on:click={(event) => {
            //@ts-ignore
            dispatch("set_carousel", { value: event.target.dataset.count });
          }}
          data-count={photoObject.index}
        >
          <div class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg" style="background-image:url({photoObject.url});" data-count={photoObject.index}>
            {#if bigCarouselCurrent == photoObject.index}
              <div transition:fade class="dot absolute w-2 h-2 rounded-lg bg-gray-500 -bottom-3 left-[48%]"></div>
            {/if}
          </div>
        </button>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous class="hidden" />
  <Carousel.Next class="hidden" />
</Carousel.Root>
