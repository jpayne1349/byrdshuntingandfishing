<script lang="ts">
  import stand_1 from "$lib/photos/hunting_stand_1.jpg";
  import stand_2 from "$lib/photos/hunting_stand_2.jpg";
</script>

<section
  id="huntings_stands"
  class="flex mx-6 flex-col align-center my-10 h-full 
        lg:basis-1/2"
>
<h1 class="font-semibold mb-2 mt-8 text-4xl
sm:mt-4 sm:mb-2

xl:text-5xl ">
Grab a Seat!
</h1>
  <p
    class="font-light text-lg leading-tight tracking-tight text-muted-foreground ml-0"
  >
    Check out our main hunting stands below.
  </p>
  <div class="lg:flex gap-4">
    <div class="mt-4">
      <img
        src={stand_1}
        alt="Hunting Stand #1"
        class="rounded-lg w-[45rem]
              lg:basis-1/2 "
      />
    </div>
    <div class="mt-4">
      <img
        src={stand_2}
        alt="Hunting Stand #2"
        class="rounded-lg w-[45rem]
              lg:basis-1/2"
      />
    </div>
  </div>
</section>
