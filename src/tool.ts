import { HTMLAttributes } from "react";

export const createElement: <
  T extends keyof HTMLElementTagNameMap
>(tagName: T, attributes: HTMLAttributes<T>) => HTMLElementTagNameMap[T] | null = (tagName, attributes) => {
  try {
    const el = document.createElement(tagName);
    for(const attr in attributes) {
      if(!Object.prototype.hasOwnProperty.call(attributes, attr)) {
        continue;
      }
      el.setAttribute(attr, attributes[attr as keyof typeof attributes]);
    }
    return el;
  } catch (err) {
    return null;
  }
}