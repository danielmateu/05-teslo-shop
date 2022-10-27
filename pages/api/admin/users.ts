import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';

import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data =
    | { message: string }
    | IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':

            return getUsers(req, res);
        case 'PUT':

            return updateUser(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' });
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
   /* Getting all the users from the database and excluding the password field. */
    const users = await User.find().select('-password').lean();

    await db.disconnect();
    return res.status(200).json(users)
}


const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    /* Destructuring the req.body object and assigning default values to userId and role. */
    const { userId = '', role = '' } = req.body;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'No existe usuario por ese id' });
    }

    /* Checking if the role is valid. */
    const validRoles = [
        'admin',
        'client', //REVISAR!!!
        'super-user',
        'SEO'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Rol no permitido' + validRoles.join(', ') })
    }

    await db.connect();
    const user = await User.findById(userId);

    if (!user) {
        await db.disconnect();
        return res.status(404).json({ message: 'Usuario no encontrado' + userId });
    }

    user.role = role;
    await user.save();

    await db.disconnect();

    return res.status(200).json({ message: 'Usuario actualizado' })
}
