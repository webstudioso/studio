// action - state management
import { SHOW_MODAL, HIDE_MODAL } from './actions';

const initialState = {
    content: null,
    fullScreen: true
}

const modalReducer = (state=initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL: {
            const { content, fullScreen=true } = action;
            return {
                ...state,
                content,
                fullScreen
            };
        }
        case HIDE_MODAL: {
            return {
                ...state,
                ...initialState
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default modalReducer;
