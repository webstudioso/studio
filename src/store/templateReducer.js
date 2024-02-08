// action - state management
import * as actionTypes from './actions';

const initialState = {
    availableTemplates: [],
    myTemplates: []
};

// ==============================|| SNACKBAR REDUCER ||============================== //

const templateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_TEMPLATES:
            return {
                ...state,
                ...action
            };
        default:
            return state;
    }
};

export default templateReducer;
