import { SNACKBAR_OPEN } from "store/actions"

export const showSuccess = ({ dispatch, message }) => {
    dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: message,
        variant: "alert",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        alertSeverity: "success"
    })
}

export const showError = ({ dispatch, error }) => {
    dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: error?.message ? error.message : error,
        variant: "alert",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        alertSeverity: "error"
    });
}