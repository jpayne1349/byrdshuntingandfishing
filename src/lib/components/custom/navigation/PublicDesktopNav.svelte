<script lang="ts">
  import { page } from "$app/stores";
  import { cn } from "$lib/utils";
  import Logo from "../photos/Logo.svelte";

  export let color: string;
</script>

<div class="hidden lg:flex container h-24 w-full items-center justify-center">
  {#if color == "white"}
    <div class="mr-4 hidden md:flex">
      <nav class="flex items-center space-x-6 text-xl">
        <a
          href="/"
          class={cn(
            "transition-colors hover:text-white/80 no-underline underline-offset-0",
            $page.url.pathname === "/" ? "text-white/50" : "text-white",
          )}
        >
          Home
        </a>
        <a
          href="/hunting"
          class={cn(
            "transition-colors hover:text-white/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/hunting")
              ? "text-white/50"
              : "text-white",
          )}
        >
          Hunting
        </a>
        <a
          href="/fishing"
          class={cn(
            "transition-colors hover:text-white/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/fishing")
              ? "text-white/50"
              : "text-white",
          )}
        >
          Fishing
        </a>
        <a
          href="/the_cabin"
          class={cn(
            "transition-colors hover:text-white/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/the_cabin")
              ? "text-white/50"
              : "text-white",
          )}
        >
          The Cabin
        </a>
        <a
          href="/about_us"
          class={cn(
            "transition-colors hover:text-white/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/about_us")
              ? "text-white/50"
              : "text-white",
          )}
        >
          About Us
        </a>
        <a
          href="/contact?question"
          class={cn(
            "transition-colors hover:text-white/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/contact?question")
              ? "text-white/50"
              : "text-white",
          )}
        >
          Contact
        </a>
        <a
          href="/contact?book-a-trip"
          class={cn(
            "transition-colors hover:text-white/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/contact?book-a-trip")
              ? "text-white/50"
              : "text-white",
          )}
        >
          Book a Trip
        </a>
      </nav>
    </div>
  {:else}
    <div class="mr-4 hidden md:flex">
      <a href="/" class="no-underline absolute left-10 top-2">
        <Logo scale={0.3} style="black" />
      </a>

      <nav class="flex items-center space-x-6 text-xl">
        <a
          href="/"
          class={cn(
            "transition-colors hover:text-black/80 no-underline underline-offset-0",
            $page.url.pathname === "/" ? "text-black/50" : "text-black",
          )}
        >
          Home
        </a>
        <a
          href="/hunting"
          class={cn(
            "transition-colors hover:text-black/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/hunting")
              ? "text-black/50"
              : "text-black",
          )}
        >
          Hunting
        </a>
        <a
          href="/fishing"
          class={cn(
            "transition-colors hover:text-black/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/fishing")
              ? "text-black/50"
              : "text-black",
          )}
        >
          Fishing
        </a>
        <a
          href="/the_cabin"
          class={cn(
            "transition-colors hover:text-black/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/the_cabin")
              ? "text-black/50"
              : "text-black",
          )}
        >
          The Cabin
        </a>
        <a
          href="/about_us"
          class={cn(
            "transition-colors hover:text-black/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/about_us")
              ? "text-black/50"
              : "text-black",
          )}
        >
          About Us
        </a>
        <a
          href="/contact?question"
          class={cn(
            "transition-colors hover:text-black/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/contact?question")
              ? "text-black/50"
              : "text-black",
          )}
        >
          Contact
        </a>
        <a
          href="/contact?book-a-trip"
          class={cn(
            "transition-colors hover:text-black/80 no-underline underline-offset-0",
            $page.url.pathname.includes("/contact?book-a-trip")
              ? "text-black/50"
              : "text-black",
          )}
        >
          Book a Trip
        </a>
      </nav>
    </div>
  {/if}
</div>

<style>
</style>
