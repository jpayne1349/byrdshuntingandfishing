<script lang="ts">
  import stand_1 from "$lib/photos/hunting/hunting_stand_1.jpg";
  import stand_2 from "$lib/photos/hunting/hunting_stand_1.jpg";
</script>

<section
  id="huntings_stands"
  class="flex mx-6 flex-col align-center my-10 h-full lg:mx-auto"
>
  <h1 class="font-semibold mb-2">Grab a Seat!</h1>
  <p
    class="font-light text-lg leading-tight tracking-tight text-muted-foreground ml-0"
  >
    Check out our main hunting stands below.
  </p>
  <div class="lg:flex space-x-4">
    <div class="mt-4">
      <img
        src={stand_1}
        alt="Hunting Stand #1"
        class="rounded-lg w-[45rem] lg:w-72"
      />
    </div>
    <div class="mt-4">
      <img
        src={stand_2}
        alt="Hunting Stand #2"
        class="rounded-lg w-[45rem] lg:w-72"
      />
    </div>
  </div>
</section>
