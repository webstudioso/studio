import { Paper, Chip, TextField } from '@mui/material'

const StyleManager = ({ selected }) => {

  return (
        <Paper elevation={0} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                selected?.getClasses()?.map((selector) => {
                    return (
                        <Chip
                            color="primary"
                            size="small"
                            variant="contained"
                            sx={{ mr: '3px', mb: '3px' }}
                            label={selector}
                            onDelete={() => selected.removeClass(selector)}
                        />
                    )
                })
            }

            <TextField
                placeholder="e.g. bg-emerald-500 cursor-pointer"
                fullWidth
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                    ev.preventDefault()
                    const items = ev.target.value.split(' ')
                    selected.addClass(items)
                    }
                }}
                variant="standard"
            />

        </Paper>
    )
}

export default StyleManager