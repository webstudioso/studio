import { useEffect, useState } from 'react'
import { Grid, Select, MenuItem, Typography, Box } from '@mui/material'
import { sortBy } from 'lodash'
import constants from 'constant'
import TextStyle from './TextStyle'
import TextProperties from './TextPropeties'
import BorderStyle from '../BorderStyle'

const { TAILWIND } = constants

const resolution = {
    desktop: 'lg:',
    tablet: 'md:',
    mobilePortrait: ''
}
const Text = ({ editor, selected, intl }) => {

    const [fontOptions, setFontOptions] = useState([])
    const [fontSize, setFontSize] = useState()
    const [device, setDevice] = useState()

    useEffect(() => {
        const styleManager = editor.StyleManager;
        const fontProperty = styleManager.getProperty('typography', 'font-family');
        setFontOptions(sortBy(fontProperty.attributes.options, 'label'))
        setFontSize(parseInt(selected?.getStyle('font-size')?.replace('px','')))
        const selectedDevice = editor.Devices.getSelected()
        setDevice(selectedDevice.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (fontSize) {
            selected.setStyle({'font-size': `${fontSize}px`});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fontSize])

    const cleanup = () => {
        const myClasses = selected?.getClasses()
        const todelete = myClasses?.filter((cls) => cls.startsWith(resolution[device])  && TAILWIND.FONT_SIZES.includes(cls.replace(resolution[device], '')) )
        selected.removeClass(todelete)
        return todelete
    }

    const findProp = () => {
        const myClasses = selected?.getClasses()
        const particular = myClasses?.find((cls) => cls.startsWith(resolution[device])  && TAILWIND.FONT_SIZES.includes(cls.replace(resolution[device], '')) )
        const generic = myClasses?.find((cls) => TAILWIND.FONT_SIZES.includes(cls) )
        const p = particular?.replace(resolution[device],'')
        const r = p || generic || 'text-base'
        return r
    }

    const getDefaultFontFamily = () => selected?.getStyle('font-family') || 'Arial, Helvetica, sans-serif'

    return (
        <Grid container spacing={2} padding={0} paddingTop={2}>
            <Grid item xs={6}>
                <Box justifyContent="center">
                    <Typography variant="body" fontWeight="bold" fontSize={12}>{intl.formatMessage({id:'props.font_family'})}</Typography>
                </Box>
                <Select size="small" defaultValue={getDefaultFontFamily()}>
                    { fontOptions.map((font) => {
                        return (
                            <MenuItem value={font.id}
                                onClick={() => selected.setStyle({'font-family': font.id})}>
                                <span style={{ fontFamily: font.id, color: 'black' }}>
                                    {font.label}
                                </span>
                            </MenuItem>
                        )
                    })}
                </Select>
            </Grid>

            <Grid item xs={6}>
                <Box justifyContent="center">
                    <Typography variant="body" fontWeight="bold" fontSize={12}>{intl.formatMessage({id:'props.font_size'})}</Typography>
                </Box>
                <Select size="small" value={findProp()}
                        renderValue={ (value) => value }
                >
                    { TAILWIND.FONT_SIZES.map((font) => {
                        return (
                            <MenuItem value={font}
                                onClick={() => {
                                    findProp()
                                    cleanup()
                                    selected.addClass(`${resolution[device]}${font}`)
                                }}
                            >
                                <span class={font}>
                                    {font}
                                </span>
                            </MenuItem>
                        )
                    })}
                </Select>

            </Grid>

            <Grid item xs={12}>
                <Box justifyContent="center">
                    <Typography variant="body" fontWeight="bold" fontSize={12}>{intl.formatMessage({id:'props.text_style'})}</Typography>
                </Box>
                <TextStyle editor={editor} selected={selected} intl={intl} />
            </Grid>
                
            <Grid item xs={8}>
                <Box justifyContent="center">
                    <Typography variant="body" fontWeight="bold" fontSize={12}>{intl.formatMessage({id:'props.border_style'})}</Typography>
                </Box>
                <BorderStyle editor={editor} selected={selected} intl={intl} />
            </Grid>

                    
            <Grid item xs={4}>
                <Box justifyContent="center">
                    <Typography variant="body" fontWeight="bold" fontSize={12}>{intl.formatMessage({id:'props.text_properties'})}</Typography>
                </Box>
                <TextProperties editor={editor} selected={selected} intl={intl} />
            </Grid>
        </Grid>
    )
}

export default Text