import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SmartContracts from 'views/builder/Wizard/SmartContracts';
import Text from 'views/builder/ComponentPropertiesModal/Text';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { Tooltip } from '@mui/material';

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
        <Box sx={{ p: 0 }}>
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
  const [selected, setSelected] = useState()
  const [hasWizard, setWizard] = useState(false)


  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const isText = () => selected?.attributes?.type === 'text'

  const loadPanels = () => {
  
    // Styles
    const styleManager = editor.StyleManager;
    const selectorMnager = editor.SelectorManager;
   
    const styleBlock = styleManager.render();
    const allSelectors = selectorMnager.getSelected()

    const selectBlock = selectorMnager.render(allSelectors);
    const designTab = document.getElementById('designTab');
    // designTab.firstElementChild?.remove();
    if (!isText()) {
      designTab.prepend(styleBlock);
      designTab.prepend(selectBlock);
      selectorMnager.__update();
    }

    const traitManager = editor.TraitManager;
    const traitBlock = traitManager.render();
    const traitTab = document.getElementById('propertyTab');
    // traitTab.firstElementChild?.remove();
    traitTab.prepend(traitBlock);

    if (selected && selected.attributes.hasOwnProperty('payload'))
      setValue(2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    if (selected) {
      loadPanels()
      // console.log(selected?.attributes)
      setWizard(selected && selected?.attributes?.hasOwnProperty('payload'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  useEffect(() => {
    setSelected(editor?.getSelected())
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <Box sx={{ width: '100%' }}>
        {/* { isText() && <Text editor={editor} selected={selected} /> } */}
     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={<Tooltip title={intl.formatMessage({id:'props.style'})}><PaletteOutlinedIcon /></Tooltip>} {...a11yProps(0)}/>
            <Tab label={<Tooltip title={intl.formatMessage({id:'props.metadata'})}><SettingsOutlinedIcon /></Tooltip>} {...a11yProps(1)}/>
            {hasWizard && (<Tab label={<Tooltip title={intl.formatMessage({id:'props.actions'})}><PlayCircleOutlinedIcon /></Tooltip>} {...a11yProps(2)}/> )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} id="designTab">
              { isText() && <Text editor={editor} selected={selected} intl={intl} /> }
              {/* <Box id="designTab"></Box> */}
      </TabPanel>
      <TabPanel value={value} index={1} id="propertyTab">

      </TabPanel> 

      {hasWizard && (<TabPanel value={value} index={2} id="wizardTab">

            <SmartContracts element={selected} activeStep={0} editor={editor} changeStep={(step) => console.log(step)} intl={intl} />
        
        </TabPanel>    )}

    </Box>
  );
}