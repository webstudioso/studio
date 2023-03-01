// action - state management
import * as actionTypes from './actions';

import { filter } from 'lodash';
import { Chance } from 'chance';

const chance = new Chance();

export const initialState = {
    checkout: {
        step: 0,
        products: [],
        subtotal: 0,
        total: 0,
        discount: 0,
        shipping: 0,
        billing: null,
        payment: {
            type: 'free',
            method: 'cod',
            card: ''
        }
    }
};

// ==============================|| E-COMMERCE REDUCER ||============================== //

const cartReducer = (state = initialState, payload) => {
    let subtotal;
    let result;

    let latestProducts;
    let newProduct;
    let inCartProduct;
    let oldSubTotal;
    let amount;
    let difference;
    let newShipping;

    switch (payload.type) {
        case actionTypes.ADD_PRODUCTS:
            newProduct = { ...payload.product, itemId: chance.timestamp() };

            subtotal = newProduct?.quantity * newProduct.offerPrice;

            inCartProduct = filter(state.checkout.products, {
                id: newProduct.id,
                color: newProduct.color,
                size: newProduct.size
            });
            if (inCartProduct && inCartProduct.length > 0) {
                const newProducts = state.checkout.products.map((item) => {
                    if (newProduct?.id === item.id && newProduct?.color === item.color && newProduct.size === item.size) {
                        return { ...newProduct, quantity: newProduct.quantity + inCartProduct[0].quantity };
                    }
                    return item;
                });
                latestProducts = newProducts;
            } else {
                latestProducts = [...state.checkout.products, newProduct];
            }

            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    products: latestProducts,
                    subtotal: state.checkout.subtotal + subtotal,
                    total: state.checkout.total + subtotal
                }
            };
        case actionTypes.REMOVE_PRODUCT:
            result = filter(state.checkout.products, { itemId: payload.id });
            subtotal = result[0].quantity * result[0].offerPrice;

            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    products: filter(state.checkout.products, (item) => item.itemId !== payload.id),
                    subtotal: state.checkout.subtotal - subtotal,
                    total: state.checkout.total + -subtotal
                }
            };
        case actionTypes.UPDATE_QUANTITY:
            result = filter(state.checkout.products, { itemId: payload.id });
            subtotal = payload.quantity * result[0].offerPrice;
            oldSubTotal = 0;

            latestProducts = state.checkout.products.map((item) => {
                if (payload.id === item.itemId) {
                    oldSubTotal = item.quantity * item.offerPrice;
                    return { ...item, quantity: payload.quantity };
                }
                return item;
            });

            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    products: latestProducts,
                    subtotal: state.checkout.subtotal - oldSubTotal + subtotal,
                    total: state.checkout.total - oldSubTotal + subtotal
                }
            };
        case actionTypes.SET_STEP:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    step: payload.step
                }
            };
        case actionTypes.BACK_STEP:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    step: state.checkout.step - 1
                }
            };
        case actionTypes.NEXT_STEP:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    step: state.checkout.step + 1
                }
            };
        case actionTypes.SET_BILLING_ADDRESS:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    billing: payload.address
                }
            };
        case actionTypes.SET_DISCOUNT:
            amount = 0;
            difference = 0;
            if (state.checkout.total > 0) {
                switch (payload.code) {
                    case 'BERRY50':
                        amount = chance.integer({ min: 1, max: state.checkout.total < 49 ? state.checkout.total : 49 });
                        break;
                    case 'FLAT05':
                        amount = state.checkout.total < 5 ? state.checkout.total : 5;
                        break;
                    case 'SUB150':
                        amount = state.checkout.total < 150 ? state.checkout.total : 150;
                        break;
                    case 'UPTO200':
                        amount = chance.integer({ min: 1, max: state.checkout.total < 199 ? state.checkout.total : 199 });
                        break;
                    default:
                        amount = 0;
                }
            }
            if (state.checkout.discount > 0) {
                difference = state.checkout.discount;
            }

            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    discount: amount,
                    total: state.checkout.total + difference - amount
                }
            };
        case actionTypes.SET_SHIPPING_CHARGE:
            newShipping = 0;
            if (state.checkout.shipping > 0 && payload.charge === 'free') {
                newShipping = -5;
            }
            if (payload.charge === 'fast') {
                newShipping = 5;
            }
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    shipping: payload.charge === 'fast' ? 5 : 0,
                    total: state.checkout.total + newShipping,
                    payment: {
                        ...state.checkout.payment,
                        type: payload.charge
                    }
                }
            };
        case actionTypes.SET_PAYMENT_METHOD:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    payment: {
                        ...state.checkout.payment,
                        method: payload.method
                    }
                }
            };
        case actionTypes.SET_PAYMENT_CARD:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    payment: {
                        ...state.checkout.payment,
                        card: payload.card
                    }
                }
            };
        case actionTypes.RESET_CART:
            return initialState;
        default:
            return state;
    }
};

export default cartReducer;
