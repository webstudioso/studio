import { useState } from 'react';
import { Chip, Box, Grid, Paper, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import availableTemplates from "views/templates/content";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 450,
    borderRadius: '4px'
}));

const Templates = ({ onLeave }) => {

    // const handleTemplateSelect = (template) => {
    //     if (template.html) {
    //         editor.setComponents(template.html);
    //         editor.setStyle(template.style);
    //     } else if (template.template) {
    //         editor.loadProjectData(template.template);
    //     }

    //     handleClose();
    // }

    const [selected, setSelected] = useState();

    const templateList = availableTemplates.map((template, index) => (
        <Grid item xs={6} key={index} sx={{ mb: 3, cursor: 'pointer' }}
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
                    backgroundPosition: 'center'
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
                            onClick={() => {
                                window.editor.loadProjectData(template.template);
                                onLeave()
                            }}
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
                {/* <Grid container>
                    <Grid item xs={12}>
                        
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h3" fontSize={16} sx={{ mb: 1 }}>{template.metadata.name}</Typography>
                            <span>
                                {template.metadata.description}
                            </span>
                            <Grid container direction="row" sx={{ mt: 1 }} spacing={1}>
                                <Grid item>
                                    {template.metadata.tags.map((tag, index) => {
                                        return (<Chip label={tag} variant="outlined" color="secondary" />)
                                    })}
                                </Grid>
                                <Box sx={{ flexGrow: 1 }}/>
                                <Grid item>
                                    <Button variant="outlined" onClick={() => handleTemplateSelect(template)}>Select</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid> */}
                <Box sx={{p:1}}>
                    <Typography variant="body" fontWeight="bold" color="#555" fontSize={16}>{template.metadata.name}</Typography>
                </Box>
            </Item>
        </Grid>
    ));

    return (
        <Grid container spacing={2} sx={{ 
            height: 'calc(100vh - 110px)', 
            overflow: 'scroll', 
            background: '#f7f8f8', 
            border: '1px solid #dfe5eb',
            borderLeft: '0px',
            marginTop: '0px',
            p: 1
        }}>
            {templateList}
        </Grid>
    )
}

export default Templates;
