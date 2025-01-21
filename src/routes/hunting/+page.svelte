<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import Autoplay from "embla-carousel-autoplay";

  import SpottedTrophies from "./SpottedTrophies.svelte";
  import HuntingPrices from "./HuntingPrices.svelte";
  import DeerStands from "./DeerStands.svelte";

  let photo_carousel: CarouselAPI;

  function setCarousel(name: string) {}

  // photos import
  import hunting_main from "$lib/photos/hunting/hunting_main.png";
  import first_buck from "$lib/photos/hunting/first_buck.jpg";
  import monster_carousel from "$lib/photos/hunting/monster_carousel.jpg";
  import lady_with_buck from "$lib/photos/hunting/lady_with_buck.jpg";
  import single_velvet from "$lib/photos/hunting/single_velvet.jpg";
  import byrd_with_buck from "$lib/photos/hunting/byrd_with_buck.jpg";
  import two_velvet from "$lib/photos/hunting/two_velvet.jpg";

  // Group the photos into an object
  const photoImports = {
    hunting_main,
    first_buck,
    monster_carousel,
    lady_with_buck,
    single_velvet,
    byrd_with_buck,
    two_velvet,
  };

  // Convert to an array
  export const photos = Object.values(photoImports);
</script>

<svelte:head>
  <title>Private Hunts | Hunting at Byrd Ranch</title>
  <meta
    name="description"
    content="Some of the best Whitetail in Texas! Check out our pricing and spotted trophies. Shoot the buck of a lifetime or enjoy a weekend with your loved ones. Prices include lodging!"
  />
</svelte:head>

<section
  class="lg:min-h-[81vh] flex mx-6 lg:flex-row-reverse flex-col align-center lg:space-x-12 2xl:mt-12 lg:px-12 lg:mx-auto"
>
  <div
    class="basis-1/3 text-center lg:mt-[4vh] lg:mr-24 lg:max-w-[700px] lg:mx-auto"
  >
    <h1 class="2xl:text-8xl font-semibold text-5xl -mt-2 xl:text-6xl">
      BYRD'S HUNTING
    </h1>
    <h1 class="font-bold text-2xl 2xl:text-4xl">Join us at Byrd Ranch</h1>
    <Separator class="w-24 h-1 mx-auto mt-4 bg-green-950"></Separator>
    <p
      class="my-2 text-xl font-regular text-left leading-8 2xl:text-3xl 2xl:leading-10"
    >
      Established in 2006, Byrd Ranch consistently produces Monster trophy
      bucks, family memories, and all around good times. Check out the list of <a
        href="#trophies_in_sight"
      >
        trophies
      </a>
      that have been spotted below.
    </p>
    <div class="mx-0 text-left hidden lg:block">
      <ul class="[&>li]:ml-6 2xl:mt-10 mx-0">
        <h2 class="2xl:text-3xl xl:text-xl">What to Expect</h2>
        <li><h4 class="2xl:text-2xl xl:text-lg">Upfront Pricing</h4></li>
        <li><h4 class="2xl:text-2xl xl:text-lg">100% Success Rate</h4></li>
        <li>
          <h4 class="2xl:text-2xl xl:text-lg">
            Lodging for 3 Nights / 2.5 Days
          </h4>
        </li>
      </ul>
      <!-- <ul class="[&>li]:ml-6 mt-10 mx-0">
        <h2>Optional</h2>
        <li><h4>a</h4></li>
        <li><h4>b</h4></li>
      </ul> -->
    </div>
  </div>
  <div class="mt-4 lg:hidden">
    <Carousel.Root
      bind:api={photo_carousel}
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      class="mx-auto"
    >
      <Carousel.Content>
        <Carousel.Item
          class="basis-full md:basis-1/2 relative flex overflow-visible"
        >
          <div class="flex w-full">
            <div
              class="w-full relative bg-center h-72 bg-cover bg-no-repeat rounded-lg"
              style="background-image:url({two_velvet});"
            ></div>
          </div>
          <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
        </Carousel.Item>
      </Carousel.Content>
      <Carousel.Previous class="hidden" />
      <Carousel.Next class="hidden" />
    </Carousel.Root>
  </div>
  <div class="mx-0 lg:hidden">
    <ul class="[&>li]:ml-6 mt-10 mx-0">
      <h2>What to Expect</h2>
      <li><h4>Upfront Pricing</h4></li>
      <li><h4>100% Success Rate</h4></li>
      <li><h4>Lodging for 3 Nights / 2.5 Days</h4></li>
    </ul>
    <!-- <ul class="[&>li]:ml-6 mt-10 mx-0">
      <h2>Optional</h2>
      <li><h4>a</h4></li>
      <li><h4>b</h4></li>
    </ul> -->
  </div>
  <div
    class="hidden lg:flex px-10 space-x-4 space-y-10 basis-2/3 max-w-[60%] mt-14"
  >
    <div>
      <img
        src={two_velvet}
        alt="Big Buck Facing at You"
        class="rounded-lg w-[25vw] 2xl:w-[22vw]"
      />
    </div>
    <div class="flex flex-col space-y-4 xl:w-[22vw] 2xl:w-[18vw]">
      <img
        src={first_buck}
        alt="First Buck - Family Trip"
        class="rounded-lg mb-6"
      />
      <img src={single_velvet} alt="Single Buck in Velvet" class="rounded-lg" />
    </div>
  </div>
</section>

<SpottedTrophies />

<div class="hidden lg:block my-24 container max-w-[1000px]">
  <h3 class="mb-4 text-2xl">Photos from The Ranch</h3>
  <Carousel.Root
    bind:api={photo_carousel}
    opts={{
      loop: true,
    }}
    plugins={[
      Autoplay({
        delay: 3000,
      }),
    ]}
    class="mx-auto"
  >
    <Carousel.Content>
      <Carousel.Item class="basis-1/3 relative flex overflow-visible">
        <div class="flex w-full">
          <div
            class="w-full relative bg-center h-72 bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({monster_carousel});"
          ></div>
        </div>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
      <Carousel.Item class="basis-1/3 relative flex overflow-visible">
        <div class="flex w-full">
          <div
            class="w-full relative bg-center h-72 bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({two_velvet});"
          ></div>
        </div>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
      <Carousel.Item class="basis-1/3 relative flex overflow-visible">
        <div class="flex w-full">
          <div
            class="w-full relative bg-center h-72 bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({first_buck});"
          ></div>
        </div>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
      <Carousel.Item class="basis-1/3 relative flex overflow-visible">
        <div class="flex w-full">
          <div
            class="w-full relative bg-center h-72 bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({hunting_main});"
          ></div>
        </div>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
      <Carousel.Item class="basis-1/3 relative flex overflow-visible">
        <div class="flex w-full">
          <div
            class="w-full relative bg-center h-72 bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({lady_with_buck});"
          ></div>
        </div>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
      <Carousel.Item class="basis-1/3 relative flex overflow-visible">
        <div class="flex w-full">
          <div
            class="w-full relative bg-center h-72 bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({single_velvet});"
          ></div>
        </div>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
      <Carousel.Item class="basis-1/3 relative flex overflow-visible">
        <div class="flex w-full">
          <div
            class="w-full relative bg-center h-72 bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({byrd_with_buck});"
          ></div>
        </div>
        <!-- <img src={trophyPhoto} alt="trophy parsed name" class="rounded-lg" /> -->
      </Carousel.Item>
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</div>

<div
  class="lg:flex items-center max-w-[1920px] w-full justify-around mx-auto lg:my-24"
>
  <HuntingPrices />
  <DeerStands />
</div>
