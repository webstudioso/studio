// action - state management
import { UPDATE_WIZARD, CLEAR_WIZARD } from './actions'

const initialState = {}

const wizardReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WIZARD: {
            const newState = { ...state, ...action.payload }
            return newState;
        }
        case CLEAR_WIZARD: {
            return { ...initialState }
        }
        default: {
            return { ...state }
        }
    }
}

export default wizardReducer
