import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_DASHBOARD_ROOT, PATH_PAGE } from './router';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes(PATH_DASHBOARD_ROOT)} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={PATH_PAGE.order.waiting} replace />,
    },
    {
      path: PATH_DASHBOARD_ROOT,
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_PAGE.order.waiting} replace />, index: true },
        { path: PATH_PAGE.order.waiting, element: <PageOne /> },
        { path: PATH_PAGE.order.processing, element: <PageTwo /> },
        { path: PATH_PAGE.order.completed, element: <PageThree /> },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
