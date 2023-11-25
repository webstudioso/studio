import { useState } from 'react'
import { Grid, Popover, Paper, Tooltip } from '@mui/material'

const SIZES = ['','-sm', '-md', '-lg', '-xl', '-2xl', '-inner']
const AVAILABLE = SIZES.map((size) => `shadow${size}` ).flat().concat('shadow-none')

const ShadowModal = ({ selected, anchorEl, open, onClose }) => {

    const [available] = useState(AVAILABLE)

    return (
        <Popover    open={open}
                    anchorEl={anchorEl}
                    onClose={onClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
        >
            <Grid container spacing={1} sx={{maxWidth: 450, p: 2 }}>
                { available.map((padding) => {
                    return (
                        <Grid item xs={2} onClick={() => {
                            selected.removeClass(available)
                            selected.addClass(padding)
                            onClose()
                        }}>
                            <Tooltip title={padding}>
                                <Paper  elevation={1}  
                                        sx={{ height: 48, width: 48}}
                                        className={`${padding} rounded-lg flex font-mono leading-6 bg-stripes-white cursor-pointer relative border border-gray-200`}
                                >
                                </Paper>
                            </Tooltip>
                        </Grid>
                )})}
            </Grid>
        </Popover>
    )
}

export default ShadowModal