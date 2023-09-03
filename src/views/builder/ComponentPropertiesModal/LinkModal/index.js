import { useEffect, useState } from 'react'
import constants from 'constant'
import { useDispatch } from 'react-redux'
import { 
    Grid, 
    InputAdornment, 
    Popover, 
    Radio, 
    Button, 
    FormControl, 
    FormControlLabel, 
    RadioGroup,
    Paper, 
    Box, 
    Select, 
    MenuItem, 
    Typography, 
    TextField,
    Stack
} from '@mui/material'
import { handleMediaUpload } from 'utils/media'
import InfoButton from 'views/builder/InfoButton'
import { getLinkType } from 'utils/properties'
const { LINK, LINK_ACTION } = constants

const LinkModal = ({ editor, selected, anchorEl, open, onClose, intl }) => {

    const dispatch = useDispatch()
    const [attributes, setAttributes] = useState()
    const [linkType, setLinkType] = useState()

    useEffect(() => {
        const attrs = selected?.getAttributes()
        setAttributes(Object.assign({}, attrs))
        setLinkType(getLinkType(attrs))
        // eslint-disable-next-line
    }, [])

    const handleOptionChange = (e) => {
        const option = e.target.value
        setLinkType(option)
        if (!attributes) return
    
        const newAttributes = Object.assign({}, attributes)
        newAttributes.tagName = 'a'
    
        if (option === LINK.NONE) {
            delete newAttributes.href
            delete newAttributes.target
            delete newAttributes.download
        } else if (option === LINK.WEB) {
            newAttributes.href='https://' 
        } else if (option === LINK.SECTION) {
            newAttributes.href='#home'
        } else if (option === LINK.PAGE) {
            newAttributes.href='/'
        } else if (option === LINK.PHONE) {
            newAttributes.href='tel:'
        } else if (option === LINK.EMAIL) {
            newAttributes.href='mailto:'
        } else if (option === LINK.DOCUMENT) {
            newAttributes.download=true
            newAttributes.href=''
        } else if (option === LINK.PAGE_TOP_BOTTOM) {
            newAttributes.href='#top'
        } else if (option === LINK.SECTION) {
            newAttributes.href='#'
        } 

        setAttributes(newAttributes)
    }

    const onSave = () => {
        const current = selected.getAttributes()

        if (attributes.href) {
            current.href = attributes.href
            selected.set('tagName', 'a')
        } else {
            delete current.href
        }

        if (attributes.download) {
            current.download = attributes.download
        } else {
            delete current.download
        }

        if (attributes.target) {
            current.target = attributes.target
        } else {
            delete current.target
        }

        selected.setAttributes({ ...current })
        onClose()
    }

    const handleTabOption = (e) => {
        delete attributes.target
        if (e.target.value === LINK_ACTION.NEW_TAB) 
            attributes.target = '__new'
        setAttributes(Object.assign({}, attributes))
    }

    const newWindowControl = (
        <Grid item xs={12} marginTop={2}>
            <FormControl>
                <Grid item xs={12} textAlign="left" marginTop={1} marginBottom={1} fontWeight="bold">
                    <Typography variant="body">{intl.formatMessage({ id: 'props.link_open_title'})}</Typography>
                </Grid>
                <RadioGroup
                    aria-labelledby="link-open-group-label"
                    defaultValue={attributes?.target === '__new' ? LINK_ACTION.NEW_TAB : LINK_ACTION.CURRENT_TAB }
                    name="link-open-group"
                    onChange={handleTabOption}
                >
                    <FormControlLabel value={LINK_ACTION.NEW_TAB} control={<Radio />} label={intl.formatMessage({id: 'props.link_new_tab'})} className="prop-radio" />
                    <FormControlLabel value={LINK_ACTION.CURRENT_TAB} control={<Radio />} label={intl.formatMessage({id: 'props.link_current_tab'})} className="prop-radio" />
                </RadioGroup>
            </FormControl>
        </Grid>
    )

    const isAnchor = (side) => attributes.href === side

    const sectionView =  linkType === LINK.SECTION && (
        <Grid container sx={{ p:2 }}>
            <Grid item xs={12} textAlign="left" marginTop={1} marginBottom={1} fontWeight="bold">
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_section_title'})}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth id="outlined-basic" variant="outlined" size="small" placeholder={intl.formatMessage({ id: 'props.link_section_placeholder' })}
                    defaultValue={attributes?.href?.replace('#','')}
                    onChange={(e) => setAttributes({ href: `#${e.target.value}` , tagName:'a' })}
                />
            </Grid>
        </Grid>
    )

    const phoneView = linkType === LINK.PHONE && (
        <Grid container sx={{ p:2 }}>
            <Grid item xs={12} textAlign="left" marginTop={1} marginBottom={1} fontWeight="bold">
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_phone_title'})}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth size="small" id="outlined-basic" variant="outlined" placeholder={intl.formatMessage({ id: 'props.link_phone_placeholder' })}
                    defaultValue={attributes?.href?.replace('tel:','')}
                    onChange={(e) => setAttributes({ href: `tel:${e.target.value}`})}
                />
            </Grid>
        </Grid>
    )

    const emailView = linkType === LINK.EMAIL && (
        <Grid container sx={{ p:2 }}>
            <Grid item xs={12} textAlign="left" marginTop={1} marginBottom={1} fontWeight="bold">
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_email_address'})}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth id="outlined-basic" size="small" variant="outlined" placeholder={intl.formatMessage({ id: 'props.link_email_address_placeholder' })}
                    defaultValue={  attributes?.href?.replace('mailto:','')?.split('?').length > 0 ? 
                                    attributes?.href?.replace('mailto:','')?.split('?')[0] : 
                                    attributes?.href?.replace('mailto:','') }
                    onChange={(e) => {
                        let href = attributes.href
                        const components = href.split('?subject=')
                        href = `mailto:${e.target.value}`
                        if (components.length > 0) {
                            href += `?subject=${components[1]}`
                        }
                        setAttributes({ type: 'link', href , tagName:'a' })
                    }}
                />
            </Grid>
            <Grid item xs={12} textAlign="left" marginTop={2} marginBottom={1} fontWeight="bold">
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_email_subject'})}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth id="outlined-basic" size="small" variant="outlined" placeholder={intl.formatMessage({ id: 'props.link_email_subject_placeholder' })}
                    defaultValue={attributes?.href.split('subject=').length > 0 ? attributes?.href.split('subject=')[1]:''}
                    onChange={(e) => setAttributes({ type: 'link', href: `${attributes.href.split('?subject=')[0]}?subject=${e.target.value}`, tagName:'a' })}
                />
            </Grid>
        </Grid>
    )

    const webAddressView = linkType === LINK.WEB && (
        <Grid container sx={{ p:2 }}>
            <Grid item xs={12} textAlign="left" marginTop={1} marginBottom={1} fontWeight="bold">
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_web_title'})}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth id="outlined-basic" variant="outlined" size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="end" width={50}>https://</InputAdornment>,
                        }}
                    defaultValue={attributes?.href?.replace('https://','')}
                    onChange={(e) => setAttributes({ href: `https://${e.target.value}` , tagName:'a' })}
                />
            </Grid>
            {newWindowControl}
        </Grid>
    )

    const noneView = linkType === LINK.NONE && (
        <Grid container sx={{ p:2 }}>
            <Grid item xs={12} paddingTop={0}>
                <Box width="100px" margin="0 auto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plug-connected-x" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M20 16l-4 4" />
                        <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5z" />
                        <path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5z" />
                        <path d="M3 21l2.5 -2.5" />
                        <path d="M18.5 5.5l2.5 -2.5" />
                        <path d="M10 11l-2 2" />
                        <path d="M13 14l-2 2" />
                        <path d="M16 16l4 4" />
                    </svg>
                </Box>
            </Grid>
            <Grid item xs={12} textAlign="center" marginTop={2}>
                <Typography variant="h3" color="black">{intl.formatMessage({ id: 'props.link_none_title'})}</Typography>
            </Grid>
            <Grid item xs={12} textAlign="center" marginTop={1}>
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_none_description'})}</Typography>
            </Grid>
        </Grid>
    )

    const pageView = linkType === LINK.PAGE && (
        <Grid container sx={{ p:2 }}>
            <Grid item xs={12} textAlign="left" marginTop={1} marginBottom={1} fontWeight="bold">
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_page_selector'})}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Select size="small" value={attributes?.href}>
                    {
                        editor.Pages.getAll().map((page) => {
                            const value = `/${page.attributes.name ? page.attributes.name : ''}`
                            return (
                                <MenuItem value={value}
                                    onClick={() => {
                                        attributes.href = `/${page.attributes.name ? page.attributes.name : ''}`
                                        setAttributes(Object.assign({}, attributes))
                                    }}
                                >
                                    <span>
                                        {page.attributes.name || page.attributes.type}
                                    </span>
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </Grid>
            {newWindowControl}
        </Grid>
    )

    const topPageView = linkType === LINK.PAGE_TOP_BOTTOM && (
        <Grid container sx={{ p:2 }} spacing={2}>
            <Grid item xs={12} textAlign="left" marginTop={1} marginBottom={0} fontWeight="bold">
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_section_title'})}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Paper  component={Stack} 
                        direction="column" 
                        justifyContent="center"
                        textAlign="center"
                        padding={2}
                        elevation={isAnchor('#top') ? 5:2}   
                        onClick={() => setAttributes({ href: '#top'})}
                        sx={{ cursor: 'pointer' }}>
                    <svg margin="0 auto" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-up" width="100" height="100" viewBox="0 0 24 24" stroke-width="1" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 10l0 10" />
                        <path d="M12 10l4 4" />
                        <path d="M12 10l-4 4" />
                        <path d="M4 4l16 0" />
                    </svg>
                    <Typography>{intl.formatMessage({ id: 'props.link_page_top'})}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper  component={Stack} 
                        direction="column" 
                        justifyContent="center"
                        textAlign="center"
                        padding={2}
                        elevation={isAnchor('#bottom') ? 5:2}
                        onClick={() => setAttributes({ href: '#bottom'})}
                        sx={{ cursor: 'pointer' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-down" width="100" height="100" viewBox="0 0 24 24" stroke-width="1" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 20l16 0" />
                        <path d="M12 14l0 -10" />
                        <path d="M12 14l4 -4" />
                        <path d="M12 14l-4 -4" />
                    </svg>
                    <Typography>{intl.formatMessage({ id: 'props.link_page_bottom'})}</Typography>
                </Paper>
            </Grid>
        </Grid>
    )

    const documentView = linkType === LINK.DOCUMENT && (
        <Grid container sx={{ p:2 }}>
            <Grid item xs={12} textAlign="left" marginTop={1} marginBottom={1} fontWeight="bold">
                <Typography variant="body">{intl.formatMessage({ id: 'props.link_document_title'})}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" component="label">
                    {intl.formatMessage({ id: 'props.link_document_button'})}
                    <input
                        type="file"
                        hidden
                        onChange={(e) => handleMediaUpload(e.target.files[0], dispatch, editor, intl, (url) => setAttributes({ href: url, download: true })) }
                    />
                    </Button>
                </Grid>
                <Grid item xs={12} marginTop={2}>
                    <Typography sx={{ lineBreak: 'anywhere' }}>{attributes.href}</Typography>
                </Grid>
        </Grid>
    )

    return (
        <Popover open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <Grid container spacing={1} sx={{ width: 600, p: 2 }}>
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography variant="body" fontSize={18} color="black" fontWeight="bold">
                        {intl.formatMessage({ id: 'props.link_title' })}
                        <InfoButton tooltip="props.link" />
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="link-option"
                            defaultValue={linkType}
                            name="link-option-group"
                            sx={{ p: 1 }}
                            onChange={handleOptionChange}
                        >
                            <FormControlLabel value={LINK.NONE} control={<Radio />} label={intl.formatMessage({ id: 'props.none' })} className="prop-radio" />
                            <FormControlLabel value={LINK.PAGE} control={<Radio />} label={intl.formatMessage({ id: 'props.page' })} className="prop-radio" />
                            <FormControlLabel value={LINK.WEB} control={<Radio />} label={intl.formatMessage({ id: 'props.webaddress' })} className="prop-radio" />
                            <FormControlLabel value={LINK.SECTION} control={<Radio />} label={intl.formatMessage({ id: 'props.section' })} className="prop-radio" />
                            <FormControlLabel value={LINK.PAGE_TOP_BOTTOM} control={<Radio />} label={intl.formatMessage({ id: 'props.topbottom' })} className="prop-radio" />
                            <FormControlLabel value={LINK.DOCUMENT} control={<Radio />} label={intl.formatMessage({ id: 'props.document' })} className="prop-radio" />
                            <FormControlLabel value={LINK.EMAIL} control={<Radio />} label={intl.formatMessage({ id: 'props.email' })} className="prop-radio" />
                            <FormControlLabel value={LINK.PHONE} control={<Radio />} label={intl.formatMessage({ id: 'props.phone' })} className="prop-radio" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={7} sx={{ borderLeft:'1px solid rgba(0,0,0,.1)' }}>
                    { noneView }
                    { pageView }
                    { webAddressView }
                    { topPageView }
                    { documentView }
                    { emailView }
                    { phoneView }
                    { sectionView }
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button fullWidth variant="outlined" onClick={onSave}>{intl.formatMessage({ id: 'action.continue' })}</Button>
                </Grid>
            </Grid>
        </Popover>
    )
}

export default LinkModal