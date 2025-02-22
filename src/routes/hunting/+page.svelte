<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import SpottedTrophies from "./SpottedTrophies.svelte";
  import HuntingPrices from "./HuntingPrices.svelte";
  import DeerStands from "./DeerStands.svelte";
  import { photoStore } from "$lib/stores/photos";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import ContactForm from "$lib/components/custom/forms/contact/ContactForm.svelte";
  import { fly } from "svelte/transition";
  import { scrollObserverStore } from "$lib/stores/scrollObserver";
  import { observeScroll } from "$lib/helpers/intersectionObserver";
  import MyCarousel from "$lib/components/custom/photos/MyCarousel.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    if ($scrollObserverStore.scrolledThrough["huntingLanding"]) {
      $scrollObserverStore.scrolledThrough["huntingLanding"] = false;
    }
  });
</script>

<svelte:head>
  <title>Private Hunts | Hunting at Byrd Ranch</title>
  <meta name="description" content="Some of the best Whitetail in Texas! Check out our pricing and spotted trophies. Shoot the buck of a lifetime or enjoy a weekend with your loved ones. Prices include lodging!" />
</svelte:head>

<section
  class="grid grid-cols-1 gap-2 items-center px-6 py-2
                md:px-12 lg:px-20
                lg:grid-cols-2 lg:grid-rows-[80vh]"
>
  <!-- Image Grid = 2 cols and 3 rows with col 1 and row 2 being non symetric -->
  <div
    use:observeScroll={{ sectionId: "huntingLanding", observerStore: scrollObserverStore }}
    class="relative grid row-start-2 grid-cols-[1fr_.7fr] grid-rows-[.2fr_.5fr_.5fr] gap-4 max-w-[1000px]
            lg:row-start-1 lg:ml-auto"
  >
    <div id="mobile-placeholder" class="col-span-2 row-span-3 w-full aspect-[1.3] rounded-lg lg:hidden"></div>
    {#if $photoStore.separated.hunting && $scrollObserverStore.scrolledThrough["huntingLanding"]}
      <!-- {#if skeletonToggle} -->
      <img class="absolute inset-0 lg:relative col-start-1 row-span-3 col-span-2 lg:col-span-1 lg:row-span-2 rounded-lg w-full" in:fly={{ x: -50, duration: 1000, delay: 200 }} src={$photoStore.separated.hunting.landing_page[0]?.url} alt={$photoStore.separated.hunting.landing_page[0]?.title} />
      <img class="hidden lg:block row-start-2 col-start-2 rounded-lg w-full" in:fly={{ y: -50, duration: 1000, delay: 400 }} src={$photoStore.separated.hunting.landing_page[1]?.url} alt={$photoStore.separated.hunting.landing_page[1]?.title} />
      <img class="hidden lg:block row-start-3 col-start-2 rounded-lg w-full" in:fly={{ y: 50, duration: 1000, delay: 600 }} src={$photoStore.separated.hunting.landing_page[2]?.url} alt={$photoStore.separated.hunting.landing_page[2]?.title} />
    {:else}
      <Skeleton class="absolute inset-0 lg:relative col-start-1 row-span-3 col-span-2 lg:col-span-1 lg:row-span-2 rounded-lg w-full lg:w-[25.3rem] aspect-[1.3]" />
      <Skeleton class="hidden lg:block row-start-2 col-start-2 rounded-lg w-[17.7rem] aspect-[1.78]" />
      <Skeleton class="hidden lg:block row-start-3 col-start-2 rounded-lg w-[17.7rem] aspect-[1.78]" />
    {/if}

    <div id="mobile-expect" class="col-span-2 lg:hidden">
      <h3
        class="mt-0 text-2xl font-bold
            2xl:texl-4xl"
      >
        What to Expect
      </h3>
      <ul class="list-disc list-inside font-semibold mt-2">
        <li class="text-xl 2xl:text-2xl">Upfront Pricing</li>
        <li class="text-xl 2xl:text-2xl">100% Success Rate</li>
        <li class="text-xl 2xl:text-2xl">Lodging for 3 Nights / 2.5 Days</li>
      </ul>
    </div>
  </div>

  <!-- Text Content -->
  <div class="lg:px-10 max-w-[1000px]">
    <h1
      class="text-5xl font-semibold text-center
              2xl:text-8xl"
    >
      BYRD'S<br />HUNTING
    </h1>
    <h1
      class="text-2xl font-bold text-center
              2xl:text-4xl"
    >
      Join us at Byrd Ranch
    </h1>
    <Separator class="mx-auto mt-4 h-1 w-24 bg-green-950 rounded-lg"></Separator>
    <p
      class="font-regular my-2 text-left text-xl leading-8
            2xl:text-2xl 2xl:leading-10"
    >
      Established in 2006, Byrd Ranch consistently produces Monster trophy bucks, family memories, and all around good times. Check out the list of <a href="#trophies_in_sight"> identified bucks </a>
      or take a look at more of the <a href="#ranch_photos">ranch photos</a> below.
    </p>
    <div id="desktop-expect" class="hidden lg:block">
      <h3
        class="mt-10 text-2xl font-bold
            2xl:texl-4xl"
      >
        What to Expect
      </h3>
      <ul class="list-disc list-inside font-semibold mt-2">
        <li class="text-xl 2xl:text-2xl">Upfront Pricing</li>
        <li class="text-xl 2xl:text-2xl">100% Success Rate</li>
        <li class="text-xl 2xl:text-2xl">Lodging for 3 Nights / 2.5 Days</li>
      </ul>
    </div>
  </div>
</section>

<SpottedTrophies />

<div class="my-24">
  <MyCarousel category="hunting" subcategory="ranch_photos" />
</div>

<div
  class="lg:container lg:flex
        "
>
  <HuntingPrices />
  <DeerStands />
</div>

<ContactForm formTitle="Shoot Us a Message!" formSubTitle="Get in a stand or just learn more, fire away." bgColor="c6eada" />
