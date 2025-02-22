<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton";
</script>

<section
  class="absolute h-[26vw] top-48 lg:top-20 2xl:top-24 flex w-full left-0 justify-evenly items-center"
>
  <div
    class=" flex w-[28vw] justify-evenly pr-20 2xl:justify-center 2xl:space-x-5 2xl:pr-0 2xl:pl-36"
  >
    <Skeleton class="lg:h-[10vw]  2xl:w-36 2xl:h-36 rounded" />
    <Skeleton class="lg:h-[10vw] 2xl:w-36 2xl:h-36 rounded" />
  </div>

  <Skeleton class="w-[80vw] h-[70vw] lg:h-[24vw] lg:w-[28vw] rounded" />

  <div
    class=" flex w-[28vw] justify-evenly pl-20 2xl:justify-center 2xl:space-x-5 2xl:pl-0 2xl:pr-36"
  >
    <Skeleton class="lg:h-[10vw] 2xl:w-36 2xl:h-36 rounded" />
    <Skeleton class="lg:h-[10vw] 2xl:w-36 2xl:h-36 rounded" />
  </div>
</section>
