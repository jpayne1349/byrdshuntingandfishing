// collapsed imports
import { get, writable } from "svelte/store";
import type { FirebaseApp } from "firebase/app";
import { onAuthStateChanged, type Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";
import type { Analytics } from "firebase/analytics";

/**
 * Frontend store to have access to the firebase connection at all times.
 */
export const fb = writable<{
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
  analytics?: Analytics;
}>(undefined, (setFunc) => {
  // after initial population, do these things

  // unsub callback message
  return (whoUnsubbed?: string) => {
    if (whoUnsubbed) {
      console.log("[firebaseStore unsubbed by ", whoUnsubbed);
    } else {
      console.log("[firebaseStore] unsubscribe anonymously.");
    }
  };
});
