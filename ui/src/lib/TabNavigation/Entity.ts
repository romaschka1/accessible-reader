import { NavType, Order } from "./Type";

export class Navigation {
  win: Window;
  components: ComponentsList;
  activeComponent: NavComponent | null;
  focusPresent: boolean;

  constructor(win: Window) {
    this.win = win;
    this.activeComponent = null;
    this.focusPresent = false;
    this.components = new ComponentsList();
  }
}

export class NavComponent {
  type: NavType;
  ref: HTMLElement;
  items: DoublyLinkedHashList;
  activeChild: HTMLElement | null;
  containerId: string;

  constructor(ref: HTMLElement) {
    this.type = getNavType(ref?.getAttribute('custom-attribute') || '');
    this.ref = ref;
    // Logic for container and container children, probably need to create separate class
    this.items = new DoublyLinkedHashList();
    this.activeChild = null;
    this.containerId = ref.getAttribute('nav-id') || '';
  }
}

function getNavType(attributes: string): NavType {
  if (attributes.includes('nav-container')) {
    return NavType.Container;
  } else if (attributes.includes('nav-child')) {
    return NavType.Child;
  } else if (attributes.includes('nav-item')) {
    return NavType.Item;
  }

  return NavType.DomItem;
}

export class ComponentsList {
  public storage: DoublyLinkedHashList;
  public elements: Map<HTMLElement, NavComponent>;
  public containerValues: Map<string, NavComponent>;

  constructor() {
    this.storage = new DoublyLinkedHashList();
    this.elements = new Map<HTMLElement, NavComponent>();
    this.containerValues = new Map<string, NavComponent>();
  }

  public getItem(order: Order, el?: HTMLElement): NavComponent | null {
    const key = this.storage.get(order, el);
    return this.elements.get(key as HTMLElement) || null;
  }

  public add(el: HTMLElement): void {
    const item = new NavComponent(el);
    this.elements.set(el, item);

    if (item.type === NavType.Container && !this.containerValues.has(item.containerId)) {
      this.containerValues.set(item.containerId, item);
    }
    if (item.type === NavType.Child) {
      const curContainer = this.containerValues.get(item.containerId);
      curContainer?.items.push(item.ref);
      return;
    }
   
    this.storage.push(el);
  }

  public delete(el: HTMLElement): void {
    const item = new NavComponent(el);
    this.elements.delete(el);

    if (item.type === NavType.Container) {
      this.containerValues.delete(item.containerId);
    }
    if (item.type === NavType.Child) {
      const curContainer = this.containerValues.get(item.containerId);
      curContainer?.items.delete(item.ref);

      return;
    }

    this.storage.delete(el);
  }

  public isEmpty(): boolean {
    return !this.elements.size ? true : false;
  }
}

class DoublyLinkedHashList {
  private mappedValues: Map<HTMLElement, ListNode>;
  private head: ListNode;
  private tail: ListNode;

  constructor() {
    this.mappedValues = new Map<HTMLElement, ListNode>();
    this.head = new ListNode(null as any);
    this.tail = new ListNode(null as any);
  }

  public get(order: Order, el?: HTMLElement): HTMLElement | null {
    let key = null;

    if (order === Order.Next && el) {
      key = this.getNext(el); 
    }
    if (order === Order.Previous && el) {
      key = this.getPrev(el);
    }
    if (order === Order.First) {
      key = this.getFirst();
    }
    if (order === Order.Current) {
      key = el;
    }

    return key || null;
  }
  public getRaw(el: HTMLElement): ListNode | null {
    return this.mappedValues.get(el) || null;
  }
  private getNext(el: HTMLElement): HTMLElement {
    const res = this.getRaw(el)?.next;
    // Return head value to make list infinite
    return res ? res.value : this.head.value;
  }
  private getPrev(el: HTMLElement): HTMLElement {
    const res = this.getRaw(el)?.prev;
    // Return tail value to make list infinite
    return res ? res.value : this.tail.value;
  }
  private getFirst(): HTMLElement | null {
    return this.head.value;
  }

  public push(el: HTMLElement): void {
    const newNode = new ListNode(el);

    if (this.head.value === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let ptr = this.head;

      // Insert new node is sorted position
      // ToDo: Try to make insertion in O(log n)
      while (ptr.next) {
        const position = newNode.value.compareDocumentPosition(ptr.value as HTMLElement);

        if (position === 4 || position === 20) {
          newNode.next = ptr;
          newNode.prev = ptr.prev;

          (ptr.prev as ListNode).next = newNode;
          ptr.prev = newNode;
          break;
        }

        ptr = ptr.next;
      }

      if (ptr === this.tail) {
        newNode.prev = ptr;
        ptr.next = newNode;
        this.tail = newNode;
      }
    }

    this.mappedValues.set(el, newNode);
  }

  public delete(el: HTMLElement): void {
    const node = this.mappedValues.get(el) as ListNode;

    if (node === this.head) {
      this.head = node.next as ListNode;

      if (this.head) {
        this.head.prev = null;
      }
    } else if (node === this.tail) {
      this.tail = node.prev as ListNode;
      this.tail.next = null;
    } else {
      (node.prev as ListNode).next = node.next;
      (node.next as ListNode).prev = node.prev;
    }

    this.mappedValues.delete(el);
  }
}

class ListNode {
  public value: HTMLElement;
  public prev: ListNode | null;
  public next: ListNode | null;

  constructor(val: HTMLElement) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}
