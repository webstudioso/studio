import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Routes from "routes";
import themes from "themes";
import Locales from "ui-component/Locales";
import Snackbar from "ui-component/extended/Snackbar";
import Loader from 'ui-component/Loader';
import { ProgressProvider } from "contexts/ProgressContext";

const App = () => {
	const loading = useSelector((state) => state.loader.show);
	const customization = useSelector((state) => state.customization);

	const loadingBar = loading && <Loader />;

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={ themes(customization) }>
				<ProgressProvider>
					<CssBaseline />
					<Locales>
						<>
							{ loadingBar }
							<Routes />
							<Snackbar />
						</>
					</Locales>
				</ProgressProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default App;
