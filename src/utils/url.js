import constants from "constant";
const { EDITOR } = constants;

export const getUrl = (subdomain, templateId) => {
	const environmentPrefix =
		process.env.REACT_APP_HOST_ENV === "production"
			? ""
			: `${process.env.REACT_APP_HOST_ENV}.`;
	const subdomainPrefix = subdomain ? `${subdomain}.` : "";
	const templatePrefix = templateId ? `/${templateId}` : "";
	return `https://${subdomainPrefix}${environmentPrefix}webstudio.so${templatePrefix}`;
};

export const getEditorUrl = (appState) => {
	// Studio or builder?
	let url = "/studio/templates";
	try {
		// Has templates
		if (isEditorBuilder(appState)) {
			url = `/builder/${appState?.appId}`;
		}
	} catch (e) {
		console.log("Cant resolve editor, defaulting to studio");
	}
	return url;
};

export const isEditorBuilder = (appState) => {
	const templates = Object.keys(appState.template);
	return (
		templates.length > 0 &&
		appState.template[templates[0]].editor === EDITOR.BUILDER
	);
};

export const queryParams = () => {
	const t = Math.floor(Math.random() * 100000);
	return `?t=${t}`;
};