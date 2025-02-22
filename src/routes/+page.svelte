<script lang="ts">
  import Logo from "$lib/components/custom/photos/Logo.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import homeBgPhoto from "$lib/photos/deer_homepage_bg.jpg";
  import huntingLinkPhoto from "$lib/photos/mobile_nav_hunting.png";
  import fishingLinkPhoto from "$lib/photos/mobile_nav_fishing_2.png";
  import theCabinLinkPhoto from "$lib/photos/mobile_nav_cabin.jpg";
  import { ChevronDown } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import ContactForm from "$lib/components/custom/forms/contact/ContactForm.svelte";
  import { writable } from "svelte/store";
  import { observeScroll } from "$lib/helpers/intersectionObserver";
  import { scrollObserverStore } from "$lib/stores/scrollObserver";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

  let windowHeight: number;
  let windowCalcDone = false;
  let bgPhotoLoaded = false;

  onMount(() => {
    windowHeight = window.innerHeight;

    // if on desktop, set a resize listener. not for mobile
    if (window.innerWidth > 500) {
      window.addEventListener("resize", () => {
        windowHeight = window.innerHeight;
      });
    }
    windowCalcDone = true;

    const bgPhoto = new Image();
    bgPhoto.src = homeBgPhoto;
    bgPhoto.onload = () => {
      bgPhotoLoaded = true;
    };

    if ($scrollObserverStore.scrolledThrough["learnMoreSection"]) {
      $scrollObserverStore.scrolledThrough["learnMoreSection"] = false;
    }
  });

  function scrollPage() {
    window.scrollTo({
      top: windowHeight - 50,
      left: 0,
      behavior: "smooth",
    });
  }
</script>

<svelte:head>
  <title>Byrd's Hunting & Fishing Excursions</title>
  <meta name="description" content="Trophy Whitetail with a private cabin. Massive Redfish out of Matagorda Bay. Check out what we have to offer at Byrd's Hunting and Fishing Excursions in South Texas." />
</svelte:head>

{#if !bgPhotoLoaded}
  <div out:fade={{ duration: 1000 }} class="absolute inset-0 w-screen h-screen bg-[#1a2727] z-1"></div>
{/if}

<div
  class="absolute inset-0 max-w-[100vw] w-[100vw] bg-center bg-cover bg-no-repeat transition-opacity duration-1500
            "
  class:opacity-0={!bgPhotoLoaded}
  class:opacity-100={bgPhotoLoaded}
  style="background-image:url({homeBgPhoto}); height:{windowHeight}px;"
></div>

{#key windowHeight}
  <section id="home-landing" class="transition-all relative flex flex-col w-[100vw] h-[90vh] px-4 justify-center" style="height:{windowHeight - 64}px;">
    {#if windowCalcDone && bgPhotoLoaded}
      <div class="hidden lg:flex w-full justify-center">
        <Logo scale={0.7} style="white" />
      </div>
      <h3 in:fade={{ delay: 0, duration: 1500 }} class="xl:absolute mt-10 mb-auto xl:mt-0 left-[3vw] xl:top-[55vh] xl:max-w-[50vh] text-white font-bold text-5xl xl:text-7xl 3xl:text-9xl border-none text-center tracking-tight leading-12">EXPERIENCE TEXAS OUTDOORS</h3>
      <div id="button-container" class="container flex justify-center mt-auto mb-16" in:fade={{ duration: 1000, delay: 400 }}>
        <Button href="/contact?referrer=home_book_a_trip" class="font-semibold text-white bg-transparent no-underline text-lg" variant="outline">BOOK A TRIP</Button>
      </div>
      <div id="scroll-container" class="container flex justify-center mb-12" in:fade={{ duration: 1000, delay: 600 }}>
        <Button variant="ghost" class="bg-transparent hover:bg-transparent text-white" on:click={scrollPage}>
          <ChevronDown class="stroke-secondary w-8 h-8"></ChevronDown>
        </Button>
      </div>
    {/if}
  </section>
{/key}
<section class="container mt-10 lg:max-w-[900px]">
  <h3 class="font-bold italic text-2xl">Byrd Ranch</h3>
  <div class="paragraphs space-y-6 pl-4">
    <p class="text-lg">Established in 2006, Byrd Ranch is a 275 acre ranch located just north of Sweeny, Texas on the San Bernard River.</p>
    <p class="text-lg">This property has whitetail deer, hogs, dove and wood ducks among a variety of other wildlife to enjoy. We also have a wide variety of birds that can be enjoyed including hawks, owls, cardinals, herons, ducks, and spoonbills to name a few.</p>
    <p class="text-lg"><a href="/the_cabin">The cabin</a> was built in 2020. This house was built in the woods and a wonderful place to disconnect and enjoy some down time.</p>
    <p class="text-lg" use:observeScroll={{ sectionId: "learnMoreSection", observerStore: scrollObserverStore }}>We keep track of many of the <a href="/hunting#trophies_in_sight">trophy bucks</a> currently roaming the property and update the site regularly. Take a look and scope out something you're interested in.</p>
  </div>
</section>
<section class="container mt-10 lg:max-w-[1200px]">
  <h3 class="font-bold italic text-2xl lg:max-w-[836px] mx-auto">Learn More...</h3>

  <!-- {#if false} -->
  <div
    use:observeScroll={{ sectionId: "learnMoreSection", observerStore: scrollObserverStore }}
    class="flex flex-col items-center w-[80vw] mx-auto px-4 mt-4
              lg:w-full lg:flex-row lg:justify-evenly"
  >
    {#if $scrollObserverStore.scrolledThrough["learnMoreSection"]}
      <a href="/hunting" class="no-underline" in:fly={{ x: -200, duration: 1000 }}>
        <div class="group relative overflow-hidden rounded-lg">
          <div
            class="w-[80vw] mx-auto h-48 relative bg-center bg-cover bg-no-repeat rounded-lg transition-transform duration-300 scale-100 group-hover:scale-110
                  lg:w-72"
            style="background-image:url({huntingLinkPhoto})"
          ></div>
        </div>
        <h3 class="font-semibold tracking-tighter text-center border-none no-underline">Hunting</h3>
      </a>
      <a href="/fishing" class="no-underline" in:fly={{ y: 100, duration: 1000 }}>
        <div class="group relative overflow-hidden rounded-lg">
          <div
            class="w-[80vw] mx-auto h-48 mt-6 relative bg-center bg-cover bg-no-repeat rounded-lg transition-transform duration-300 scale-100 group-hover:scale-110
                  lg:w-72 lg:mt-0"
            style="background-image:url({fishingLinkPhoto})"
          ></div>
        </div>
        <h3 class="font-semibold tracking-tighter text-center border-none no-underline">Fishing</h3>
      </a>
      <a href="/the_cabin" class="no-underline" in:fly={{ x: 200, duration: 1000 }}>
        <div class="group relative overflow-hidden rounded-lg">
          <div
            class="w-[80vw] mx-auto h-48 mt-6 relative bg-center bg-cover bg-no-repeat rounded-lg transition-transform duration-300 scale-100 group-hover:scale-110
                  lg:w-72 lg:mt-0"
            style="background-image:url({theCabinLinkPhoto})"
          ></div>
        </div>
        <h3 class="font-semibold tracking-tighter text-center border-none no-underline">The Cabin</h3>
      </a>
    {:else}
      <div class="group relative overflow-hidden rounded-lg">
        <Skeleton
          class="w-[80vw] mx-auto my-6  h-48 relative bg-center bg-cover bg-no-repeat rounded-lg transition-transform duration-300 scale-100 group-hover:scale-110
            lg:w-72 lg:my-0"
        />
      </div>
      <div class="group relative overflow-hidden rounded-lg">
        <Skeleton
          class="w-[80vw] mx-auto my-6 h-48 relative bg-center bg-cover bg-no-repeat rounded-lg transition-transform duration-300 scale-100 group-hover:scale-110
            lg:w-72 lg:my-0"
        />
      </div>
      <div class="group relative overflow-hidden rounded-lg">
        <Skeleton
          class="w-[80vw] mx-auto my-6 h-48 relative bg-center bg-cover bg-no-repeat rounded-lg transition-transform duration-300 scale-100 group-hover:scale-110
            lg:w-72 lg:my-0"
        />
      </div>
    {/if}
  </div>
</section>

<div class="h-24"></div>

<ContactForm formTitle="Need More Info?" formSubTitle="Let us know what you're interested in below." />

<div class="h-16"></div>
