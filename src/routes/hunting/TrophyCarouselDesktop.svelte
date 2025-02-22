<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import Autoplay from "embla-carousel-autoplay";
  import { photoStore } from "$lib/stores/photos";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  //   allows for external to component setting of main carousel focus using the 'count' data attribute
  export let set_carousel: string = "0";

  let dispatch = createEventDispatcher();

  let carouselInstance: CarouselAPI;
  let current = 0;

  $: photos_midpoint_index = Math.ceil($photoStore.separated.hunting?.trophies?.length / 2);

  //   a clicked photo on the small carousel scrolls the big carousel
  function moveToClickedCarouselElement(event: MouseEvent) {
    let carousel_item_clicked = event.target as HTMLElement;
    let item_number = carousel_item_clicked.dataset.count;

    carouselInstance.scrollTo(parseInt(item_number as string) - 1);
  }

  $: if (carouselInstance) {
    carouselInstance.scrollTo(parseInt(set_carousel as string) - 1);
  }

  $: if (carouselInstance) {
    current = carouselInstance.selectedScrollSnap() + 1;
    carouselInstance.on("select", () => {
      current = carouselInstance.selectedScrollSnap() + 1;
    });
    dispatch("carousel_current", { value: current });
  }
</script>

<div
  class="hidden absolute w-full max-h-[24vw] overflow-scroll left-0 top-24
        md:flex
        2xl:top-36"
>
  <div id="tile-container-left" class="basis-[30vw] p-4 py-0 mt-0 flex-wrap flex justify-end items-center">
    {#each $photoStore.separated.hunting?.trophies?.slice(0, photos_midpoint_index) as photoObject}
      <button
        on:click={(event) => {
          moveToClickedCarouselElement(event);
        }}
        data-count={photoObject.index}
        class=""
      >
        <div
          class="m-4 w-36 h-36 relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg
                2xl:w-48 2xl:h-48"
          style="background-image:url({photoObject.url});"
          data-count={photoObject.index}
        >
          {#if current == photoObject.index}
            <div transition:fade class="dot absolute w-2 h-2 rounded-lg bg-gray-500 -bottom-3 left-[48%]"></div>
          {/if}
        </div>
      </button>
    {/each}
  </div>
  <div id="carousel-space" class="basis-1/2 pointer-events-none"></div>
  <div id="tile-container-right" class="basis-[30vw] p-4 py-0 mt-0 flex-wrap flex">
    {#each $photoStore.separated.hunting?.trophies?.slice(photos_midpoint_index) as photoObject}
      <button
        on:click={(event) => {
          moveToClickedCarouselElement(event);
        }}
        data-count={photoObject.index}
      >
        <div
          class="m-2 w-36 h-36 relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg
                2xl:w-48 2xl:h-48"
          style="background-image:url({photoObject.url});"
          data-count={photoObject.index}
        >
          {#if current == photoObject.index}
            <div transition:fade class="dot absolute w-2 h-2 rounded-lg bg-gray-500 -bottom-3 left-[48%]"></div>
          {/if}
        </div>
      </button>
    {/each}
  </div>
</div>
<Carousel.Root
  bind:api={carouselInstance}
  opts={{
    loop: true,
  }}
  plugins={[
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    }),
  ]}
  class="w-[80%] mx-auto"
>
  <Carousel.Content class="xl:h-[24vw]">
    {#each $photoStore.separated?.hunting?.trophies as photoObject}
      <Carousel.Item class=" relative  flex overflow-visible">
        <div class="flex w-full justify-center">
          <div class="w-full xl:h-[24vw] relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg" style="background-image:url({photoObject.url});">
            <div class="flex rounded-lg justify-between px-2 absolute top-0 left-0 w-full shadow-sm">
              <h4 class="text-xl text-white p-1">{photoObject.title}</h4>
              <h4 class="text-xl text-white p-1">${photoObject.price}</h4>
            </div>
          </div>
        </div>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
