<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import * as Select from "$lib/components/ui/select";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { slide } from "svelte/transition";
  import { Photo, type PhotoType } from "$lib/types/Photo";
  import ButtonSpinner from "$lib/components/custom/spinners/ButtonSpinner.svelte";
  import PreviewPhoto from "./PreviewPhoto.svelte";

  // TODO: ? index placement ?

  let formFields;
  let photoObject: PhotoType = {
    id: "",
    added: -1,
    title: "",
    description: "",
    hidden: false,
    category: "",
    subcategory: "",
    url: "",
    price: "",
  };
  let errors = {
    category: false,
    subcategory: false,
  };
  var img_preview_src: string;
  let file_input: HTMLInputElement;
  var file: File | null;
  let submittingForm = false;

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
        id="add-photo-form"
        enctype="multipart/form-data"
        method="POST"
        use:enhance={async ({
          formElement,
          formData,
          action,
          cancel,
          submitter,
        }) => {
          submittingForm = true;
          // many of the fields are already mapped and set as required in the html, so less verification is needed.
          formFields = {};
          console.log(formData);
          for (const [key, value] of formData) {
            //@ts-ignore
            formFields[key] = value;
          }
          if (!photoObject.category) {
            errors.category = true;
          }
          if (!photoObject.subcategory) {
            errors.subcategory = true;
          }
          if (!errors.category || !errors.subcategory) {
            submittingForm = false;
            cancel();
          }

          let newPhoto = new Photo({
            title: photoObject.title,
            category: photoObject.category,
            subcategory: photoObject.subcategory,
          });

          if (photoObject.description != "") {
            newPhoto.description = photoObject.description;
          }

          if (photoObject.price) {
            newPhoto.price = photoObject.price;
          }

          console.log(newPhoto);

          if (file) {
            try {
              await newPhoto.savePhoto(file);
            } catch (e) {
              console.log("Caught an ERROR in Saving Photo");
              console.error(e);
            }
          }
          // cancel because we arent actually posting this to the server.
          submittingForm = false;
          formElement.reset();
          cancel();
          //FORM NOTES
          // `formElement` is this `<form>` element
          // `formData` is its `FormData` object that's about to be submitted
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
        <Input required bind:value={photoObject.title} name="title" />

        <Label>*Photo Category</Label>
        <Select.Root
          name="category"
          required
          onSelectedChange={(selectionObject) => {
            //@ts-ignore
            photoObject.category = selectionObject?.value;
          }}
          onOpenChange={() => {
            errors.category = false;
          }}
        >
          <Select.Trigger class="">
            <Select.Value placeholder="" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="hunting">Hunting</Select.Item>
          </Select.Content>
          <Tooltip.Root open={errors.category}>
            <Tooltip.Content
              class="h-16 -mt-2 absolute flex items-center shadow-md border-none"
            >
              <p class="text-sm font-regular font-sans tracking-tight">
                Please Select a Category
              </p>
            </Tooltip.Content>
          </Tooltip.Root>
        </Select.Root>
        <Label>*Photo Subcategory</Label>
        <Select.Root
          name="subcategory"
          required
          onSelectedChange={(selectionObject) => {
            //@ts-ignore
            photoObject.subcategory = selectionObject?.value;
          }}
          onOpenChange={() => {
            errors.subcategory = false;
          }}
        >
          <Select.Trigger class="">
            <Select.Value placeholder="" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="trophies">Trophies</Select.Item>
          </Select.Content>
          <Tooltip.Root open={errors.subcategory}>
            <Tooltip.Content
              class="h-16 -mt-2 absolute flex items-center shadow-md border-none"
            >
              <p class="text-sm font-regular font-sans tracking-tight">
                Please Select a Subcategory
              </p>
            </Tooltip.Content>
          </Tooltip.Root>
        </Select.Root>
        {#if photoObject.subcategory == "trophies"}
          <div in:slide={{ delay: 100 }}>
            <Label>*Trophy Price</Label>
            <Input
              name="price"
              type="number"
              required
              bind:value={photoObject.price}
            />
          </div>
        {/if}
        <Label>Photo Description</Label>
        <Textarea name="description" bind:value={photoObject.description} />
        <Label>*Photo File</Label>
        <Input
          required
          name="file"
          type="file"
          on:change={(event) => {
            showFilePreview(event);
          }}
        />
        <Button class="mt-4 w-80" type="submit" form="add-photo-form">
          {#if submittingForm}
            <ButtonSpinner />
          {:else}
            SUBMIT
          {/if}
        </Button>
      </form>

      <p class="text-muted-foreground mt-10">Preview</p>
      <div class="flex w-full">
        <PreviewPhoto src={img_preview_src} />
      </div>
    </div>
  </div>
  <Separator orientation="vertical" />
  <div class="flex basis-3/4">
    <!-- Populate Cards from db -->
  </div>
</div>
