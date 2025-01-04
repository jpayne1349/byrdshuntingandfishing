import type { PhotoType } from "$lib/types/Photo";
import { writable } from "svelte/store";

/**
 * Holds the photos loaded from the database
 * @param all : a full list of the photo objects / documents
 */
export const photoStore = writable<{
  all: PhotoType[];
}>({ all: [] });
