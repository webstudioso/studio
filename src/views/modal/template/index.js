import { useState, memo } from 'react'
import { Box, Grid, Paper, Button, Typography, CircularProgress, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { HIDE_MODAL, LOADER } from 'store/actions'
import availableTemplates from 'templates/content'
import { FormattedMessage, useIntl } from 'react-intl'
import ModalToolbar from 'views/modal/toolbar'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 450,
    borderRadius: '4px'
}))

const Template = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState()
    const isLoading = useSelector((state) => state.loader.show)
	const editor = useSelector((state) => state.editor.editor)

    const onHandleSelectTemplate = async (template) => {
        dispatch({ type: LOADER, show: true })
        setTimeout(() => {
            editor.setComponents(template.template)
            editor.setStyle(template.style)
            dispatch({ type: HIDE_MODAL })
        }, 250)
    }

    const spinner = isLoading && (<CircularProgress size={18} sx={{ ml: 1 }} />)

    const templateList = availableTemplates.map((template, index) => (
        <Grid item xs={12} md={4} lg={3} key={index} sx={{ mb: 5, cursor: 'pointer' }}
            onMouseEnter={() => {
                setSelected(index)
            }}
        >
            <Item elevation={6} sx={{position: 'relative'}}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    background: `url(${template.metadata.image})`,
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
                            onClick={() => onHandleSelectTemplate(template)}
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
                        <Typography variant="body" fontWeight="bold" color="#555" fontSize={16}>{intl.formatMessage({ id: template.metadata.description })}</Typography>
                    </Box>
                </Box>)}
                <Box sx={{py:2, px: 1 }}>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography variant="body" fontWeight="bold" color="#555" fontSize={16}>{template.metadata.name}</Typography>
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

    return (
        <>
            <ModalToolbar  	title='template_page.title' 
                            tooltip='template_page.title_tooltip'
                            ctaLabel='template_page.pick_later'
                            ctaAction={() => dispatch({ type: HIDE_MODAL })}
                            onClose={() => dispatch({ type: HIDE_MODAL })}
            />
            <Grid   container spacing={2} sx={{
                    height: 'calc(100vh - 70px)',
                    overflow: 'auto',
                    background: '#f7f8f8',
                    border: '1px solid #dfe5eb',
                    borderLeft: '0px',
                    marginTop: '0px',
                    p: 2,
                    pt: 0
            }}>
                {templateList}
            </Grid>
        </>
    )
}

export default memo(Template)
