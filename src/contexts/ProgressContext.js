import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
	const [progress, setProgress] = useState(0);
	return (
		<ProgressContext.Provider value={{ progress, setProgress }}>
			{children}
		</ProgressContext.Provider>
	);
};

ProgressProvider.propTypes = {
	children: PropTypes.node
};
