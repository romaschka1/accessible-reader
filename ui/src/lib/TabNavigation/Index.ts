import { Navigation } from "./Entity";
import { NavigationListener } from "./Listener";
import { addMutationObserver, getMutationObserver, removeMutationObserver } from "./MutationObserver";

let navigation: Navigation;
let mutationObserver: MutationObserver;
let navigationListener: NavigationListener;

let focusStyleSheet: HTMLStyleElement;

export function init(win: Window): void {
  if (!navigation) {
    navigation = new Navigation(win);
    mutationObserver = getMutationObserver(navigation);
    addMutationObserver(navigation, mutationObserver);

    navigationListener = new NavigationListener(navigation);
    navigationListener.addActiveElementListener();
    navigationListener.addNavigationKeysListener();
    navigationListener.addMouseClickListener();

    const styles = `
      *:focus { outline: 3px solid #ED64A6 !important; box-shadow: initial !important; z-index: 1999; position: relative; }
    `;
    focusStyleSheet = win.document.createElement("style")
    focusStyleSheet.textContent = styles

    win.document.head.appendChild(focusStyleSheet);
  }
}

export function destroy(win: Window): void {
  if (navigation) {
    navigation = null as any;
    navigationListener.removeActiveElementListener();
    navigationListener.removeNavigationKeysListener();
    navigationListener.removeMouseClickListener();
  }
  if (mutationObserver) {
    removeMutationObserver(mutationObserver);
  }
  if (focusStyleSheet) {
    win.document.head.removeChild(focusStyleSheet)
  }
}
