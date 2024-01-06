import {
    Box,
    Typography,
    Select,
    MenuItem,
    Container,
    Avatar,
    Stack
} from '@mui/material'
import { FormattedMessage } from 'react-intl'
import constants from 'constant'

const { PAGE_OPTIONS } = constants

const PageTypes = ({ onTypeChange, defaultType }) => {

    const getMenuItem = (item) => (
        <MenuItem value={item.label}>
            <Container>
                <Stack direction="row" spacing={2}>
                    <Box>
                        <Avatar src={item.image} sx={{ width: '80px', height: 'auto' }}/>
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <Typography variant="body" color="#222" fontWeight="bolder" whiteSpace="normal">
                            <FormattedMessage id={`page_manager.type_${item.label}`} />
                        </Typography>
                        <Typography whiteSpace="normal" paddingTop={1} color="#555" fontSize={12}>
                            <FormattedMessage id={`page_manager.type_${item.label}_description`} />
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </MenuItem>
    )

    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={defaultType}
            size="small"
            renderValue={(selected) => {
                const item = PAGE_OPTIONS.find((option) => option.label === selected)
                return (
                    <Stack direction="horizontal" mr={1}>
                        <Avatar src={item.image} sx={{ width: '20px', height: 'auto', mr: 1 }}/>
                        <FormattedMessage id={`page_manager.type_${item.label}`} />
                    </Stack>
                )
            }}
            onChange={(e) => onTypeChange(e.target.value)}
        >
            {
                PAGE_OPTIONS.map((item) => getMenuItem(item))
            }
        </Select>

    )
}

export default PageTypes
