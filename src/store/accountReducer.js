// action - state management
import { LOGIN, LOGOUT } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state, action) => {
    switch (action.type) {
        case LOGIN: {
            const { user, principal, projects } = action.payload;
            return {
                ...state,
                user,
                principal,
                projects
            };
        }
        case LOGOUT: {
            return {
                ...state,
                principal: null,
                user: null,
                projects: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
