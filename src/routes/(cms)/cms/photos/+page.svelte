<script lang="ts">
  import { photoStore } from "$lib/stores/photos";
  import type { PhotoObject } from "$lib/types/Photo";
  import { onMount } from "svelte";

  let alternatePhotoURL =
    "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let huntingPhotoUrl: string;

  onMount(() => {
    let firstHuntingPhoto: PhotoObject | undefined;
    for (let i = 0; i < $photoStore.all.length; i++) {
      if ($photoStore.all[i].hidden) continue;
      firstHuntingPhoto = $photoStore.all[i];
      break;
    }
    huntingPhotoUrl = firstHuntingPhoto?.url || alternatePhotoURL;
  });
</script>

<div class="container grid min-h-[85vh] grid-cols-2 lg:grid-cols-6 gap-2">
  <a href="/cms/photos/hunting" class="text-center">
    <div
      class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg bg-neutral-100"
      style="background-image:url({huntingPhotoUrl});"
    >
      <div
        class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 w-full shadow-sm h-full"
      ></div>
    </div>
    <h3>Hunting Photos</h3>
  </a>
</div>
