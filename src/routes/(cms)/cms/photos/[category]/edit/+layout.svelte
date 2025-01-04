<script lang="ts">
  import { page } from "$app/stores";
  import { getUserAuth } from "$lib/helpers/user";
  import { loginStore } from "$lib/stores/login";
  import PageSpinner from "$lib/components/custom/spinners/PageSpinner.svelte";

  let target = $page.url.pathname;

</script>

<svelte:head>
  <title>Owner CMS | Photos</title>
  <meta name="description" content="Owner CMS for Content" />
</svelte:head>

{#if !$loginStore.loggedIn || $loginStore.loggingIn}
  <PageSpinner caption="ATTEMPTING LOGIN..." />
{:else}
  <slot />
{/if}
