<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import Inputmask from "inputmask";
  import { toTitleString } from "$lib/helpers/strings";
  import { cn } from "$lib/utils.js";
  import { onMount } from "svelte";

  export let name: string;
  export let label: string = toTitleString(name);
  export let autocomplete = "off";
  export let type: "text" | "tel" | "search" | "none" | "url" | "email" | "numeric" | "decimal" | null | undefined = "text";
  export let variant: "input" | "textarea" = "input";
  export let isRequired: boolean = false;
  export let details: string = "";

  let inputElement: HTMLInputElement;

  let applyCapsToNameInput = "";
  if (name == "name") applyCapsToNameInput = "capitalize";

  onMount(() => {
    if (type == "tel" && inputElement) {
      const newMask = new Inputmask("(999) 999-9999", {
        showMaskOnHover: false, // Disable the mask on hover
      });
      newMask.mask(inputElement);
    }
  });
</script>

<div class="relative w-full">
  {#if variant == "input"}
    <Input bind:el={inputElement} {type} inputmode={type} {autocomplete} {name} required={isRequired} class={cn("peer text-xl bg-transparent w-full h-14 px-3 pt-6 pb-2 border border-gray-400 rounded-md focus:border-black focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-transparent", applyCapsToNameInput)} placeholder=" " />
    <label
      for={name}
      class="absolute left-3 top-[.3rem] text-gray-500 text-xs transition-all select-none pointer-events-none
           peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
           peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs
           peer-focus:text-black"
    >
      {label}
    </label>
  {:else}
    <Textarea value={details} id="details" name="details" class="peer w-full text-xl bg-transparent h-48 px-3 pt-6 pb-2 border border-gray-400 rounded-md focus:border-black focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-transparent" placeholder=" " autocomplete="off"></Textarea>
    <label
      for={name}
      class="absolute left-3 top-[.3rem] text-gray-500 text-xs transition-all select-none pointer-events-none
             peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
             peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs
             peer-focus:text-black"
    >
      {label}
    </label>
  {/if}
</div>
