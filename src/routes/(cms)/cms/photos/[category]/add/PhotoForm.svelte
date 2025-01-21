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
  import { Photo, type PhotoInstance } from "$lib/types/Photo";
  import ButtonSpinner from "$lib/components/custom/spinners/ButtonSpinner.svelte";
  import PreviewPhoto from "./PreviewPhoto.svelte";
  import { page } from "$app/stores";
  import { MyEvent } from "$lib/types/Event";
  import { goto } from "$app/navigation";
  import { Trash } from "lucide-svelte";
  import { photoStore } from "$lib/stores/photos";

  let page_category = $page.params.category as string;

  export let form_type: "add" | "edit";
  export let photoInstance = new Photo({
    title: "New Photo",
    category: page_category,
    subcategory: "",
  });
  let errors = {
    category: false,
    subcategory: false,
  };
  let formFields;
  let originalIndex = photoInstance.index;
  let indexUpdated: boolean;

  let hiddenPhotoMessage: "ADD PHOTO BACK" | "HIDE THIS PHOTO" =
    photoInstance.hidden ? "ADD PHOTO BACK" : "HIDE THIS PHOTO";

  var img_preview_src: string = photoInstance.url ? photoInstance.url : "";
  let file_input: HTMLInputElement;
  var file: File | null;
  let submittingForm = false;

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function autofillCategory() {
    if (page_category) {
      photoInstance.category = page_category;
      return { value: page_category, label: capitalizeFirst(page_category) };
    }
    return { value: "" };
  }

  function autfillSubcategory() {
    if (photoInstance.subcategory != "") {
      return {
        value: photoInstance.subcategory,
        label: capitalizeFirst(photoInstance.subcategory),
      };
    }
    return { value: "" };
  }

  function showFilePreview(event: Event) {
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

  function validateSelectFields() {
    if (!photoInstance.category) {
      errors.category = true;
    }
    if (!photoInstance.subcategory) {
      errors.subcategory = true;
    }
    if (!errors.category || !errors.subcategory) {
      submittingForm = false;
    }
    return submittingForm;
  }

  async function hidePhoto() {
    let operation = new MyEvent({
      type: "photos.hidden.updated",
      style: "operation",
      title: "Hiding Photo",
      description: "Removing photo from display list and public view.",
      visibility: "local",
      persist: false,
    });
    // shift to like the highest index and run an update on all the others
    photoInstance.index =
      Photo.nextAvailableIndex(
        photoInstance.category,
        photoInstance.subcategory,
      ) - 1;
    photoInstance.hidden = true;
    operation.saveEvent();
    await photoInstance.updatePhoto();
    await photoInstance.updateIndexes(originalIndex);
    await goto("/cms/photos/" + page_category);
  }
  async function addPhotoBack() {
    let operation = new MyEvent({
      type: "photos.hidden.updated",
      style: "operation",
      title: "Adding Photo",
      description: "Placing photo back into display list and public view.",
      visibility: "local",
      persist: false,
    });
    // shift to like the highest index and run an update on all the others
    photoInstance.index = Photo.nextAvailableIndex(
      photoInstance.category,
      photoInstance.subcategory,
    );
    photoInstance.hidden = false;
    operation.saveEvent();
    await photoInstance.updatePhoto();
    // this is being added at the end, so no comparison to original is needed.
    await photoInstance.updateIndexes(photoInstance.index);
    await goto("/cms/photos/" + page_category);
  }
</script>

<div class="flex flex-col w-full lg:flex-row lg:justify-around mb-10">
  <div class="basis-1/3">
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
        await delay(200);
        // many of the fields are already mapped and set as required in the html, so less verification is needed.
        formFields = {};

        for (const [key, value] of formData) {
          //@ts-ignore
          formFields[key] = value;
        }

        if (!validateSelectFields) {
          cancel();
          return;
        }

        // only triggered on a photo 'ADD'
        if (file) {
          try {
            await photoInstance.savePhoto(file);

            if (indexUpdated) {
              await photoInstance.updateIndexes(originalIndex);
            }

            await goto("/cms/photos/" + page_category);
          } catch (e) {
            new MyEvent({
              type: "photos.create.fail",
              style: "fail",
              title: "Photo Addition Failed",
              description:
                "Something went wrong. Please check the developer console.",
              visibility: "local",
              persist: false,
            });
            console.error(e);
            submittingForm = false;
          }
        } else {
          // triggered on edit
          try {
            await photoInstance.updatePhoto();
            if (indexUpdated) {
              await photoInstance.updateIndexes(originalIndex);
            }
            await goto("/cms/photos/" + page_category);
          } catch (e) {
            new MyEvent({
              type: "photos.update.fail",
              style: "fail",
              title: "Photo Update Failed",
              description:
                "Something went wrong. Please check the developer console.",
              visibility: "local",
              persist: false,
            });
            console.error(e);
            submittingForm = false;
          }
        }

        formElement.reset();
        cancel();

        //FORM NOTES - for info only
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
      <Input
        class="text-base"
        required
        bind:value={photoInstance.title}
        name="title"
      />

      <Label>*Photo Category</Label>
      <Select.Root
        name="category"
        required
        selected={autofillCategory()}
        onSelectedChange={(selectionObject) => {
          //@ts-ignore
          photoInstance.category = selectionObject?.value;
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
        selected={autfillSubcategory()}
        required
        onSelectedChange={(selectionObject) => {
          //@ts-ignore
          photoInstance.subcategory = selectionObject?.value;

          // this selection change is updating the Photo Index input value but not
          // triggering the on:change listener.
          photoInstance.index = Photo.nextAvailableIndex(
            photoInstance.category,
            photoInstance.subcategory,
          );
        }}
        onOpenChange={() => {
          errors.subcategory = false;
        }}
      >
        <Select.Trigger class="">
          <Select.Value placeholder="" />
        </Select.Trigger>
        <Select.Content>
          {#if page_category == "hunting"}
            <Select.Item value="landing_page">Landing Page</Select.Item>
            <Select.Item value="trophies">Trophies</Select.Item>
            <Select.Item value="ranch_photos">Ranch Photos</Select.Item>
          {/if}
        </Select.Content>
        <Tooltip.Root open={errors.subcategory}>
          <Tooltip.Content
            class="h-16 -mt-2 absolute flex 
            items-center shadow-md border-none"
          >
            <p class="text-sm font-regular font-sans tracking-tight">
              Please Select a Subcategory
            </p>
          </Tooltip.Content>
        </Tooltip.Root>
      </Select.Root>
      {#if photoInstance.subcategory == "trophies"}
        <div in:slide={{ delay: 100 }}>
          <Label>*Trophy Price</Label>
          <Input
            class="text-base"
            name="price"
            type="number"
            required
            bind:value={photoInstance.price}
          />
        </div>
      {/if}
      <Label>Photo Description</Label>
      <Textarea
        class="text-base"
        name="description"
        bind:value={photoInstance.description}
      />
      {#if form_type == "add"}
        <Label>*Photo File</Label>
        <Input
          required
          name="file"
          type="file"
          on:change={(event) => {
            showFilePreview(event);
          }}
        />
      {/if}

      {#if !photoInstance.hidden}
        {#if form_type == "add"}
          <Label>
            Photo Index <span class="text-[12px] ml-4 text-muted-foreground">
              Min: 1 | Max: {Photo.nextAvailableIndex(
                photoInstance.category,
                photoInstance.subcategory,
              )}
            </span>
          </Label>
          <Input
            type="number"
            name="index"
            max={Photo.nextAvailableIndex(
              photoInstance.category,
              photoInstance.subcategory,
            )}
            min="1"
            value={Photo.nextAvailableIndex(
              photoInstance.category,
              photoInstance.subcategory,
            )}
            class="w-16 text-base text-center"
            on:change={(event) => {
              //@ts-ignore
              photoInstance.index = parseInt(event.target.value);
              indexUpdated = true;
            }}
          />
        {:else}
          <Label>
            Photo Index <span class="text-[12px] ml-4 text-muted-foreground">
              Min: 1 | Max: {Photo.nextAvailableIndex(
                photoInstance.category,
                photoInstance.subcategory,
              ) - 1}
            </span>
          </Label>
          <Input
            type="number"
            name="index"
            max={Photo.nextAvailableIndex(
              photoInstance.category,
              photoInstance.subcategory,
            ) - 1}
            min="1"
            value={photoInstance.index.toString()}
            class="w-16 text-base text-center"
            on:change={(event) => {
              //@ts-ignore
              photoInstance.index = parseInt(event.target.value);
              indexUpdated = true;
            }}
          />
        {/if}
        <p class="text-xs text-muted-foreground font-thin">
          Sets the display order of the photo in this subcategory.
        </p>
      {/if}

      <Button
        class="mt-4 w-full font-semibold"
        type="submit"
        form="add-photo-form"
      >
        {#if submittingForm}
          <ButtonSpinner />
        {:else if form_type == "add"}
          SUBMIT
        {:else}
          UPDATE
        {/if}
      </Button>
    </form>

    {#if form_type == "edit"}
      <Button
        class="mt-4 w-full relative"
        variant="destructive"
        on:click={() => {
          photoInstance.hidden ? addPhotoBack() : hidePhoto();
        }}
      >
        <Trash class="absolute left-2" />
        <p class="font-semibold">
          {hiddenPhotoMessage}
        </p>
      </Button>
    {/if}
  </div>

  <div class="basis-1/3">
    <p class="text-muted-foreground mt-10 lg:mt-0">Preview</p>
    <div class="flex w-full relative">
      {#if photoInstance.hidden}
        <p
          class="absolute w-[60%] text-center top-[5%] left-[20%] text-2xl font-bold text-white z-10"
        >
          PHOTO HIDDEN
        </p>
        <div class="flex blur-sm w-full">
          <PreviewPhoto src={img_preview_src} />
        </div>
      {:else}
        <PreviewPhoto src={img_preview_src} />
      {/if}
    </div>
  </div>
</div>
