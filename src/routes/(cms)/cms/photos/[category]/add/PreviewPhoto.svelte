<script lang="ts">
  export let src: string;
</script>

<div
  class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg bg-neutral-100"
  style="background-image:url({src});"
>
  <div
    class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 w-full shadow-sm h-full"
  ></div>
</div>
