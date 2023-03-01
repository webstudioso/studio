import { useEffect, useState } from 'react';
// material-ui
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { isEmpty } from 'lodash';
import {
IconBrandCodesandbox
} from '@tabler/icons';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const appState = useSelector((state) => state.app);
    const [items,] = useState(menuItem.items);
    const [dynamicItems, setDynamicItems] = useState([]);
    // const [templateList] = useState(Object.keys(appState.template));

    useEffect(() => {
        const templateList = Object.keys(appState.template);
        const dynamicTemplates = () => {
            return {
                id: 'templates',
                title: 'Project Templates',
                type: 'group',
                children: templateList.map((templateId) => {
                    const template = appState.template[templateId];
                    return (
                        {
                            id: template.id,
                            title: template.name,
                            type: 'item',
                            url: `templates/${template.id}`,
                            icon: IconBrandCodesandbox
                        }
                    )
                })
            }
        };

        if (!isEmpty(templateList)) {
            // Append templates
            setDynamicItems(dynamicTemplates());
        } else {
            setDynamicItems([]);
        }
    }, [appState]);


    const renderItems = () => items.concat(dynamicItems).map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} id={`sidemenu-${item.id}-btn`} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{renderItems()}</>;
};

export default MenuList;
