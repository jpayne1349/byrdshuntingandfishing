<script lang="ts">
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { StringSet } from "$lib/helpers/strings";
  import { createEventDispatcher } from "svelte";

  export let selection: StringSet = new StringSet();

  let dispatch = createEventDispatcher();
</script>

<div class="flex space-x-6 mt-4 justify-start">
  <div class="flex items-center space-x-1">
    <Checkbox
      id="email"
      name="email"
      form="contact-form"
      class="border-gray-400 w-5 h-5 "
      onCheckedChange={(checked) => {
        if (checked) {
          selection.add("email");
        } else {
          selection.remove("email");
        }
        dispatch("selection", selection.concat());
      }}
    />
    <Label for="email" class="text-gray-500 text-base select-none cursor-pointer">Email</Label>
  </div>
  <div class="flex items-center space-x-1">
    <Checkbox
      id="call"
      name="call"
      form="contact-form"
      class="border-gray-400 w-5 h-5 "
      onCheckedChange={(checked) => {
        if (checked) {
          selection.add("call");
        } else {
          selection.remove("call");
        }
        dispatch("selection", selection.concat());
      }}
    />
    <Label for="call" class="text-gray-500 text-base select-none cursor-pointer">Call</Label>
  </div>
  <div class="flex items-center space-x-1">
    <Checkbox
      id="text"
      name="text"
      form="contact-form"
      class="border-gray-400 w-5 h-5 "
      onCheckedChange={(checked) => {
        if (checked) {
          selection.add("text");
        } else {
          selection.remove("text");
        }
        dispatch("selection", selection.concat());
      }}
    />
    <Label for="text" class="text-gray-500 text-base select-none cursor-pointer">Text</Label>
  </div>
</div>
