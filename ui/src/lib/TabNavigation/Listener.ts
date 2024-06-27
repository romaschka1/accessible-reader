import { Navigation } from "./Entity";
import { FocusRes, NavigationType, Order } from "./Type";
import { initFocus, moveChildFocus, moveFocus } from "./Util";

export class NavigationListener {
  navigation: Navigation;
  win: Window;

  constructor(nav: Navigation) {
    this.navigation = nav;
    this.win = nav.win;
  }

  // Listens to focus changes
  public addActiveElementListener(): void {
    this.win.addEventListener('focusin', () => this.listenToFocusIn());
    this.win.addEventListener('focusout', () => this.listenToFocusOut());
  }
  public removeActiveElementListener(): void {
    this.win.removeEventListener('focusin', () => this.listenToFocusIn());
    this.win.removeEventListener('focusout', () => this.listenToFocusOut());
  }
  private listenToFocusIn(): void {
    const activeElement = this.win.document.activeElement;

    if (activeElement && this.navigation.components.getItem(Order.Current, activeElement as HTMLElement)) {
      this.navigation.focusPresent = true;
    } else {
      this.navigation.focusPresent = false;
    }
  }
  private listenToFocusOut(): void {
    this.navigation.focusPresent = false;
  }

  // Overrides default tab navigation and implements new one
  public addNavigationKeysListener(): void {
    this.win.addEventListener('keydown', (e: KeyboardEvent) => this.listenToNavigationKeys(e));
  }
  public removeNavigationKeysListener(): void {
    this.win.removeEventListener('keydown', (e: KeyboardEvent) => this.listenToNavigationKeys(e));
  }
  private listenToNavigationKeys (e: KeyboardEvent): void {
    // Prevent default navigation
    if (e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }

    // Init focused element if it's not focused
    if (initFocus(this.navigation) !== FocusRes.Present) {
      return;
    }

    // Override default navigation events
    switch(e.key) {
      case('Enter'): {
        if (this.navigation.activeComponent) {
          let ref = this.navigation.activeComponent.ref;
        
          if (this.navigation.activeComponent.type === NavigationType.Container && this.navigation.activeComponent.activeChild) {
            ref = this.navigation.activeComponent.activeChild;
          }

          if (ref.tagName !== 'BUTTON') {
            ref.dispatchEvent(new MouseEvent('click', {
              "view": window,
              "bubbles": true,
              "cancelable": false,
              buttons: 1
            }));
          }

          const activeElement = this.win.document.activeElement;
          if (activeElement !== ref && this.navigation.win.document.body.contains(ref)) {
            // Set focus back if it was losed due to some external enter click logic
            ref.focus();
          }
        }

        break;
      };
      case('Tab'): {
        moveFocus(this.navigation, e.shiftKey ? Order.Previous : Order.Next);
        break;
      }
      case('ArrowUp'): {
        moveChildFocus(this.navigation, Order.Previous);
        break;
      }
      case('ArrowDown'): {
        moveChildFocus(this.navigation, Order.Next);
        break;
      }
    }
  }

  // Listens to mouse click to move focus on clicked element
  public addMouseClickListener(): void {
    this.win.addEventListener('click', (e: MouseEvent) => this.listenToMouseClick(e));
  }
  public removeMouseClickListener(): void {
    this.win.removeEventListener('click', (e: MouseEvent) => this.listenToMouseClick(e));
  }
  private listenToMouseClick(e: MouseEvent): void {
    e.preventDefault();

    // Check if current clicked element is `navigation` item
    if (this.navigation.components.getItem(Order.Current, e.target as HTMLElement)) {
      return;
    }

    // Set flag to false since after click focus will disappear
    this.navigation.focusPresent = false;
    // Create tree walker to find and set next active component
    const treeWalker = this.navigation.win.document.createTreeWalker(e.target as HTMLElement, NodeFilter.SHOW_ELEMENT);
    let node: HTMLElement | null = treeWalker.currentNode as HTMLElement;

    do {
      const navigationComponent = this.navigation.components.getItem(Order.Current, node);

      if (navigationComponent) {
        this.navigation.activeComponent = navigationComponent;
        break;
      }
    } while (node = treeWalker.nextNode() as HTMLElement | null)
  }
}

