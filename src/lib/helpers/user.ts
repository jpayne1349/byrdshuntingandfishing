import { goto } from "$app/navigation";
import { fb } from "$lib/stores/firebase";
import { loginStore } from "$lib/stores/login";
import { userStore } from "$lib/stores/user";
import { MyEvent } from "$lib/types/Event";
import type { Relation } from "$lib/types/Relation";
import type { User } from "$lib/types/User";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";

import { get } from "svelte/store";
import { generateUUID } from "./id";

/**
 * for retrieval from database
 */
export async function getUser(id: string) {
  const userSummaryCollection = "/company/userSummary/users";

  let firebaseStore = get(fb);

  const userDocRef = doc(firebaseStore.db, userSummaryCollection, id);

  const userDocSnap = await getDoc(userDocRef);

  return userDocSnap.data() as User;
}

/**
 * Starts a continuous loop awaitin connection to auth server.
 * Sets the auth listener callback
 * @param target - the page target, used when auth evals to false
 */
export async function getUserAuth(target: string | undefined) {
  // function to only run on browser
  if (typeof window !== "undefined") {
    let ls = get(loginStore);
    let fs = get(fb);

    if (fs === undefined) {
      setTimeout(() => getUserAuth(target), 200);
      return;
    }
    if (fs.auth === undefined) {
      setTimeout(() => getUserAuth(target), 200);
      return;
    }

    if (!ls.authListener) {
      ls.authListener = onAuthStateChanged(fs.auth, async (user) => {
        if (user) {
          // let userDoc = await getUser(user.uid);

          // userStore.set(userDoc);

          loginStore.update((storeData) => {
            storeData.loggedIn = true;
            storeData.loggingIn = false;

            return storeData;
          });

          if (target) {
            await goto(target, {
              replaceState: true,
            });
            return;
          }
          await goto("/cms", {
            replaceState: true,
          });
        } else {
          // no memory of sign in, if target was deeper into RMS, display a popup for a returning User

          if (target && target != "/cms") {
            new MyEvent({
              type: "redirect.login",
              title: "Welcome Back",
              description: "It looks like you were signed out.",
              style: "info",
              persist: false,
              visibility: "local",
            });
          }

          loginStore.update((storeData) => {
            storeData.loggingIn = false;

            return storeData;
          });

          if (target) {
            goto("/login?target=" + target, {
              replaceState: true,
            });
          } else {
            goto("/login");
          }
        }
      });
    }
  }
}

/**
 * Builds the map/object that is stored within an event for later linking
 */
export function generateUserRelation(
  user: User,
  title?: string,
  description?: string,
) {
  let relation = {
    id: generateUUID("rel_"),
    object_id: user.id,
    object_type: "User",

    db_path: `/company/userSummary/users/${user.id}`,
    cms_link: `/cms/relation/user/${user.id}`,
  } as Relation;

  if (title) {
    relation.title = title;
  }
  if (description) {
    relation.description = description;
  }

  return relation;
}

/**
 * Short helper to log entry in database
 */
export async function recordUserLogin(user: User) {
  const userSummaryCollection = "/company/userSummary/users";

  let firebaseStore = get(fb);

  const userDocRef = doc(firebaseStore.db, userSummaryCollection, user.id);

  await updateDoc(userDocRef, {
    last_login: Timestamp.now(),
  });
}
