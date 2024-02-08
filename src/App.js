import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Routes from "routes";
import themes from "themes";
import Locales from "ui-component/Locales";
import Snackbar from "ui-component/extended/Snackbar";
import Loader from 'ui-component/Loader';

const App = () => {
	const loading = useSelector((state) => state.loader.show);
	const customization = useSelector((state) => state.customization);

	const loadingBar = loading && <Loader />;

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={ themes(customization) }>
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
