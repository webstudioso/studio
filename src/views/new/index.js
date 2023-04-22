import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Box,
	Stack,
	Grid,
	Typography,
	IconButton,
	Button,
	Slide,
	Container
} from "@mui/material";
import NameField from "views/new/NameField";
import TermsAndConditions from "views/new/TermsAndConditions";
import Loader from "views/new/Loader";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { UPDATE_APP } from "store/actions";
import { defaultConfiguration } from "utils/config";
import axios from "axios";
import { Magic } from 'magic-sdk';
import InfoButton from "views/builder/InfoButton";
const m = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

const NewPage = () => {
	// const { user, Moralis } = useMoralis();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const appState = useSelector((state) => state.app);
	const [principal, setPrincipal] = useState();


	const loadPrincipal = async () => {
		const idToken = await m.user.getIdToken();
		setPrincipal(idToken);
	};

	useEffect(() => {
		loadPrincipal();
	}, []);

	const handleStepOne = (canNextStep, appName, subddomain) => {
		setCantContinue(!canNextStep || !appName || !subddomain);
		appState.name = appName;
		appState.subdomain = subddomain;
	};

	const handleStepTwo = (checked) => {
		setCantContinue(!checked);
	};

	const handleStepThree = (isReady) => {
		setCantContinue(!isReady);
	};

	const stepOne = !appState.step && <NameField onChange={handleStepOne} principal={principal} />;
	const stepFour = appState.step === 1 && (
		<TermsAndConditions onChange={handleStepTwo} />
	);
	const loader = appState.step === 2 && <Loader onChange={handleStepThree} />;
	const [cantContinue, setCantContinue] = useState(true);

	const handleNextStep = async () => {
		appState.step = appState.step ? appState.step + 1 : 1;
		setCantContinue(true);
		dispatch({ type: UPDATE_APP, configuration: appState });
		if (appState.step === 2) {
			appState.step = 0;

			const appData = {
				name: appState.name,
				subdomain: appState.subdomain,
				domain: null,
				metadata: {},
				plan: null,
				collaborators: []
			}
			
			try {
				const idToken = await m.user.getIdToken();
				await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${appState.subdomain}`,
					appData,
					{
						headers: {
							"AuthorizeToken": `Bearer ${idToken}`,
							"Content-Type": "application/json",
							"Accept": "application/json"
						}
					}
				)
				dispatch({
					type: UPDATE_APP,
					configuration: { new: true }
				});
				navigate(`/e/${appData?.subdomain}`);
			} catch(e) {
				console.log(e);
			}
		}
	};

	const canGoBack = appState.step < 3 || !appState.step;

	const returnHome = () => {
		resetConfig();
		navigate("/e");
	}

	const resetConfig = () => { 
		defaultConfiguration.step = 0;
		dispatch({
			type: UPDATE_APP,
			configuration:
				defaultConfiguration
		});
	}

	return (
		<Container sx={{ py: '15vh' }}>
		<Slide
			direction="left"
			in={true}
			mountOnEnter
			unmountOnExit
		>
			<Box
						component={Stack}
						direction="column"
						justifyContent="left"
						textAlign="left"
						sx={{ px: '10vw'}}
					>
				
				
							
								<Box sx={{ py: 2, ml: -2 }}>
										<Typography variant="h2" color="black" fontWeight="bolder">
										<IconButton
										sx={{ color: '#aaacb3' }}
										aria-label="Back"
										onClick={returnHome}
									>
										<ArrowBackIcon />
									</IconButton>
											Create a new project
											<InfoButton section='GG' />
										</Typography>
									</Box>
						
				
						<Box sx={{ mt: 12 }}>
							<NameField onChange={handleStepOne} principal={principal} />
						</Box>
						{/* <Grid container sx={{ mt: 8  }} justifyContent="right">
							<Button
								id="create-project-btn"
								variant="contained"
								size="large"
								sx={{ px: 8 }}
								disabled={cantContinue}
								onClick={handleNextStep}
							>
								Create Project
							</Button>
						</Grid> */}
					</Box>
		</Slide>
		</Container>
	);
};

export default NewPage;
