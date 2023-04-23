import { useState } from 'react'
import { Box, Grid, Paper, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import availableTemplates from "templates/content"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 450,
    borderRadius: '4px'
}))

const Templates = ({ onLeave, fullScreen=false }) => {
    const [selected, setSelected] = useState();

    const onHandleSelectTemplate = (template) => {
        const currentData = window.editor.getProjectData()
        const currentPage = window.editor.Pages.getSelected()
        const currId = currentPage.id
        const index = currentData.pages.findIndex((page) => page.id === currentPage.id)
        currentData.pages[index].frames = template.template.pages[0].frames
        const assets = currentData.assets
        const pages = currentData.pages
        const styles = template.template.styles
        window.editor.loadProjectData({
            assets,
            pages,
            styles
        })
        window.editor.Pages.select(currId)
        if (fullScreen)
            onLeave()
    }

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
