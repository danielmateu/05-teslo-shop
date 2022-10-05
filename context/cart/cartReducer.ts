import { ICartProduct } from '../../interfaces';
import { CartState } from './';

type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update products in cart', payload: ICartProduct[] }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        /* Adding the payload to the cart. */
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                cart: [...action.payload]
            };
        /* Updating the cart with the new payload. */
        case '[Cart] - Update products in cart':
            return {
                ...state,
                cart: [...action.payload]
            };
        default:
            return state;
    }

}