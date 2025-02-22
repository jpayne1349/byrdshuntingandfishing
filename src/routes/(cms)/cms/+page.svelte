<script lang="ts">
  import { photoStore } from "$lib/stores/photos";
  import type { PhotoObject } from "$lib/types/Photo";
  import { onMount } from "svelte";
  import noPhotosYet from "$lib/photos/no_photos_yet_placeholder.png";
  import { toTitleString } from "$lib/helpers/strings";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import type { Unsubscriber } from "svelte/store";

  let photoPagesList = ["photos"];
  let linkPhotosList: string[];
  let photoLinksGenerated = false;
  let unSubListener: Unsubscriber;

  onMount(() => {
    if ($photoStore.populated) {
      buildLinkList();
      photoLinksGenerated = true;
      return;
    } // prevents a second subscription lifecycle

    // await population if this page is loaded first for the app.
    unSubListener = photoStore.subscribe((storeData) => {
      if (storeData.populated) {
        buildLinkList();
        photoLinksGenerated = true;
        unSubListener();
      }
    });
  });

  function buildLinkList() {
    linkPhotosList = photoPagesList.map((value) => {
      return firstPhotoUrlOrStock(value);
    });
  }

  // MODIFIED TO JUST PULL FIRST NON-HIDDEN PHOTO
  function firstPhotoUrlOrStock(category: string) {
    let firstPhoto: PhotoObject | undefined;
    for (let i = 0; i < $photoStore.all.length; i++) {
      if ($photoStore.all[i].hidden) continue;
      firstPhoto = $photoStore.all[i];
      break;
    }
    return firstPhoto?.url || noPhotosYet;
  }
</script>

<div class="container grid min-h-[85vh] grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-min">
  {#if photoLinksGenerated}
    {#each photoPagesList as pageName, index}
      <a href="/cms/{pageName}" class="text-center h-fit">
        <div class="w-full relative shadow-lg aspect-square bg-center bg-cover bg-no-repeat rounded-lg mb-2" style="background-image:url({linkPhotosList[index]});">
          <div class="flex rounded-lg justify-between px-2 absolute top-0 left-0 w-full shadow-sm h-full"></div>
        </div>
        <h3>{toTitleString(pageName)}</h3>
      </a>
    {/each}
  {:else}
    {#each photoPagesList as pageName, index}
      <a href="/cms/{pageName}" class="text-center">
        <div class="w-full relative shadow-lg aspect-square bg-center bg-cover bg-no-repeat rounded-lg mb-2">
          <Skeleton class="flex rounded-lg justify-between px-2 absolute top-0 left-0 w-full shadow-sm h-full"></Skeleton>
        </div>
        <h3>{toTitleString(pageName)}</h3>
      </a>
    {/each}
  {/if}
</div>
