import { useState, useEffect, useRef } from 'react'
// material-ui
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    IconButton
} from '@mui/material'
import { gridSpacing } from 'store/constant'
import { IconTrash } from '@tabler/icons'
import { getProjectUrl } from 'utils/project'
import { truncate } from 'utils/format'

const Pages = ({ editor, project }) => {
    const ref = useRef(null);
    const [pages, setPages] = useState([])
    const [selectedPage, setSelectedPage] = useState()

    const loadPages = () => {
        const pageManager = editor.Pages;
        const allPages = pageManager.getAll();
        setPages(allPages);
        const selected = pageManager.getSelected();
        setName(getName(selected))
        setSelectedPage(selected);
    }

    const getHomePage = () => {
        const pageManager = editor.Pages;
        const allPages = pageManager.getAll();
        return allPages.find((page) => page.attributes.type === 'main' )
    }

    useEffect(() => {
        loadPages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getName = (page) => {
        return page.attributes.type === 'main' ? 'index' : page.attributes.name
    }

    const pageList = pages?.map((page) => 
        <Grid   id={page.id} 
                key={page.id}
                item 
                sx={{ 
                    p: '5px 10px', 
                    m: '0px 10px',
                    cursor: 'pointer',
                    borderRadius: '50px',
                    background: selectedPage?.id === page.id ? '#E8E8FF' : 'transparent',
                    border: selectedPage?.id === page.id ? '1px solid #D7D6FF' : '1px solid transparent'
                }} 
                onClick={(e) => {
                    // setFilter(cat.id);
                    const pageManager = editor.Pages;
                    pageManager.select(page.id);
                    setName(getName(page))
                    loadPages()
                }}
        >
            <Typography fontWeight="normal" color={
                selectedPage?.id === page.id ? '#3F41A4' : 'black'
            } fontSize={12}>{truncate(getName(page), 18)}</Typography>
        </Grid> 
    )

    const [name, setName] = useState()

    const saveAndReload =  async() => {
        const data = editor.getProjectData()
        await editor.Storage.store(data)
        loadPages()
    }

    const isHome = () => {
        return selectedPage?.attributes?.type === 'main'
    }

    // const ALPHA_NUMERIC_DASH_REGEX = /^[a-z0-9]+$/;

    const getPageNme = () => isHome() ? '' : `/${name}`
    const getPagePath = () => `${getProjectUrl({ project })}${getPageNme()}`

    return (
        <Grid container>
            <Grid item xs={4} sx={{ 
                height: 'calc(100vh - 110px)', 
                overflow: 'scroll', 
                background: '#f7f8f8', 
                border: '1px solid #dfe5eb',
                borderLeft: '0px',
                paddingTop: '10px'
            }}>
                {pageList}
                <Button 
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => {
                        setName('')
                        setSelectedPage(null)
                }}>Add a new page</Button>
            </Grid>
            <Grid item xs={8} sx={{ 
                height: 'calc(100vh - 110px)', 
                overflow: 'scroll',
                borderTop: '1px solid #dfe5eb',
            }}>
                <Grid container spacing={gridSpacing} sx={{ p: 3 }} id="myPages" ref={ref}>
                    <Grid item xs={12}>
                        <Grid item sx={{ height: 25 }}>
                            <Typography fontWeight="bold" color="black" style={{ float: 'left' }}>Page Configuration</Typography>
                            { !isHome() && selectedPage &&
                            (<IconButton color="inherit" 
                                        size="small"
                                        style={{ float: 'right' }}
                                        onClick={() => {
                                            const pageManager = editor.Pages;
                                            pageManager.remove(selectedPage.id)
                                            const home = getHomePage()
                                            pageManager.select(home)
                                            saveAndReload()
                                        }}
                            >
                                <IconTrash size={15} />
                            </IconButton>
                            )}
                        </Grid>
                        <TextField  autoFocus 
                                    sx={{ mt: 2}}
                                    fullWidth
                                    size="small"
                                    variant="standard" 
                                    label="Path"
                                    disabled={isHome()}
                                    InputLabelProps={{ shrink: true }}
                                    value={name}
                                    placeholder='Page path alpha numeric lower case e.g pricing' 
                                    onChange={(e) => {
                                        const name = e.target.value.replaceAll(' ', '').toLowerCase();
                                        setName(name)
                                    }} 
                        />
                        <Box className="project-link-button" sx={{ fontSize: '11px !important', my: 1, width: '100%', color:'black' }}>
                             🌐 {truncate(getPagePath(), 37)}
                        </Box>
                        <Button 
                            size="small"
                            fullWidth
                            variant="outlined"
                            elevation={0}
                            disabled={isHome() || !name}
                            // sx={{ mt: 1 }}
                            onClick={() => {
                                    const pageManager = editor.Pages;

                                    if (selectedPage) {
                                        // Is update
                                        // pageManager.remove(selectedPage.id)
                                        // const home = getHomePage()
                                        // console.log(home)
                                        // pageManager.select(home)
                                        selectedPage?.set('name', name);

                                        saveAndReload()
                                    } else {
                                        // Is new
                                        pageManager.add({
                                            name,
                                            component: `<div>New page ${name}</div>`
                                        });

                                        saveAndReload()
                                        // Select last page
                                
                                        const allPages = pageManager.getAll();
                                        pageManager.select(allPages[allPages.length - 1])
                                    }


                        }}>{selectedPage ? 'Save' : 'Create Page'}</Button>
                    </Grid>

                    {/* <Templates /> */}
                    {/* {!filter && (
                    <Box sx={{ mx: '10px', p: '5px' }} textAlign="center" justifyContent="center">
                        <img src={draganddrop} width="100%" height="auto" />
                        <Typography fontSize={16} color="black">Select a component 👈 and drag it to the canvas 👉</Typography>
                    </Box>)} */}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Pages
