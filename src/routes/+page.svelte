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
  class="relative flex flex-col w-full min-h-screen bg-center bg-cover bg-no-repeat px-4"
  style="background-image:url({bgPhoto});"
>
  <div id="header-gap" class="h-20"></div>

  <h3
    class="xl:absolute left-[5vw] top-[65vh] xl:max-w-[50vh] text-white font-bold text-5xl xl:text-7xl 3xl:text-9xl border-none text-center tracking-tight leading-12"
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
<h4 class="px-4 text-2xl font-bolt mt-10">Byrd Ranch</h4>
<Separator class="w-16 ml-4 h-1 mb-1 bg-accent-foreground" />
<section id="details" class="px-6 text-lg font-medium space-y-8">
  <p>
    Established in 2006, Byrd Ranch is a 275 acre ranch located just north of
    Sweeny, Texas on the San Bernard River.
  </p>
  <p>
    This property has whitetail deer, hogs, dove and wood ducks among a variety
    of other wildlife to enjoy. We also have a wide variety of birds that can be
    enjoyed including hawks, owls, cardinals, herons, ducks, and spoonbills to
    name a few.
  </p>
  <p>
    The Cabin was built in 2020. This house was built in the woods and a
    wonderful place to disconnect and enjoy some down time.
  </p>
</section>
