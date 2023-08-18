import { useRef, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Tooltip } from '@mui/material'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import Paper from '@mui/material/Paper'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import LinkIcon from '@mui/icons-material/Link'
import AnimationIcon from '@mui/icons-material/Animation'
import constants from 'constant'
import LinkModal from 'views/builder/ComponentPropertiesModal/LinkModal'
import Color from 'views/builder/ComponentPropertiesModal/ColorModal'
import AnimationModal from 'views/builder/ComponentPropertiesModal/AnimationModal'

const { TAILWIND } = constants

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function Style({ editor, selected, intl }) {

  const anchorEl = useRef(null)
  const anchorElLink = useRef(null)
  const [currentClasses, setCurrentClasses] = useState([])

  useEffect(() => {
    setCurrentClasses(selected.getClasses())
    // eslint-disable-next-line
  }, [])
 
  const handleChange = (list, newItem) => {
      selected.removeClass(list)
      if (newItem) {
        selected.addClass(newItem)
      }
      setCurrentClasses(selected.getClasses())
  }

  const getAlignment = () => {
    const foundAlignments = currentClasses.filter((cls) => TAILWIND.TEXT_ALIGNMENT.includes(cls))
    return foundAlignments?.length > 0 ? foundAlignments[0] : ''
  }

  const getFormats = () => {
    const foundFormats = currentClasses.filter((cls) => TAILWIND.TEXT_FORMATS.includes(cls))
    return foundFormats.flat()
  }

  const [isFontColorOpen, setFontColorOpen] = useState(false)
  const toggleFontColorPicker = () => {
    setFontColorOpen(!isFontColorOpen)
  }

  const [isBgColorOpen, setBgColorOpen] = useState(false)
  const toggleBgColorPicker = () => {
    setBgColorOpen(!isBgColorOpen)
  }

  const [linkOpen, setLinkOpen] = useState(false)
  const toggleLink = () => {
    setLinkOpen(!linkOpen)
  }

  const [animationOpen, setAnimationOpen] = useState(false)
  const toggleAnimation = () => {
    setAnimationOpen(!animationOpen)
  }

  return (
    <div>
      <Paper elevation={0} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <StyledToggleButtonGroup
            size="small"
            value={getAlignment()}
            exclusive
            onChange={(e, value) => handleChange(TAILWIND.TEXT_ALIGNMENT, value)}
            aria-label="text alignment"
          >
            <ToggleButton value="text-left" aria-label="left aligned">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="text-center" aria-label="centered">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="text-right" aria-label="right aligned">
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="text-justify" aria-label="justified">
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>

          <StyledToggleButtonGroup
            size="small"
            value={getFormats()}
            onChange={(e, value) => handleChange(TAILWIND.TEXT_FORMATS, value)}
            aria-label="text formatting"
          >
            <ToggleButton value="font-bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underline" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>

          </StyledToggleButtonGroup>

          {/* Text Color */}
          <Button size="small" sx={{ minWidth: '44px'}} onClick={toggleFontColorPicker}>
            <FormatColorTextIcon sx={{ fill: 'rgba(0,0,0,0.5)' }} ref={anchorEl}/>
          </Button>
          <Color  editor={editor} 
                  selected={selected} 
                  anchorEl={anchorEl?.current} 
                  open={isFontColorOpen} 
                  onClose={toggleFontColorPicker}
                  prefix="text-"
          />

          {/* BG Color */}
          <Button size="small" sx={{ minWidth: '44px'}} onClick={toggleBgColorPicker}>          
            <FormatColorFillIcon sx={{ fill: 'rgba(0,0,0,0.5)' }} ref={anchorEl}/>
          </Button>

          <Color  editor={editor} 
                    selected={selected} 
                    anchorEl={anchorEl?.current} 
                    open={isBgColorOpen} 
                    onClose={toggleBgColorPicker}
                    prefix="bg-"
            />


          {/* Links */}
          <Button size="small" className="propButton" onClick={toggleLink}>
              <Tooltip title={intl.formatMessage({ id: 'props.link_title' })} >
                  <LinkIcon className="propIcon" ref={anchorElLink}/>
              </Tooltip>
          </Button>

          <LinkModal 
              editor={editor} 
              selected={selected} 
              anchorEl={anchorElLink?.current} 
              open={linkOpen} 
              onClose={toggleLink}
              intl={intl}
          />

          {/* Animations */}
          <Button size="small" className="propButton" onClick={toggleAnimation}>
              <Tooltip title={intl.formatMessage({ id: 'props.animations_title' })} >
                  <AnimationIcon className="propIcon" ref={anchorElLink}/>
              </Tooltip>
          </Button>

          <AnimationModal
              selected={selected} 
              anchorEl={anchorElLink?.current} 
              open={animationOpen} 
              onClose={toggleAnimation}
              intl={intl}
          />
      </Paper>
    </div>
  );
}