<script lang="ts">
  import { page } from "$app/stores";
  //import { siteConfig } from '$lib/config';
  import { cn } from "$lib/utils";
  import { Spline } from "lucide-svelte";
</script>

<div class="mr-4 hidden md:flex">
  <a
    href="/"
    class="mb-1 mr-6 flex items-center space-x-2 no-underline underline-offset-0"
  >
    <!-- TODO: LOGO HERE?? absolute positioned off to the left-->
  </a>
  <nav class="flex items-center space-x-6 text-xl">
    <a
      href="/"
      class={cn(
        "transition-colors hover:text-white/80 no-underline underline-offset-0",
        $page.url.pathname === "/" ? "text-white/50" : "text-white"
      )}
    >
      Home
    </a>
    <a
      href="/hunting"
      class={cn(
        "transition-colors hover:text-white/80 no-underline underline-offset-0",
        $page.url.pathname.includes("/hunting") ? "text-white/50" : "text-white"
      )}
    >
      Hunting
    </a>
    <a
      href="/fishing"
      class={cn(
        "transition-colors hover:text-white/80 no-underline underline-offset-0",
        $page.url.pathname.includes("/fishing") ? "text-white/50" : "text-white"
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
          : "text-white"
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
          : "text-white"
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
          : "text-white"
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
          : "text-white"
      )}
    >
      Book a Trip
    </a>
  </nav>
</div>

<style>
</style>
