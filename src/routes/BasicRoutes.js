import { lazy } from 'react';

// project imports
import BasicGuard from 'utils/route-guard/BasicGuard';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-components/Loadable';

const BasicLayout = Loadable(lazy(() => import('layout/BasicLayout')));

// TICKET
const MyReportedTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/MyReportedTicket')));
const NewTicket = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/NewTicket')));
const TicketDetail = Loadable(lazy(() => import('views/Pages/SuperAdmin/Ticket/TicketDetail')));

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

export default BasicRoutes;
