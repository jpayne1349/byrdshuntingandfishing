<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import aboutUsPhoto from "$lib/photos/about_us_bg.png";
  import aboutTheBoys from "$lib/photos/about_the_boys.png";
  import aboutBeginnings from "$lib/photos/about_beginnings.png";
  import aboutAndYou from "$lib/photos/about_and_you.png";
  import { ChevronDown } from "lucide-svelte";
  import { onMount } from "svelte";
  import ContactForm from "$lib/components/custom/forms/contact/ContactForm.svelte";

  let headingDiv: HTMLElement;
  let landingPhotoHeight: number = 500;
  let windowHeight: number;
  let windowCalcDone = false;
  let windowWidth: number; //for the photos svg background

  onMount(() => {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    //mobile for this page only needs to be limited due to preferred photo aspect ratio
    landingPhotoHeight = windowWidth * 0.44;
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

  function scrollPage() {
    window.scrollTo({
      top: windowHeight - 50,
      left: 0,
      behavior: "smooth",
    });
  }
</script>

<svelte:head>
  <title>About Us | Byrd's Hunting & Fishing Excursions</title>
  <meta name="description" content="Get to know us and our passion for the outdoors, family first mentality, and connection with nature that we would love to share with you!" />
</svelte:head>

<section id="fishing-landing-view" class="">
  <div class="flex flex-col items-center justify-center pt-2 pb-6 relative md:pt-0 md:pb-12" bind:this={headingDiv}>
    <h1
      class="text-5xl font-semibold text-center
              lg:text-7xl"
    >
      ABOUT US
    </h1>
    <h1
      class="text-xl font-bold
              lq:text-2xl"
    >
      Your Guides and Host
    </h1>
    <Separator class="mt-4 h-1 w-24 bg-[#BF9C4F] rounded-lg"></Separator>
  </div>
  {#if windowCalcDone}
    <div style="background-image:url({aboutUsPhoto});  height:{landingPhotoHeight}px;" class="max-w-[1200px] mx-auto w-[100vw] bg-cover bg-top bg-no-repeat relative xl:rounded-xl">
      <div class="absolute hidden lg:flex bottom-6 w-full justify-center">
        <Button variant="outline" class="bg-transparent hover:bg-transparent" on:click={scrollPage}>
          <ChevronDown class="stroke-secondary w-8 h-8"></ChevronDown>
        </Button>
      </div>
    </div>
  {/if}
</section>

<section class="container mt-16 lg:max-w-[900px]">
  <h3 class="font-bold italic text-2xl">The Byrd's</h3>
  <p class="text-lg pl-4">Married 26 years, we moved to Brazoria County in 1999 and fell in love with the coastline and the outdoors. Ronnie and Windy Byrd established Byrd Ranch in 2006 and had a vision of sharing this space with other outdoor enthusiasts for years to come.</p>
</section>

<section class="container mt-16">
  <div class="max-w-3xl mx-auto lg:max-w-[1000px]">
    <h3 class="font-bold italic text-2xl text-center lg:hidden">The Boys</h3>
    <img src={aboutTheBoys} alt="The Boys Together" class="float-left w-1/2 mr-4 my-4 rounded-lg shadow-md lg:mr-16" />
    <h3 class="hidden font-bold italic text-2xl text-right -mr-4 lg:flex">The Boys</h3>

    <p class="text-lg">Our two boys, Brady and Randy Byrd have grown up on the ranch. As learn by doing parents, we guided both boys in the construction of <a href="/the_cabin">the cabin</a> guest house starting from chopping down the trees. Every hammered nail and each brush stroke represents our devotion to making this dream.</p>
  </div>
</section>

<section class="container mt-16">
  <div class="max-w-2xl mx-auto lg:max-w-[1000px]">
    <h3 class="font-bold italic text-2xl text-left lg:hidden">Beginnings</h3>
    <img src={aboutBeginnings} alt="Cookie the Fawn" class="float-right w-1/2 ml-2 mb-1 rounded-lg shadow-md lg:ml-16" />
    <h3 class="hidden font-bold italic text-2xl text-left -ml-4 lg:flex">Beginnings</h3>
    <p class="text-lg pl-4">Our first breeder buck, Cookie, started this all. Pictured is his first fawn on the Byrd Ranch. Cookie was a very special part of our family and he sure loved his animal crackers! He is dearly missed and we will remember him always.</p>
  </div>
</section>

<section class="container mt-16">
  <div class="max-w-2xl mx-auto lg:max-w-[1000px]">
    <h3 class="font-bold italic text-2xl text-center -ml-4">And You?</h3>
    <img src={aboutAndYou} alt="Family Together" class="my-4 rounded-lg shadow-md mx-auto" />
    <p class="text-lg lg:max-w-[600px] lg:mx-auto">We treat each of our visitors like family and continue to create unforgettable memories with others. Join us for a <a href="/hunting">hunting</a> or <a href="/fishing">fishing</a> trip, or just relax at <a href="/the_cabin">the cabin</a>. Come see why we think this is such a valuable and peaceful way to live!</p>
  </div>
</section>

<div class="h-24"></div>

<ContactForm formTitle="Want to Know More?" formSubTitle="We can answer your questions, drop them below." />

<div class="h-16"></div>
