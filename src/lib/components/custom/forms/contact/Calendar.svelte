<script lang="ts">
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import type { DateRange } from "bits-ui";
  import { CalendarDate, DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let value: DateRange | undefined;

  const df = new DateFormatter("en-US", {
    dateStyle: "medium",
  });

  let calendarOpen = false;

  // let value: DateRange | undefined = {
  //   start: new CalendarDate(2022, 1, 20),
  //   end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
  // };
</script>

<div class="grid gap-2">
  <Popover.Root openFocus bind:open={calendarOpen}>
    <Popover.Trigger asChild let:builder>
      <Button variant="outline" class={cn("justify-start text-left text-base font-normal bg-transparent border-gray-400 h-14", !value && "text-muted-foreground")} builders={[builder]}>
        <CalendarIcon class="mr-2 h-5 w-5 stroke-muted-foreground" />
        {#if value && value.start}
          {#if value.end}
            {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(value.end.toDate(getLocalTimeZone()))}
          {:else}
            {df.format(value.start.toDate(getLocalTimeZone()))}
          {/if}
        {:else}
          Interested Date Range
        {/if}
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0" align="center">
      <RangeCalendar
        initialFocus
        numberOfMonths={1}
        bind:value
        onValueChange={(value) => {
          dispatch("value", value);
        }}
      />
    </Popover.Content>
  </Popover.Root>
</div>
