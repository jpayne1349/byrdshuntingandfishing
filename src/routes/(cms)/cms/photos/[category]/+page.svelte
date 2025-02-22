<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Collapsible from "$lib/components/ui/collapsible";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { toTitleString } from "$lib/helpers/strings";
  import { photoStore } from "$lib/stores/photos";
  import { ChevronDown } from "lucide-svelte";
  import * as Accordion from "$lib/components/ui/accordion";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";

  let page_category = $page.params.category;

  let subcategoryShowing: string | undefined = undefined;

  //initial load setup for accordian
  if ($page.url.searchParams.get("subcategory")) {
    subcategoryShowing = $page.url.searchParams.get("subcategory") || undefined;
  }

  // add/set url search params on accordian change
  function updateSearchParams(value: string | string[] | undefined) {
    if (typeof value == "string") {
      const params = new URLSearchParams($page.url.searchParams);
      params.set("subcategory", value);
      goto(`?${params.toString()}`, { keepFocus: true });
    } else {
      const params = new URLSearchParams($page.url.searchParams);
      params.delete("subcategory");
      goto(`?${params.toString()}`, { keepFocus: true });
    }
  }
</script>

<div class="container mb-6">
  <Button class="w-full no-underline font-semibold text-lg lg:w-36" href="/cms/photos/{page_category}/add">ADD PHOTO</Button>
</div>

<Accordion.Root
  class="container min-h-[85vh]"
  value={subcategoryShowing}
  onValueChange={(value) => {
    updateSearchParams(value);
  }}
>
  {#if $photoStore.separated[page_category]}
    {#each Object.keys($photoStore.separated[page_category]) as subcategory}
      <Accordion.Item value={subcategory}>
        <Accordion.Trigger><h3 class="font-bold italic text-3xl">{toTitleString(subcategory)}</h3></Accordion.Trigger>
        <Accordion.Content>
          <div class="relative grid auto-rows-min grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 mb-10" transition:fade={{ delay: 100 }}>
            {#each $photoStore.separated[page_category][subcategory] as photoObj}
              <a href="/cms/photos/{page_category}/edit/{photoObj.id}" class="text-center no-underline">
                <div class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg" style="background-image:url({photoObj.url});"></div>
                <div class="flex relative w-full justify-center">
                  <p class="text-muted-foreground text-sm">
                    {photoObj.title}
                  </p>
                  <p class="font-bold text-md absolute left-2 -top-8 z-2 text-white">
                    {photoObj.index}
                  </p>
                </div>
              </a>
            {/each}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    {/each}
  {/if}
</Accordion.Root>
