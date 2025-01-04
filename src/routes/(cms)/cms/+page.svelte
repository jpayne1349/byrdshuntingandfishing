<script lang="ts">
  // TODO: use the latest or top index photos for these buttons.

  let huntingPhotoURL =
    "https://images.unsplash.com/photo-1532910408503-35362ead3526?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
</script>

<div class="container grid min-h-[85vh] grid-cols-2 gap-2">
  <a href="/cms/photos" class="text-center"
    ><div
      class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg bg-neutral-100"
      style="background-image:url({huntingPhotoURL});"
    >
      <div
        class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 w-full shadow-sm h-full"
      ></div>
    </div>
    <h3>Photos</h3>
  </a>
</div>
