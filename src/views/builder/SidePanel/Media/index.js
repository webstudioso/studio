import { useState, useEffect, useRef } from 'react';
import { Chip, Box, Grid, Paper, Button, Typography, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconCloudUpload, IconUpload } from '@tabler/icons';
import { uploadPagesToIPFS } from 'api/publish';
import { LOADER, SNACKBAR_OPEN } from "store/actions";
import { useDispatch, useSelector } from "react-redux";

const Media = ({ onLeave }) => {
    const dispatch = useDispatch();
    const ref = useRef(null)

    // const handleTemplateSelect = (template) => {
    //     if (template.html) {
    //         editor.setComponents(template.html);
    //         editor.setStyle(template.style);
    //     } else if (template.template) {
    //         editor.loadProjectData(template.template);
    //     }

    //     handleClose();
    // }


    useEffect(() => {
        const editor = window.editor;
        // console.log("MEDIA")
        // console.log(editor);
        const manager = editor.AssetManager;
        manager.onClick();
        // Render new set of blocks
        // const blocks = blockManager.getAll();
        // console.log(blocks);
        // console.log(filter);
        // const filtered = blocks.filter(block => {
            // const cat = block.get('category')
            // console.log(cat.id)
            // return cat.id == filter
        // })

        // blockManager.render(filtered);
        // Or a new set from an array
        // blockManager.render([
        // {label: 'Label text', content: '<div>Content</div>'}
        // ]);

        // Back to blocks from the global collection
        // blockManager.render();

        // console.log(manager.getAll())
        // You can also render your blocks outside of the main block container
        // const newBlocksEl = manager.render();
        // console.log(newBlocksEl);
        // const blockco = document.getElementById('myBlocks');
        // console.log(blockco);
        // ref.current.appendChild(newBlocksEl);
        // console.log(ref);
        // setBlocks(blockco)
        // console.log(ref)


        // When dragging of a block starts, hide side panel
        // editor.on('block:drag', () => onLeave())
        return () => {
            window?.editor?.AssetManager?.close();
        }
    }, [])

    const [selected, setSelected] = useState()



    const handleMediaUpload = async (e) => {

        document.dispatchEvent(new CustomEvent('addCloseDelay'));

        dispatch({ type: LOADER, show: true });
        const file = e.target.files[0];

        // Encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = async () => {
            // Use a regex to remove data url part
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '')
                const pages = [{
                    path: file.name,
                    content: base64String
                }]

                try {
                    
                const upload = await uploadPagesToIPFS({pages});
                const uploadedFilePath = upload[0].path;
                window.editor.AssetManager.add([uploadedFilePath]);

            } catch(e) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: e.message,
                    variant: "alert",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                    alertSeverity: "error"
                });
            } finally {
                dispatch({ type: LOADER, show: false });
            }
                // window.editor.AssetManager.store();
                // await publishMetadata({ id: projectId, principal, data  })

        };
        reader.readAsDataURL(file);


    }

    const getSelectedImage = () => {
        const selected = window.editor.getSelected();
        return selected && selected.is('image') ? selected : null
    }

    return (
        <Grid container spacing={2} sx={{ 
                height: 'calc(100vh - 120px)', 
                overflow: 'scroll', 
                background: '#f7f8f8', 
                border: '1px solid #dfe5eb',
                borderLeft: '0px',
                marginTop: '0px',
                p: 1,
                pl:3
            }}
            ref={ref}
        >
                        <Box sx={{ position:'absolute', right:20, top: 18}}>
                            <Button color="primary" variant="outlined" component="label">
                            Upload New Media
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onClick={() => document.dispatchEvent(new CustomEvent('addCloseDelay')) }
                                    onChange={handleMediaUpload}
                                />
                            </Button>
                        </Box>


            {window.editor.AssetManager.getAll().models.map((item) => (
                <Grid item xs={6} sx={{ cursor: getSelectedImage() ? 'pointer' : 'normal', position:'relative', padding:'0px !important'}} onMouseEnter={() => setSelected(item.id)}>
                    <Paper elevation={0} sx={{ p:1, background:'transparent' }} className={selected === item.id && getSelectedImage() ? "blurred" : ""}>
                        <img src={item.attributes.src} width="100%" height="auto" />
                        <Typography fontSize={12} color="#333" fontWeight="light">{item.attributes.src.split('/').pop()}</Typography>
                    </Paper>

                    {selected === item.id && getSelectedImage() && (
                    <Box sx={{
                            width: '102%',
                            height: '102%',
                            background: `rgba(255,255,255,0.85)`,
                            position: 'absolute',
                            top: '-1%',
                            left: '-1%',
                            zIndex: 1000
                        }}
                        className="overlay"
                        >
                            <Button elevation={0} 
                                    onClick={() => {
                                        const selectedImage = getSelectedImage()
                                        if (selectedImage) {
                                            selectedImage.addAttributes({ src: item.attributes.src });
                                            // The default AssetManager UI will trigger `select(asset, false)`
                                            // on asset click and `select(asset, true)` on double-click
                                            onLeave();
                                        }
                                    }}
                                    variant="contained"
                                    sx={{
                                        boxShadow: 'none',
                                        '&:hover': {
                                            boxShadow: 'none',
                                        },
                                        borderRadius: '50px',
                                        position: 'absolute',
                                        top: '35%',
                                        left: '25%',
                                        width: '50%'
                                    }}
                            >
                                PICK
                            </Button>
                    </Box>)}

                </Grid>
            ))}
        </Grid>
    )
}

export default Media;
