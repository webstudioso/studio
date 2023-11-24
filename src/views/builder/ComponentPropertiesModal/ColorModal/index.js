import { useState } from 'react'
import constants from 'constant'
import { Grid, Popover, Paper, Tooltip } from '@mui/material'
const { TAILWIND } = constants

const VARIANTS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const ColorModal = ({ selected, anchorEl, open, onClose, prefix }) => {

    const [availableColors] = useState(TAILWIND.FONT_COLORS.map((color) => VARIANTS.map((variant) => `${color}-${variant}`)).flat())

    const cleanup = () => {
        const myClasses = selected?.getClasses()
        const todelete = myClasses?.filter((cls) => cls.startsWith(prefix) && TAILWIND.FONT_COLORS.includes(cls.split('-')[1]))
        selected.removeClass(todelete)
        return todelete
    }

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
                { availableColors.concat([`${prefix}-transparent`]).map((color) => {
                    return (
                        <Grid item xs={1} onClick={() => {
                            cleanup()
                            selected.addClass(`${prefix}${color}`)
                            onClose()
                        }}>
                            <Tooltip title={color}>
                                <Paper  elevation={1}  
                                        sx={{ height: 25, width: '100%'}} 
                                        className={`bg-${color} cursor-pointer`}
                                >
                                </Paper>
                            </Tooltip>
                        </Grid>
                )})}
            </Grid>
        </Popover>
    )
}

export default ColorModal