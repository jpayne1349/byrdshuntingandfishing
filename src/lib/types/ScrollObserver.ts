import type { Action } from "svelte/action";
import { writable, type Writable } from "svelte/store";

// Interface for the observer object
export interface ComponentScrollObserver {
  scrolledThrough: { [key: string]: boolean };
}

// Interface for the action's parameters
export interface ObserveScrollParams {
  sectionId: string;
  observerStore: Writable<ComponentScrollObserver>;
}
