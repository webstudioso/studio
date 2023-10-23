import { useState } from 'react'
import { Grid, Popover, Paper, Tooltip } from '@mui/material'

const SIZES = ['','-none','-sm', '-md', '-lg', '-xl', '-2xl', '-3xl', '-full', '-20']
const SIDES = ['','-s','-e', '-t', '-r', '-b', '-ss', '-se', '-ee', '-tl', '-tr', '-br', '-bl']
const AVAILABLE = SIDES.map((side) => SIZES.map((size) => `rounded${side}${size}` )).flat()
const RadiusModal = ({ selected, anchorEl, open, onClose }) => {

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
                { available.map((border) => {
                    return (
                        <Grid item xs={2} onClick={() => {
                            selected.removeClass(available)
                            selected.addClass(border)
                            onClose()
                        }}>
                            <Tooltip title={border}>
                                <Paper  elevation={1}  
                                        sx={{ height: 64, width: 64}}
                                        className={`${border} bg-indigo-500 cursor-pointer`}
                                >
                                </Paper>
                            </Tooltip>
                        </Grid>
                )})}
            </Grid>
        </Popover>
    )
}

export default RadiusModal