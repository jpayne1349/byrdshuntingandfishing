<script lang="ts">
  import "../app.pcss";

  import AlertContainer from "$lib/components/custom/alerts/AlertContainer.svelte";
  import MyAlert from "$lib/components/custom/alerts/MyAlert.svelte";
  import { alertStore } from "$lib/stores/alert";
  import { ModeWatcher } from "mode-watcher";
  import DarkModeToggle from "$lib/components/custom/darkmode/tempDarkModeToggle.svelte";
  import PublicHeader from "$lib/components/custom/layout/PublicHeader.svelte";
  import PageSpinner from "$lib/components/custom/spinners/PageSpinner.svelte";
  import PublicFooter from "$lib/components/custom/layout/PublicFooter.svelte";
</script>

<ModeWatcher defaultMode={"light"} />

<main class="base-layout relative flex h-[100vh] flex-col items-center">
  <PublicHeader />
  <div class="flex relative flex-col overflow-x-hidden h-[100vh] w-full">
    <slot />
  </div>
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
