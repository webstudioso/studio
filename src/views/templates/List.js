import { useState, memo } from 'react'
import { Box, Grid, Paper, Button, Typography, CircularProgress, Chip, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'
import { FormattedMessage, useIntl } from 'react-intl'
import { getTemplateById } from 'api/template'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 450,
    borderRadius: '4px'
}))

const Templates = ({ onLeave, fullScreen=false }) => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState()
    const [picked, setPicked] = useState()
    const isLoading = useSelector((state) => state.loader.show)
	const editor = useSelector((state) => state.editor.editor)
    const account = useSelector((state) => state.account)
    const availableTemplates = useSelector((state) => state?.template?.availableTemplates)

    const confirmTemplate = async () => {
        dispatch({ type: LOADER, show: true })
        const baseTemplate = await getTemplateById({ id: picked?.id , principal: account.principal })
        setTimeout(() => {
            editor.loadProjectData(JSON.parse(baseTemplate.content))
            setPicked()
            if (fullScreen) onLeave()
        }, 250)
    }

    const spinner = isLoading && (<CircularProgress size={18} sx={{ ml: 1 }} />)

    const templateList = availableTemplates.map((template, index) => (
        <Grid item xs={fullScreen ? 6:12} md={fullScreen ? 4:6} lg={fullScreen ? 3:6} key={index} sx={{ mb: 5, cursor: 'pointer' }}
            onMouseEnter={() => {
                setSelected(index)
            }}
        >
            <Item elevation={6} sx={{position: 'relative'}}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    background: `url(${template.preview})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
                className={index === selected ? "blurred" : ""}
                >
                </Box>
                {index ===selected && (
                <Box sx={{
                    width: '102%',
                    height: '102%',
                    background: `rgba(255,255,255,0.85)`,
                    position: 'absolute',
                    top: '-1%',
                    left: '-1%',
                    zIndex: 1000
                }}
                className="overlay"
                >
                    <Button 
                            onClick={() => setPicked(template)}
                            disabled={isLoading}
                            sx={{
                                borderRadius: '50px',
                                position: 'absolute',
                                top: '35%',
                                left: '25%',
                                width: '50%'
                            }}
                            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-5 py-3 text-center mr-2 mb-2"
                    >
                        <FormattedMessage id="template_page.pick" />
                        {spinner}
                    </Button>
                    <Box sx={{
                        position: 'absolute',
                        top: '55%',
                        left: '10%',
                        width: '80%',
                        color: 'black',
                        textAlign: 'center'
                    }}>
                        <Typography variant="body" fontWeight="bold" color="#555" fontSize={16}>{intl.formatMessage({ id: template.description })}</Typography>
                    </Box>
                </Box>)}
                <Box sx={{py:2, px: 1 }}>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography variant="body" fontWeight="bold" color="#555" fontSize={16}>{template.name}</Typography>
                        </Grid>
                        <Box flexGrow={1}></Box>
                        <Grid item>
                            <Chip label={<FormattedMessage id="template_page.free" />} color="primary" size="small" />
                        </Grid>
                      
                    </Grid>
                    

                </Box>
            </Item>
        </Grid>
    ))

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
            {templateList}
            {dialog}
        </Grid>
    )
}

export default memo(Templates)
