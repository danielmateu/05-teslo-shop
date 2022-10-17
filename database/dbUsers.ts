import { db } from "./"
import { User } from "../models";
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async(email: string, password: string) => {

    await db.connect;
    const user = await User.findOne({ email });
    await db.disconnect;

    /* If the user does not exist, it returns null. */
    if (!user) {
        return null;
    }

    /* Comparing the password that the user entered with the password that is stored in the database. */
    if (!bcrypt.compareSync(password, user.password!)) {
        return null;
    }

    /* Destructuring the user object. */
    const { role, name, _id } = user;

    /* Returning the user object. */
    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
    }

}

//ESta funcion crea o verifica el usuario de Oauth

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {

    /* Connecting to the database and then finding the user by email. */
    await db.connect();
    /* Looking for a user in the database with the email that the user entered in the OAuth login. */
    const user = await User.findOne({ email: oAuthEmail });

    /* If the user exists, it returns the user. */
    if (user) {
        await db.disconnect();
        const { _id, name, email, role } = user;
        return { _id, name, email, role };
    }

    /* Creating a new user with the email and name that the user entered in the OAuth login. */
    const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client' });

    /* Saving the new user in the database and then disconnecting from the database. */
    await newUser.save();
    await db.disconnect();

    /* Returning the user object. */
    const { _id, name, email, role } = newUser;
    return { _id, name, email, role };
}
