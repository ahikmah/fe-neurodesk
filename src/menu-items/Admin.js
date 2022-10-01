// assets
import { IconDashboard, IconDeviceAnalytics, IconHandStop, IconListCheck, IconFileImport, IconCirclePlus } from '@tabler/icons';

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics,
  IconHandStop,
  IconListCheck,
  IconFileImport,
  IconCirclePlus,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Admin = [
  {
    id: 'home',
    title: 'Home',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/admin/dashboard',
        icon: icons.IconDashboard,
        breadcrumbs: false,
      },
    ],
  },
  {
    id: 'ticket',
    title: 'Ticket',
    type: 'group',
    children: [
      {
        id: 'all-ticket',
        title: 'All Ticket',
        type: 'item',
        url: '/admin/all-ticket',
        icon: icons.IconListCheck,
        breadcrumbs: false,
      },
      {
        id: 'my-ticket',
        title: 'Assigned to Me',
        type: 'item',
        url: '/admin/my-ticket',
        icon: icons.IconFileImport,
        breadcrumbs: false,
      },
      {
        id: 'my-reported-ticket',
        title: 'Reported by Me',
        type: 'item',
        url: '/admin/my-reported-ticket',
        icon: icons.IconHandStop,
        breadcrumbs: false,
      },
      {
        id: 'new-ticket',
        title: 'Create New Ticket',
        type: 'item',
        url: '/admin/new-ticket',
        icon: icons.IconCirclePlus,
        breadcrumbs: false,
      },
    ],
  },
];

export default Admin;
