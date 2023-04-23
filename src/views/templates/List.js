import { useState } from 'react'
import { Box, Grid, Paper, Button, Typography, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { LOADER } from 'store/actions'
import availableTemplates from 'templates/content'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 450,
    borderRadius: '4px'
}))

const Templates = ({ onLeave, fullScreen=false }) => {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState()
    const isLoading = useSelector((state) => state.loader.show)
	const editor = useSelector((state) => state.editor.editor)

    const onHandleSelectTemplate = async (template) => {
        dispatch({ type: LOADER, show: true })
        setTimeout(() => {
            const currentData = editor.getProjectData()
            const currentPage = editor.Pages.getSelected()
            const currId = currentPage.id
            const index = currentData.pages.findIndex((page) => page.id === currentPage.id)
            currentData.pages[index].frames = template.template.pages[0].frames
            const assets = currentData.assets
            const pages = currentData.pages
            const styles = template.template.styles
            editor.loadProjectData({
                assets,
                pages,
                styles
            })
            editor.Pages.select(currId)
            if (fullScreen)
                onLeave()
        }, 500)
    }

    const spinner = isLoading && (<CircularProgress size={18} sx={{ ml: 1 }} />)

    const templateList = availableTemplates.map((template, index) => (
        <Grid item xs={fullScreen ? 6:12} md={fullScreen ? 4:6} lg={fullScreen ? 3:6} key={index} sx={{ mb: 3, cursor: 'pointer' }}
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
                    backgroundPosition: 'top'
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
                    <Button elevation={0} 
                            onClick={() => onHandleSelectTemplate(template)}
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                                borderRadius: '50px',
                                position: 'absolute',
                                top: '35%',
                                left: '25%',
                                width: '50%'
                            }}
                    >
                        PICK
                        {spinner}
                    </Button>
                </Box>)}
                <Box sx={{p:1}}>
                    <Typography variant="body" fontWeight="bold" color="#555" fontSize={16}>{template.metadata.name}</Typography>
                </Box>
            </Item>
        </Grid>
    ))

    return (
        <Grid container spacing={2} sx={{ 
            height: fullScreen ? 'calc(100vh - 70px)' : 'calc(100vh - 120px)', 
            overflow: 'scroll', 
            background: '#f7f8f8', 
            border: '1px solid #dfe5eb',
            borderLeft: '0px',
            marginTop: '0px',
            p: 2,
            pt: 0
        }}>
            {templateList}
        </Grid>
    )
}

export default Templates
