import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customization from './customizationReducer';
import snackbar from './snackbarReducer';
import cartReducer from './cartReducer';
import app from 'store/appReducer';
import loader from './loaderReducer';
import account from './accountReducer';
import editor from './editorReducer';
import template from './templateReducer';

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
    app,
    account,
    editor,
    customization,
    snackbar,
    loader,
    template
});

export default reducer;
