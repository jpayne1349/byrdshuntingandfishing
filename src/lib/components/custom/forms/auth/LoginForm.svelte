<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import ButtonSpinner from "$lib/components/custom/spinners/ButtonSpinner.svelte";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { fb } from "$lib/stores/firebase";
  import { MyEvent } from "$lib/types/Event";
  import { userStore } from "$lib/stores/user";
  import { loginStore } from "$lib/stores/login";
  import MaxAttemptsAlert from "./MaxAttemptsAlert.svelte";
  import { generateUserRelation, getUser } from "$lib/helpers/user";

  let isLoading = false;

  let formFields: { [key: string]: string };

  let formAttempts = 0;
  let showAlert = false;

  $: if (formAttempts > 4) {
    showAlert = true;
  }

  // this handles the form blocking/loading indication while the auth request resolves
  // once resolved -> if not logged in, the form becomes available
  loginStore.subscribe((storeData) => {
    if (storeData.loggingIn) {
      isLoading = true;
    } else {
      isLoading = false;
    }
  });
</script>

<form
  class="relative mx-auto my-[100px] grid max-w-[370px] grid-cols-1 gap-y-1 px-5 md:my-auto md:max-h-[400px]"
  method="POST"
  action="/login"
  use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {
    isLoading = true;
    formFields = {};

    for (const [key, value] of formData) {
      //@ts-ignore
      formFields[key] = value;
    }

    // attempt login
    try {
      let userCredential = await signInWithEmailAndPassword($fb.auth, formFields.email, formFields.password);

      if (userCredential.user) {
        $loginStore.loggingIn = true;
      }
    } catch (e) {
      formAttempts++;

      new MyEvent({
        type: "login.fail",
        style: "fail",
        title: "Login Failed",
        description: "Incorrect email or password.",
        visibility: "local",
        persist: false,
      });

      isLoading = false;
      cancel();
    }

    return;
  }}
>
  <h1 class="scroll-m-20 text-xl font-semibold tracking-tight">Account Login</h1>
  <p class="mb-4 text-sm text-muted-foreground">Existing users can login with email and password.</p>
  <Label for="email">Email</Label>
  <Input id="email" type="email" name="email" placeholder="email@domain.com" autocomplete="email" class="mb-1 text-base" disabled={isLoading} />
  <Label for="password">Password</Label>
  <Input id="password" type="password" autocomplete="password" name="password" disabled={isLoading} class=" text-base" />
  <Button type="submit" disabled={isLoading} class="my-4">
    {#if isLoading}
      <ButtonSpinner></ButtonSpinner>
    {:else}
      Login Now
    {/if}
  </Button>
</form>

<MaxAttemptsAlert {showAlert} type={"login"} />

<style>
</style>
