import { FormattedMessage } from 'react-intl';

// assets
import { IconChartArcs, IconClipboardList, IconChartInfographic, IconQrcode, IconUpload, IconEye } from '@tabler/icons';

// constant
const icons = { IconChartArcs, IconClipboardList, IconChartInfographic, IconQrcode, IconUpload, IconEye };

// ===========================|| WIDGET MENU ITEMS ||=========================== //

const widget = {
    id: 'publish',
    title: <FormattedMessage id="2. Publish" />,
    type: 'group',
    children: [
        {
            id: 'test',
            title: <FormattedMessage id="Preview" />,
            type: 'item',
            url: '/widget/statistics',
            icon: icons.IconEye
        },
        {
            id: 'publish',
            title: <FormattedMessage id="Publish" />,
            type: 'item',
            url: '/widget/data',
            icon: icons.IconUpload
        },
        {
            id: 'qr',
            title: <FormattedMessage id="QR Code" />,
            type: 'item',
            url: '/widget/chart',
            icon: icons.IconQrcode
        }
    ]
};

export default widget;
