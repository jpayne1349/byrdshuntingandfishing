<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import SplatterBackground from "./SplatterBackground.svelte";
  import fishingBgPhoto from "$lib/photos/fishing_bg_darkened.png";
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import WordCarouselTemplate from "./WordCarouselTemplate.svelte";
  import CaptainCard from "./CaptainCard.svelte";
  import captainBradyPhoto from "$lib/photos/captainBrady.png";
  import captainRonniePhoto from "$lib/photos/captainRonnie.png";
  import OnTheWaterBg from "$lib/components/custom/svg/OnTheWaterBg.svelte";
  import MyCarousel from "$lib/components/custom/photos/MyCarousel.svelte";
  import ContactForm from "$lib/components/custom/forms/contact/ContactForm.svelte";
  import { scrollObserverStore } from "$lib/stores/scrollObserver";
  import { observeScroll } from "$lib/helpers/intersectionObserver";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import { fade } from "svelte/transition";

  let headingDiv: HTMLElement;
  let landingPhotoHeight: number = 500;
  let windowHeight: number;
  let windowCalcDone = false;
  let windowWidth: number; //for the photos svg background

  onMount(() => {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    landingPhotoHeight = windowHeight - headingDiv.offsetHeight - 62;
    // if on desktop, set a resize listener. not for mobile
    if (window.innerWidth > 500) {
      landingPhotoHeight = windowHeight - headingDiv.offsetHeight - 94;
      window.addEventListener("resize", () => {
        windowHeight = window.innerHeight;
        landingPhotoHeight = windowHeight - headingDiv.offsetHeight - 94;

        windowWidth = window.innerWidth;
      });
    }
    windowCalcDone = true;
  });

  let locationsList = ["Galveston Bay", "Matagorda Bay", "Intracoastal Canal", "BLANK", "PREFILL", "ETC"];
  let speciesList = ["Redfish", "Speckled Trout", "Flounder", "BLANK", "PREFILL", "ETC"];
</script>

<svelte:head>
  <title>Fishing Charters with Captain Byrd</title>
  <meta name="description" content="Sit back and relax while we put you on the fish! Inshore bay fishing out of Matagorda, Galveston, and the Texas Gulf Coast." />
</svelte:head>

<section id="fishing-landing-view" class="" use:observeScroll={{ sectionId: "fishingLanding", observerStore: scrollObserverStore }}>
  <div class="flex flex-col items-center justify-center pt-2 pb-6 relative md:pt-0 md:pb-12" bind:this={headingDiv}>
    {#if $scrollObserverStore.scrolledThrough["fishingLanding"]}
      <SplatterBackground />
    {/if}
    <h1
      class="text-5xl font-semibold text-center
              xl:text-6xl
              2xl:text-8xl"
    >
      BYRD'S FISHING
    </h1>
    <h1
      class="text-2xl font-bold
              2xl:text-4xl"
    >
      Join us on the Water
    </h1>
    <Separator class="mt-4 h-1 w-24 bg-accent-foreground rounded-lg"></Separator>
  </div>

  {#if windowCalcDone}
    <!-- {#if false} -->
    <div style="background-image:url({fishingBgPhoto});  height:{landingPhotoHeight}px;" class="max-w-[100vw] w-[100vw] bg-[calc(100%+30px)_center] bg-cover bg-no-repeat relative flex items-end justify-center animate-bg-pan lg:animate-none xl:bg-center">
      <div in:fade={{ delay: 200 }} id="button-container" class="container flex justify-center mt-auto mb-24">
        <Button href="/contact?referrer=fishing_drop_a_line" class="font-semibold text-white bg-transparent no-underline text-lg" variant="outline">DROP A LINE</Button>
      </div>
    </div>
  {:else}
    <!-- estimated window space for placeholder for above -->
    <Skeleton
      class="w-screen h-[130vw]  relative
                  lg:h-[70vh]
                  3xl:h-[80vh]"
    ></Skeleton>
  {/if}
</section>

<section id="fishing-areas-and-species" class="flex flex-col space-y-6 my-10 md:my-20">
  <WordCarouselTemplate wordList={locationsList} />
  <WordCarouselTemplate wordList={speciesList} direction="backward" />
</section>

<section
  id="captain-bio"
  class="flex flex-col container justify-center space-y-10 pb-10 mb-20
        md:flex-row md:space-y-0 md:space-x-20"
>
  <CaptainCard photoSrc={captainRonniePhoto} nameAndTitle="Captain Ronnie Byrd" bioText="Licensed charter boat captain with X years experience in the area. (to be populated)" />
  <CaptainCard photoSrc={captainBradyPhoto} nameAndTitle="Captain Brady Byrd" bioText="Licensed charter boat captain with X years experience in the area. (to be populated)" />
</section>

<section id="on-the-water-photos" class="pb-8 mb-20 relative space-y-6 overflow-hidden">
  <OnTheWaterBg />

  <MyCarousel category="fishing" subcategory="on_the_water" />
</section>

<ContactForm bgColor="EAF6F6" />

<div class="h-24"></div>
