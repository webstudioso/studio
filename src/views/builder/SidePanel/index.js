import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import draganddrop from "assets/images/draganddrop.jpg";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    ButtonBase,
    Drawer,
    Box,
    Fab,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Stack,
    Switch,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { IconChecks, IconSettings, IconPlus } from '@tabler/icons';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MENU_TYPE, PRESET_COLORS, SET_BORDER_RADIUS, SET_FONT_FAMILY, SET_OUTLINED_FILLED, THEME_RTL } from 'store/actions';
import { gridSpacing } from 'store/constant';

// color import
import colors from 'assets/scss/_themes-vars.module.scss';
import themeStyle from 'assets/scss/_theme.module.scss';
import InfoButton from '../InfoButton';

import constants from 'constant'
import Blocks from './Blocks';
import Pages from './Pages';
import Templates from '../../templates/List';
import Settings from './Settings';
import Media from "./Media";
const { SIDEPANEL, SECTION } = constants
const { TITLE } = SIDEPANEL

// concat 'px'
function valueText(value) {
    return `${value}px`;
}

const PresetColor = ({ color, presetColor, setPresetColor }) => (
    <Grid item>
        <ButtonBase sx={{ borderRadius: '12px' }} onClick={() => setPresetColor(color.id)}>
            <Avatar
                variant="rounded"
                color="inherit"
                sx={{
                    background: `linear-gradient(135deg, ${color.primary} 50%, ${color.secondary} 50%)`,
                    opacity: presetColor === color.id ? 0.6 : 1
                }}
            >
                {presetColor === color.id && <IconChecks color="#fff" />}
            </Avatar>
        </ButtonBase>
    </Grid>
);

PresetColor.propTypes = {
    color: PropTypes.shape({
        id: PropTypes.string,
        primary: PropTypes.string,
        secondary: PropTypes.string
    }),
    presetColor: PropTypes.string,
    setPresetColor: PropTypes.func
};

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const SidePanel = ({ open, onLeave, principal, projectId }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const [editor, setEditor] = useState();
    const [blockManager, setBlockManager] = useState();
    const [blocks, setBlocks] = useState();
    const ref = useRef(null);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState();

    // console.log("SidepNale")
    // console.log(window.editor);
    // console.log(editor);

    useEffect(() => {
        // Load data from window.editor
        if (!window.editor) return;
        setEditor(window.editor)

        // Render all blocks (inside the global collection)
        // blockManager.render();
        console.log(window.editor);
        


    }, [window.editor])

    // drawer on/off
    // const [open, setOpen] = useState(false);
    const handleToggle = () => {
        console.log("toggling")
        // setOpen(!open);
        setTimeout(()=>{
            



            //cats

            const cats = window?.editor?.Blocks?.getCategories().models.map((cat) => cat.attributes);
            console.log(cats);
            setCategories(cats)
        },500)
        
    };

    useEffect(() => {
            handleToggle()
    }, [open])

    useEffect(() => {
        if (!filter) return;
        const editor = window.editor;
        const blockManager = editor.Blocks;
        // Render new set of blocks
        const blocks = blockManager.getAll();
        console.log(blocks);
        console.log(filter);
        const filtered = blocks.filter(block => {
            const cat = block.get('category')
            console.log(cat.id)
            return cat.id == filter
        })

        // blockManager.render(filtered);
        // Or a new set from an array
        // blockManager.render([
        // {label: 'Label text', content: '<div>Content</div>'}
        // ]);

        // Back to blocks from the global collection
        // blockManager.render();

        // You can also render your blocks outside of the main block container
        const newBlocksEl = blockManager.render(filtered, {ignoreCategories:true});
        console.log(newBlocksEl);
        const blockco = document.getElementById('myBlocks');
        // console.log(blockco);
        ref.current.appendChild(newBlocksEl);
        console.log(ref);
        setBlocks(blockco)
        console.log(ref)


        // When dragging of a block starts, hide side panel
        editor.on('block:drag', () => dismiss())
    }, [filter])

    useEffect(() => {
        // 👇️ call method in useEffect hook
        // const el = document.getElementById('myBlocks');
        // console.log(el);
        document.addEventListener('addCloseDelay', () => setDelay(true));
        return () => {
			document.removeEventListener('addCloseDelay', () => {});
        }
      }, []);

    // state - layout type
    const [navType, setNavType] = useState(customization.navType);
    useEffect(() => {
        dispatch({ type: MENU_TYPE, navType });
    }, [dispatch, navType]);

    // state - preset color
    const [presetColor, setPresetColor] = useState(customization.presetColor);
    useEffect(() => {
        dispatch({ type: PRESET_COLORS, presetColor });
    }, [dispatch, presetColor]);

    // state - border radius
    const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
    const handleBorderRadius = (event, newValue) => {
        setBorderRadius(newValue);
    };

    useEffect(() => {
        dispatch({ type: SET_BORDER_RADIUS, borderRadius });
    }, [dispatch, borderRadius]);

    // state - filled with outline textfield
    const [outlinedFilled, setOutlinedFilled] = useState(customization.outlinedFilled);
    const handleOutlinedFilled = (event) => {
        setOutlinedFilled(event.target.checked);
    };

    useEffect(() => {
        dispatch({ type: SET_OUTLINED_FILLED, outlinedFilled });
    }, [dispatch, outlinedFilled]);

    // state - RTL layout
    const [rtlLayout, setRtlLayout] = useState(customization.rtlLayout);
    const handleRtlLayout = (event) => {
        setRtlLayout(event.target.checked);
    };

    if (customization.rtlLayout) {
        document?.querySelector('html')?.setAttribute('dir', 'rtl');
    } else {
        document?.querySelector('html')?.removeAttribute('dir');
    }

    useEffect(() => {
        dispatch({ type: THEME_RTL, rtlLayout });
    }, [dispatch, rtlLayout]);

    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    // state - font family
    const [fontFamily, setFontFamily] = useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);

    const colorOptions = [
        {
            id: 'default',
            primary: theme.palette.mode === 'dark' ? colors.darkPrimaryMain : colors.primaryMain,
            secondary: theme.palette.mode === 'dark' ? colors.darkSecondaryMain : colors.secondaryMain
        },
        {
            id: 'theme',
            primary: theme.palette.mode === 'dark' ? themeStyle.darkPrimaryMain : themeStyle.primaryMain,
            secondary: theme.palette.mode === 'dark' ? themeStyle.darkSecondaryMain : themeStyle.secondaryMain
        }
    ];

    const catList = categories?.map((cat) => 
        <Grid   id={cat.id} 
                item 
                sx={{ 
                    p: '5px 10px', 
                    m: '0px 10px',
                    cursor: 'pointer',
                    borderRadius: '50px',
                    background: filter === cat.id ? '#E8E8FF' : 'transparent'
                }} 
                onMouseEnter={(e) => {
                    setFilter(cat.id);
                }}
        >
            <Typography fontWeight="normal" color={
                filter === cat.id ? '#3F41A4' : 'black'
            } fontSize={12}>{cat.label}</Typography>
        </Grid> 
    )

    const isLoading = useSelector((state) => state.loader.show);

    const onClose = () => {
        window?.editor?.AssetManager?.close();
        console.log("close?")
        setFilter()
        onLeave()
    }

    const [delay, setDelay] = useState(false)

    const dismiss = () => {            
        // Do we have an action delaying closure?
        console.log(delay)
        if (delay) {
            setTimeout(() => {
                
                setDelay(false)
                // onClose()
            }, 2000)
        } else {
            onClose()
        }
    }

    return (
        <>
            {/* toggle button */}
            {/* <Tooltip title="Add new Blocks to the canvas">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    // variant="circular"
                    color="primary"
                    sx={{
                        borderRadius: 0,
                        // borderTopLeftRadius: '50%',
                        // borderBottomLeftRadius: '50%',
                        // borderTopRightRadius: '25px',
                        // borderBottomRightRadius: '25px',
                        top: '30%',
                        position: 'fixed',
                        left: 0,
                        zIndex: theme.zIndex.speedDial,
                        boxShadow: theme.customShadows.secondary
                    }}
                >
                    <IconButton color="inherit" size="large">
                            <IconPlus />
                        </IconButton>
  
                </Fab>
            </Tooltip> */}

            <Drawer
                anchor="left"
                onClose={handleToggle}
                open={open}
                hideBackdrop={true}
                elevation={0}
                onMouseLeave={dismiss}
                PaperProps={{
                    sx: {
                        width: open === SECTION.TEMPLATE ? 650 : 450,
                        ml: '60px',
                        mt: '56px',
                        boxShadow: '15px 15px 15px 0px rgba(0,0,0,0.15)',
                        border: '1px solid #dfe5eb',
                        zIndex: 10
                    }
                }}
            >
                <Grid container direction="column" >
                    <Grid item>
                        <Stack
                            direction="row"
                            justifyContent="left"
                            alignItems="left"
                            spacing={1}
                            fullWidth
                            sx={{
                                borderTop: '5px solid #6366F1',
                            }}
                        >
                            <Box sx={{ minWidth: 120, m: '15px' }}>
                                <Typography variant="h4" color="black" fontWeight="bolder">
                                    {TITLE[open]}
                                    <InfoButton section={open} />
                                </Typography>
                            </Box>
                            {/* <Box sx={{ m: '10px', p: '5px' }}>
                                <Typography color="#666">Select a component 👇  and drag it to the canvas 👉</Typography>
                            </Box> */}
                        </Stack>
                    </Grid>
                    <Grid item>
                        {open === SECTION.BLOCKS && (<Blocks onLeave={onLeave} />)}
                        {open === SECTION.PAGES && (<Pages onLeave={onLeave} />)}
                        {open === SECTION.TEMPLATE && (<Templates onLeave={onLeave} />)}
                        {open === SECTION.SETTINGS && (<Settings onLeave={onLeave} principal={principal} projectId={projectId} />)}
                        {open === SECTION.MEDIA && (<Media onLeave={onLeave} />)}
                    </Grid>
                </Grid>
            </Drawer>
        </>
    );
};

export default SidePanel;
