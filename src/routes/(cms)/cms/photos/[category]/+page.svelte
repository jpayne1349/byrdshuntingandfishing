<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import * as Select from "$lib/components/ui/select";
  import type { Photo } from "$lib/types/Photo";

  let formFields;
  let photoObject: {
    title: string;
    description?: string;
    hidden: boolean;
    category: string | unknown;
    subcategory: string | unknown;
    url?: string;
    added?: number;
    price?: string;
  } = {
    title: "",
    description: "",
    hidden: false,
    category: "",
    subcategory: "",
    url: "",
    price: "",
  };
  var img_preview_src: string;
  let file_input: HTMLInputElement;
  var file: File | null;

  function showFilePreview(event: Event) {
    console.log(event);
    file_input = event.target as HTMLInputElement;

    if (file_input.files) {
      file = file_input.files[0] as File;
    }

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        img_preview_src = reader.result as string;
      });
      reader.readAsDataURL(file);

      return;
    }
  }
</script>

<div class="container flex min-h-[85vh]">
  <div class="flex flex-col basis-1/4">
    <h2 class="w-80">Add Photo</h2>
    <div class="w-80">
      <form
        method="POST"
        use:enhance={({ formElement, formData, action, cancel, submitter }) => {
          // `formElement` is this `<form>` element
          // `formData` is its `FormData` object that's about to be submitted
          formFields = {};

          for (const [key, value] of formData) {
            //@ts-ignore
            formFields[key] = value;
          }
          // `action` is the URL to which the form is posted
          // calling `cancel()` will prevent the submission
          // `submitter` is the `HTMLElement` that caused the form to be submitted

          return async ({ result, update }) => {
            // `result` is an `ActionResult` object
            // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
          };
        }}
      >
        <Label>*Photo Title / Name</Label>
        <Input required bind:value={photoObject.title} />
        <Label>Photo Description</Label>
        <Input bind:value={photoObject.description} />
        <Label>Photo Category</Label>
        <Select.Root
          onSelectedChange={(selectionObject) => {
            photoObject.category = selectionObject?.value;
          }}
        >
          <Select.Trigger class="">
            <Select.Value placeholder="" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="hunting">Hunting</Select.Item>
          </Select.Content>
        </Select.Root>
        <Label>Photo Subcategory</Label>
        <Select.Root
          onSelectedChange={(selectionObject) => {
            photoObject.subcategory = selectionObject?.value;
          }}
        >
          <Select.Trigger class="">
            <Select.Value placeholder="" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="trophies">Trophies</Select.Item>
          </Select.Content>
        </Select.Root>
        <Label>Photo File</Label>
        <Input
          required
          type="file"
          on:change={(event) => {
            showFilePreview(event);
          }}
        />
        <Button class="mt-4" type="submit">Submit</Button>
      </form>

      <p class="text-muted-foreground mt-10">Preview</p>
      <div class="flex w-full">
        {#key img_preview_src}
          <div
            class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg"
            style="background-image:url({img_preview_src});"
          >
            <div
              class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 w-full shadow-sm"
            >
              <h4 class="text-xl text-white p-1">{photoObject.title}</h4>
              <h4 class="text-xl text-white p-1">{photoObject.price}</h4>
            </div>
          </div>
        {/key}
      </div>
    </div>
  </div>
  <Separator orientation="vertical" />
  <div class="flex basis-3/4">
    <!-- Populate Cards from db -->
  </div>
</div>
