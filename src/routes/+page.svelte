<script lang="ts">
  import Logo from "$lib/components/custom/photos/Logo.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import homeBgPhoto from "$lib/photos/deer_homepage_bg.jpg";
  import { ChevronDown } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let windowHeight: number;
  let windowCalcDone = false;

  onMount(() => {
    windowHeight = window.innerHeight;
    windowCalcDone = true;
    // if on desktop, set a resize listener. not for mobile
    if (window.innerWidth > 500) {
      window.addEventListener("resize", () => {
        windowHeight = window.innerHeight;
      });
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
  <meta
    name="description"
    content="Trophy Whitetail with a private cabin. Massive Redfish out of Matagorda Bay. Check out what we have to offer at Byrd's Hunting and Fishing Excursions in south Texas."
  />
</svelte:head>

<div
  id="background-image"
  class="absolute top-0 left-0 max-w-[100vw] w-[100vw] bg-center bg-cover bg-no-repeat"
  style="background-image:url({homeBgPhoto}); height:{windowHeight}px;"
></div>

{#key windowHeight}
  <section
    id="home-landing"
    class="transition-all relative flex flex-col w-[100vw] h-[90vh] px-4 justify-center"
    style="height:{windowHeight - 64}px;"
  >
    <div class="hidden lg:flex w-full justify-center">
      <Logo scale={0.7} style="white" />
    </div>
    <h3
      class="xl:absolute mt-10 mb-auto xl:mt-0 left-[3vw] xl:top-[55vh] xl:max-w-[50vh] text-white font-bold text-5xl xl:text-7xl 3xl:text-9xl border-none text-center tracking-tight leading-12"
    >
      EXPERIENCE TEXAS OUTDOORS
    </h3>
    {#if windowCalcDone}
      <div
        id="button-container"
        class="container flex justify-center mt-auto mb-16"
        in:fade={{ duration: 1000, delay: 200 }}
      >
        <Button
          href="tel:+19792019082"
          class="font-semibold text-white bg-transparent no-underline text-lg"
          variant="outline">BOOK A TRIP</Button
        >
      </div>
      <div
        id="scroll-container"
        class="container flex justify-center mb-6"
        in:fade={{ duration: 1000, delay: 500 }}
      >
        <Button
          variant="ghost"
          class="bg-transparent hover:bg-transparent text-white"
          on:click={scrollPage}
        >
          <ChevronDown class="stroke-secondary w-8 h-8"></ChevronDown>
        </Button>
      </div>
    {/if}
  </section>
{/key}
<section class="relative container mt-10">
  <h4 class="px-2 text-2xl font-bolt mt-0">Byrd Ranch</h4>
  <Separator class="w-10 ml-1 h-1 my-1 bg-accent-foreground" />
  <div id="details" class="px-6 text-lg font-medium space-y-8">
    <p>
      Established in 2006, Byrd Ranch is a 275 acre ranch located just north of
      Sweeny, Texas on the San Bernard River.
    </p>
    <p>
      This property has whitetail deer, hogs, dove and wood ducks among a
      variety of other wildlife to enjoy. We also have a wide variety of birds
      that can be enjoyed including hawks, owls, cardinals, herons, ducks, and
      spoonbills to name a few.
    </p>
    <p>
      The Cabin was built in 2020. This house was built in the woods and a
      wonderful place to disconnect and enjoy some down time.
    </p>
  </div>
  <!-- <iframe
    title="Google Maps Location"
    jsname="L5Fo6c"
    class="YMEQtf"
    sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals allow-storage-access-by-user-activation"
    frameborder="0"
    aria-label="Map, 9303 Farm to Market Rd 1459"
    src="https://maps-api-ssl.google.com/maps?hl=en&amp;ll=29.055989,-95.687797&amp;output=embed&amp;q=9303+Farm+to+Market+Rd+1459,+Sweeny,+TX+77480,+USA+(9303+Farm+to+Market+Rd+1459)&amp;z=17"
    allowfullscreen=""
  ></iframe> -->
</section>
