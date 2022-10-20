import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { db } from '../../../database'
import { IOrder } from '../../../interfaces'
import { Order, Product } from '../../../models'

type Data = 
| {message: string}
| IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req,res)
        default:
            return res.status(400).json({message: 'Bad Request'})
    }

    
}

const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    /* Destructuring the request body and casting it to the interface IOrder. */
    const {orderItems,total} = req.body as IOrder;

    //Verificar que tengamos un usuario
    /* Getting the session from the request. */
    const session: any = await getSession({req});

    /* Checking if the user is logged in. */
    if(!session){
        return res.status(401).json({message:'Debe estar autenticado para llegar hasta aquí'})
    }

    //Crear un arreglo con los productos que la persona quiere
    const productsIds = orderItems.map(product => product._id);
    await db.connect();

    /* Getting the products from the database. */
    const dbProducts = await Product.find({ _id: {$in: productsIds}});

    console.log({dbProducts});

    try {

        const subTotal = orderItems.reduce((prev, current) =>{
            /* Getting the price of the product from the database. */
            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price;
            if(!currentPrice){
                throw new Error("Verifique el carrito de nuevo, producto no existente");
            }

            return ( currentPrice * current.quantity ) + prev;
        }, 0);

        /* Getting the tax rate from the environment variables. If it is not defined, it will be 0. */
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        /* Calculating the total of the order. */
        const backendTotal = subTotal * ( taxRate + 1);

        /* Checking if the total of the order is the same as the total calculated in the backend. */
        if(total !== backendTotal ) {
            throw new Error("El total no cuadra con el monto");
        }

        //Todo bien hasta este punto
        /* Getting the user id from the session. */
        const userId = session.user._id;
        /* Creating a new order with the data from the request body, setting the isPaid property to
        false and setting the user property to the user id. */
        const newOrder = new Order({...req.body, isPaid: false, user: userId});
        /* Rounding the total to 2 decimals. */
        newOrder.total = Math.round(newOrder.total * 100)/100;
        /* Saving the order in the database. */
        await newOrder.save();
        await db.disconnect();
        /* Returning the new order created in the database. */
        return res.status(201).json(newOrder);

    } catch (error:any) {
        await db.disconnect();
        console.log(error);

        res.status(400).json({ 
            message: error.message || 'Revise logs del servidor'
        })
    }

    // return res.status(201).json(req.body);
}
