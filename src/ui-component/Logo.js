import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'

const Logo = ({ height="44px", width="auto" }) => {

	const logo = useSelector((state) => state.customization.logo)

	return (
		<Grid container direction="row">
			<img src={logo} alt="logo" style={{ height, width }}></img>
		</Grid>
	)
}

export default Logo