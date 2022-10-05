import React, { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';



export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    
}



export const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,


};


export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
        
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', dispatch:[] }); 
        }
    }, []);

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])



    const addProductToCart = (product: ICartProduct) => {
        //! Nivel 1 
        // console.log(product);
        // dispatch({type: '[Cart] - Add product', payload: product})
        //! Nivel 2
        // const productsInCart = state.cart.filter(p=>p._id !== product._id && p.size !== product.size);
        // dispatch({type: '[Cart] - Add product', payload: [...productsInCart,product]})

        //! Nivel Final
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);

        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

        // ACUMULAR
        const updatedProducts = state.cart.map(p => {

            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            //Actualizar cantidad
            p.quantity += product.quantity;
            return p;
        })

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });


    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,

        }}>
            {children}
        </CartContext.Provider>
    )
}