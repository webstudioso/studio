// project imports
import config from 'config'

import DEFAULT_LOGO from 'assets/images/logo.png'

// action - state management
import * as actionTypes from './actions'

export const initialState = {
    locale: config.i18n,
    logo: DEFAULT_LOGO
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.THEME_LOCALE:
            return {
                ...state,
                locale: action.locale
            };
        case actionTypes.SET_LOGO:
            return {
                ...state,
                logo: action.logo
            };
        default:
            return state;
    }
};

export default customizationReducer;
