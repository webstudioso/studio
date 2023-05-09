import { useState, useEffect, useRef } from 'react'
import { Paper, Box, TextField, Fab, InputAdornment, Typography, IconButton, Stack, Tooltip, Button } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import { trackEvent } from 'utils/analytics'
import constants from 'constant'
import { getTemplateBodyContentFromString, getClassesFromSnippet, isHTMLComponent, isHTMLSegment, isHTMLTemplate } from 'utils/template'

const { ANALYTICS } = constants

let ws
const actionStyle = "text-black bg-white rounded-full text-xs px-2 py-1 mr-1 my-2"

const Chat = ({ editor }) => {
    const ref = useRef()
    const [lastMessage, setLastMessage] = useState()
    const [message, setMessage] = useState()
    const [messageList, setMessageList] = useState([])
    const [chatOpen, setChatOpen] = useState(false)
    const [target, setTarget] = useState(editor?.getSelected())
    const [connected, setConnected] = useState(false)

    const scrollBottom = () => {
        const e = ref
        e.current.scrollTop = e.current.scrollHeight+200
    }

    const toggleChat = () => {
        setChatOpen(!chatOpen)
    }

    const initializeSocket = () => {
        if (!ws || ws?.readyState === WebSocket.CLOSED) {
            ws = new WebSocket(process.env.REACT_APP_WEBSTUDIO_WS_API);
            console.log("connected to ",process.env.REACT_APP_WEBSTUDIO_WS_API)
            ws.onopen = () => setConnected(true)
            ws.onclose = () => setConnected(false)
            ws.onmessage = (event) => {
                const received = JSON.parse(event.data)
                if (received.text)
                    setLastMessage({
                        self: false,
                        ...received
                    })
            }

        }

    }

    useEffect(() => {
        initializeSocket()
        editor.on('component:toggled', () => setTarget(editor?.getSelected()))
        const reconnect = setInterval(() => initializeSocket(), 10000)
        return () => clearInterval(reconnect)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (lastMessage) {
            setMessageList([
                ...messageList,
                lastMessage
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage])

    useEffect(() => {
        scrollBottom()
    }, [messageList])


    const sendMessage = () => {
        setMessage('')
        const payload = { 
            action: "message", 
            text: message, 
            parentMessageId: lastMessage?.parentMessageId
        }
        ws.send(JSON.stringify(payload))
        const thisMessage = {
            self: true,
            text: message
        }
        setLastMessage(thisMessage)
        trackEvent({ name: ANALYTICS.AI_PROMPT, params: { message } })
    }

    const keyPress = (e) => {
        if(e.keyCode === 13){
            sendMessage()
        }
    }

    const appendToCanvas = (element) => {
        if (target) {
            // Add before selected item
            const collection = target?.collection
            const index = target?.index()
            const destination = index === 0 ? index : index-1
            collection.add(element, {at: destination  })
        } else {
            // Add top of page
            editor.getComponents().add(element, {at: 0  })
        }
    }

    const replaceTemplate = (template) => {                                                   
        const body = getTemplateBodyContentFromString(template)
        editor.setComponents(body)  
    }

    const replaceStyles = (styles) => {
        const classNames = getClassesFromSnippet(styles)
        const cs = classNames.split(" ");
        cs.forEach((c) => {
            target.addClass(`.${c}`)
        })
    }

    const placeholderBubble = lastMessage?.self && (
        <Paper  key={9001} elevation={0} className="studio-ai-bubble">
            <div class="typing">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            </div>
        </Paper>
    )

    const addTooltip = 'Adds this element before the currently selected element in the canvas'
    const styleTooltip = 'Paste only styles to the currently selected element in the canvas'
    const templateTooltip = 'Completely replace existing page with this new template'
    const intro = (
        <div>
            <h3><strong>Hi, I'm Studio AI, your project assistant! Ask me anything:</strong></h3>
            <br/><br/>
            <i>"Create a template inspired in twitter with multiple sections"</i><br/><br/>
            <i>"Create a new section to display 6 features with images, text and description"</i><br/><br/>
            <i>"Make a gradient of 4 purple colors that look bright"</i><br/><br/><br/>
        </div>
    )

    return (
        <><Box>
    <Paper
            open={toggleChat}
            keepMounted
            elevation={5}
            onClose={() => {}}
            aria-describedby="alert-dialog-slide-description"
            sx={{
                overflow: 'hidden',
                display: chatOpen ? 'block' : 'none',
                position: 'fixed', 
                bottom: 15, 
                right: 15, 
                zIndex: 1202, 
                height: 450, 
                width: 300, 
                borderRadius:4
            }}
        >
            <Box sx={{ background: '#0a0a0a', color: 'white', width: '100%', px: 2, py:1 }}>
                <Stack direction="horizontal" alignItems="center">
                    <RateReviewIcon sx={{ mr: 1 }} />
                    <Typography fontWeight="bold" fontSize={14} lineHeight={3}>Studio AI</Typography>
                    <Box flexGrow={1} display />
                    <Box className={connected ? "online-signal" : "offline-signal"}/>
                    <IconButton onClick={toggleChat}>
                        <CloseIcon sx={{color:'white'}} />
                    </IconButton>
                </Stack>
            </Box>
            <Box sx={{ height: 320, mb:1, p: 2, overflowY:'scroll' }} ref={ref} >
                    <Paper  key={10000} 
                            elevation={0}
                            className="studio-ai-bubble">
                                {intro}
                    </Paper>
                    {connected && messageList && messageList?.map((m, index) => {
                        return (
                            <Paper  key={index} 
                                    elevation={0}
                                    className={ m.self ? 'studio-ai-my-bubble' : 'studio-ai-bubble'}>
                                <ReactMarkdown  rehypePlugins={[rehypeRaw]} children={m.text}
                                    components={{
                                        code({node, inline, className, children, ...props}) {
                                            
                                            return isHTMLTemplate(children) ?
                                                (
                                                    <Tooltip title={templateTooltip}>
                                                        <Button color="secondary" 
                                                                variant="contained" 
                                                                onClick={() => replaceTemplate(children)}
                                                                size="small"
                                                                className={actionStyle}>
                                                            Replace Template
                                                        </Button>
                                                    </Tooltip>
                                                ) :
                                                    isHTMLSegment(children) ?
                                                (
                                                    <Tooltip title={addTooltip}>
                                                        <Button color="secondary" 
                                                                variant="contained" 
                                                                onClick={() => appendToCanvas(children[0])}
                                                                size="small"
                                                                className={actionStyle}>
                                                            Add to Canvas
                                                        </Button>
                                                    </Tooltip>
                                                ) :
                                                    isHTMLComponent(children) ?
                                                (
                                                    <div>
                                                        <Tooltip title={addTooltip}>
                                                            <Button color="secondary" 
                                                                    variant="contained" 
                                                                    onClick={() => appendToCanvas(children[0])}
                                                                    size="small"
                                                                    className={actionStyle}>
                                                                Add to Canvas
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title={styleTooltip}>
                                                            <Button color="secondary" 
                                                                    variant="contained" 
                                                                    disabled={!target}
                                                                    onClick={() => replaceStyles(children)}
                                                                    size="small"
                                                                    className={actionStyle}>
                                                                Paste Styles
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                ) : 
                                                "Not supported"
                                        }
                                    }}
                                ></ReactMarkdown>
                            </Paper>
                        )
                    })}

                    {
                        !connected && (
                            <Box>
                                <Typography fontWeight="bold" fontSize={16}>
                                    The Studio AI is currenly unavailable, when it comes back we will automatically reconnect
                                </Typography>
                            </Box>
                        )
                    }
                    { placeholderBubble}
            </Box>
            <Box sx={{ px: 1 }}>
                <TextField  fullWidth 
                            placeholder="Type your message..." 
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            autoComplete='off'
                            onKeyDown={keyPress}
                            inputProps={{ 
                                style: { color: "black", fontSize: 14 },
                                sx: {
                                    '&::placeholder': {
                                        fontSize: 14,
                                    color: '#666',
                                    opacity: 1, // otherwise firefox shows a lighter color
                                    },
                                }, 
                            }}
                            InputLabelProps={{
                                style: { color: 'black', fontSize: 14 }, 
                            }}
                            InputProps={{
                                sx: {
                                    "& input": {
                                        color: 'black'
                                    }
                                },
                                endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={sendMessage}
                                    edge="end"
                                    color="primary"
                                >
                                    <SendIcon />
                                </IconButton>
                                </InputAdornment>)
                            }}
                />
            </Box>
        </Paper>
        </Box><Box sx={{ position: 'fixed', bottom: 15, right: 15, zIndex: 1201 }}>
                <Fab variant="extended" color="primary" size="large" aria-label="assistant" onClick={toggleChat}>
                    <RateReviewIcon sx={{ mr: 1 }} />
                    Studio AI
                    <Box className={connected ? "online-signal" : "offline-signal"}/>
                </Fab>
            </Box></>
    )
}

export default Chat
