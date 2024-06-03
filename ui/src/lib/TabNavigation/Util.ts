import { NavComponent, Navigation } from "./Entity";
import { FocusRes, NavType, Order } from "./Type";

// Check if focus is present, otherwise initialize it
export function initFocus(nav: Navigation): FocusRes {
  let active = nav.activeComponent;

  if (nav.components.isEmpty()) {
    return FocusRes.Failed;
  }

  if (nav.focusPresent && active) {
    active = nav.components.getItem(Order.Current, active.ref);

    return FocusRes.Present;
  }

  if (active?.ref && !document.body.contains(active.ref)) {
    active = nav.components.getItem(Order.First) as NavComponent;
  } else if (active?.ref) {
    active = nav.components.getItem(Order.Current, active.ref) as NavComponent;
  } else {
    active = nav.components.getItem(Order.First) as NavComponent;
  }

  nav.activeComponent = active;

  // Focus container child if active component is container
  if (active.type === NavType.Container) {
    moveChildFocus(nav, Order.Current);
  } else {
    active.ref.tabIndex = 1;
    active.ref.focus();
  }

  nav.focusPresent = true;

  return FocusRes.Success;
}

// Move focus for regular nav components
export function moveFocus(nav: Navigation, order: Order): void {
  if (nav.components.isEmpty()) {
    return;
  }

  let next: NavComponent | null = null;

  if (!nav.activeComponent) {
    next = nav.components.getItem(Order.First);
  } else {
    next = nav.components.getItem(order, nav.activeComponent.ref);
    nav.activeComponent.ref.tabIndex = -1;
  }

  nav.activeComponent = next as NavComponent;

  // If active component is `container` focus his child
  if (nav.activeComponent.type === NavType.Container) {
    moveChildFocus(nav, Order.Current);
  } else {
    nav.activeComponent.ref.tabIndex = 1;
    nav.activeComponent.ref.focus();
  }
}

// Move focus for `child` elements inside the `container`
export function moveChildFocus(nav: Navigation, order: Order): void {
  const active = nav.activeComponent;
  if (active?.type !== NavType.Container) {
    return;
  }

  const container = nav.components.containerValues.get(active.containerId) as NavComponent;

  if (active.activeChild) {
    const curChild = container.items.getRaw(active.activeChild);
    if (curChild) {
      curChild.value.tabIndex = -1;
    }

    const child = container.items.get(order, active.activeChild) as HTMLElement;

    container.activeChild = child;
    active.activeChild = child;
  } else {
    container.activeChild = active.activeChild = container.items.get(Order.First) as HTMLElement;
  }

  active.activeChild.tabIndex = 1;
  active.activeChild.focus();
}

// Gather all of `navigation` components in current NodeList
export function getNavigationElements(updatedNodes: NodeList): HTMLElement[] {
  let nodes: HTMLElement[] = [];

  for (const node of Array.from(updatedNodes) as HTMLElement[]) {
    if (!node.attributes) {
      continue;
    }
    if (node.getAttribute('nav-component') === 'true') {
      nodes.push(node);
    }

    nodes = nodes.concat(Array.from((node as HTMLElement).querySelectorAll("[nav-component='true']")) as HTMLElement[]);
  }

  return nodes;
}
