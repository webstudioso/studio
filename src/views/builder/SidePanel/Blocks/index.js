import { useState, useEffect, useRef } from 'react';

import draganddrop from "assets/images/draganddrop.jpg";

// material-ui
import {
    Box,
    Grid,
    Typography
} from '@mui/material';
import { gridSpacing } from 'store/constant';

const Blocks = ({ onLeave }) => {
    const ref = useRef(null);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState();

    // console.log("SidepNale")
    // console.log(window.editor);
    // console.log(editor);



    // drawer on/off
    // const [open, setOpen] = useState(false);
    const handleToggle = () => {
        // setOpen(!open);
        setTimeout(()=>{
            



            //cats

            const cats = window?.editor?.Blocks?.getCategories().models.map((cat) => cat.attributes);
        
            setCategories(cats)
        },500)
        
    };

    useEffect(() => {
            handleToggle()
    }, [])

    useEffect(() => {
        if (!filter) return;
        const editor = window.editor;
        const blockManager = editor.Blocks;
        // Render new set of blocks
        const blocks = blockManager.getAll();
   
        const filtered = blocks.filter(block => {
            const cat = block.get('category')
    
            return cat.id == filter
        })

        // blockManager.render(filtered);
        // Or a new set from an array
        // blockManager.render([
        // {label: 'Label text', content: '<div>Content</div>'}
        // ]);

        // Back to blocks from the global collection
        // blockManager.render();

        // You can also render your blocks outside of the main block container
        const newBlocksEl = blockManager.render(filtered, {ignoreCategories:true});
        const blockco = document.getElementById('myBlocks');
        // console.log(blockco);
        ref.current.appendChild(newBlocksEl);
        // console.log(ref);
        // setBlocks(blockco)
        // console.log(ref)


        // When dragging of a block starts, hide side panel
        editor.on('block:drag', () => onLeave())
    }, [filter])

    useEffect(() => {
        // 👇️ call method in useEffect hook
        const el = document.getElementById('myBlocks');
      }, []);

    const catList = categories?.map((cat) => 
        <Grid   id={cat.id} 
                item 
                sx={{ 
                    p: '5px 10px', 
                    m: '0px 10px',
                    cursor: 'pointer',
                    borderRadius: '50px',
                    background: filter === cat.id ? '#E8E8FF' : 'transparent',
                    border: filter === cat.id ? '1px solid #D7D6FF' : '1px solid transparent'
                }} 
                onMouseEnter={(e) => {
                    setFilter(cat.id);
                }}
        >
            <Typography fontWeight="normal" color={
                filter === cat.id ? '#3F41A4' : 'black'
            } fontSize={12}>{cat.label}</Typography>
        </Grid> 
    )

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
                {catList}
            </Grid>
            <Grid item xs={8} sx={{ 
                height: 'calc(100vh - 110px)', 
                overflow: 'scroll',
                borderTop: '1px solid #dfe5eb',
            }}>
                <Grid container spacing={gridSpacing} sx={{ p: 3 }} id="myBlocks" ref={ref}>
                    {!filter && (
                    <Box sx={{ mx: '10px', p: '5px' }} textAlign="center" justifyContent="center">
                        <img src={draganddrop} width="100%" height="auto" />
                        <Typography fontSize={16} color="black">Select a component 👈 and drag it to the canvas 👉</Typography>
                    </Box>)}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Blocks
