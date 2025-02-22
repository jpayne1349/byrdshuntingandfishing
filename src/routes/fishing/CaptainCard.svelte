<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";

  export let photoSrc: string;
  export let nameAndTitle: string = "Captain";
  export let bioText: string;
</script>

<div
  class="flex flex-col w-full h-[120vw] rounded-xl overflow-clip
        md:flex-row md:w-full md:h-[45vh]"
>
  <div class="basis-2/3 bg-cover bg-no-repeat bg-left md:basis-1/2" style="background-image:url({photoSrc});">
    <!-- <img src={photoSrc} alt="Captain's Bio" /> -->
  </div>
  <div class="basis-1/3 flex flex-col space-y-2 p-4 bg-[#EAF6F6] md:basis-1/2">
    <h3 class="font-semibold text-2xl">{nameAndTitle}</h3>
    <Separator class="w-12 h-1 bg-accent-foreground rounded-sm"></Separator>
    <p class="text-lg">{bioText}</p>
  </div>
</div>
