import { useState, useEffect, useRef } from 'react'
import { Paper, Box, TextField, Fab, InputAdornment, Typography, IconButton, Stack, Tooltip } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { trackEvent } from 'utils/analytics'
import constants from 'constant'

const { ANALYTICS } = constants

let ws

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
                const json = event.data
                setLastMessage({
                    self: false,
                    data: json
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
        const thisMessage = {
            self: true,
            data: message
        }
        setLastMessage(thisMessage)
        const payload = { action: "message", data: message }
        ws.send(JSON.stringify(payload))
        trackEvent({ name: ANALYTICS.AI_PROMPT, params: { message } })
    }

    const keyPress = (e) => {
        if(e.keyCode === 13){
            sendMessage()
        }
    }

    const applyStyles = (classNames) => {
        classNames.forEach((c) => {
            target.addClass(`.${c}`)
        })
    }

    const addTooltip = 'Select a component in the canvas and click on this code to apply it'
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
                

                    {connected && messageList && messageList?.map((m, index) => {
                        return (
                            <Paper  key={index} 
                                    elevation={0} 
                                    sx={{ 
                                        p:2,  
                                        my:1, 
                                        borderRadius: m.self ? '24px 24px 24px 0px' : '24px 24px 0px 24px', 
                                        background: m.self ? '#E6E7EC' : '#0085FF' , 
                                        color: m.self ? '#555' : 'white', 
                                        fontWeight:'bold',
                                        fontSize:12,
                                        mr: m.self ? 2 : 0,
                                        ml: m.self ? 0 : 2
                            }}>
                                <ReactMarkdown  rehypePlugins={[rehypeRaw]} children={m.data}
                                    components={{
                                        code({node, inline, className, children, ...props}) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                            {...props}
                                            children={String(children).replace(/\n$/, '')}
                                            style={dark}
                                            language={match[1]}
                                            PreTag="div"
                                            />
                                        ) : (
                                            <Tooltip title={addTooltip}>
                                                <code {...props} className={className} 
                                                    style={{ 
                                                        color: 'yellow', 
                                                        cursor: 'pointer',
                                                    }} 
                                                    onClick={() => applyStyles(children)}>
                                                {children}
                                                </code>
                                            </Tooltip>
                                        )
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
