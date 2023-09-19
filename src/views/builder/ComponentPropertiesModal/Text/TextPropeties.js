import { useRef, useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import Paper from '@mui/material/Paper'
import LinkIcon from '@mui/icons-material/Link'
import AnimationIcon from '@mui/icons-material/Animation'
import LinkModal from 'views/builder/ComponentPropertiesModal/LinkModal'
import AnimationModal from 'views/builder/ComponentPropertiesModal/AnimationModal'

export default function TextProperties({ editor, selected, intl }) {

  const anchorElLink = useRef(null)

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