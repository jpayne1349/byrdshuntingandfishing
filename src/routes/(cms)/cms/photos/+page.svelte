<script lang="ts">
  // TODO: use the latest or top index photos for these buttons.

  let huntingPhotoURL =
    "https://firebasestorage.googleapis.com/v0/b/byrds-hunting-fishing.firebasestorage.app/o/hunting%2Ftrophies%2Fphoto_wvrotVaHH9kysJYI7I6q?alt=media&token=8e49327a-01d8-4738-9676-6fea204cb828";
</script>

<div class="container grid min-h-[85vh] grid-cols-2 gap-2">
  <a href="/cms/photos/hunting" class="text-center"
    ><div
      class="w-full relative aspect-square bg-center bg-cover bg-no-repeat rounded-lg bg-neutral-100"
      style="background-image:url({huntingPhotoURL});"
    >
      <div
        class="flex rounded-lg justify-between px-2 w-[100%] absolute top-0 left-0 w-full shadow-sm h-full"
      ></div>
    </div>
    <h3>Hunting Photos</h3>
  </a>
</div>
