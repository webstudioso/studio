// action - state management
import { LOGIN, LOGOUT, SET_REFERRAL } from './actions'

// ==============================|| ACCOUNT REDUCER ||============================== //

export const initialState = {
    user: null,
    principal: null,
    projects: [],
    subscription: null,
    referral: null
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const { user, principal, projects, subscription } = action.account
            return {
                ...state,
                user,
                principal,
                projects,
                subscription
            }
        }
        case LOGOUT: {
            return {
                ...state,
                principal: null,
                user: null,
                projects: null,
                subscription: null,
                referral: null
            }
        }
        case SET_REFERRAL: {
            const { referral } = action
            return {
                ...state,
                referral
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default accountReducer
