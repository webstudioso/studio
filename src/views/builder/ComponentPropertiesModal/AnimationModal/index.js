import { useEffect, useState } from 'react'
import constants from 'constant'
import { Grid, Popover, Paper, Tooltip, Typography, Stack, Button, Box } from '@mui/material'
import { getCurrentClasses, handlePropertyChange } from 'utils/properties'
import InfoButton from 'views/builder/InfoButton'
const {
    ANIMATIONS_BASE,
    ANIMATIONS
} = constants

const AnimationModal = ({ selected, anchorEl, open, onClose, intl }) => {

    const [animation, setAnimation] = useState()
    const [highlight, setHighlight] = useState()

    useEffect(() => {
        setAnimation(getCurrentClasses(selected, ANIMATIONS))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAnimation = (anim) => {
        handlePropertyChange(selected, ANIMATIONS, anim)
        if (anim) selected.addClass(ANIMATIONS_BASE)
        else selected.removeClass(ANIMATIONS_BASE)
        setAnimation(anim)
    }

    const animationOptions = ANIMATIONS.map((anim) => {
        return(
            <Grid item xs={3}>
                <Tooltip title={anim.name}>
                    <Paper  elevation={1} 
                            component={Stack} direction="column" justifyContent="center"
                            sx={{ 
                                py: 4, 
                                textAlign: 'center', 
                                cursor: 'pointer', 
                                height: 100, 
                                padding: 1,
                                border: `1px solid ${anim.value === animation ? '#7572f9' : 'transparent'}`
                            }} 
                            onClick={() => handleAnimation(anim.value)}
                            className={highlight === anim.value ? `${ANIMATIONS_BASE} ${anim.value}` : ''}
                            onMouseEnter={() => setHighlight(anim.value)}
                    >
                        <Box justifyContent="center" alignContent="center" sx={{ margin: '0 auto' }}>
                            <div dangerouslySetInnerHTML={{__html: anim.icon}} />
                        </Box>
                        <Typography fontSize={12} color="black">{anim.name}</Typography>
                    </Paper>
                </Tooltip>
            </Grid>
        )
    })

    return (
        <Popover open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} sx={{ cursor: 'pointer' }}>
            <Grid container spacing={1} sx={{ maxWidth: 500, p: 2 }}>
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography variant="body" fontSize={18} color="black" fontWeight="bold">
                        {intl.formatMessage({ id: 'props.animations_title' })}
                        <InfoButton tooltip="props.animations" />
                    </Typography>
                </Grid>
                { animationOptions }
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button fullWidth variant="outlined" onClick={onClose}>{intl.formatMessage({ id: 'action.continue' })}</Button>
                </Grid>
            </Grid>
        </Popover>
    )
}

export default AnimationModal