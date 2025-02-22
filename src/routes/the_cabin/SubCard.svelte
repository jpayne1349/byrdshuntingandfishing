<script lang="ts">
  export let photoSrc: string;
  export let title: string = "Kitchen";
  export let description: string;
</script>

<div
  class="flex flex-col w-full h-[100vw] rounded-xl overflow-clip
        md:h-[55vh] md:w-[30vw]
        2xl:w-[20vw] 2xl:max-w-[400px]"
>
  <div class="basis-2/3 bg-cover bg-no-repeat bg-left md:h-[275px] md:max-h-[275px]" style="background-image:url({photoSrc});">
    <!-- <img src={photoSrc} alt="Captain's Bio" /> -->
  </div>
  <div class="basis-1/3 flex flex-col space-y-2 p-8 bg-[#FFF7F1] md:h-fit md:rounded-br-xl md:rounded-bl-xl">
    <h3 class="font-bold italic text-4xl">{title}</h3>
    <p class="text-lg">{description}</p>
  </div>
</div>
