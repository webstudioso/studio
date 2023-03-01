// action - state management
import * as actionTypes from './actions';

const initialState = {
    show: false
};

// ==============================|| SNACKBAR REDUCER ||============================== //

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADER:
            return {
                ...state,
                show: action.show
            };
        default:
            return state;
    }
};

export default loaderReducer;
