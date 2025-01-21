<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  let currentYear: number;
  let d = new Date();
  currentYear = d.getFullYear();
</script>

<Separator class="w-[50%] mx-auto mb-6 mt-auto"></Separator>
<footer
  class="text-muted-foreground flex flex-col lg:flex-row lg:space-x-10 justify-center items-center mb-10"
>
  <div class="text-center lg:hidden lg:mb-16">
    <p class="text-center leading-tight mb-2">
      Byrd's Hunting and Fishing
      <br />
      Excursions &copy;{currentYear}
    </p>
  </div>
  <div class="text-center">
    <p>Call Us Today!</p>
    <Button variant="outline" class="no-underline" href="tel:+19792019082">
      (979) 201-9082
    </Button>
  </div>
  <div class="text-center hidden lg:flex lg:mb-16">
    <p class="text-center leading-tight mb-2">
      Byrd's Hunting and Fishing
      <br />
      Excursions &copy;{currentYear}
    </p>
  </div>
  <div class="text-center">
    <p class="mt-4">Plan a Visit</p>
    <Button
      variant="outline"
      class="py-2 h-16 no-underline"
      href="https://www.google.com/maps/place/Byrd's+Hunting+and+Fishing+Excursions/@29.0559894,-95.6877967,15z/data=!4m6!3m5!1s0x86404d78dee86ba1:0x619e2ff7437ed20b!8m2!3d29.0559894!4d-95.6877967!16s%2Fg%2F11n0cmcrjk?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
    >
      9303 FM Rd 1459 <br />
      Sweeny, TX 77480
    </Button>
  </div>
</footer>
