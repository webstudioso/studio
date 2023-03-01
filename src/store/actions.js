// action - account reducer
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const FIREBASE_STATE_CHANGED = 'FIREBASE_STATE_CHANGED';

// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const MENU_TYPE = '@customization/MENU_TYPE';
export const PRESET_COLORS = '@customization/PRESET_COLORS';
export const THEME_LOCALE = '@customization/THEME_LOCALE';
export const THEME_RTL = '@customization/THEME_RTL';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';
export const SET_OUTLINED_FILLED = '@customization/SET_OUTLINED_FILLED';

// action - snackbar
export const SNACKBAR_OPEN = '@snackbar/SNACKBAR_OPEN';

// action - cart
export const ADD_PRODUCTS = '@cart/ADD_PRODUCTS';
export const REMOVE_PRODUCT = '@cart/REMOVE_PRODUCT';
export const UPDATE_QUANTITY = '@cart/UPDATE_QUANTITY';
export const NEXT_STEP = '@cart/NEXT_STEP';
export const BACK_STEP = '@cart/BACK_STEP';
export const SET_STEP = '@cart/SET_STEP';
export const SET_BILLING_ADDRESS = '@cart/SET_BILLING_ADDRESS';
export const SET_DISCOUNT = '@cart/SET_DISCOUNT';
export const SET_SHIPPING_CHARGE = '@cart/SET_SHIPPING_CHARGE';
export const SET_PAYMENT_METHOD = '@cart/SET_PAYMENT_METHOD';
export const SET_PAYMENT_CARD = '@cart/SET_PAYMENT_CARD';
export const RESET_CART = '@cart/RESET_CART';

// action - kanban
export const ADD_COLUMN = '@kanban/ADD_COLUMN';
export const EDIT_COLUMN = '@kanban/EDIT_COLUMN';
export const DELETE_COLUMN = '@kanban/DELETE_COLUMN';
export const UPDATE_COLUMN_ORDER = '@kanban/UPDATE_COLUMN_ORDER';

export const ADD_ITEM = '@kanban/ADD_ITEM';
export const EDIT_ITEM = '@kanban/EDIT_ITEM';
export const DELETE_ITEM = '@kanban/DELETE_ITEM';
export const UPDATE_COLUMN_ITEM_ORDER = '@kanban/UPDATE_COLUMN_ITEM_ORDER';
export const SELECT_ITEM = '@kanban/SELECT_ITEM';
export const ADD_ITEM_COMMENT = '@kanban/ADD_ITEM_COMMENT';

export const UPDATE_STORY_ORDER = '@kanban/UPDATE_STORY_ORDER';
export const UPDATE_STORY_ITEM_ORDER = '@kanban/UPDATE_STORY_ITEM_ORDER';
export const DELETE_STORY = '@kanban/DELETE_STORY';
export const ADD_STORY = '@kanban/ADD_STORY';
export const EDIT_STORY = '@kanban/EDIT_STORY';
export const ADD_STORY_COMMENT = '@kanban/ADD_STORY_COMMENT';

// action - app
export const UPDATE_APP = '@app/UPDATE_APP';
export const CLEAR_APP = '@app/CLEAR_APP';

// action - loader
export const LOADER = '@loader/SHOW';