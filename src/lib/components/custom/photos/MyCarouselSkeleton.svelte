<script lang="ts">
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
</script>

<div class="container">
  <div class="flex justify-center gap-20">
    <Skeleton class="hidden aspect-square w-full basis-1/3 md:block" />
    <Skeleton class="aspect-square w-full md:basis-1/3" />
    <Skeleton class="hidden aspect-square w-full basis-1/3 md:block" />
  </div>
  <Skeleton class="w-6 h-6 rounded-md mt-1" />
</div>
