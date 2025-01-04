<script lang="ts">
  import { page } from "$app/stores";
  import { photoStore } from "$lib/stores/photos";
  import type { PhotoType } from "$lib/types/Photo";
  import { onMount } from "svelte";

  let page_category = $page.params.category;
  let category_photos: PhotoType[] = [];

  onMount(() => {
    console.log(category_photos);
    console.log($photoStore.all);
  });

  photoStore.subscribe((storeData) => {
    let temp_photos = structuredClone(storeData.all);
    category_photos = temp_photos.filter((photoObj) => {
      if (photoObj.category == page_category) {
        return true;
      }
      return false;
    });
  });
</script>

<div class="container flex flex-wrap justify-evenly min-h-[85vh]">
  {#each category_photos as photoObj, index}
    <a
      href="/cms/photos/{page_category}/edit/{photoObj.id}"
      class="text-center basis-1/2 p-2 h-fit"
      ><div
        class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg bg-neutral-100"
        style="background-image:url({photoObj.url});"
      ></div>
      <h3>{photoObj.title}</h3>
    </a>
  {/each}
</div>
