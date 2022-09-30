import { lazy } from 'react';

// project imports
import SuperAdminGuard from 'utils/route-guard/SuperAdminGuard';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-components/Loadable';

const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));

// DASHBOARD
const DashboarDefault = Loadable(lazy(() => import('views/Pages/SuperAdmin/Dashboard/Default')));
const ManageTeam = Loadable(lazy(() => import('views/Pages/SuperAdmin/Dashboard/ManageTeam')));

// TICKET
const AllTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/AllTicket')));
const MyTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/MyTicket')));
const NewTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/NewTicket')));
const TicketDetail = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/TicketDetail')));

// ==============================|| MAIN ROUTING ||============================== //

const SuperAdminRoutes = {
  path: '/super-admin',
  element: (
    <AuthGuard>
      <SuperAdminGuard>
        <MainLayout />
      </SuperAdminGuard>
    </AuthGuard>
  ),
  children: [
    {
      path: 'dashboard',
      element: <DashboarDefault />,
    },
    {
      path: 'dashboard/project',
      element: <ManageTeam />,
    },
    {
      path: 'manage-team',
      element: <ManageTeam />,
    },
    {
      path: 'all-ticket',
      element: <AllTicket />,
    },
    {
      path: 'my-ticket',
      element: <MyTicket />,
    },
    {
      path: 'new-ticket',
      element: <NewTicket />,
    },
    {
      path: 'detail-ticket/:id',
      element: <TicketDetail />,
    },
  ],
};

export default SuperAdminRoutes;
