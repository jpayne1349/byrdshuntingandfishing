<script lang="ts">
  import { page } from "$app/stores";
  import { getUserAuth } from "$lib/helpers/user";
  import { loginStore } from "$lib/stores/login";
  import PageSpinner from "$lib/components/custom/spinners/PageSpinner.svelte";
  import { ChevronRight } from "lucide-svelte";
  import { photoStore } from "$lib/stores/photos";

  let target = $page.url.pathname;
  getUserAuth(target);

  var breadCrumbs: { label: string; url: string }[] = [];
  var fullPathList: string[] = [];

  page.subscribe((storeData) => {
    fullPathList = storeData.url.pathname.split("/");
    if (fullPathList.length > 2) {
      // deeper than the CMS HOME
      breadCrumbs = fullPathList.map((value) => {
        if (value == "cms") {
          return { label: "CMS HOME", url: "/cms" };
        }
        if (value == "photos") {
          return { label: "ALL PHOTOS", url: "/cms/photos" };
        }
        if (value.length > 10) {
          if ($page.url.pathname.includes("photos")) {
            let matchingPhoto = $photoStore.all.find((photoObj) => {
              return photoObj.id == value;
            });
            if (matchingPhoto?.title) {
              return {
                label: matchingPhoto.title.toUpperCase(),
                url:
                  "/cms/photos/" +
                  $page.params.category +
                  "/" +
                  matchingPhoto.id,
              };
            } else {
              return { label: "ERROR", url: "" };
            }
          }
        }
        if (value == $page.params.category) {
          return {
            label: value.toUpperCase(),
            url: "/cms/photos/" + $page.params.category,
          };
        }
        return { label: value.toUpperCase(), url: "" };
      });
      breadCrumbs = breadCrumbs.slice(1); // remove the blank "" from position 0

      breadCrumbs = breadCrumbs.filter((crumb) => {
        return crumb.label === "EDIT" ? false : true;
      });
      breadCrumbs = breadCrumbs.reverse();
    } else {
      breadCrumbs = [];
    }
  });

  // index is backwards going into this because of the overflow left setup
  // so index 0 = the current page viewed
  // index 1 = fullPathList - 1
  // etc.
  function generateLink(index: number) {
    let curretPathList = $page.url.pathname.split("/");
    let linkPath = "/";
    console.log(curretPathList);
    for (let step = 0; step < curretPathList.length - index - 1; step++) {
      linkPath = linkPath.concat(curretPathList[step + 1] + "/"); // starts at + 1 because the curretPathList has a "" in index 0
    }
    console.log("index ", index, "returning linkpath", linkPath);
    return linkPath;
  }
</script>

<svelte:head>
  <title>Owner CMS</title>
  <meta name="description" content="Owner CMS for Content" />
</svelte:head>

{#if !$loginStore.loggedIn || $loginStore.loggingIn}
  <PageSpinner caption="ATTEMPTING LOGIN..." />
{:else}
  <h2 class="flex justify-center no-underline border-none -mb-2">Owner CMS</h2>
  <div class="overflow-hidden container">
    <div
      class="flex relative items-center max-w-[85%] w-fit ml-[7.5%] space-x-1 mb-4 mt-2 overflow-scroll whitespace-nowrap flex-row-reverse"
    >
      {#each breadCrumbs as crumb, index}
        {#if index == 0}
          <p class="font-bold no-underline">{crumb.label}</p>
        {:else if index > 0}
          <span><ChevronRight class="w-4 h-4" /></span>
          <a href={crumb.url} class="">{crumb.label}</a>
        {/if}
      {/each}
    </div>
  </div>

  <slot />
{/if}
