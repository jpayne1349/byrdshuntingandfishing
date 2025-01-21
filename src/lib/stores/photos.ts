import type { Photo } from "$lib/types/Photo";
import { writable } from "svelte/store";

/**
 * Holds the photos loaded from the database
 * @param all : a full list of the photo instances
 */
export const photoStore = writable<{
  all: Photo[];
  separated: {
    [category: string]: { [subcategory: string]: Photo[] };
  };
}>({ all: [], separated: {} });
