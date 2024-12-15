<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import huntingBgPhoto from "$lib/photos/hunting/hunting_main.png";
  import { ChevronDown } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let windowHeight: number;
  let windowCalcDone = false;

  onMount(() => {
    windowHeight = window.innerHeight;
    console.log("Window Height:", windowHeight);
    windowCalcDone = true;
  });

  function scrollPage() {
    window.scrollTo({
      top: windowHeight,
      left: 0,
      behavior: "smooth",
    });
  }
</script>

<svelte:head>
  <title>Private Hunts | Hunting at Byrd Ranch</title>
  <meta
    name="description"
    content="Some of the best Whitetail in Texas! Check out our pricing and spotted trophies. Shoot the buck of a lifetime or enjoy a weekend with your loved ones. Prices include lodging!"
  />
</svelte:head>

<section class="container mt-4">
  <h1>Join us for a hunt!</h1>
  <h4>Upfront Pricing</h4>
  <h4>Lodging Included</h4>
  <h4>100% Success Rate</h4>
</section>

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
      <a href="/the_cabin">The Cabin</a> was built in 2020. This house was built
      in the woods and a wonderful place to disconnect and enjoy some down time.
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
