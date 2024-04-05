// action - state management
import { SET_EDITOR, SET_PROJECT, SET_SUPPORTED_NETWORKS, SET_TEMPLATES } from './actions'

const initialState = {
    editor: null,
    project: null,
    supportedNetworks: [],
    availableTemplates: [],
    myTemplates: []
}

const editorReducer = (state=initialState, action) => {
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
        case SET_SUPPORTED_NETWORKS: {
            const supportedNetworks = action.supportedNetworks
            return {
                ...state,
                supportedNetworks
            };
        }
        case SET_TEMPLATES:
            return {
                ...state,
                availableTemplates: action.availableTemplates,
                myTemplates: action.myTemplates
        }
        default: {
            return { ...state }
        }
    }
}

export default editorReducer
