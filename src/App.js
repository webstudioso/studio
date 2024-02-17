import { useSelector } from 'react-redux'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import Routes from 'routes'
import Locales from 'ui-component/Locales'
import Snackbar from 'ui-component/Snackbar'
import Loader from 'ui-component/Loader'
import Theme from 'theme'

const App = () => {
	const loading = useSelector((state) => state.loader.show)
	const loadingBar = loading && <Loader />

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<Locales>
					<div onContextMenu={(e) => e.preventDefault()}>
						{ loadingBar }
						<Routes />
						<Snackbar />
					</div>
				</Locales>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default App;
