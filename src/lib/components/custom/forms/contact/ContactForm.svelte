<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { DateRange } from "bits-ui";
  import Calendar from "./Calendar.svelte";
  import ContactInput from "./ContactInput.svelte";
  import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
  import ButtonSpinner from "../../spinners/ButtonSpinner.svelte";
  import { fade, fly, slide } from "svelte/transition";
  import groupPhoto from "$lib/photos/group_photo.png";
  import { ref } from "firebase/storage";
  import { fb } from "$lib/stores/firebase";
  import { doc, setDoc } from "firebase/firestore";
  import { generateUUID } from "$lib/helpers/id";
  import { MyEvent } from "$lib/types/Event";
  import ContactPreference from "./ContactPreference.svelte";
  import { photoStore } from "$lib/stores/photos";
  import type { PhotoObject } from "$lib/types/Photo";

  export let formTitle = "Contact Us!";
  export let formSubTitle = "Can't call right now? Drop us a line and we'll set the hook.";
  export let bgColor = "00FFFFFF";
  export let referrer = "default";

  let formFields;
  let submittingForm = false;
  let formSubmitted = false;
  let calendarSelection: DateRange;
  let contactPreference: string = "unspecified";
  let referrerMessage: string;
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const df = new DateFormatter("en-US", {
    dateStyle: "medium",
  });

  function formatMessage(key: string): string {
    const messages: Record<string, string> = {
      default: "",
      login_attempts_timeout: "Login Error: I'm having trouble logging in, can you help with this please?",
      create_account_attempts_timeout: "Create Account Error: I'm having trouble creating an account, can you help with this please?",
      home_book_a_trip: "Hi! I'd like to book a trip.",
      fishing_drop_a_line: "Hi! I'd like to book a fishing trip.",
      cabin_schedule_now: "Hi! I'd like to book a stay at The Cabin.",
      cabin_rates: "Hi! I'm interested in pricing for The Cabin.",
    };

    // Check if key matches dynamic pattern (e.g., "trophy_hunt_1")
    const match = key.match(/^trophy_hunt_(\d+)$/);
    if (match) {
      const huntId = parseInt(match[1], 10);
      console.log(huntId);
      console.log($photoStore.separated.hunting.trophies);
      const trophyPhotoObject = $photoStore.separated.hunting.trophies.find((photoObject) => {
        return photoObject.index == huntId;
      });
      if (trophyPhotoObject) {
        return `Hi! I'm interested in booking a hunt for "${trophyPhotoObject.title}"`;
      } else {
        new MyEvent({
          type: "trophy.form.failed",
          style: "fail",
          title: "Trophy Not Found!",
          description: "Something went wrong. Please submit the form with more details.",
          visibility: "local",
          persist: false,
        });
        return "";
      }
    }

    return messages[key] || "";
  }
</script>

<div class="flex flex-col items-center mx-4">
  <h2 class="border-none text-4xl font-bold mb-0">
    {formTitle}
  </h2>
  <p class="font-light tracking-tight pb-4">{formSubTitle}</p>

  <form
    id="contact-form"
    name="contact-form"
    enctype="multipart/form-data"
    method="POST"
    class="relative flex flex-col rounded-xl bg-[#{bgColor}] px-6 pt-6 pb-10 md:px-10 md:pt-10 md:pb-16"
    use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {
      submittingForm = true;
      await delay(200);
      // many of the fields are already mapped and set as required in the html, so less verification is needed.
      formFields = {};

      for (const [key, value] of formData) {
        //@ts-ignore
        formFields[key] = value;
      }

      let startDate, endDate;
      if (calendarSelection?.start) {
        startDate = df.format(calendarSelection.start.toDate(getLocalTimeZone()));
      }
      if (calendarSelection?.end) {
        endDate = df.format(calendarSelection.end.toDate(getLocalTimeZone()));
      }
      //@ts-ignore
      formFields.startDate = startDate || "unspecified";
      //@ts-ignore
      formFields.endDate = endDate || "unspecified";
      //@ts-ignore
      formFields.created = Math.floor(Date.now() / 1000);
      //@ts-ignore
      formFields.contactPreference = contactPreference;
      //@ts-ignore
      formFields.referrer = referrer;

      try {
        const formRef = doc($fb.db, "forms", generateUUID("form_"));
        await setDoc(formRef, formFields);

        // email payload to backend
        let sendNotificationEmail = await fetch("/api/contact_request", {
          method: "POST",
          body: JSON.stringify(formFields),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let apiResponse = await sendNotificationEmail.json();

        if (apiResponse.error) {
          console.error(apiResponse.code);
          throw new Error("Email Server Request Failed with code: ", apiResponse.code);
        }

        formSubmitted = true;
        setTimeout(() => {
          formSubmitted = false;
        }, 10000);
      } catch (e) {
        console.log(e);
        new MyEvent({
          type: "form.submission.failed",
          style: "fail",
          title: "Something Went Wrong",
          description: "Your form submission did not save, please try again later.",
          visibility: "local",
          persist: false,
        });
      }

      submittingForm = false;
      formElement.reset();
      cancel();

      //FORM NOTES - for info only
      // `formElement` is this `<form>` element
      // `formData` is its `FormData` object that's about to be submitted
      // `action` is the URL to which the form is posted
      // calling `cancel()` will prevent the submission
      // `submitter` is the `HTMLElement` that caused the form to be submitted

      return async ({ result, update }) => {
        // `result` is an `ActionResult` object
        // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
      };
    }}
  >
    {#if formSubmitted}
      <div class="absolute h-full w-full flex top-0 left-0 flex-col items-center space-y-10 justify-center z-10 backdrop-blur-sm rounded-xl" in:fade>
        <h2 class="border-none text-4xl font-bold mb-0" in:fade={{ delay: 200 }}>Thank You!</h2>
        <div class="bg-center bg-cover bg-no-repeat h-36 w-80 rounded-xl mx-10" in:fade={{ delay: 200 }} style="background-image:url({groupPhoto});"></div>
        <p class="font-light tracking-tight pb-4 text-center" in:fade={{ delay: 200 }}>Your form has been submitted.<br />We will reach out soon.</p>
      </div>
    {/if}
    <div id="name-and-phone" class="flex space-x-4 mb-4">
      <ContactInput name="name" label="*Name" autocomplete="name" isRequired />
      <ContactInput name="phone" type="tel" label="*Phone" autocomplete="tel" isRequired />
    </div>
    <div class="mb-4">
      <ContactInput name="email" type="email" label="E-mail" autocomplete="email" />
    </div>
    <div class="mb-4">
      <Calendar
        on:value={(event) => {
          calendarSelection = event.detail;
        }}
      />
    </div>

    <ContactInput name="details" label="Details" variant="textarea" details={formatMessage(referrer)} />

    <ContactPreference
      on:selection={(evt) => {
        contactPreference = evt.detail;
      }}
    />
    <Button class="my-4 w-full font-semibold text-base py-6 bg-transparent border-gray-400" variant="outline" type="submit" form="contact-form">
      {#if submittingForm}
        <ButtonSpinner />
      {:else}
        SEND
      {/if}
    </Button>
    <p class="text-center font-light text-xs">Information submitted is used for booking purposes only.<br />No data is shared or used in any other way.</p>
  </form>
</div>
