import { createTheme } from '@mui/material'
import palette from 'assets/scss/_theme.module.scss'

const theme = createTheme({
  palette: {
    primary: {
        main: palette.primaryMain,
      },
      secondary: {
        main: palette.secondaryMain,
      }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
})

export default theme
