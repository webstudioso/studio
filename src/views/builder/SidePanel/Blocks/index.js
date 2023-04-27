import { useState, useEffect, useRef } from 'react'
import draganddrop from 'assets/images/draganddrop.jpg'
import {
    Box,
    Grid,
    Typography
} from '@mui/material'
import { gridSpacing } from 'store/constant'

const Blocks = ({ onLeave, editor }) => {
    const ref = useRef(null)
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState()

    const handleToggle = () => {
        const categoryList = editor.Blocks.getCategories().models.map((category) => category.attributes)
        setCategories(categoryList)
    }

    useEffect(() => {
        handleToggle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!filter) return
        const blockManager = editor.Blocks
        const blocks = blockManager.getAll()
        const filtered = blocks.filter(block => block.get('category').id === filter)
        const blocksContainer = blockManager.render(filtered, {ignoreCategories:true})
        ref.current.appendChild(blocksContainer)
        editor.on('block:drag', () => onLeave())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    const categoryList = categories?.map((cat) => 
        <Grid   id={cat.id} 
                key={cat.id}
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
            } fontSize={14}>{cat.label}</Typography>
        </Grid> 
    )

    return (
        <Grid container>
            <Grid item xs={4} sx={{ 
                height: 'calc(100vh - 110px)', 
                overflow: 'auto', 
                background: '#f7f8f8', 
                border: '1px solid #dfe5eb',
                borderLeft: '0px',
                paddingTop: '10px'
            }}>
                {categoryList}
            </Grid>
            <Grid item xs={8} sx={{ 
                height: 'calc(100vh - 110px)', 
                overflow: 'auto',
                borderTop: '1px solid #dfe5eb',
            }}>
                <Grid container spacing={gridSpacing} sx={{ p: 3 }} ref={ref}>
                    {!filter && (
                    <Box sx={{ mx: '10px', p: '5px' }} textAlign="center" justifyContent="center">
                        <img src={draganddrop} width="100%" height="auto" alt="Drag and drop into the canvas" />
                        <Typography fontSize={16} color="black">Select a component 👈 and drag it to the canvas 👉</Typography>
                    </Box>)}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Blocks
