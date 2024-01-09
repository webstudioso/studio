import { Grid, TextField, Button, Typography, IconButton, Tooltip, Stack, Avatar, Box } from "@mui/material"
import { IconCode, IconExternalLink, IconSettings } from "@tabler/icons"
import { getContractsInMetadata } from "utils/pages"

const explorerUrl = "https://mumbai.polygonscan.com/address/"
const SmartContracts = ({ project }) => {

    const { metadata } = project

    const formatContactName = (contract) => {
        return contract?.replace('webstudio:','')
                       ?.replace('_contract','')
    }

    return (
        <Box>
            { getContractsInMetadata(metadata)?.map((item) => {
                console.log(item)
                return (
                    <Grid container sx={{ border: '1px solid rgba(0,0,0,0.05)', padding: 1, my:1  }}>
                        <Grid item  xs={12}
                                    sx={{ cursor: 'pointer' }}
                                    p={1} 
                                    onClick={() => window.open(`${explorerUrl}/${item.value}`, '__contractAddress') }
                        >
                            <Stack direction="horizontal">
                                <Avatar src={'https://mumbai.polygonscan.com/assets/poly/images/svg/logos/token-light.svg?v=23.12.4.0'} />
                                <Box marginLeft={1}>
                                    <Typography color="black" sx={{
                                        textTransform: 'capitalize'
                                    }}>
                                        {formatContactName(item.key)}
                                    </Typography>
                                    <Typography>{item.value}</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                )
            })}
        </Box>
    )
}

export default SmartContracts