import { useRef, useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import PaddingIcon from '@mui/icons-material/Padding';
import RoundedCornerOutlinedIcon from '@mui/icons-material/RoundedCornerOutlined';
import Paper from '@mui/material/Paper'
import Color from 'views/builder/ComponentPropertiesModal/ColorModal'
import BorderWidthModal from './WidthModal';
import PaddingModal from './PaddingModal';
import RadiusModal from './RadiusModal';


export default function BorderStyle({ editor, selected, intl }) {

  const anchorEl = useRef(null)

  const [isBorderOpen, setBorderOpen] = useState(false)
  const toggleBorderPicker = () => {
    setBorderOpen(!isBorderOpen)
  }

  const [isBorderColorOpen, setBorderColorOpen] = useState(false)
  const toggleBorderColorPicker = () => {
    setBorderColorOpen(!isBorderColorOpen)
  }

  const [isPaddingOpen, setPaddingOpen] = useState(false)
  const togglePaddingPicker = () => {
    setPaddingOpen(!isPaddingOpen)
  }

  const [isRadiusOpen, setRadiusOpen] = useState(false)
  const toggleRadiusPicker = () => {
    setRadiusOpen(!isRadiusOpen)
  }

  return (
    <div>
      <Paper elevation={0} sx={{ display: 'flex', flexWrap: 'wrap' }}>

          {/* Border Width */}
          <Tooltip title={intl.formatMessage({id:'props.border_width'})}>
            <Button size="small" sx={{ minWidth: '44px'}} onClick={toggleBorderPicker}>          
              <LineWeightIcon sx={{ fill: 'rgba(0,0,0,0.5)' }} ref={anchorEl}/>
            </Button>
          </Tooltip>

          <BorderWidthModal   editor={editor} 
                              selected={selected} 
                              anchorEl={anchorEl?.current} 
                              open={isBorderOpen} 
                              onClose={toggleBorderPicker}
            />

          {/* BG Color */}
          <Tooltip title={intl.formatMessage({id:'props.bg_color'})}>
            <Button size="small" sx={{ minWidth: '44px'}} onClick={toggleBorderColorPicker}>          
              <BorderColorIcon sx={{ fill: 'rgba(0,0,0,0.5)' }} ref={anchorEl}/>
            </Button>
          </Tooltip>

          <Color    editor={editor} 
                    selected={selected} 
                    anchorEl={anchorEl?.current} 
                    open={isBorderColorOpen} 
                    onClose={toggleBorderColorPicker}
                    prefix="border-"
            />

          {/* Padding */}
          <Tooltip title={intl.formatMessage({id:'props.padding'})}>
            <Button size="small" sx={{ minWidth: '44px'}} onClick={togglePaddingPicker}>          
              <PaddingIcon sx={{ fill: 'rgba(0,0,0,0.5)' }} ref={anchorEl}/>
            </Button>
          </Tooltip>

          <PaddingModal   editor={editor} 
                          selected={selected} 
                          anchorEl={anchorEl?.current} 
                          open={isPaddingOpen} 
                          onClose={togglePaddingPicker}
            />

          {/* Border Radius */}
          <Tooltip title={intl.formatMessage({id:'props.radius'})}>
            <Button size="small" sx={{ minWidth: '44px'}} onClick={toggleRadiusPicker}>          
              <RoundedCornerOutlinedIcon sx={{ fill: 'rgba(0,0,0,0.5)' }} ref={anchorEl}/>
            </Button>
          </Tooltip>

          <RadiusModal    editor={editor} 
                          selected={selected} 
                          anchorEl={anchorEl?.current} 
                          open={isRadiusOpen} 
                          onClose={toggleRadiusPicker}
            />

      </Paper>


    </div>
  );
}