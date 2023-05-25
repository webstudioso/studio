import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customization from './customizationReducer';
import snackbar from './snackbarReducer';
import cartReducer from './cartReducer';
import kanban from './kanbanReducer';
import app from 'store/appReducer';
import loader from './loaderReducer';
import account from './accountReducer';
import editor from './editorReducer';
import wizard from './wizardReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban,
    app,
    account,
    editor,
    wizard,
    customization,
    snackbar,
    loader,
});

export default reducer;
