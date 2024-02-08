import React, { useState, memo } from 'react'
import { 
    Box, 
    Grid, 
    Button,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    DialogContentText,
    Tabs,
    Tab
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'
import { useIntl } from 'react-intl'
import { getTemplateById } from 'api/template'
import Card from './Card'

const CustomTabPanel = (props) => {
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
            <Grid container spacing={2} sx={{ p: 2, pr: 1 }}>
                {children}
            </Grid>
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

const Templates = ({ onLeave, fullScreen=false }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState()
    const [picked, setPicked] = useState()
    const isLoading = useSelector((state) => state.loader.show)
	const editor = useSelector((state) => state.editor.editor)
    const account = useSelector((state) => state.account)
    const templates = useSelector((state) => state?.template)

    const {
        availableTemplates,
        myTemplates
    } = templates

    const confirmTemplate = async () => {
        dispatch({ type: LOADER, show: true })
        const baseTemplate = await getTemplateById({ id: picked?.id , principal: account.principal })
        setTimeout(() => {
            editor.loadProjectData(JSON.parse(baseTemplate.content))
            setPicked()
            if (fullScreen) onLeave()
        }, 250)
    }

    const templateList = availableTemplates?.map((template, index) => {
        return (
            <Card   template={template}
                    selected={selected}
                    index={index}
                    onHover={setSelected}
                    isLoading={isLoading}
                    intl={intl}
                    onPick={setPicked}
                    fullScreen={fullScreen}
                    showPrice={true}
                    showStatus={false}
            />
        )
    })

    const myTemplateList = myTemplates.map((template, index) => {
        return (
            <Card   template={template}
                    selected={selected}
                    index={index}
                    onHover={setSelected}
                    isLoading={isLoading}
                    intl={intl}
                    onPick={setPicked}
                    fullScreen={fullScreen}
                    showPrice={false}
                    showStatus={true}
            />
        )
    })

    const dialog = (
        <Dialog
            open={!!picked}
            onClose={() => setPicked()}
        >
            <DialogTitle>
                { intl.formatMessage({ id: 'section.templates_tooltip_title' }) }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { intl.formatMessage({ id: 'section.templates_tooltip_description' }) }
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 4 }}>
                <Button onClick={() => setPicked()}>{ intl.formatMessage({ id: 'cancel' }) }</Button>
                <Button onClick={confirmTemplate}>{ intl.formatMessage({id:'action.continue'}) }</Button>
            </DialogActions>
        </Dialog>
    )

    const [value, setValue] = React.useState(0)
    const onTabChange = (e, newValue) => setValue(newValue)

    return (
        <Grid container spacing={2} sx={{ 
            height: fullScreen ? 'calc(100vh - 70px)' : 'calc(100vh - 120px)', 
            overflow: 'auto', 
            background: '#f7f8f8', 
            border: '1px solid #dfe5eb',
            borderLeft: '0px',
            marginTop: '0px',
            p: 2,
            pt: 0
        }}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs value={value} onChange={onTabChange} aria-label="basic tabs example">
            <Tab label={intl.formatMessage({ id: 'community_templates' })} {...a11yProps(0)} sx={{ width: '50%'}} />
            <Tab label={intl.formatMessage({ id: 'created_by_me' })} {...a11yProps(1)} sx={{ width: '50%'}}/>
        </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            {templateList}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            {myTemplateList}
        </CustomTabPanel>

            
            {dialog}
        </Grid>
    )
}

export default memo(Templates)
