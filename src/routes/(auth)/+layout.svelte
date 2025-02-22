<script lang="ts">
  import { page } from "$app/stores";
  import { getUserAuth } from "$lib/helpers/user";
  import { loginStore } from "$lib/stores/login";
  import { fly } from "svelte/transition";

  let target = $page.url.searchParams.get("target") || undefined;

  getUserAuth(target);

  $: outDuration = $loginStore.loggingIn ? 1000 : 0;
</script>

<section id="login-page" class="relative grid overflow-hidden md:flex-grow md:grid-cols-2 2xl:mx-auto 2xl:mb-auto 2xl:mt-[4vh] 2xl:h-[800px] 2xl:w-[1536px] 2xl:flex-grow-0 2xl:rounded-2xl 2xl:border">
  <div id="login-photo" class="hidden grayscale md:block md:bg-cover md:bg-center" style="background-image:url(https://images.unsplash.com/photo-1676244934430-5f8e90e988c1?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D); " in:fly={{ x: -50, duration: 1000 }}>
    <h3 class="ml-10 mt-2 scroll-m-20 text-xl font-semibold tracking-tight text-black md:text-2xl">South Texas Software, LLC</h3>
    <h5 class="font-sm -mt-1 ml-14 scroll-m-20 text-sm leading-none text-white">Content Management System</h5>
  </div>

  <div
    class="form-wrapper flex"
    in:fly={{ x: 50, duration: 1000 }}
    on:outroend={() => {
      $loginStore.loggingIn = false;
    }}
  >
    <slot />
  </div>
</section>

<style>
</style>
