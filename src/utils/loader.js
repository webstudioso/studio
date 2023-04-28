import { LOADER } from "store/actions"

export const showLoader = async ({ dispatch, show }) => dispatch({ type: LOADER, show })