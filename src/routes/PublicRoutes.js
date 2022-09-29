import { lazy } from 'react';

// project imports
import Loadable from 'ui-components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
// Default Pages
const Forbidden = Loadable(lazy(() => import('views/Error/Forbidden')));
const NotFound = Loadable(lazy(() => import('views/Error/NotFound')));

const ErrorRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/forbidden',
      element: <Forbidden />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export { ErrorRoutes };
