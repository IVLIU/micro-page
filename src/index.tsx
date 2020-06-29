import React, { FC, ReactElement, CSSProperties, ComponentType, useMemo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { pathToRegexp } from 'path-to-regexp';
import { Transition } from 'react-transition-group';
import { createElement } from './tool';
import { IProps, TRoute, TRouteWithUrl, TRouteWithComponent } from './type';
import { Iframe } from './components'
import useSingleHistory from './useSingleHistory';
import styles from './index.less';

const _CACHE: { [key: string]: ReactElement<any, 'iframe'> } = {};

const MicroPage: FC<IProps> = props => {
  // props
  const { 
    portalId, 
    routes,
  } = props;
  // state
  const [currentRoute, setCurrentRoute] = useState<TRoute | null>(null);
  // single history
  const h = useSingleHistory('BrowserHistory');
  // function definition
  const handleRouteAssert = (route => typeof (route as TRouteWithUrl).url === 'string') as (route: TRouteWithUrl | TRouteWithComponent) => route is TRouteWithUrl; 
  // effect
  useEffect(() => {
    if(routes.length === 0) {
      return;
    }
    h.listen(({ location }) => {
      let currentRouteCursor = -1;
      if(
        routes.some(({ path }, idx) => {
          const isMatch = pathToRegexp(path).test(location.pathname);
          if(isMatch) {
            currentRouteCursor = idx;
          }
          return isMatch;
        })
      ) {
        setCurrentRoute(routes[currentRouteCursor]);
        return;
      }
      setCurrentRoute(null);
    })
  }, [])
  // react element
  const rEle: ReactElement | null = useMemo(() => {
    let compEle: ReactElement<any, 'iframe'> | ComponentType | null = null;
    let portalEle = document.querySelector(portalId) || createElement('div', { id: portalId });
    if(portalEle) {
      document.body.appendChild(portalEle);
    }
    if(currentRoute) {
      if(handleRouteAssert(currentRoute)) {
        const { path, url } = currentRoute;
        compEle = _CACHE[path] || (_CACHE[path] = <Iframe key={path} pageSrc={url}  />)
      } else {
        const { path, component: Comp } = currentRoute;
        compEle = _CACHE[path] || (_CACHE[path] = <Comp key={path} />)
      }
      
    }
    return (
      createPortal(
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
            switch(phase) {
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
              <div className={styles['mp-wrapper']} style={transitionStyle}>
                {compEle}
              </div>
            )
          }}
        </Transition>, 
        portalEle!
      )
    );
  }, [currentRoute]);
  return rEle;
}

export default MicroPage;