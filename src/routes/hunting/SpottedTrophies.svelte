<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";

  let carousel_1: CarouselAPI;
  let count_1 = 0;
  let current_1 = 0;

  let carousel_2: CarouselAPI;
  let count_2 = 0;
  let current_2 = 0;

  let carousel_3: CarouselAPI;
  let count_3 = 0;
  let current_3 = 0;

  $: if (carousel_1) {
    count_1 = carousel_1.scrollSnapList().length;
    current_1 = carousel_1.selectedScrollSnap() + 1;
    carousel_1.on("select", () => {
      current_1 = carousel_1.selectedScrollSnap() + 1;
      console.log("carousel 1 = ", current_1);
    });
  }

  $: if (carousel_2) {
    count_2 = carousel_2.scrollSnapList().length;
    current_2 = carousel_2.selectedScrollSnap() + 1;
    carousel_2.on("select", () => {
      current_2 = carousel_2.selectedScrollSnap() + 1;
      console.log("carousel 2 = ", current_2);
    });
  }

  $: if (carousel_3) {
    count_3 = carousel_3.scrollSnapList().length;
    current_3 = carousel_3.selectedScrollSnap() + 1;
    carousel_3.on("select", () => {
      current_3 = carousel_2.selectedScrollSnap() + 1;
      console.log("carousel 3 = ", current_2);
    });
  }

  //   a clicked photo on the small carousel scrolls the big carousel
  function moveToClickedCarouselElement(event: MouseEvent) {
    let carousel_item_clicked = event.target as HTMLElement;
    let item_number = carousel_item_clicked.dataset.count;

    console.log("small carousel clicked = ", item_number);

    carousel_1.scrollTo(parseInt(item_number as string) - 1);
  }

  //   TODO: highlight the current big photo on the small carousel with a dot or something
  //  TODO: OPTION: scroll the small carousel in tandem with the big?

  //   TEST ONLY
  import trophyPhoto from "$lib/photos/hunting/trophy_test_photo.jpg";
  //   load in a database  or storage location from firebase that will populate the carousel items.
  //  we can either do actual db entries for them or just have a naming scheme that is condusive to the info needed
  // e.g. name_name_$100000.jpg ?? something like that.
</script>

<div
  id="trophies_in_sight"
  class="link-to-placeholder h-4 bg-transparent"
></div>
<div class="bg-green-950 pt-10 pb-36 mt-10 relative lg:pb-[5vh]">
  <section
    class="flex mx-6 flex-col align-center my-10 h-full lg:max-w-[40vw] lg:mx-auto"
  >
    <h1 class="font-semibold mb-4 text-white">Trophies in Sight</h1>
    
    <!-- DESKTOP -->
    <!-- tiles around the carousel -->
    <div class="hidden lg:flex absolute w-full left-0 top-36">
      <div
        id="tile-container-left"
        class="basis-[30vw] p-4 flex-wrap flex justify-end items-center"
      >
        <button
          on:click={(event) => {
            moveToClickedCarouselElement(event);
          }}
          data-count="1"
        >
          <img
            src={trophyPhoto}
            alt=""
            class="w-36 h-36 rounded-lg m-2"
            data-count="1"
          />
        </button>
        <button
          on:click={(event) => {
            moveToClickedCarouselElement(event);
          }}
          data-count="2"
        >
          <img
            src={trophyPhoto}
            alt=""
            class="w-36 h-36 rounded-lg m-2"
            data-count="2"
          />
        </button>
        <button
          on:click={(event) => {
            moveToClickedCarouselElement(event);
          }}
          data-count="1"
        >
          <img
            src={trophyPhoto}
            alt=""
            class="w-36 h-36 rounded-lg m-2"
            data-count="1"
          />
        </button>
        <button
          on:click={(event) => {
            moveToClickedCarouselElement(event);
          }}
          data-count="2"
        >
          <img
            src={trophyPhoto}
            alt=""
            class="w-36 h-36 rounded-lg m-2"
            data-count="2"
          />
        </button>
      </div>
      <div id="carousel-space" class="basis-1/2 pointer-events-none"></div>
      <div
        id="tile-container-right"
        class="basis-[30vw] p-4 space-x-4 space-y-4 flex-wrap flex"
      >
        <img src={trophyPhoto} alt="" class="w-36 h-36 rounded-lg" />
      </div>
    </div>

    <Carousel.Root
      bind:api={carousel_1}
      opts={{
        loop: true,
      }}
      class="w-[80%] mx-auto"
    >
      <Carousel.Content>
        <Carousel.Item class=" relative flex overflow-visible">
          <div class="flex w-full">
            <div
              class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
              style="background-image:url({trophyPhoto});"
            >
              <div
                class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 w-full shadow-sm"
              >
                <h4 class="text-xl text-white p-1">Trophy Name</h4>
                <h4 class="text-xl text-white p-1">$10,000</h4>
              </div>
            </div>
          </div>
          <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
        </Carousel.Item>
        <Carousel.Item class=" relative flex overflow-visible">
          <div class="flex w-full">
            <div
              class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
              style="background-image:url({trophyPhoto});"
            >
              <div
                class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 backdrop-blur-sm w-full shadow-sm"
              >
                <h4 class="text-xl text-white p-1">Trophy Name</h4>
                <h4 class="text-xl text-white p-1">$20,000</h4>
              </div>
            </div>
          </div>
          <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
        </Carousel.Item>
        <Carousel.Item class=" relative flex overflow-visible">
          <div class="flex w-full">
            <div
              class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
              style="background-image:url({trophyPhoto});"
            >
              <div
                class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 backdrop-blur-sm w-full shadow-sm"
              >
                <h4 class="text-xl text-white p-1">Trophy Name</h4>
                <h4 class="text-xl text-white p-1">$30,000</h4>
              </div>
            </div>
          </div>
          <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
        </Carousel.Item>
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>

    <Button
      href="tel:+19792019082"
      variant="outline"
      class="text-xl text-white bg-transparent font-semibold mt-4 w-[80%] mx-auto h-12 no-underline"
    >
      Book this Trophy Hunt
    </Button>

    <!-- MOBILE  -->
    <Carousel.Root
      bind:api={carousel_2}
      opts={{
        loop: true,
      }}
      class="w-screen lg:hidden absolute bottom-14 left-0 mx-auto mt-10"
    >
      <Carousel.Content class="mx-2">
        <Carousel.Item
          class="basis-1/4 lg:basis-1/12 relative flex overflow-visible"
        >
          <button
            class="flex w-full"
            on:click={(event) => {
              moveToClickedCarouselElement(event);
            }}
            data-count="1"
          >
            <div
              class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
              style="background-image:url({trophyPhoto});"
              data-count="1"
            ></div>
          </button>
          <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
        </Carousel.Item>
        <Carousel.Item
          class="basis-1/4 lg:basis-1/12 relative flex overflow-visible"
        >
          <button
            class="flex w-full"
            on:click={(event) => {
              moveToClickedCarouselElement(event);
            }}
            data-count="2"
          >
            <div
              class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
              style="background-image:url({trophyPhoto});"
              data-count="2"
            ></div>
          </button>
          <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
        </Carousel.Item>
        <Carousel.Item
          class="basis-1/4 lg:basis-1/12 relative flex overflow-visible"
        >
          <button
            class="flex w-full"
            on:click={(event) => {
              moveToClickedCarouselElement(event);
            }}
            data-count="3"
          >
            <div
              class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
              style="background-image:url({trophyPhoto});"
              data-count="3"
            ></div>
          </button>
          <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
        </Carousel.Item>
      </Carousel.Content>
      <Carousel.Previous class="hidden" />
      <Carousel.Next class="hidden" />
    </Carousel.Root>
  </section>
</div>
