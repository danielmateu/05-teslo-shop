import React, { FC, useReducer, PropsWithChildren, useEffect, useRef, useState } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookies from 'js-cookie';



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

    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted) Cookies.set("cart", JSON.stringify(state.cart));
    }, [state.cart, isMounted]);

    // useEffect(() => {
    //     if (!isMounted) {
    //         const cart = JSON.parse(Cookies.get("cart") ?? "[]");
    //         dispatch({
    //             type: "[Cart] - LoadCart from cookies | storage",
    //             payload: cart,
    //         });
    //         setIsMounted(true);
    //     }
    // }, [isMounted]);


    useEffect(() => {
        try {
            const cookieProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : []

            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            // dispatch({ type: '[Cart] - LoadCart from cookies | storage', dispatch: [] });
        }
    }, []);

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart]);

    useEffect(() => {

        const numberOfItems = state.cart.reduce( (prev, current) => current.quantity + prev , 0)
        const subTotal = state.cart.reduce( (prev, current) =>(current.quantity * current.price) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0 );

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total : subTotal * (taxRate + 1)
        }


        dispatch({type: '[Cart] - Update order summary', payload: orderSummary});

    }, [state.cart])



    const addProductToCart = (product: ICartProduct) => {
        
        /* Checking if the product is already in the cart. If it is not, it will add it to the cart. */
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

        /* Checking if the product is already in the cart but with a different size. */
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

    const updateCartQuantity = (product : ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product})
    }
    
    const removeCartProduct = (product : ICartProduct) => {
        
    
        dispatch({ type: '[Cart] - Remove product in cart', payload: product})
        
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
        }}>
            {children}
        </CartContext.Provider>
    )
}