import { ArticleOutlined, RemoveRedEyeRounded } from '@mui/icons-material'
import { 
    Box, 
    Grid,
    Button, 
    Typography,
    Chip,
    CircularProgress,
    Paper,
    styled,
    IconButton,
    Tooltip
} from '@mui/material'
import { FormattedMessage } from 'react-intl'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 450,
    borderRadius: '4px'
}))

const Card = ({ 
    template, 
    selected, 
    index, 
    onHover, 
    isLoading, 
    intl, 
    onPick, 
    fullScreen,
    showStatus,
    showPrice,
    showVisibility
}) => {

    const spinner = isLoading && (<CircularProgress size={18} sx={{ ml: 1 }} />)

    const getVisibilityChip = () => {
        const message = template.isPrivate ? 'private' : 'public'
        const color = template.isPrivate ? 'secondary' : 'success'
        return (
            <Chip label={<FormattedMessage id={message} />} color={color} size="small" sx={{ ml:'3px' }}/>
        )
    }

    const getStatusChip = () => {
        const variant = template.status === 'published' ? 'contained' : 'outlined'
        return (
            <Chip label={<FormattedMessage id={template.status} />} color="primary" variant={variant} size="small" sx={{ ml:'3px' }}/>
        )
    }

    return (
        <Grid   item 
                xs={fullScreen ? 6:12} 
                md={fullScreen ? 4:6} 
                lg={fullScreen ? 3:6} 
                key={index} 
                sx={{ 
                    mb: 5, 
                    cursor: 'pointer' 
                }}
                onMouseEnter={() => onHover(index)}
        >
        <Item elevation={6} sx={{position: 'relative'}}>
            <Box sx={{
                width: '100%',
                height: '100%',
                background: `url(${template.preview})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
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
                <Button 
                        onClick={() => onPick(template)}
                        disabled={isLoading}
                        sx={{
                            borderRadius: '50px',
                            position: 'absolute',
                            top: '35%',
                            left: '25%',
                            width: '50%'
                        }}
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-5 py-3 text-center mr-2 mb-2"
                >
                    <FormattedMessage id="template_page.pick" />
                    {spinner}
                </Button>
                <Box sx={{
                    position: 'absolute',
                    top: '55%',
                    left: '10%',
                    width: '80%',
                    color: 'black',
                    textAlign: 'center'
                }}>
                    <Typography variant="body" fontWeight="bold" color="#555" fontSize={16}>{intl.formatMessage({ id: template.description })}</Typography>
                </Box>
            </Box>)}
            <Box sx={{py:2, px: 1 }}>
                <Grid container direction="row">
                    <Grid item>
                        <Typography variant="body" fontWeight="bold" color="#555" fontSize={16}>{template.name}</Typography>
                    </Grid>
                    <Box flexGrow={1}></Box>
                    <Grid item sx={{ mt: -1 }}>

                        { template?.demo && (
                            <Tooltip title={intl.formatMessage({id: 'live_demo'})}>
                                <IconButton
                                    color="inherit"
                                    onClick={() => window.open(template.demo, '__demo')}
                                    size="small"
                                >
                                    <RemoveRedEyeRounded />
                                </IconButton>
                            </Tooltip>
                        )}
                        { template?.documentation && (
                            <Tooltip title={intl.formatMessage({id: 'documentation'})}>
                                <IconButton
                                    color="inherit"
                                    onClick={() =>  window.open(template.documentation, '__demo')}
                                    size="small"
                                >
                                    <ArticleOutlined />
                                </IconButton>
                            </Tooltip>
                        )}
                        { showPrice && (<Chip label={<FormattedMessage id="template_page.free" />} color="primary" size="small" sx={{ ml:'3px' }}/>)}
                        { showVisibility && getVisibilityChip() }
                        { showStatus && getStatusChip() }
                    </Grid>
                  
                </Grid>
                

            </Box>
        </Item>
    </Grid>
    )
}

export default Card