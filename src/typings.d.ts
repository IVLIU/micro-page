/// <reference path="../node_modules/history/index.d.ts" />

declare module '*.css';
declare module '*.less';
declare module '*.png';

interface Window {
  __BROWSERHISTORY__: any;
  __HASHHISTORY__: any;
  __MEMORYHISTORY__: any;
}
