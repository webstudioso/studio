import { SNACKBAR_OPEN } from "store/actions"

export const showSuccess = ({ dispatch, message }) => {
    dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: message,
        variant: "alert",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        alertSeverity: "success"
    })
}

export const showError = ({ dispatch, error }) => {
    dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: error.message,
        variant: "alert",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        alertSeverity: "error"
    });
}