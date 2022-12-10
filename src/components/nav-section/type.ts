import { ReactElement } from 'react';
import { BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type NavItemMeta = {
  [key in string]: { count: number };
};

export type NavListProps = {
  title: string;
  path: string;
  id?: string;
  icon?: ReactElement;
  info?: ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: {
    title: string;
    path: string;
    children?: { title: string; path: string }[];
  }[];
};

export type NavItemProps = {
  item: NavListProps;
  navItemMeta?: NavItemMeta;
  isCollapse?: boolean;
  active?: boolean | undefined;
  open?: boolean;
  onOpen?: VoidFunction;
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
};

export interface NavSectionProps extends BoxProps {
  isCollapse?: boolean;
  navConfig: {
    subheader: string;
    items: NavListProps[];
  }[];
}
