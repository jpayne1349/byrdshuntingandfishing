<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { observeScroll } from "$lib/helpers/intersectionObserver";
  import { scrollObserverStore } from "$lib/stores/scrollObserver";

  let flyInDelayMultiplier = 20;
</script>

<section
  use:observeScroll={{ sectionId: "unlabeledPricing", observerStore: scrollObserverStore }}
  class="flex text-white container flex-col align-center my-10 h-full bg-green-950 bg-opacity-90 pb-16
                sm:text-foreground
                lg:bg-transparent lg:mx-auto lg:basis-1/2"
>
  <h1
    class="font-semibold mb-2 mt-8 text-4xl
                sm:mt-4 sm:mb-2
                xl:text-5xl"
  >
    Unlabeled Pricing
  </h1>
  <p
    class="font-light text-lg leading-tight tracking-tight ml-0
            sm:text-muted-foreground"
  >
    Find a great buck that we haven't?
  </p>
  <p
    class="font-light text-lg leading-tight tracking-tight ml-0 mb-8
           sm:text-muted-foreground"
  >
    See our straightforward pricing below.
    <br />
  </p>

  {#if $scrollObserverStore.scrolledThrough["unlabeledPricing"]}
    <Table.Root>
      <!-- <Table.Caption>Our current prices based on sizing.</Table.Caption> -->
      <Table.Header>
        <Table.Row class="flex justify-around">
          <Table.Head
            class="w-[100px] text-center h-6 text-white text-lg mb-2
                          sm:text-muted-foreground">Class</Table.Head
          >
          <Table.Head
            class="w-[100px] text-center h-6 text-white text-lg mb-2
                          sm:text-muted-foreground">Price</Table.Head
          >
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row class="flex justify-around" flyInDelay={1 * flyInDelayMultiplier}>
          <Table.Cell class="w-[100px] text-center">130</Table.Cell>
          <Table.Cell class="w-[100px] text-center">$3500.00</Table.Cell>
        </Table.Row>
        <Table.Row class="flex justify-around" flyInDelay={2 * flyInDelayMultiplier}>
          <Table.Cell class="w-[100px] text-center">140</Table.Cell>
          <Table.Cell class="w-[100px] text-center">$4500.00</Table.Cell>
        </Table.Row>
        <Table.Row class="flex justify-around" flyInDelay={3 * flyInDelayMultiplier}>
          <Table.Cell class="w-[100px] text-center">150</Table.Cell>
          <Table.Cell class="w-[100px] text-center">$5500.00</Table.Cell>
        </Table.Row>
        <Table.Row class="flex justify-around" flyInDelay={4 * flyInDelayMultiplier}>
          <Table.Cell class="w-[100px] text-center">160</Table.Cell>
          <Table.Cell class="w-[100px] text-center">$6500.00</Table.Cell>
        </Table.Row>
        <Table.Row class="flex justify-around" flyInDelay={5 * flyInDelayMultiplier}>
          <Table.Cell class="w-[100px] text-center">170</Table.Cell>
          <Table.Cell class="w-[100px] text-center">$7500.00</Table.Cell>
        </Table.Row>
        <Table.Row class="flex justify-around" flyInDelay={6 * flyInDelayMultiplier}>
          <Table.Cell class="w-[100px] text-center">180</Table.Cell>
          <Table.Cell class="w-[100px] text-center">$8500.00</Table.Cell>
        </Table.Row>
        <Table.Row class="flex justify-around" flyInDelay={7 * flyInDelayMultiplier}>
          <Table.Cell class="w-[100px] text-center flex justify-center items-center">>180</Table.Cell>
          <Table.Cell class="w-[100px] text-center">
            $8500.00 <p class="text-sm tracking-tight leading-tight">+ $125 per inch</p>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  {/if}
</section>
