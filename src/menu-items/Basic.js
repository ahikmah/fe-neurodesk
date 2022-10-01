// assets
import { IconRoute, IconCirclePlus } from '@tabler/icons';

// constant
const icons = {
  IconRoute,
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
        id: 'new-ticket',
        title: 'Create New Ticket',
        type: 'item',
        url: '/new-ticket',
        icon: icons.IconCirclePlus,
        breadcrumbs: false,
      },
      {
        id: 'my-reported-ticket',
        title: 'Track My Ticket',
        type: 'item',
        url: '/my-reported-ticket',
        icon: icons.IconRoute,
        breadcrumbs: false,
      },
    ],
  },
];

export default Basic;
