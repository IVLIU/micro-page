import { HTMLAttributes, } from "react";
import { pathToRegexp, match, MatchFunction } from 'path-to-regexp';

export type TArgs<F> = F extends (...args: infer A) => any ? A : never;

export const __CACHE__: { [key: string]: RegExp } = {};
export const __CACHE_MAX_LENGTH__ = 1000;

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

export const resolvePath: (...args: TArgs<typeof pathToRegexp>) => RegExp = (path, keys = [], options = {}) => {
  const path$str = path.toString();
  if(Object.keys(__CACHE__).length < __CACHE_MAX_LENGTH__) {
    return __CACHE__[path$str] || (__CACHE__[path$str] = pathToRegexp(path, keys, options));
  }
  return pathToRegexp(path, keys, options);
};

export const matchPath: (...args: TArgs<typeof match>) => MatchFunction = (path, options) => {
  return match(path, options)
}