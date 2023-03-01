// assets
import { IconBrush, IconNews, IconUsers, IconCurrencyEthereum } from '@tabler/icons';

// constant
const icons = {
    IconBrush,
    IconNews,
    IconUsers,
    IconCurrencyEthereum
};

// ==============================|| UI ELEMENTS MENU ITEMS ||============================== //

const elements = {
    id: 'manage',
    title: "Engagement",
    type: 'group',
    children: [
        {
            id: 'users',
            title: "Users",
            type: 'item',
            url: 'users',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'transactions',
            title: "Transactions",
            type: 'item',
            url: 'transactions',
            icon: icons.IconCurrencyEthereum,
            breadcrumbs: false
        }
    ]
};

export default elements;
