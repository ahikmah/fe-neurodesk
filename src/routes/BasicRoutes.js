import { lazy } from 'react';

// project imports
import BasicGuard from 'utils/route-guard/BasicGuard';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-components/Loadable';

const BasicLayout = Loadable(lazy(() => import('layout/BasicLayout')));

// TICKET
const Dashboard = Loadable(lazy(() => import('views/Pages/Basic/Dashboard')));
const MyReportedTicket = Loadable(lazy(() => import('views/Pages/Basic/Ticket/MyReportedTicket')));
const NewTicket = Loadable(lazy(() => import('views/Pages/Basic/Ticket/NewTicket')));
const TicketDetail = Loadable(lazy(() => import('views/Pages/Basic/Ticket/TicketDetail')));

// PROFILE
const Profile = Loadable(lazy(() => import('views/Pages/Basic/Profile')));

// ==============================|| MAIN ROUTING ||============================== //

const BasicRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <BasicGuard>
        <BasicLayout />
      </BasicGuard>
    </AuthGuard>
  ),
  children: [
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
    {
      path: 'my-reported-ticket',
      element: <MyReportedTicket />,
    },
    {
      path: 'new-ticket',
      element: <NewTicket />,
    },
    {
      path: 'detail-ticket/:id',
      element: <TicketDetail />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
  ],
};

export default BasicRoutes;
