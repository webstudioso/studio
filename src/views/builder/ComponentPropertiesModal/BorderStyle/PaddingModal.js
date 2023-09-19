import { useState } from 'react'
import { Grid, Popover, Paper, Tooltip, Box } from '@mui/material'

const SIZES = ['-1','-2', '-3', '-4', '-5', '-6', '-10', '-12', '-20']
const SIDES = ['','x','y', 't', 'b', 'l', 'r']
const AVAILABLE = SIDES.map((side) => SIZES.map((size) => `p${side}${size}` )).flat().concat('p-0')

const PaddingModal = ({ selected, anchorEl, open, onClose }) => {

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
                        <Grid item xs={6} onClick={() => {
                            selected.removeClass(available)
                            selected.addClass(padding)
                            onClose()
                        }}>
                            <Tooltip title={padding}>
                                <Paper  elevation={1}  
                                        sx={{ height: 205, width: 205}}
                                        className={`${padding} bg-indigo-500 rounded-lg shadow-lg overflow-hidden flex font-mono text-white text-sm font-bold leading-6 bg-stripes-white cursor-pointer relative`}
                                >
                                    <Box className="bg-indigo-500 w-full h-full">
                                    </Box>
                                </Paper>
                            </Tooltip>
                        </Grid>
                )})}
            </Grid>
        </Popover>
    )
}

export default PaddingModal