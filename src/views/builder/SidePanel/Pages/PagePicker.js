import {
    Box,
    Typography,
    Select,
    MenuItem,
} from '@mui/material'
import { useIntl } from 'react-intl'
import { getName } from 'utils/pages'

const PagePicker = ({ editor, pages=[], setSelectedPage, selectedPage }) => {
    const intl = useIntl()
  
    const getPageOptions = () => {
        const items = pages.map((page) => {
            return (
                <MenuItem value={page.id}>
                    {getName(page)}
                </MenuItem>
            )
        })
        return items.concat(
            <MenuItem value={-1}>
                <Typography color="primary">
                    {intl.formatMessage({ id: 'page_manager.new_page' })}
                </Typography>
            </MenuItem>
        )
    }

    const handlePageChange = (e) => { 
        const targetPage = pages.find((page) => page.id === e.target.value)
        const pageManager = editor.Pages
        setSelectedPage(targetPage)   
        // Auto switch to page if exists
        if (targetPage)
            pageManager.select(targetPage.id)
    }

    return (
        <Box sx={{ position:'absolute', right:20, top: 15}}>
            <Select
                value={selectedPage?.id || -1}
                size="small"
                variant="standard"
                onChange={handlePageChange}
            >
                { getPageOptions() }
            </Select>
        </Box>
    )
}

export default PagePicker
