// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
    locale: config.i18n
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.THEME_LOCALE:
            return {
                ...state,
                locale: action.locale
            };
        default:
            return state;
    }
};

export default customizationReducer;
