import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandFramer,
    IconLayoutGridAdd
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: <FormattedMessage id="utilities" />,
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: <FormattedMessage id="typography" />,
            type: 'item',
            url: '/utils/util-typography',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: <FormattedMessage id="color" />,
            type: 'item',
            url: '/utils/util-color',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: <FormattedMessage id="shadow" />,
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: <FormattedMessage id="icons" />,
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'tabler-icons',
                    title: <FormattedMessage id="tabler-icons" />,
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: <FormattedMessage id="material-icons" />,
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'util-animation',
            title: <FormattedMessage id="animation" />,
            type: 'item',
            url: '/utils/util-animation',
            icon: icons.IconBrandFramer,
            breadcrumbs: false
        },
        {
            id: 'util-grid',
            title: <FormattedMessage id="grid" />,
            type: 'item',
            url: '/utils/util-grid',
            icon: icons.IconLayoutGridAdd,
            breadcrumbs: false
        }
    ]
};

export default utilities;
