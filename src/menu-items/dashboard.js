// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconCurrencyBitcoin,
    IconShoppingCart,
    IconAd,
    IconNotes,
    IconSquarePlus,
    IconList,
    IconMessage2,
    IconRecycle,
    IconUserCheck,
    IconBellRinging,
    IconSend,
    IconClock,
    IconHistory,
    IconBrandGoogleAnalytics,
    IconChartPie,
    IconChartBubble,
    IconPalette,
    IconPaint,
    IconLayout,
    IconEditCircle,
    IconQrcode,
    IconUpload,
    IconEye
} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconCurrencyBitcoin,
    IconShoppingCart,
    IconAd,
    IconNotes,
    IconSquarePlus,
    IconList,
    IconMessage2,
    IconRecycle,
    IconUserCheck,
    IconBellRinging,
    IconSend,
    IconClock,
    IconHistory,
    IconBrandGoogleAnalytics,
    IconChartPie,
    IconChartBubble,
    IconPalette,
    IconPaint,
    IconLayout,
    IconEditCircle,
    IconQrcode,
    IconUpload,
    IconEye
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const engage = {
    id: 'engage',
    title: <FormattedMessage id="Overview" />,
    type: 'group',
    children: [
        {
            id: 'analytics',
            title: <FormattedMessage id="Dashboard" />,
            type: 'item',
            url: '/studio/dashboard',
            icon: icons.IconBrandGoogleAnalytics,
            breadcrumbs: false
        }
        // {
        //     id: 'notifications',
        //     title: <FormattedMessage id="Notifications" />,
        //     type: 'collapse',
        //     url: 'builder/dashboard/analytics',
        //     icon: icons.IconBellRinging,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'notificationSend',
        //             title: <FormattedMessage id="Send" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconSend,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'notificationSchedule',
        //             title: <FormattedMessage id="Schedule" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconClock,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'notificationHistory',
        //             title: <FormattedMessage id="History" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconHistory,
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        // {
        //     id: 'analytics',
        //     title: <FormattedMessage id="Analytics" />,
        //     type: 'collapse',
        //     url: 'builder/dashboard/analytics',
        //     icon: icons.IconBrandGoogleAnalytics,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'analyticsTraffic',
        //             title: <FormattedMessage id="Traffic" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconChartPie,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'analyticsSocial',
        //             title: <FormattedMessage id="Social" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconChartBubble,
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default engage;
