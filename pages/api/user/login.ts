


import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';

import { db } from '../../../database'
import { User } from '../../../models'
import { jwt } from '../../../utils';

type Data = 
|{ message: string } 
| {
    token: string, 
    user:{  
        email: string,   
        role: string,     
        name: string,
        
        }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':

            return loginUser(req, res)

        default:
            res.status(400).json({
                message: 'BAD REQUEST'
            })
    }

}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body;

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        return res.status(400).json({ message: 'Correo o contraseña no válidaos - EMAIL' });
    }

    if (bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({ message: 'Correo o contraseña no válidaos - PASSWORD' });
    }

    /* Destructuring the user object. */
    const { role, name, _id } = user;

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

