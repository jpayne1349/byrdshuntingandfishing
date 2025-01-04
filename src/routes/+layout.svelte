<script lang="ts">
  import "../app.pcss";
  import AlertContainer from "$lib/components/custom/alerts/AlertContainer.svelte";
  import MyAlert from "$lib/components/custom/alerts/MyAlert.svelte";
  import { alertStore } from "$lib/stores/alert";
  import { ModeWatcher } from "mode-watcher";
  import PublicHeader from "$lib/components/custom/layout/PublicHeader.svelte";
  import PublicFooter from "$lib/components/custom/layout/PublicFooter.svelte";
  import { onMount } from "svelte";
  import { connectionHandler } from "$lib/helpers/firebase";
  import { fb } from "$lib/stores/firebase";
  import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
  import { photoStore } from "$lib/stores/photos";
  import type { PhotoType } from "$lib/types/Photo";

  onMount(async () => {
    await connectionHandler();
    populatePhotoStore();
  });

  function populatePhotoStore() {
    const q = query(collection($fb.db, "photos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      $photoStore.all = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        $photoStore.all = [...$photoStore.all, doc.data() as PhotoType];
      });
      console.log("photoStore updated: ", $photoStore.all);
    });
  }
</script>

<main class="relative flex flex-col">
  <PublicHeader />

  <slot />

  <PublicFooter />
</main>
<AlertContainer>
  {#if $alertStore.active}
    <MyAlert
      title={$alertStore.active.title}
      description={$alertStore.active.description}
      style={$alertStore.active.style}
    ></MyAlert>
  {/if}
</AlertContainer>
