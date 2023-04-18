import * as React from 'react';
import { Chip, Box, Grid, Paper, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import availableTemplates from "views/templates/content";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 250,
    borderRadius: '4px'
}));

const Templates = ({ handleClose, editor }) => {

    const handleTemplateSelect = (template) => {
        if (template.html) {
            editor.setComponents(template.html);
            editor.setStyle(template.style);
        } else if (template.template) {
            editor.loadProjectData(template.template);
        }

        handleClose();
    }

    return availableTemplates.map((template, index) => (
        <Grid item xs={3} key={index}>
        <Item elevation={6}>
            <Grid container>
                <Grid item xs={12}>
                    {/* <Box sx={{
                        width: '100%',
                        height: '150px',
                        background: `url(${template.metadata.image})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}>
                    </Box> */}
                    <Box sx={{
                        width: '100%',
                        height: '150px',
                        background: `rgba(255,255,255,0.7)`,
                        position: 'absolute'
                    }}>
                    </Box>
                    {/* <Box sx={{ p: 2 }}>
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
                    </Box> */}
                </Grid>
            </Grid>
        </Item>
        </Grid>
    ));
}

export default Templates;
