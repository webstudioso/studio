import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltipArrow}`]: {
        backgroundColor: '#fff'
      },
      [`& .${tooltipClasses.arrow}`]: {
        "&:before": {
          border: `1px solid #dadde9`
        },
        color: '#fff'
      },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      color: '#333',
      maxWidth: 300,
      fontSize: theme.typography.pxToRem(14),
      border: '1px solid #dadde9',
      padding: 20
    },
}));


export default HtmlTooltip
