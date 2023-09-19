import { useState } from 'react'
import { Grid, Popover, Paper, Tooltip } from '@mui/material'

const SIZES = ['','-2', '-4', '-8']
const SIDES = ['','-t','-r', '-b', '-l', '-x', '-y']
const AVAILABLE = SIDES.map((side) => SIZES.map((size) => `border${side}${size}` )).flat().concat('border-0')

const BorderWidthModal = ({ selected, anchorEl, open, onClose }) => {

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
            <Grid container spacing={1} sx={{maxWidth: 400, p: 2 }}>
                { available.map((border) => {
                    return (
                        <Grid item xs={3} onClick={() => {
                            selected.removeClass(available)
                            selected.addClass(border)
                            onClose()
                        }}>
                            <Tooltip title={border}>
                                <Paper  elevation={1}  
                                        sx={{ height: 75, width: '100%'}} 
                                        className={`${border} border-indigo-500 cursor-pointer`}
                                >
                                </Paper>
                            </Tooltip>
                        </Grid>
                )})}
            </Grid>
        </Popover>
    )
}

export default BorderWidthModal