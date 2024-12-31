// collapsed imports
import { writable } from "svelte/store";

import type { User } from "$lib/types/User";
/**
 * Manages the User of the RMS
 */
export const userStore = writable<User | undefined>(undefined, (setFunc) => {
  return () => console.log("[UserStore] unsubscribed.");
});
