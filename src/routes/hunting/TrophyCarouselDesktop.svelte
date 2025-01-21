<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import { photoStore } from "$lib/stores/photos";

  //   allows for external to component setting of main carousel focus using the 'count' data attribute
  export let set_carousel: string = "0";

  let carouselInstance: CarouselAPI;

  $: photos_midpoint_index = Math.ceil(
    $photoStore.separated.hunting.trophies.length / 2,
  );

  //   a clicked photo on the small carousel scrolls the big carousel
  function moveToClickedCarouselElement(event: MouseEvent) {
    let carousel_item_clicked = event.target as HTMLElement;
    let item_number = carousel_item_clicked.dataset.count;

    carouselInstance.scrollTo(parseInt(item_number as string) - 1);
  }

  $: if (carouselInstance) {
    carouselInstance.scrollTo(parseInt(set_carousel as string) - 1);
  }
</script>

<div
  class="hidden lg:flex absolute w-full max-h-[24vw] overflow-scroll left-0 top-24 2xl:top-48"
>
  <div
    id="tile-container-left"
    class="basis-[30vw] p-4 py-0 mt-0 flex-wrap h-[50vh] flex justify-end items-center"
  >
    {#each $photoStore.separated.hunting.trophies.slice(0, photos_midpoint_index) as photoObject}
      <button
        on:click={(event) => {
          moveToClickedCarouselElement(event);
        }}
        data-count={photoObject.index}
      >
        <div
          class="m-2 w-36 h-36 relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
          style="background-image:url({photoObject.url});"
          data-count={photoObject.index}
        ></div>
      </button>
    {/each}
  </div>
  <div id="carousel-space" class="basis-1/2 pointer-events-none"></div>
  <div
    id="tile-container-right"
    class="basis-[30vw] p-4 py-0 mt-0 flex-wrap flex"
  >
    {#each $photoStore.separated.hunting.trophies.slice(photos_midpoint_index) as photoObject}
      <button
        on:click={(event) => {
          moveToClickedCarouselElement(event);
        }}
        data-count={photoObject.index}
      >
        <div
          class="m-2 w-36 h-36 relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
          style="background-image:url({photoObject.url});"
          data-count={photoObject.index}
        ></div>
      </button>
    {/each}
  </div>
</div>
<Carousel.Root
  bind:api={carouselInstance}
  opts={{
    loop: true,
  }}
  class="w-[80%] mx-auto"
>
  <Carousel.Content class="xl:h-[28vw] xl:h-[24vw]">
    {#each $photoStore.separated.hunting.trophies as photoObject}
      <Carousel.Item class=" relative  flex overflow-visible">
        <div class="flex w-full justify-center">
          <div
            class="w-full xl:w-[28vw] xl:h-[28vw] xl:w-[24vw] xl:h-[24vw] relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({photoObject.url});"
          >
            <div
              class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 w-full shadow-sm"
            >
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
