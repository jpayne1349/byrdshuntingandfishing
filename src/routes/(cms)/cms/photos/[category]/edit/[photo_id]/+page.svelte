<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import PhotoForm from "../../add/PhotoForm.svelte";
  import type { Photo } from "$lib/types/Photo";
  import { photoStore } from "$lib/stores/photos";

  // TODO: get the photoObject from the url and pass it into the form to prefill the data and the 'id' behind the scenes,
  // TODO: alter the PhotoForm based on the 'edit' type that the new Photo function doesn't need to assign an id??
  let page_photo_id = $page.params.photo_id;
  let photoInstance: Photo | undefined;

  onMount(() => {
    photoInstance = $photoStore.all.find((photoObj) => {
      if (photoObj.id == page_photo_id) {
        return true;
      }
      return false;
    });
  });
</script>

<div class="container">
  {#if photoInstance}
    <PhotoForm form_type="edit" {photoInstance} />
  {:else}
    <!-- TODO: PhotoFormLoader -->
  {/if}
</div>
