import { Navigation } from "./Entity";
import { getNavigationElements } from "./Util";

// Mutation observer is used for observing DOM changes
export function addMutationObserver(nav: Navigation, observer: MutationObserver): void {
  observer.observe(nav.win.document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["tabindex"]
  });
}
export function removeMutationObserver(observer: MutationObserver): void {
  observer.disconnect();
}
export function getMutationObserver(nav: Navigation): MutationObserver {
  return new MutationObserver((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const node of getNavigationElements(mutation.removedNodes)) {
          nav.components.delete(node);
        }
        for (const node of getNavigationElements(mutation.addedNodes)) {
          nav.components.add(node);
        }
      }
    }

    console.log(nav.components);
  });
}
