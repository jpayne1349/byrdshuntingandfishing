<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import ContactForm from "$lib/components/custom/forms/contact/ContactForm.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  let referrer: string;
  let contactFormScroll: HTMLElement;

  afterNavigate(() => {
    if ($page.url.searchParams.get("referrer")) {
      referrer = $page.url.searchParams.get("referrer") || "default";
      let yHeight = contactFormScroll.getBoundingClientRect().top + window.scrollY;
      // Adjust for mobile screens (e.g., width < 768px)
      const offset = window.innerWidth < 768 ? 75 : 125;
      if (yHeight) {
        scrollTo({
          top: yHeight - offset,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  });
</script>

<svelte:head>
  <title>Contact Us | Byrd's Hunting & Fishing Excursions</title>
  <meta name="description" content="Drop a line with us! Pick out your preferred dates on the calendar and we will get in touch" />
</svelte:head>

<section class="container flex flex-col space-y-6 w-screen h-[40vh] justify-center text-center">
  <h3>Contact Us</h3>
  <h1 class="text-4xl lg:text-5xl">Have Questions?</h1>
  <div class="flex items-center justify-center text-base lg:text-lg">
    <p class="font-bold mr-1">Email:</p>
    <a href="mailto:byrdshuntingandfishing@gmail.com">byrdshuntingandfishing@gmail.com</a>
  </div>
  <div class="flex items-center justify-center text-base lg:text-lg">
    <p class="font-bold mr-1">Address:</p>
    <a href="https://maps.app.goo.gl/hTViSw7KSJDSP9qQ9" target="_blank" rel="noopener noreferrer" class=""> 9303 FM 1459 Road, Sweeny, TX 77480 </a>
  </div>
  <div class="flex items-center justify-center text-base lg:text-lg">
    <p class="font-bold mr-1">Phone:</p>
    <a href="tel:+19792019082">(979) 201-9082</a>
  </div>
</section>

<div class="h-12 lg:h-6"></div>
<Separator class="w-40 h-2 rounded-xl bg-accent-foreground mx-auto" />
<div class="h-16"></div>

<div id="contact-form-scroll" bind:this={contactFormScroll}></div>
<ContactForm formTitle="Shoot Us a Message" formSubTitle="We'll get back to you soon!" {referrer}></ContactForm>
