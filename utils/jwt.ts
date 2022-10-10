import jwt from 'jsonwebtoken';


export const signToken = (_id: string, email: string) => {

    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    return jwt.sign(
        // payload
        { _id, email },

        // Seed
        process.env.JWT_SECRET_SEED,

        // Opciones
        { expiresIn: '30d' }
    )

}


export const isValidToken = (token: string): Promise<string> => {
    /* Checking if the JWT_SECRET_SEED is defined in the environment variables. If it is not defined, it
    will throw an error. */
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    if(token.length <= 10){
        return Promise.reject('JWT no es válido');
    }

    /* Checking if the token is valid. */
    return new Promise((resolve, reject) => {

        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('JWT no es válido');

                const { _id } = payload as { _id: string };

                resolve(_id);

            })
        } catch (error) {
            reject('JWT no es válido');
        }


    })

}