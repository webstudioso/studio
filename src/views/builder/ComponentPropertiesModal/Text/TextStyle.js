import { useRef, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Paper from '@mui/material/Paper'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import constants from 'constant'
import Color from 'views/builder/ComponentPropertiesModal/ColorModal'
import ShadowModal from 'views/builder/ComponentPropertiesModal/ShadowModal'

const { TAILWIND, EVENTS } = constants

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

export default function TextStyle({ editor, selected, intl }) {

  const anchorEl = useRef(null)
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

  const [isShadowModalOpen, setShadowModalOpen] = useState(false)
  const toggleShadowModal = () => {
    setShadowModalOpen(!isShadowModalOpen)
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

      </Paper>

      <Paper elevation={0} sx={{ display: 'flex', flexWrap: 'wrap' }}>


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

          {/* BG Image */}
          <Button size="small" sx={{ minWidth: '44px'}} onClick={() => {
            document.dispatchEvent(new CustomEvent(EVENTS.TOGGLE_ASSETS_MODAL))
          }}>          
            <ImageOutlinedIcon sx={{ fill: 'rgba(0,0,0,0.5)' }} ref={anchorEl}/>
          </Button>

          {/* Shadow */}
          <Button size="small" sx={{ minWidth: '44px'}} onClick={toggleShadowModal}>          
            <ContrastOutlinedIcon sx={{ fill: 'rgba(0,0,0,0.5)' }} ref={anchorEl}/>
          </Button>

          <ShadowModal  editor={editor} 
                        selected={selected} 
                        anchorEl={anchorEl?.current} 
                        open={isShadowModalOpen} 
                        onClose={toggleShadowModal}
            />

      </Paper>


    </div>
  );
}