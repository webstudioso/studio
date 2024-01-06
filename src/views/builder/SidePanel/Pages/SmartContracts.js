import { Grid, TextField, Button, Typography, IconButton, Tooltip, Stack, Avatar, Box } from "@mui/material"
import { IconCode, IconExternalLink, IconSettings } from "@tabler/icons"
import { getContractsInMetadata } from "utils/pages"

const contractAddress = "0xbef7dc0ee85b06718bf8aabc59815546588eb293"

const explorerUrl = "https://mumbai.polygonscan.com/address/"
const SmartContracts = ({ project }) => {
    console.log(project.metadata)

    const { metadata } = project
    const blogContract = metadata['webstudio:blog_contract']

    return (
        <Box>
            { getContractsInMetadata(metadata).map((item) => {
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
                                    <Typography color="black">{item.key}</Typography>
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