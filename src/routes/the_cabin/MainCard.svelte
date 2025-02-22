<script lang="ts">
  export let photoSrc: string;
  export let title: string = "Kitchen";
  export let description: string;
</script>

<div
  class="flex flex-col w-full h-[130vw] rounded-xl overflow-clip mt-16 mb-6
          md:flex-row md:w-full md:h-[55vh]"
>
  <div class="basis-2/3 bg-cover bg-no-repeat bg-left md:basis-2/3 lg:basis-3/4" style="background-image:url({photoSrc});">
    <!-- <img src={photoSrc} alt="Captain's Bio" /> -->
  </div>
  <div class="basis-1/3 flex flex-col space-y-2 p-8 bg-[#FFF7F1] md:basis-1/3 lg:basis-1/4">
    <h3 class="font-bold italic text-4xl">{title}</h3>
    <p class="text-lg">{description}</p>
  </div>
</div>
