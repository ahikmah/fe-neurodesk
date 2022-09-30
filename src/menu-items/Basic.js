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

const Basic = [
  {
    id: 'ticket',
    title: 'Ticket',
    type: 'group',
    children: [
      {
        id: 'my-reported-ticket',
        title: 'Reported by Me',
        type: 'item',
        url: '/super-admin/my-reported-ticket',
        icon: icons.IconHandStop,
        breadcrumbs: false,
      },
      {
        id: 'new-ticket',
        title: 'Create New Ticket',
        type: 'item',
        url: '/super-admin/new-ticket',
        icon: icons.IconCirclePlus,
        breadcrumbs: false,
      },
    ],
  },
];

export default Basic;
