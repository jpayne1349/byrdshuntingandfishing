<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { photoStore } from "$lib/stores/photos";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();
</script>

<!-- MOBILE: THIS IS JUST THE SMALL CAROUSEL UNDERNEATH THE MAIN ONE  -->
<Carousel.Root
  opts={{
    loop: true,
  }}
  class="w-full lg:hidden absolute bottom-14 left-0 px-4"
>
  <Carousel.Content class="">
    {#each $photoStore.separated.hunting.trophies as photoObject}
      <Carousel.Item
        class="basis-1/4  relative flex justify-center items-center overflow-visible"
      >
        <button
          class="flex w-full"
          on:click={(event) => {
            //@ts-ignore
            dispatch("set_carousel", { value: event.target.dataset.count });
          }}
          data-count={photoObject.index}
        >
          <div
            class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({photoObject.url});"
            data-count={photoObject.index}
          ></div>
        </button>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous class="hidden" />
  <Carousel.Next class="hidden" />
</Carousel.Root>
