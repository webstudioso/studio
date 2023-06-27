import debounce from "lodash/debounce";

export const saveUser = debounce(async (user, setterFn) => {
	try {
		await user.save();
	} catch (e) {
		setterFn(e.message);
	}
}, 300);

export const hasPremiumSubscription = (account) => {
	return !!account?.subscription?.subscriptionId
}