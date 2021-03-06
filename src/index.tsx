import React, {
  FC,
  ReactElement,
  CSSProperties,
  ComponentType,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import { createElement, resolvePath, matchPath } from './tool';
import { IProps, TRoute, TRouteWithUrl, TRouteWithComponent } from './type';
import { Iframe } from './components';
import useSingleHistory from './useSingleHistory';
import './index.less';

const _CACHE: {
  [key: string]: ReactElement<any, 'iframe'> | ComponentType;
} = {};

const MicroPage: FC<IProps> = props => {
  // props
  const { portalId, routes } = props;
  // state
  const [currentRoute, setCurrentRoute] = useState<TRoute | null>(null);
  // single history
  const h = useSingleHistory('BrowserHistory');
  // function definition
  const handleRouteAssert = (route =>
    typeof (route as TRouteWithUrl).url === 'string') as (
    route: TRouteWithUrl | TRouteWithComponent
  ) => route is TRouteWithUrl;
  // effect
  useEffect(() => {
    if (routes.length === 0) {
      return;
    }
    h.listen(({ location }) => {
      let currentRoute: TRoute | null = null;
      for (let route of routes) {
        const { path, sensitive, exact, strict } = route;
        const isMatch = resolvePath(path, [], {
          sensitive,
          strict,
          end: exact,
        }).test(location.pathname);
        const match = matchPath(path, { decode: decodeURIComponent })(
          location.pathname
        );
        if (isMatch) {
          currentRoute = route;
        }
        if (match) {
          const { params } = match;
          currentRoute = { ...currentRoute, props: params } as TRoute;
        }
        if (isMatch || match) {
          break;
        }
      }
      setCurrentRoute(currentRoute);
    });
  }, []);
  // react element
  const rEle: ReactElement | null = useMemo(() => {
    let compEle: ReactElement<any, 'iframe'> | ComponentType | null = null;
    let portalEle =
      document.querySelector(portalId) ||
      createElement('div', { id: portalId });
    if (portalEle) {
      document.body.appendChild(portalEle);
    }
    if (currentRoute) {
      if (handleRouteAssert(currentRoute)) {
        const { title, path, url } = currentRoute;
        compEle =
          _CACHE[path] ||
          (_CACHE[path] = <Iframe key={path} title={title} pageSrc={url} />);
      } else {
        const { path, component: Comp, props } = currentRoute;
        compEle =
          _CACHE[path] || (_CACHE[path] = <Comp key={path} {...props} />);
      }
    }
    return createPortal(
      <Transition
        in={!!currentRoute}
        timeout={{
          appear: 50,
          enter: 300,
          exit: 300,
        }}
        appear={true}
      >
        {phase => {
          let transitionStyle: CSSProperties = {};
          switch (phase) {
            case 'entering':
              transitionStyle = { transform: 'translateY(100%)' };
              break;
            case 'entered':
              transitionStyle = { transform: 'translateY(0)' };
              break;
            case 'exiting':
              transitionStyle = { transform: 'translateY(0)' };
              break;
            case 'exited':
              transitionStyle = { transform: 'translateY(100%)' };
              break;
            case 'unmounted':
            default:
              transitionStyle = {};
          }
          return (
            <div className="mp-wrapper" style={transitionStyle}>
              {compEle}
            </div>
          );
        }}
      </Transition>,
      portalEle!
    );
  }, [currentRoute]);
  return rEle;
};

export default MicroPage;
