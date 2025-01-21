<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";

  export let showAlert = false;

  export let type: string;

  //TODO: blacklist ip address. firebase already has some handling for this.
</script>

<AlertDialog.Root bind:open={showAlert}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Is Everything Okay?</AlertDialog.Title>
      <AlertDialog.Description>
        {#if type == "login"}
          You've tried logging in too many times. If this continues, we will
          restrict your access to our site. Please contact <a
            href="/contact#support"
            class="underline underline-offset-4 hover:text-primary"
          >
            support
          </a>
          if you have any questions.
        {:else if type == "create_account"}
          It looks like you tried making an account too many times. If this
          continues, we will restrict your access to our site. Please contact <a
            href="/contact#support"
            class="underline underline-offset-4 hover:text-primary"
          >
            support
          </a>
          if you have any questions.
        {/if}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Action>Okay</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<style>
</style>
