// collapsed imports
import type { Unsubscribe } from "firebase/auth";
import { writable } from "svelte/store";

/**
 * Manages the login state of the RMS
 */
export const loginStore = writable<{
  loggingIn: boolean;
  loggedIn: boolean;
  authListener: Unsubscribe | undefined;
}>(
  {
    loggingIn: true,
    loggedIn: false,
    authListener: undefined,
  },
  (setFunc) => {
    return () => console.log("[loginStore] unsubscribed.");
  },
);
