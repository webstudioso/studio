import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from './MainCard';

// styles
const IconWrapper = styled('div')({
    width: '50px',
    height: '50px',
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    justifyContent: 'center',
    '& span:first-child': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        opacity: '0.2',
        zIndex: '1'
    },
    '& span': {
        width: '20px',
        height: '20px'
    },
    '& svg': {
        width: '20px',
        height: '20px',
        position: 'relative',
        zIndex: '5'
    }
});

// ============================|| ROUND ICON CARD ||============================ //

const RoundIconCard = ({ primary, secondary, content, iconPrimary, color }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <MainCard>
            <Grid container alignItems="center" spacing={0} justifyContent="space-between">
                <Grid item>
                    <Grid container spacing={1} direction="column">
                        <Grid item>
                            <Typography variant="h5" color="inherit">
                                {primary}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h3">{secondary}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" color="inherit">
                                {content}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <IconWrapper>
                        <span style={{ background: color }} />
                        <span style={{ color }}>{primaryIcon}</span>
                    </IconWrapper>
                </Grid>
            </Grid>
        </MainCard>
    );
};

RoundIconCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    content: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string
};

export default RoundIconCard;
