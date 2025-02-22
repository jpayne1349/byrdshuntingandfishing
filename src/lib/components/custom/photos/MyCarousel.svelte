<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import Autoplay from "embla-carousel-autoplay";
  import { photoStore } from "$lib/stores/photos";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import { toTitleString } from "$lib/helpers/strings";
  import MyCarouselSkeleton from "./MyCarouselSkeleton.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { observeScroll } from "$lib/helpers/intersectionObserver";
  import { scrollObserverStore } from "$lib/stores/scrollObserver";
  import { fade } from "svelte/transition";

  export let category: string;
  export let subcategory: string;

  let elementID = category + "_" + subcategory + "_carousel";

  let api: CarouselAPI;
  let count = 0;
  let current = 0;

  $: if (api) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;
    api.on("select", () => {
      current = api.selectedScrollSnap() + 1;
    });
  }

  let testToggle = true;
</script>

<!-- <Button on:click={() => (testToggle = !testToggle)} class="fixed bottom-10 right-10">Toggle Skeletons</Button> -->

<div id={elementID} class="h-0" use:observeScroll={{ sectionId: `${elementID}`, observerStore: scrollObserverStore }}></div>
<h2
  class="font-bold italic container no-underline border-none text-3xl mb-2
          lg:text-5xl"
>
  {toTitleString(subcategory)}
</h2>
{#if $photoStore.separated[category] && testToggle && $scrollObserverStore.scrolledThrough[elementID]}
  <Carousel.Root
    bind:api
    opts={{
      loop: true,
    }}
    plugins={[
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ]}
    class="container mx-auto"
  >
    <!-- -ml-[] value for spacing, followed by +pl-[] on the Item  (this really only affects the Desktop view) -->
    <Carousel.Content class="-ml-20">
      {#each $photoStore.separated[category][subcategory] as photoObject}
        <Carousel.Item
          class="relative flex overflow-visible pl-20
                md:basis-1/3"
        >
          <div class="flex w-full">
            <div class="relative w-full rounded-lg bg-cover bg-center bg-no-repeat aspect-square" style="background-image:url({photoObject.url});"></div>
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <div id="image-index-viewing" class="font-light text-muted-foreground mt-1">{current}/{count}</div>
    <Carousel.Previous class="hidden md:inline-flex" />
    <Carousel.Next class="hidden md:inline-flex" />
  </Carousel.Root>
{:else}
  <MyCarouselSkeleton />
{/if}
