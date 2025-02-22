<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import AutoScroll from "embla-carousel-auto-scroll";

  export let wordList: string[] = [];
  export let direction: "forward" | "backward" = "forward";
</script>

<div>
  <Carousel.Root
    class="cursor-pointer select-none"
    opts={{
      loop: true,
    }}
    plugins={[AutoScroll({ direction: direction, playOnInit: true, speed: 0.5, stopOnInteraction: false })]}
  >
    <Carousel.Content class="">
      {#each wordList as word}
        <Carousel.Item class="basis-1/2 2xl:basis-1/4"><p class="font-semibold italic text-2xl text-center 2xl:text-3xl">{word}</p></Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous class="hidden" />
    <Carousel.Next class="hidden" />
  </Carousel.Root>
</div>
