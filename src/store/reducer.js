import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// reducer import
import customization from './customizationReducer'
import snackbar from './snackbarReducer'
import loader from './loaderReducer'
import account from './accountReducer'
import editor from './editorReducer'
import appReducer from 'store/appReducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    app: persistReducer(
        {
            key: 'webstudio',
            storage,
            keyPrefix: 'ws-'
        },
        appReducer
    ),
    account,
    editor,
    customization,
    snackbar,
    loader
})

export default reducer
