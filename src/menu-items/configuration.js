// third-party

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
    IconEye,
    IconCircleCheck,
    IconCircle,
    IconSquaresFilled,
    IconDevices,
    IconInfoSquare,
    IconShape,
    IconSlideshow,
    IconHierarchy,
    IconAdjustments,
    IconSettingsAutomation,
    IconSettings,
    IconLanguage,
    IconApps,
    IconCurrencyEthereum
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
    IconEye,
    IconCircleCheck,
    IconCircle,
    IconSquaresFilled,
    IconDevices,
    IconInfoSquare,
    IconShape,
    IconSlideshow,
    IconHierarchy,
    IconAdjustments,
    IconSettingsAutomation,
    IconSettings,
    IconLanguage,
    IconApps,
    IconCurrencyEthereum
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: "DApp",
    type: 'group',
    children: [
        {
            id: 'templates',
            title: "Add Templates",
            type: 'item',
            url: 'templates',
            icon: icons.IconApps,
            breadcrumbs: false
        },
        {
            id: 'theme',
            title: "Look & Feel",
            type: 'item',
            url: 'theme',
            icon: icons.IconPalette,
            breadcrumbs: false,
            // children: [
            //     {
            //         id: 'brand',
            //         title: <FormattedMessage id="Brand Icon & Colors" />,
            //         type: 'item',
            //         url: 'brand',
            //         icon: icons.IconShape,
            //         breadcrumbs: false
            //     },
            //     {
            //         id: 'template',
            //         title: <FormattedMessage id="Template Style" />,
            //         type: 'item',
            //         url: 'template',
            //         icon: icons.IconSlideshow,
            //         breadcrumbs: false
            //     }
            // ]
        },
        {
            id: 'default',
            title: "dApp Info",
            type: 'item',
            url: 'overview',
            icon: icons.IconInfoSquare,
            breadcrumbs: false
        },
        // {
        //     id: 'localization',
        //     title: "3. Localize it",
        //     type: 'item',
        //     url: 'localization',
        //     icon: icons.IconLanguage,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'features',
        //     title: <FormattedMessage id="Features" />,
        //     type: 'item',
        //     url: 'features',
        //     icon: icons.IconAdjustments,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'blockchain',
        //     title: "4. Your smart contract",
        //     type: 'item',
        //     url: 'blockchain',
        //     icon: icons.IconSettingsAutomation,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'content',
        //     title: <FormattedMessage id="Content" />,
        //     type: 'collapse',
        //     url: 'builder/dashboard/default',
        //     completed: false,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'contentAdd',
        //             title: <FormattedMessage id="Add" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconSquarePlus,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'contentList',
        //             title: <FormattedMessage id="Content List" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconList,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'contentComments',
        //             title: <FormattedMessage id="Comments" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconMessage2,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'contentDeleted',
        //             title: <FormattedMessage id="Recycle Bin" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconRecycle,
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        // {
        //     id: 'monetization',
        //     title: <FormattedMessage id="Monetization" />,
        //     type: 'collapse',
        //     url: 'builder/dashboard/analytics',
        //     completed: false,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'monetizationApp',
        //             title: <FormattedMessage id="InApp Purchase" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconShoppingCart,
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'monetizationAdvertising',
        //             title: <FormattedMessage id="Advertising" />,
        //             type: 'item',
        //             url: 'builder/dashboard/default',
        //             icon: icons.IconAd,
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default dashboard;
