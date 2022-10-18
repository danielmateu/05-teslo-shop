import React, { FC, useReducer, PropsWithChildren, useEffect, useRef, useState } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import { tesloApi } from '../../api';

export interface CartState {
    isLoaded        : boolean;
    cart            : ICartProduct[];
    numberOfItems   : number;
    subTotal        : number;
    tax             : number;
    total           : number;

    shippingAddress? : ShippingAddress;

}
// export interface ShippingAddress {
//     firstName: string;
//     lastName : string;
//     address  : string;
//     address2?: string;
//     zip      : string;
//     city     : string;
//     country  : string;
//     phone    : string;
// }


export const CART_INITIAL_STATE: CartState = {
    isLoaded        : false,
    cart            : [],
    numberOfItems   : 0,
    subTotal        : 0,
    tax             : 0,
    total           : 0,
    shippingAddress : undefined,

};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);


    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted) Cookie.set("cart", JSON.stringify(state.cart));
    }, [state.cart, isMounted]);

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []

            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);




    useEffect(() => {

        if(Cookie.get('firstName')){
            
            const shippingAddress = {
                firstName   : Cookie.get('firstName') || '',
                lastName    : Cookie.get('lastName') || '',
                address     : Cookie.get('address') || '',
                address2    : Cookie.get('address2') || '',
                zip         : Cookie.get('zip') || '',
                city        : Cookie.get('city') || '',
                country     : Cookie.get('country') || '',
                phone       : Cookie.get('phone') || '',
            }
            dispatch({ type: '[Cart] - Load address from Cookies', payload: shippingAddress });
        }

    }, [])

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart]);

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subTotal = state.cart.reduce((prev, current) => (current.quantity * current.price) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
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

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product })
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product })
    }

    const updateAddress = (address: ShippingAddress) => {

        Cookie.set('firstName', address.firstName)
        Cookie.set('lastName', address.lastName)
        Cookie.set('address', address.address)
        Cookie.set('address2', address.address2 || '')
        Cookie.set('zip', address.zip)
        Cookie.set('city', address.city)
        Cookie.set('country', address.country)
        Cookie.set('phone', address.phone)
        dispatch({ type: '[Cart] - Update address', payload: address});
    }  
    
    const createOrder = async() => {
        try {
            
            const {data} = await tesloApi.post('/orders',{
            });
            console.log({data});
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <CartContext.Provider value={{
            ...state,

            //Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,

            //orders
            createOrder,

        }}>
            {children}
        </CartContext.Provider>
    )
}