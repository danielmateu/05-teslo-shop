import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';


// import { NextAuthOptions } from 'next-auth';
import {dbUsers} from '../../../database'

// export const authOptions: NextAuthOptions = {
export default NextAuth({

    
    // OAuth authentication providers...
    providers: [
        
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@gmail.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' }
            },
            async authorize(credentials) {
                // console.log({ credentials })
                //TODO validar contra base de datos
                // return { name: 'Dani', email: 'dani@gmail.com', role: 'admin' };
                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
            }
        }),

        /* A provider for Github. */
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '' ,
        }),
    ],

    //Custom Pages
    /* Telling next-auth to use the pages in the `pages/auth` folder. */
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },

    /* Setting the session to expire in 3 days and update the session every 24 hours. */
    session: {
        maxAge: 2592000, //3d
        strategy: 'jwt',
        updateAge: 86400,

    },

    callbacks: {

        async jwt({ token, account, user }) {
            // console.log({ token, account, user });

            if (account) {
                /* Adding the access token to the token object. */
                token.accessToken = account.access_token;

                switch (account.type) {

                   /* Creating a user in the database if it doesn't exist. */
                    case 'oauth':
                        //TODO Crear usuario o verificar si existe en la DB
                        token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '' );
                        break;

                    /* Adding the user to the token. */
                    case 'credentials':
                        token.user = user;
                        break;
                }

            }

            /* Returning the token object to the next-auth library. */
            return token;
        },


        async session({ session, token, user }) {
            // console.log({ session, token, user });

            /* A property that is added to the `token` object. */
            session.accessToken = token.accessToken
            /* Casting the `token.user` object to `any` so that it can be assigned to `session.user`. */
            session.user = token.user as any;

            /* Returning the session object to the next-auth library. */
            return session;
        },


    }

});

// export default NextAuth(authOptions);




