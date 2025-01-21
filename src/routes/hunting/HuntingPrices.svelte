<script lang="ts">
  import * as Table from "$lib/components/ui/table";
</script>

<section class="flex mx-6 flex-col align-center my-10 h-full lg:mx-auto">
  <h1 class="font-semibold mb-2">Unlabeled Deer Pricing</h1>
  <p
    class="font-light text-lg leading-tight tracking-tight text-muted-foreground ml-0"
  >
    Find a great buck that we haven't?
  </p>
  <p
    class="font-light text-lg leading-tight tracking-tight text-muted-foreground ml-0 mb-8"
  >
    See our straightforward pricing below.
    <br />
  </p>

  <Table.Root>
    <!-- <Table.Caption>Our current prices based on sizing.</Table.Caption> -->
    <Table.Header>
      <Table.Row class="flex justify-around">
        <Table.Head class="w-[100px] text-center h-6">Class</Table.Head>
        <Table.Head class="w-[100px] text-center h-6">Price</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row class="flex justify-around">
        <Table.Cell class="w-[100px] text-center">130</Table.Cell>
        <Table.Cell class="w-[100px] text-center">$3500.00</Table.Cell>
      </Table.Row>
      <Table.Row class="flex justify-around">
        <Table.Cell class="w-[100px] text-center">140</Table.Cell>
        <Table.Cell class="w-[100px] text-center">$4500.00</Table.Cell>
      </Table.Row>
      <Table.Row class="flex justify-around">
        <Table.Cell class="w-[100px] text-center">150</Table.Cell>
        <Table.Cell class="w-[100px] text-center">$5500.00</Table.Cell>
      </Table.Row>
      <Table.Row class="flex justify-around">
        <Table.Cell class="w-[100px] text-center">160</Table.Cell>
        <Table.Cell class="w-[100px] text-center">$6500.00</Table.Cell>
      </Table.Row>
      <Table.Row class="flex justify-around">
        <Table.Cell class="w-[100px] text-center">170</Table.Cell>
        <Table.Cell class="w-[100px] text-center">$7500.00</Table.Cell>
      </Table.Row>
      <Table.Row class="flex justify-around">
        <Table.Cell class="w-[100px] text-center">180</Table.Cell>
        <Table.Cell class="w-[100px] text-center">$8500.00</Table.Cell>
      </Table.Row>
      <Table.Row class="flex justify-around">
        <Table.Cell
          class="w-[100px] text-center flex justify-center items-center"
        >
          >180
        </Table.Cell>
        <Table.Cell class="w-[100px] text-center">
          $8500.00 <p class="text-sm tracking-tight leading-tight">
            + $125 per inch
          </p>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
</section>
