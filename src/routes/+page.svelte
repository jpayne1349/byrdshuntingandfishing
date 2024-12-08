<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import bgPhoto from "$lib/photos/deer_homepage_bg.jpg";
  import { ChevronDown } from "lucide-svelte";
</script>

<svelte:head>
  <title>Byrd's Hunting & Fishing Excursions</title>
  <meta
    name="description"
    content="Trophy Whitetail with a private cabin. Massive Redfish out of Matagorda Bay. Check out what we have to offer at Byrd's Hunting and Fishing Excursions in south Texas."
  />
</svelte:head>

<section
  id="home-landing"
  class="absolute top-0 left-0 flex flex-col w-full max-h-[100lvh] min-h-[100vh] bg-center bg-cover bg-no-repeat px-4 justify-center"
  style="background-image:url({bgPhoto});"
>
  <h3
    class="xl:absolute mt-20 xl:mt-0 left-[5vw] xl:top-[65vh] xl:max-w-[50vh] text-white font-bold text-5xl xl:text-7xl 3xl:text-9xl border-none text-center tracking-tight leading-12"
  >
    EXPERIENCE TEXAS OUTDOORS
  </h3>
  <div
    id="button-container"
    class="container flex justify-center mt-auto mb-16"
  >
    <Button
      href="/contact?book-a-trip"
      class="font-semibold text-white bg-transparent no-underline text-lg"
      variant="outline">BOOK A TRIP</Button
    >
  </div>
  <div id="scroll-container" class="container flex justify-center mb-6">
    <button> <ChevronDown class="stroke-white w-8 h-8" /></button>
  </div>
</section>
<section class="relative container mt-[100dvh]">
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
      <a href="/the_cabin">The Cabin</a> was built in 2020. This house was built
      in the woods and a wonderful place to disconnect and enjoy some down time.
    </p>
  </div>
</section>
