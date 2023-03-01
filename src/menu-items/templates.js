// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconMenu, IconBoxMultiple, IconCircleOff, IconCircle, IconBrandGravatar, IconShape } from '@tabler/icons';

// constant
const icons = {
    IconMenu,
    IconBoxMultiple,
    IconCircleOff,
    IconCircle,
    IconBrandGravatar,
    IconShape
};

// ==============================|| SUPPORT MENU ITEMS ||============================== //

const support = {
    id: 'support',
    title: <FormattedMessage id="others" />,
    type: 'group',
    children: [
        {
            id: 'menu-level',
            title: <FormattedMessage id="menu-level" />,
            type: 'collapse',
            icon: icons.IconMenu,
            children: [
                {
                    id: 'menu-level-1.1',
                    title: (
                        <>
                            <FormattedMessage id="level" /> 1
                        </>
                    ),
                    type: 'item',
                    url: '#'
                },
                {
                    id: 'menu-level-1.2',
                    title: (
                        <>
                            <FormattedMessage id="level" /> 1
                        </>
                    ),
                    type: 'collapse',
                    children: [
                        {
                            id: 'menu-level-2.1',
                            title: (
                                <>
                                    <FormattedMessage id="level" /> 2
                                </>
                            ),
                            type: 'item',
                            url: '#'
                        },
                        {
                            id: 'menu-level-2.2',
                            title: (
                                <>
                                    <FormattedMessage id="level" /> 2
                                </>
                            ),
                            type: 'collapse',
                            children: [
                                {
                                    id: 'menu-level-3.1',
                                    title: (
                                        <>
                                            <FormattedMessage id="level" /> 3
                                        </>
                                    ),
                                    type: 'item',
                                    url: '#'
                                },
                                {
                                    id: 'menu-level-3.2',
                                    title: (
                                        <>
                                            <FormattedMessage id="level" /> 3
                                        </>
                                    ),
                                    type: 'item',
                                    url: '#'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'menu-level-subtitle',
            title: <FormattedMessage id="menu-level-subtitle" />,
            caption: <FormattedMessage id="menu-level-subtitle-caption" />,
            type: 'collapse',
            icon: icons.IconBoxMultiple,
            children: [
                {
                    id: 'sub-menu-level-1.1',
                    title: (
                        <>
                            <FormattedMessage id="level" /> 1
                        </>
                    ),
                    caption: <FormattedMessage id="menu-level-subtitle-item" />,
                    type: 'item',
                    url: '#'
                },
                {
                    id: 'sub-menu-level-1.2',
                    title: (
                        <>
                            <FormattedMessage id="level" /> 1
                        </>
                    ),
                    caption: <FormattedMessage id="menu-level-subtitle-collapse" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'sub-menu-level-2.1',
                            title: (
                                <>
                                    <FormattedMessage id="level" /> 2
                                </>
                            ),
                            caption: <FormattedMessage id="menu-level-subtitle-sub-item" />,
                            type: 'item',
                            url: '#'
                        }
                    ]
                }
            ]
        },
        {
            id: 'disabled-menu',
            title: <FormattedMessage id="disabled-menu" />,
            type: 'item',
            url: '#',
            icon: icons.IconCircleOff,
            disabled: true
        },
        {
            id: 'oval-chip-menu',
            title: <FormattedMessage id="oval-chip-menu" />,
            type: 'item',
            url: '#',
            icon: icons.IconCircle,
            chip: {
                label: '9',
                color: 'primary'
            }
        },
        {
            id: 'avatar-chip-menu',
            title: <FormattedMessage id="avatar" />,
            type: 'item',
            url: '#',
            icon: icons.IconBrandGravatar,
            chip: {
                label: <FormattedMessage id="coded" />,
                color: 'primary',
                avatar: <FormattedMessage id="c" />,
                size: 'small'
            }
        },
        {
            id: 'outline-chip-menu',
            title: <FormattedMessage id="outlined" />,
            type: 'item',
            url: '#',
            icon: icons.IconShape,
            chip: {
                label: <FormattedMessage id="outlined" />,
                variant: 'outlined',
                color: 'primary'
            }
        }
    ]
};

export default support;
