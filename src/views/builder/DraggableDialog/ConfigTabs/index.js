import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SmartContracts from 'views/builder/Wizard/SmartContracts';
import { useIntl } from 'react-intl';

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
        <Box sx={{ p: 3 }}>
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

export default function BasicTabs({ editor }) {
  const intl = useIntl()
  const [element, setElement] = useState();
  const hasWizard = element && element.attributes.hasOwnProperty('payload')


  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // if (!filter) return;
    if (!editor) return;

    const elem = editor.getSelected()
    setElement(elem)
    // Styles
    const styleManager = editor.StyleManager;
    const selectorMnager = editor.SelectorManager;
   
    const styleBlock = styleManager.render();
    const allSelectors = selectorMnager.getSelected()

    const selectBlock = selectorMnager.render(allSelectors);
    const designTab = document.getElementById('designTab');
    // designTab.firstElementChild?.remove();
    designTab.prepend(styleBlock);
    designTab.prepend(selectBlock);
    selectorMnager.__update();

    const traitManager = editor.TraitManager;
    const traitBlock = traitManager.render();
    const traitTab = document.getElementById('propertyTab');
    // traitTab.firstElementChild?.remove();
    traitTab.prepend(traitBlock);

    if (elem && elem.attributes.hasOwnProperty('payload'))
    setValue(2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" fullWidth>
            <Tab label="Design 🎨" {...a11yProps(0)} />
            <Tab label="Properties 🔧" {...a11yProps(1)} />
            {hasWizard && (
              <Tab label="Wizard 🧙‍♂️" {...a11yProps(2)} />
            )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} id="designTab">
      </TabPanel>
      <TabPanel value={value} index={1} id="propertyTab">
      </TabPanel>
      {hasWizard && (
        <TabPanel value={value} index={3} id="wizardTab">
            <SmartContracts element={element} activeStep={0} editor={editor} changeStep={(step) => console.log(step)} intl={intl} />
        </TabPanel>
      )}

    </Box>
  );
}