// action - state management
import { UPDATE_APP, CLEAR_APP } from './actions';
import { defaultConfiguration } from 'utils/config';

const initialState = defaultConfiguration;

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APP: {
            const newState = { ...state, ...action.configuration };
            return newState;
        }
        case CLEAR_APP: {
            return { ...initialState };
        }
        default: {
            return { ...state };
        }
    }
};

export default appReducer;
