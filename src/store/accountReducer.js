// action - state management
import { LOGIN, LOGOUT } from './actions'

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state, action) => {
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
                subscription: null
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default accountReducer
