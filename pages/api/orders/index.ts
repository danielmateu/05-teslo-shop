import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { db } from '../../../database'
import { IOrder } from '../../../interfaces'
import { Product } from '../../../models'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req,res)
            
    
        default:
            return res.status(400).json({message: 'Bad Request'})
    }

    
}

const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

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

    const dbProducts = await Product.find({_id: {$in: productsIds}});

    // console.log(dbProducts);

    try {
        
        const subTotal = orderItems.reduce((prev, current) =>{

            const currentPrice = dbProducts.find(prod => prod._id === current._id)!.price;
            if(!currentPrice){
                throw new Error("Verifique el carrito de nuevo, producto no existente");
            }

            return ( currentPrice * current.quantity ) + prev
        } , 0);



    } catch (error) {
        
    }


    return res.status(201).json(req.body);
}
