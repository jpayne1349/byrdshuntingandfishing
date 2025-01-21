<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { Menu, Spline } from "lucide-svelte";
  import MobileSheetLink from "./MobileSheetLink.svelte";
  import homePhoto from "$lib/photos/mobile_nav_home.jpg";
  import huntingPhoto from "$lib/photos/mobile_nav_hunting.png";
  import fishingPhoto from "$lib/photos/mobile_nav_fishing_2.png";
  import cabinPhoto from "$lib/photos/mobile_nav_cabin.jpg";
  import aboutPhoto from "$lib/photos/mobile_nav_about.jpg";
  import contactPhoto from "$lib/photos/mobile_nav_contact.jpg";
  import bookPhoto from "$lib/photos/mobile_nav_book.jpg";
  import Logo from "../photos/Logo.svelte";

  export let color: string = "black";

  let open = false;
</script>

<div class="container h-16 w-full flex items-center justify-between lg:hidden">
  <a href="/" class="">
    <Logo scale={0.2} style={color} />
  </a>

  <Sheet.Root bind:open>
    <Sheet.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="ghost"
        class="mr-0 mt-0 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
      >
        {#if color == "white"}
          <Menu class="h-8 w-8 stroke-white" />
        {:else}
          <Menu class="h-8 w-8 stroke-black" />
        {/if}
        <span class="sr-only">Toggle Menu</span>
      </Button>
      <Sheet.Content side="right" class="p-0">
        <MobileSheetLink href="/" class="flex items-center" bind:open>
          <span class="mt-4 mx-10 font-bold text-primary text-xl text-center">
            Byrd's Hunting and Fishing Excursions
          </span>
        </MobileSheetLink>

        <div class="my-4 h-dvh overflow-auto pb-10 pl-0">
          <div class="flex flex-col space-y-4">
            <MobileSheetLink
              href="/"
              bind:open
              class="text-white mt-2"
              bg_photo={homePhoto}
            >
              Home
            </MobileSheetLink>
            <MobileSheetLink
              href="/hunting"
              bind:open
              class="text-white"
              bg_photo={huntingPhoto}
            >
              Hunting
            </MobileSheetLink>
            <MobileSheetLink
              href="/fishing"
              bind:open
              class="text-white"
              bg_photo={fishingPhoto}
            >
              Fishing
            </MobileSheetLink>
            <MobileSheetLink
              href="/the_cabin"
              bind:open
              class="text-white"
              bg_photo={cabinPhoto}
            >
              The Cabin
            </MobileSheetLink>
            <!-- <MobileSheetLink
            href="/ranch_activities"
            bind:open
            class="text-muted-foreground"
          >
            Ranch Activities
          </MobileSheetLink> -->
            <MobileSheetLink
              href="/about_us"
              bind:open
              class="text-white"
              bg_photo={aboutPhoto}
            >
              About Us
            </MobileSheetLink>
            <MobileSheetLink
              href="/contact?question"
              bind:open
              class="text-white"
              bg_photo={contactPhoto}
            >
              Contact
            </MobileSheetLink>
            <MobileSheetLink
              href="/contact?book-a-trip"
              bind:open
              class="text-white"
              bg_photo={bookPhoto}
            >
              Book a Trip
            </MobileSheetLink>
          </div>
        </div>
      </Sheet.Content>
    </Sheet.Trigger>
  </Sheet.Root>
</div>

<style>
</style>
