import { useState, useEffect, useRef } from 'react'
import { Paper, Box, TextField, Fab, InputAdornment, Typography, IconButton, Stack, Tooltip } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import { trackEvent } from 'utils/analytics'
import constants from 'constant'
import { getTemplateBodyContentFromString } from 'utils/template'
import { useIntl } from 'react-intl'

const { ANALYTICS } = constants

let ws

const Chat = ({ editor, principal }) => {
    const intl = useIntl()
    const ref = useRef()
    const [lastMessage, setLastMessage] = useState()
    const [message, setMessage] = useState()
    const [messageList, setMessageList] = useState([])
    const [chatOpen, setChatOpen] = useState(false)
    // const [target, setTarget] = useState(editor?.getSelected())
    const [connected, setConnected] = useState(false)

    const scrollBottom = () => {
        const e = ref
        e.current.scrollTop = e.current.scrollHeight+200
    }

    const toggleChat = () => {
        // Only if premium membership, else show modal from editor
        // if (hasPremiumSubscription(account)) {
            setChatOpen(!chatOpen)
        // }
        // else {
        //     console.debug(`Dispatching premium feature display modal`)
        //     document.dispatchEvent(new CustomEvent(EVENTS.TOGGLE_PREMIUM_MODAL))
        // }
    }

    const initializeSocket = () => {
        if (!ws || ws?.readyState === WebSocket.CLOSED) {
            const connectUrl = `${process.env.REACT_APP_WEBSTUDIO_WS_API}?token=${principal}`
            ws = new WebSocket(connectUrl)
            ws.onopen = () => setConnected(true)
            ws.onclose = () => setConnected(false)
            ws.onmessage = (event) => {
                const received = JSON.parse(event.data)
                console.log(`Received ${event.data}`)
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
        // editor.on('component:toggled', () => setTarget(editor?.getSelected()))
        const reconnect = setInterval(() => initializeSocket(), 10000)
        return () => {
            clearInterval(reconnect)
            ws?.close()
        }
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

    // useEffect(() => {
    //     console.log(`New target selected`)
    //     console.log(target)
    // }, [target])

    const sendMessage = () => {
        setMessage('')
        const payload = { 
            action: "message", 
            text: message, 
            locale: intl.locale,
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

    // const appendToCanvas = (element) => {
    //     if (target) {
    //         // Add before selected item
    //         const collection = target?.collection
    //         const index = target?.index()
    //         const destination = index === 0 ? index : index-1
    //         collection.add(element, {at: destination  })
    //     } else {
    //         // Add top of page
    //         editor.getComponents().add(element, {at: 0  })
    //     }
    // }

    const replaceTemplate = (template) => {           
        console.log(template)                                        
        const body = getTemplateBodyContentFromString(template)
        editor.setComponents(body)  
    }

    // const replaceStyles = (styles) => {
    //     const classNames = getClassesFromSnippet(styles)
    //     const cs = classNames.split(" ");
    //     cs.forEach((c) => {
    //         target.addClass(`.${c}`)
    //     })
    // }

    const placeholderBubble = lastMessage?.self && (
        <Paper  key={9001} elevation={0} className="studio-ai-bubble">
            <div class="typing">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            </div>
        </Paper>
    )

    // const addTooltip = intl.formatMessage({id:'copilot.block_add'})
    // const styleTooltip = intl.formatMessage({id:'copilot.style_replace'})
    const templateTooltip = intl.formatMessage({id:'copilot.template_replace'})
    const intro = intl.formatMessage({id:'copilot.welcome'})

    return (
        <><Box>
    <Paper
            keepmounted="true"
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
                height: 550, 
                width: 450, 
                borderRadius:4
            }}
        >
            <Box sx={{ background: '#0a0a0a', color: 'white', width: '100%', px: 2, py:1 }}>
                <Stack direction="row" alignItems="center">
                    <RateReviewIcon sx={{ mr: 1 }} />
                    <Typography fontWeight="bold" fontSize={14} lineHeight={3}>Studio AI</Typography>
                    <Box flexGrow={1} display />
                    <Box className={connected ? "online-signal" : "offline-signal"}/>
                    <IconButton onClick={toggleChat}>
                        <CloseIcon sx={{color:'white'}} />
                    </IconButton>
                </Stack>
            </Box>
            <Box sx={{ height: 420, mb:1, p: 2, overflowY:'scroll' }} ref={ref} >
                    {connected && (
                        <Paper  key={10000} 
                                elevation={0}
                                className="studio-ai-bubble">
                                    {intro}
                        </Paper>
                    )}
                    {connected && messageList && messageList?.map((m, index) => {
                        
                        if (m.self) {
                            // My message
                            return (
                                <Paper  key={index} 
                                        elevation={0}
                                        className='studio-ai-my-bubble'>
                                        { m.text}
                                </Paper>
                            )
                        } else {
                            // Message by copilot
                            return (
                                <Tooltip title={templateTooltip}>
                                    <Paper  key={index} 
                                            elevation={0}>
                                                <Box style={{ background: 'white' }}>
                                                    <iframe
                                                        title="Preview"
                                                        srcdoc={`
                                                        <html>
                                                            <head>
                                                                </script><script type="text/javascript" src="https://cdn.tailwindcss.com"></script>
                                                            </head>
                                                            <body>
                                                                ${getTemplateBodyContentFromString(m.text)}
                                                            </body>
                                                        </html>
                                                    `} id="viewer-chat" />
                                                    <button fullWidth 
                                                            variant="filled" 
                                                            size="large"
                                                            onClick={() => replaceTemplate(m.text)}
                                                
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        { intl.formatMessage({ id: 'copilot.template_replace' })}
                                                    </button>
                                                </Box>
                                                
                                    </Paper>
                                </Tooltip>
                            )
                        }
                    })}

                    {
                        !connected && (
                            <Box>
                                <Typography fontWeight="bold" fontSize={16}>
                                    {intl.formatMessage({id:'copilot.unavailable'})}
                                </Typography>
                            </Box>
                        )
                    }
                    { placeholderBubble}
            </Box>
            <Box sx={{ px: 1 }}>
                <TextField  fullWidth 
                            placeholder={intl.formatMessage({id:'copilot.type_message'})}
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
                    {intl.formatMessage({id:'copilot'})}
                    <Box className={connected ? "online-signal" : "offline-signal"}/>
                </Fab>
            </Box></>
    )
}

export default Chat
