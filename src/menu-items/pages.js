// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: <FormattedMessage id="pages" />,
    caption: <FormattedMessage id="pages-caption" />,
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: <FormattedMessage id="authentication" />,
            type: 'collapse',
            icon: icons.IconKey,
            children: [
                {
                    id: 'authentication1',
                    title: (
                        <>
                            <FormattedMessage id="authentication" /> 1
                        </>
                    ),
                    type: 'collapse',
                    children: [
                        {
                            id: 'login1',
                            title: <FormattedMessage id="login" />,
                            type: 'item',
                            url: '/pages/login/login1',
                            target: true
                        },
                        {
                            id: 'register1',
                            title: <FormattedMessage id="register" />,
                            type: 'item',
                            url: '/pages/register/register1',
                            target: true
                        },
                        {
                            id: 'forgot-password1',
                            title: <FormattedMessage id="forgot-password" />,
                            type: 'item',
                            url: '/pages/forgot-password/forgot-password1',
                            target: true
                        },
                        {
                            id: 'check-mail1',
                            title: <FormattedMessage id="check-mail" />,
                            type: 'item',
                            url: '/pages/check-mail/check-mail1',
                            target: true
                        },
                        {
                            id: 'reset-password1',
                            title: <FormattedMessage id="reset-password" />,
                            type: 'item',
                            url: '/pages/reset-password/reset-password1',
                            target: true
                        },
                        {
                            id: 'code-verification1',
                            title: <FormattedMessage id="code-verification" />,
                            type: 'item',
                            url: '/pages/code-verification/code-verification1',
                            target: true
                        }
                    ]
                },
                {
                    id: 'authentication2',
                    title: (
                        <>
                            <FormattedMessage id="authentication" /> 2
                        </>
                    ),
                    type: 'collapse',
                    children: [
                        {
                            id: 'login2',
                            title: <FormattedMessage id="login" />,
                            type: 'item',
                            url: '/pages/login/login2',
                            target: true
                        },
                        {
                            id: 'register2',
                            title: <FormattedMessage id="register" />,
                            type: 'item',
                            url: '/pages/register/register2',
                            target: true
                        },
                        {
                            id: 'forgot-password2',
                            title: <FormattedMessage id="forgot-password" />,
                            type: 'item',
                            url: '/pages/forgot-password/forgot-password2',
                            target: true
                        },
                        {
                            id: 'check-mail2',
                            title: <FormattedMessage id="check-mail" />,
                            type: 'item',
                            url: '/pages/check-mail/check-mail2',
                            target: true
                        },
                        {
                            id: 'reset-password2',
                            title: <FormattedMessage id="reset-password" />,
                            type: 'item',
                            url: '/pages/reset-password/reset-password2',
                            target: true
                        },
                        {
                            id: 'code-verification2',
                            title: <FormattedMessage id="code-verification" />,
                            type: 'item',
                            url: '/pages/code-verification/code-verification2',
                            target: true
                        }
                    ]
                },
                {
                    id: 'authentication3',
                    title: (
                        <>
                            <FormattedMessage id="authentication" /> 3
                        </>
                    ),
                    type: 'collapse',
                    children: [
                        {
                            id: 'login3',
                            title: <FormattedMessage id="login" />,
                            type: 'item',
                            url: '/pages/login/login3',
                            target: true
                        },
                        {
                            id: 'register3',
                            title: <FormattedMessage id="register" />,
                            type: 'item',
                            url: '/pages/register/register3',
                            target: true
                        },
                        {
                            id: 'forgot-password3',
                            title: <FormattedMessage id="forgot-password" />,
                            type: 'item',
                            url: '/pages/forgot-password/forgot-password3',
                            target: true
                        },
                        {
                            id: 'check-mail3',
                            title: <FormattedMessage id="check-mail" />,
                            type: 'item',
                            url: '/pages/check-mail/check-mail3',
                            target: true
                        },
                        {
                            id: 'reset-password3',
                            title: <FormattedMessage id="reset-password" />,
                            type: 'item',
                            url: '/pages/reset-password/reset-password3',
                            target: true
                        },
                        {
                            id: 'code-verification3',
                            title: <FormattedMessage id="code-verification" />,
                            type: 'item',
                            url: '/pages/code-verification/code-verification3',
                            target: true
                        }
                    ]
                }
            ]
        },
        {
            id: 'price',
            title: <FormattedMessage id="pricing" />,
            type: 'collapse',
            icon: icons.IconReceipt2,
            children: [
                {
                    id: 'price1',
                    title: (
                        <>
                            <FormattedMessage id="price" /> 01
                        </>
                    ),
                    type: 'item',
                    url: '/pages/price/price1'
                },
                {
                    id: 'price2',
                    title: (
                        <>
                            <FormattedMessage id="price" /> 02
                        </>
                    ),
                    type: 'item',
                    url: '/pages/price/price2'
                }
            ]
        },
        {
            id: 'maintenance',
            title: <FormattedMessage id="maintenance" />,
            type: 'collapse',
            icon: icons.IconBug,
            children: [
                {
                    id: 'error',
                    title: <FormattedMessage id="error-404" />,
                    type: 'item',
                    url: '/pages/error',
                    target: true
                },
                {
                    id: 'coming-soon',
                    title: <FormattedMessage id="coming-soon" />,
                    type: 'collapse',
                    children: [
                        {
                            id: 'coming-soon1',
                            title: (
                                <>
                                    <FormattedMessage id="coming-soon" /> 01
                                </>
                            ),
                            type: 'item',
                            url: '/pages/coming-soon1',
                            target: true
                        },
                        {
                            id: 'coming-soon2',
                            title: (
                                <>
                                    <FormattedMessage id="coming-soon" /> 02
                                </>
                            ),
                            type: 'item',
                            url: '/pages/coming-soon2',
                            target: true
                        }
                    ]
                },
                {
                    id: 'under-construction',
                    title: <FormattedMessage id="under-construction" />,
                    type: 'item',
                    url: '/pages/under-construction',
                    target: true
                }
            ]
        },
        {
            id: 'contact-us',
            title: <FormattedMessage id="contact-us" />,
            type: 'item',
            icon: icons.IconPhoneCall,
            url: '/pages/contact-us',
            target: true
        }
    ]
};

export default pages;
