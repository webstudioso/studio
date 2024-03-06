/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@mui/material'
import { getCachedChangelogMatchValue, getChangelog, setChangelogMatchValue } from 'api/changelog'
import ReactMarkdown from 'react-markdown'

const Changelog = ({ intl }) => {
    const [markdown, setMarkdown] = useState()
    const [isOpen, setOpen] = useState(false)

    const loadMarkdown = async() => {
        const changelog = await getChangelog(intl.locale)
        const existingLog = getCachedChangelogMatchValue()
        if (changelog.changelogMatchValue !== existingLog) {
            setMarkdown(changelog.changelogText)
            setOpen(true)
        }
    }

    const aknowledge = () => {
        setChangelogMatchValue(markdown)
        setOpen(false)
    }

    useEffect(() => {
        loadMarkdown()
    }, [])

    return (
        <Dialog
            id="changelog-dialog"
            open={isOpen}
            onClose={() => { setOpen(false) }}
        >
            <Box sx={{ p: 2 }}>
                <DialogTitle>
                    { intl.formatMessage({id:'changelog.title'}) }
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ maxHeight: '50vh', overflowY: 'scroll' }}>
                        <DialogContentText>
                            <ReactMarkdown className='changelog' children={markdown} />
                        </DialogContentText>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 5, pb: 2 }}>
                    <Button variant="outlined" color="secondary" onClick={aknowledge} autoFocus>
                        { intl.formatMessage({id:'changelog.close'}) }
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default Changelog
