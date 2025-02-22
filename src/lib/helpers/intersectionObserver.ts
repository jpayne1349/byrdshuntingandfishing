import type { ObserveScrollParams } from "$lib/types/ScrollObserver";
import type { Action } from "@sveltejs/kit";

export function observeScroll(node: HTMLElement, params: ObserveScrollParams) {
  if (!params) return { destroy: () => {} };

  const { sectionId, observerStore } = params;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        observerStore.update((prev) => ({
          ...prev,
          scrolledThrough: { ...prev.scrolledThrough, [sectionId]: true },
        }));
      }
    },
    { threshold: 1.0 },
  );

  observer.observe(node);

  // **Improved immediate check**
  const checkVisibility = () => {
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height || window.innerHeight; // More accurate on mobile

    if (rect.top < viewportHeight && rect.bottom > 0) {
      observerStore.update((prev) => ({
        ...prev,
        scrolledThrough: { ...prev.scrolledThrough, [sectionId]: true },
      }));
    }
  };

  // **Ensure the check runs after layout settles**
  requestAnimationFrame(() => {
    checkVisibility();
  });

  return {
    update(newParams: ObserveScrollParams) {
      // If sectionId changes, update the observer settings (optional)
      if (newParams.sectionId !== sectionId) {
        observer.unobserve(node);
        observer.observe(node);
      }
    },
    destroy() {
      observer.unobserve(node);
    },
  };
}
// EXAMPLE COMPONENT

/* 
<script lang="ts">
  import { writable } from 'svelte/store';
  import { observeScroll } from './helpers';

  const scrolledThrough = writable({});

  function setScrolledThrough(sectionId: string, value: boolean) {
    scrolledThrough.update(state => ({ ...state, [sectionId]: value }));
  }

  $: console.log($scrolledThrough); // For debugging
</script>

<div use:observeScroll={'section1', { setScrolledThrough }}>Section 1</div>
<div use:observeScroll={'section2', { setScrolledThrough }}>Section 2</div>
*/
