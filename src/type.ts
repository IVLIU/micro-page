import { ComponentType } from 'react';
export interface IProps {
  portalId: string;
  routes: TRoute[];
  onDestroyClose?: () => void;
}

export interface IRouteMap {
  title: string;
  path: string;
  url: string;
  component: ComponentType;
  author?: string;
  exact?: boolean;
  __RENDERED__?: boolean;
}

export type TRouteWithUrl = Omit<IRouteMap, 'component'>;

export type TRouteWithComponent = Omit<IRouteMap, 'url'>;

export type TRoute = TRouteWithUrl | TRouteWithComponent;