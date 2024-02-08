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
    switch (payload.type) {
        default:
            return state;
    }
};

export default cartReducer;
