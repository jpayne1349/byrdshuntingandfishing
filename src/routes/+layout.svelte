<script lang="ts">
  import "../app.pcss";
  import AlertContainer from "$lib/components/custom/alerts/AlertContainer.svelte";
  import MyAlert from "$lib/components/custom/alerts/MyAlert.svelte";
  import { alertStore } from "$lib/stores/alert";
  import PublicHeader from "$lib/components/custom/layout/PublicHeader.svelte";
  import PublicFooter from "$lib/components/custom/layout/PublicFooter.svelte";
  import { onMount } from "svelte";
  import { connectionHandler } from "$lib/helpers/firebase";
  import { fb } from "$lib/stores/firebase";
  import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
  import { photoStore } from "$lib/stores/photos";
  import { Photo, type PhotoObject } from "$lib/types/Photo";
  import type { Config } from "@sveltejs/adapter-vercel";

  export const config: Config = {
    runtime: "nodejs20.x",
  };

  //TODO: waiting for email domain verification and then update the template for password reset

  //TODO: make email required if contact preference is email

  onMount(async () => {
    await connectionHandler();
    populatePhotoStore();
  });

  function populatePhotoStore() {
    const q = query(collection($fb.db, "photos"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      $photoStore.all = [];
      querySnapshot.forEach((doc) => {
        let photoInstance = new Photo({ ...(doc.data() as PhotoObject) });
        $photoStore.all = [...$photoStore.all, photoInstance];
      });
      $photoStore.populated = true;
      //console.log("PhotoStore all: ", $photoStore.all);
      $photoStore.separated = {};
      $photoStore.separated = Photo.separatePhotos();
      // console.log("PhotoStore Separated: ", $photoStore.separated);
    });
  }
</script>

<main class="relative flex flex-col min-h-[118vh]">
  <PublicHeader />

  <slot />
  <!-- <div class="fixed bottom-5 right-5">{JSON.stringify($scrollObserverStore.scrolledThrough, null, 2)}</div> -->
  <PublicFooter />
</main>
<AlertContainer>
  {#if $alertStore.active}
    <MyAlert title={$alertStore.active.title} description={$alertStore.active.description} style={$alertStore.active.style}></MyAlert>
  {/if}
</AlertContainer>
