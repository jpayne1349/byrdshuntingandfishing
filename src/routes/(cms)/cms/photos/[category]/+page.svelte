<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Collapsible from "$lib/components/ui/collapsible";
  import { photoStore } from "$lib/stores/photos";
  import { ChevronDown } from "lucide-svelte";

  let page_category = $page.params.category;
  let showing_hidden: boolean = false;
</script>

<div class="container mb-6">
  <Button
    class="w-full no-underline font-semibold text-lg lg:w-36"
    href="/cms/photos/{page_category}/add"
  >
    ADD PHOTO
  </Button>
</div>

<div class="container min-h-[85vh]">
  {#if $photoStore.separated[page_category]}
    {#each Object.keys($photoStore.separated[page_category]) as subcategory}
      <h3 class="mb-2 ml-2">{subcategory.toUpperCase()}</h3>
      <div
        class="relative grid auto-rows-min grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 mb-10"
      >
        {#each $photoStore.separated[page_category][subcategory] as photoObj}
          <a
            href="/cms/photos/{page_category}/edit/{photoObj.id}"
            class="text-center no-underline"
          >
            <div
              class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg bg-neutral-100"
              style="background-image:url({photoObj.url});"
            ></div>
            <div class="flex relative w-full justify-center">
              <p class="text-muted-foreground text-sm">
                {photoObj.title}
              </p>
              <p
                class="font-bold text-md absolute left-2 -top-8 z-2 text-white"
              >
                {photoObj.index}
              </p>
            </div>
          </a>
        {/each}
      </div>
    {/each}
  {/if}

  <Collapsible.Root bind:open={showing_hidden}>
    <Collapsible.Trigger>
      <div class="flex items-end space-x-2 mb-6">
        <h3 class="underline underline-offset-4">Hidden Photos</h3>
        <div class:rotate-180={showing_hidden} class="transition-all">
          <ChevronDown />
        </div>
      </div>
    </Collapsible.Trigger>
    <Collapsible.Content>
      {#if $photoStore.separated.hidden}
        <div
          class="relative grid auto-rows-min grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 mb-10"
        >
          {#each $photoStore.separated.hidden.hidden as photoObj}
            <a
              href="/cms/photos/{page_category}/edit/{photoObj.id}"
              class="text-center no-underline"
            >
              <div
                class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg bg-neutral-100"
                style="background-image:url({photoObj.url});"
              ></div>
              <div class="flex relative w-full justify-center">
                <p class="text-muted-foreground text-sm">
                  {photoObj.title}
                </p>
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </Collapsible.Content>
  </Collapsible.Root>
</div>
