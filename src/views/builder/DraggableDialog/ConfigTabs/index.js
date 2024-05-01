import { useEffect, useState } from 'react';
import { Tabs, Tab, Button, Typography, Box, Tooltip } from '@mui/material';
import Text from 'views/builder/ComponentPropertiesModal/Text';
import {
  PaletteOutlined,
  SettingsOutlined,
  LayersOutlined
} from '@mui/icons-material';
import InfoButton from 'views/builder/InfoButton';
import StyleManager from 'views/builder/ComponentPropertiesModal/StyleManager';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ editor, intl }) {
  const [selected] = useState(editor.getSelected())
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const loadPanels = () => {
 
    const traitManager = editor.TraitManager;
    const traitBlock = traitManager.render();
    const traitTab = document.getElementById('propertyTab');
    traitTab?.prepend(traitBlock);

    const layerManager = editor.LayerManager
    const layerBlock = layerManager.render()
    const layerTab = document.getElementById('layerTab')
    layerTab?.prepend(layerBlock)
  }

  useEffect(() => {
    if (selected) {
      loadPanels()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Box sx={{ width: '100%' }}>
     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={<Tooltip title={intl.formatMessage({id:'props.style'})}><PaletteOutlined /></Tooltip>} {...a11yProps(0)}/>
            <Tab label={<Tooltip title={intl.formatMessage({id:'props.metadata'})}><SettingsOutlined /></Tooltip>} {...a11yProps(1)}/>
            <Tab label={<Tooltip title={intl.formatMessage({id:'props.layer'})}><LayersOutlined /></Tooltip>} {...a11yProps(2)}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} id="designTab">
              <Text editor={editor} selected={selected} intl={intl} />
              <Typography variant="body" fontWeight="bold" fontSize={12}>{intl.formatMessage({id:'props.class_setting'})}</Typography>
              <InfoButton tooltip="props.class_setting_tooltip" section="ADVANCED_STYLES" />
              <StyleManager selected={selected} />
      </TabPanel>
      <TabPanel value={value} index={1} id="propertyTab">
      </TabPanel>
      <TabPanel value={value} index={2} id="layerTab">
      </TabPanel>
    </Box>
  );
}