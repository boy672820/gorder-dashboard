const dashboard = (path: string) => `/dashboard${path}`;

export const PATH_DASHBOARD_ROOT = '/dashboard';

export const PATH_PAGE = {
  order: {
    root: dashboard('/order'),
    waiting: dashboard('/order/waiting'),
    processing: dashboard('/order/processing'),
    completed: dashboard('/order/completed'),
  },
};

export const PAGE_PATHNAME = {
  [PATH_DASHBOARD_ROOT]: 'dashboard',
  [PATH_PAGE.order.root]: 'order',
  [PATH_PAGE.order.waiting]: 'waiting',
  [PATH_PAGE.order.processing]: 'processing',
  [PATH_PAGE.order.completed]: 'completed',
};
