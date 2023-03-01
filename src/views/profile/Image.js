import { useEffect, useState } from "react";
// import { useMoralis } from "react-moralis";

// assets
import Identicon from "react-identicons";
import isEmpty from "lodash/isEmpty";

const Image = ({ width = 100 }) => {
	// const { user } = useMoralis();
	const [profile, setProfile] = useState({});

	// useEffect(() => {
	// 	// const existingProfile = user?.get("profile");
	// 	// const initProfile = !isEmpty(existingProfile) ? existingProfile : {};
	// 	// setProfile(initProfile);
	// }, [user]);

	return profile?.image ? (
		<img src={profile?.image} alt="" width={width} height="auto" />
	) : (
		<Identicon string={'asd'/*user.get("ethAddress")*/} size={width} />
	);
};

export default Image;
