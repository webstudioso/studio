import { useState, useEffect, useRef } from 'react';

import draganddrop from "assets/images/draganddrop.jpg";

// material-ui
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    IconButton
} from '@mui/material';
import { gridSpacing } from 'store/constant';
import Templates from 'views/modal/Templates';
import { IconTrash } from '@tabler/icons';
import { getProjectUrl } from 'utils/project';
import { truncate } from 'utils/format';

const Pages = ({ onLeave }) => {
    const ref = useRef(null);
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState();

    // console.log("SidepNale")
    // console.log(window.editor);
    // console.log(editor);



    // drawer on/off
    // const [open, setOpen] = useState(false);
    // const handleToggle = () => {
    //     console.log("toggling")
    //     // setOpen(!open);
    //     setTimeout(()=>{
            



    //         //cats

    //         const cats = window?.editor?.Blocks?.getCategories().models.map((cat) => cat.attributes);
    //         console.log(cats);
    //         setCategories(cats)
    //     },500)
        
    // };

    // useEffect(() => {
    //         handleToggle()
    // }, [])

    const loadPages = () => {
        const editor = window.editor;
        const pageManager = editor.Pages;

        const allPages = pageManager.getAll();
        console.log(allPages)
        setPages(allPages);

        const selected = pageManager.getSelected();
        console.log(selected)
        setName(getName(selected))
        setSelectedPage(selected);
    }

    const getHomePage = () => {
        const editor = window.editor;
        const pageManager = editor.Pages;

        const allPages = pageManager.getAll();
        return allPages.find((page) => page.attributes.type === 'main' )
    }

    useEffect(() => {
        // if (!filter) return;
        loadPages()
        // console.log(pageManager);

        // blockManager.render(filtered);
        // Or a new set from an array
        // blockManager.render([
        // {label: 'Label text', content: '<div>Content</div>'}
        // ]);

        // Back to blocks from the global collection
        // blockManager.render();

        // You can also render your blocks outside of the main block container
        // const canvasComponent = pageManager.render();
        // console.log(canvasComponent);
        // const blockco = document.getElementById('myPages');
        // console.log(blockco);
        // ref.current.appendChild(canvasComponent);
        // console.log(ref);
        // setBlocks(blockco)
        // console.log(ref)


        // When dragging of a block starts, hide side panel
        // editor.on('block:drag', () => onLeave())
    }, [])

    // useEffect(() => {
    //     // 👇️ call method in useEffect hook
    //     const el = document.getElementById('myBlocks');
    //     console.log(el);
    //   }, []);

    // const catList = categories?.map((cat) => 
    //     <Grid   id={cat.id} 
    //             item 
    //             sx={{ 
    //                 p: '5px 10px', 
    //                 m: '0px 10px',
    //                 cursor: 'pointer',
    //                 borderRadius: '50px',
    //                 background: filter === cat.id ? '#E8E8FF' : 'transparent'
    //             }} 
    //             onMouseEnter={(e) => {
    //                 setFilter(cat.id);
    //             }}
    //     >
    //         <Typography fontWeight="normal" color={
    //             filter === cat.id ? '#3F41A4' : 'black'
    //         } fontSize={12}>{cat.label}</Typography>
    //     </Grid> 
    // )

    const getName = (page) => {
        return page.attributes.type === 'main' ? 'index' : page.attributes.name
    }

    const pageList = pages?.map((page) => 
        <Grid   id={page.id} 
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
                    const editor = window.editor;
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
        const data = window.editor.getProjectData();
        await window.editor.Storage.store(data);
        // await window.editor.store();
        loadPages()
    }

    const isHome = () => {
        return selectedPage?.attributes?.type === 'main'
    }

    // const ALPHA_NUMERIC_DASH_REGEX = /^[a-z0-9]+$/;

    const getPageNme = () => isHome() ? '' : `/${name}`
    const getPagePath = () => `${getProjectUrl()}${getPageNme()}`

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
                            // const editor = window.editor;
                            // const pageManager = editor.Pages;
                            // pageManager.add({
                            //     name,
                            //     component: `<div>New page ${name}</div>`
                            // });
                            // loadPages()

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
                                            const editor = window.editor;
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
                                    const editor = window.editor;
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
