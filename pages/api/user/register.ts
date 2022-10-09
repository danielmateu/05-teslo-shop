import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';

import { db } from '../../../database'
import { User } from '../../../models'
import { jwt, validations } from '../../../utils';

type Data = 
|{ message: string } 
| {
    token: string, 
    user:{  
        email: string;
        name: string;
        role: string;
        
        }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':

            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'BAD REQUEST'
            })
    }

}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', name = '' } = req.body as {email : string, password : string, name : string}
    
    //Validate email
    
    if(password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe ser de al menos 6 caracteres'})
    }
    if(name.length < 2) {
        return res.status(400).json({ message: 'El nombre debe ser de al menos 2 caracteres'})
    }

    if(!validations.isValidEmail(email)){
        return res.status(400).json({ message: 'Parece que el mail no es correcto'})
    }

    await db.connect();
    const user = await User.findOne({ email });
    
    if(user){
        await db.disconnect();
        return res.status(400).json({ message: 'No puede usar ese correo, ya está registrado'})
    }
    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name,
    });


    try {
        await newUser.save({validateBeforeSave: true});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            message: 'Revisar logs del servidor'
        })
    }

    /* Destructuring the user object. */
    const {_id, role } = newUser;

    /* Creating a token with the user's id and email. */
    const token = jwt.signToken( _id, email);

    return res.status(200).json(
        {
            token, //jwt
            user: {
                email,
                role,
                name,  
            }
        })
}

