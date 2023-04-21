import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Box,
	Stack,
	Grid,
	Typography,
	IconButton,
	Button,
	Slide
} from "@mui/material";
import NameField from "views/new/NameField";
import TermsAndConditions from "views/new/TermsAndConditions";
import Loader from "views/new/Loader";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { UPDATE_APP } from "store/actions";
import { defaultConfiguration } from "utils/config";
import axios from "axios";
import { Magic } from 'magic-sdk';
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
				navigate(`/builder/${appData?.subdomain}`);
			} catch(e) {
				console.log(e);
			}
		}
	};

	const canGoBack = appState.step < 3 || !appState.step;

	const returnHome = () => {
		resetConfig();
		navigate("/profile/projects");
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
		<Slide
			direction="left"
			in={true}
			mountOnEnter
			unmountOnExit
			className="new-project-container"
		>
			<Grid container>
				<Grid item xs={12} sm={8}>
					<Box
						sx={{ px: 16, py: 8 }}
						component={Stack}
						direction="column"
						justifyContent="left"
						textAlign="left"
					>
						<Box className="project-new-container">
							<Box className="project-new-image"></Box>
						</Box>
						{canGoBack && (
							<Grid container direction="row" sx={{ ml: -8 }}>
								<Grid item>
									<IconButton
										sx={{ color: '#aaacb3' }}
										aria-label="Back"
										onClick={returnHome}
									>
										<CloseIcon />
									</IconButton>
								</Grid>
								<Grid item sx={{ py: 1.25, px: 2 }}>
									<Typography
										variant="body"
										fontSize="1.5em"
										fontWeight="400"
									>
										Create a project (Step{" "}
										{appState.step ? appState.step + 1 : 1}{" "}
										of 2)
									</Typography>
								</Grid>
							</Grid>
						)}
						<Box sx={{ mt: 12 }}>
							{stepOne}
							{stepFour}
							{loader}
						</Box>
						<Grid container sx={{ mt: 8 }} justifyContent="right">
							{appState.step > 0 && appState.step < 3 && (
								<Button
									color="primary"
									size="large"
									sx={{ px: 8 }}
									onClick={() => {
										appState.step = appState.step - 1;
										dispatch({
											type: UPDATE_APP,
											configuration: appState
										});
									}}
								>
									Previous
								</Button>
							)}
							{appState.step > 0 && appState.step < 3 && (
								<Box sx={{ flexGrow: 1 }} />
							)}
							<Button
								id="create-project-btn"
								variant="contained"
								size="large"
								sx={{ px: 8 }}
								disabled={cantContinue}
								onClick={handleNextStep}
							>
								{appState.step === 3
									? "Create project"
									: "Continue"}
							</Button>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Slide>
	);
};

export default NewPage;
