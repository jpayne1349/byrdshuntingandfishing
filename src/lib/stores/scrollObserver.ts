import type { ComponentScrollObserver } from "$lib/types/ScrollObserver";
import { writable } from "svelte/store";

export const scrollObserverStore = writable<ComponentScrollObserver>({
  scrolledThrough: {},
});
