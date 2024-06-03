import { Navigation } from "./Entity";
import { NavigationListener } from "./Listener";
import { addMutationObserver, getMutationObserver, removeMutationObserver } from "./MutationObserver";

let navigation: Navigation;
let mutationObserver: MutationObserver;
let navigationListener: NavigationListener;

export function init(win: Window): void {
  if (!navigation) {
    navigation = new Navigation(win);
    mutationObserver = getMutationObserver(navigation);
    addMutationObserver(navigation, mutationObserver);

    navigationListener = new NavigationListener(navigation);
    navigationListener.addActiveElementListener();
    navigationListener.addNavigationKeysListener();
    navigationListener.addMouseClickListener();
  }
}

export function destroy(): void {
  if (navigation) {
    navigation = null as any;
    navigationListener.removeActiveElementListener();
    navigationListener.removeNavigationKeysListener();
    navigationListener.removeMouseClickListener();
  }
  if (mutationObserver) {
    removeMutationObserver(mutationObserver);
  }
}