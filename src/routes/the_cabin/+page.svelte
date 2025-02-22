<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import theCabinBg from "$lib/photos/theCabinBg.png";
  import cabinKitchen from "$lib/photos/cabin_kitchen.png";
  import livingArea from "$lib/photos/living_area_cabin.png";
  import bedrooms from "$lib/photos/bedrooms_cabin.png";
  import bathrooms from "$lib/photos/bathrooms_cabin.png";
  import { onMount } from "svelte";
  import MainCard from "./MainCard.svelte";
  import SubCard from "./SubCard.svelte";
  import CabinRates from "./CabinRates.svelte";
  import ContactForm from "$lib/components/custom/forms/contact/ContactForm.svelte";
  import { observeScroll } from "$lib/helpers/intersectionObserver";
  import { scrollObserverStore } from "$lib/stores/scrollObserver";
  import { fade, fly } from "svelte/transition";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

  let headingDiv: HTMLElement;
  let landingPhotoHeight: number = 500;
  let windowHeight: number;
  let windowCalcDone = false;
  let windowWidth: number; //for the photos svg background

  onMount(() => {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    landingPhotoHeight = windowHeight - 62;
    // if on desktop, set a resize listener. not for mobile
    if (window.innerWidth > 500) {
      landingPhotoHeight = windowHeight - 94;
      window.addEventListener("resize", () => {
        windowHeight = window.innerHeight;
        landingPhotoHeight = windowHeight - 94;

        windowWidth = window.innerWidth;
      });
    }
    windowCalcDone = true;
  });
</script>

<svelte:head>
  <title>The Cabin at Byrd Ranch | Hunting Lodge</title>
  <meta name="description" content="Included in our hunting packages! Check out our secluded 3 bedroom cabin for a weekend with nature or your place to rest up after a day of hunting or fishing." />
</svelte:head>

{#if windowCalcDone}
  <!-- {#if false} -->
  <section id="the-cabin-landing" class="bg-cover bg-center bg-no-repeat relative bg-slate-900" style="background-image:url({theCabinBg});  height:{landingPhotoHeight}px;">
    <div
      class="absolute w-full h-[70%] flex flex-col items-center justify-center
          lg:h-[55vh]"
    >
      <h1
        class="text-6xl font-semibold text-center text-white
              xl:text-7xl
              3xl:text-8xl"
      >
        THE CABIN
      </h1>
      <h1
        class="text-xl mt-2 font-bold text-white
              2xl:text-2xl"
      >
        A Private Retreat
      </h1>
    </div>

    <div in:fade={{ delay: 200 }} id="button-container" class="absolute bottom-24 left-0 w-full flex justify-center">
      <Button href="/contact?referrer=cabin_schedule_now" class="font-semibold text-white bg-transparent no-underline text-lg" variant="outline">SCHEDULE NOW</Button>
    </div>
  </section>
{:else}
  <!-- estimated window space for placeholder for above -->
  <Skeleton
    class="w-screen h-[160vw]  relative bg-[#FFF7F1]
                lg:h-[90vh]
                3xl:h-[95vh]"
  ></Skeleton>
{/if}

<section class="container">
  <MainCard title="Full Kitchen" description="The kitchen includes a refrigerator, stove,  dishwasher, garbage disposal, Keurig coffee pot and Bunn coffee pot.   Fully stocked dinnerware, glassware, coffee cups, cookware, and  utensils. " photoSrc={cabinKitchen} />

  <div use:observeScroll={{ sectionId: "cabinSubcards", observerStore: scrollObserverStore }} id="subcards-container" class="flex flex-col space-y-6 md:flex-row md:justify-between md:items-center md:space-y-0 md:my-16">
    {#if $scrollObserverStore.scrolledThrough["cabinSubcards"]}
      <div in:fly={{ x: -200, duration: 1000 }}>
        <SubCard title="Living Area" description="Including large TV, card table, and sofa." photoSrc={livingArea} />
      </div>
      <div in:fly={{ y: 100, duration: 1000 }}>
        <SubCard title="Three Bedrooms" description="Each bedroom has a twin and full size bed, alarm clock, bedside lamp.  Complimentary water and snacks." photoSrc={bedrooms} />
      </div>
      <div in:fly={{ x: 200, duration: 1000 }}>
        <SubCard title="Three Bathrooms" description="Each bedroom has a bathroom with shower, sink, toilet and hair dryer." photoSrc={bathrooms} />
      </div>
    {/if}
  </div>
</section>

<CabinRates />

<ContactForm formTitle="Knock on the Door!" formSubTitle="You’re always welcome at The Cabin, let’s schedule it." bgColor="FFF7F1" />

<div class="h-16"></div>
