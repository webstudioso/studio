// action - state management
import { SET_EDITOR, SET_PROJECT } from './actions'

const editorReducer = (state, action) => {
    switch (action.type) {
        case SET_EDITOR: {
            const editor = action.editor
            return {
                ...state,
                editor
            }
        }
        case SET_PROJECT: {
            const project = action.project
            window.project = project // Need to access from editor outside react
            return {
                ...state,
                project
            };
        }
        default: {
            return { ...state }
        }
    }
}

export default editorReducer
