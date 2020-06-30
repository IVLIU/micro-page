import { useMemo } from 'react';
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  BrowserHistory,
  HashHistory,
  MemoryHistory,
  State,
} from 'history';

type TUseSingleHistory = (
  type: 'BrowserHistory' | 'HashHistory' | 'MemoryHistory'
) => BrowserHistory<State> | HashHistory<State> | MemoryHistory<State>;

const useSingleHistory: TUseSingleHistory = type => {
  const his = useMemo(() => {
    switch (type) {
      case 'BrowserHistory':
        return (
          window.__BROWSERHISTORY__ ||
          (window.__BROWSERHISTORY__ = createBrowserHistory())
        );
      case 'HashHistory':
        return (
          window.__HASHHISTORY__ ||
          (window.__HASHHISTORY__ = createHashHistory())
        );
      case 'MemoryHistory':
        return (
          window.__MEMORYHISTORY__ ||
          (window.__MEMORYHISTORY__ = createMemoryHistory())
        );
      default:
        return (
          window.__BROWSERHISTORY__ ||
          (window.__BROWSERHISTORY__ = createBrowserHistory())
        );
    }
  }, [type]);
  return his;
};

export default useSingleHistory;
