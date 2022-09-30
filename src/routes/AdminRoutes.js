import { lazy } from 'react';

// project imports
import AdminGuard from 'utils/route-guard/AdminGuard';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-components/Loadable';

const AdminLayout = Loadable(lazy(() => import('layout/AdminLayout')));

// DASHBOARD
const DashboarDefault = Loadable(lazy(() => import('views/Pages/SuperAdmin/Dashboard/Default')));

// TICKET
const AllTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/AllTicket')));
const MyTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/MyTicket')));
const MyReportedTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/MyReportedTicket')));
const NewTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/NewTicket')));
const TicketDetail = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/TicketDetail')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
  path: '/admin',
  element: (
    <AuthGuard>
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    </AuthGuard>
  ),
  children: [
    {
      path: 'dashboard',
      element: <DashboarDefault />,
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
  ],
};

export default AdminRoutes;
