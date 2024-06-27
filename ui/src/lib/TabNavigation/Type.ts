export const NavigationType: {
  Container: "Container";
  Item: "Item";
  Child: "Child";
  DomItem: "DomItem"
} = {
  Container: "Container",
  Item: "Item",
  Child: "Child",
  DomItem: "DomItem"
};
export type NavigationType = typeof NavigationType[keyof typeof NavigationType];

export const Order: {
  Previous: "Previous";
  Next: "Next";
  Current: "Current";
  First: "First"
} = {
  Previous: "Previous",
  Next: "Next",
  Current: "Current",
  First: "First"
};
export type Order = typeof Order[keyof typeof Order];

export const FocusRes: {
  Success: "Success";
  Present: "Present";
  Failed: "Failed";
} = {
  Success: "Success",
  Present: "Present",
  Failed: "Failed"
};
export type FocusRes = typeof FocusRes[keyof typeof FocusRes];