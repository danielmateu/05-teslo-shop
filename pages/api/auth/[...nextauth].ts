import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import {dbUsers} from '../../../database'

export const authOptions: NextAuthOptions = {

    // OAuth authentication providers...
    providers: [

        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@gmail.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' }
            },
            async authorize(credentials) {
                console.log({ credentials })
                //TODO validar contra base de datos

                // return { name: 'Dani', email: 'dani@gmail.com', role: 'admin' };
                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
            }
        }),

        /* A provider for Github. */
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),
    ],

    callbacks: {

        async jwt({ token, account, user }) {
            // console.log({ token, account, user });

            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {

                    case 'oauth':
                        //TODO Crear usuario o verificar si existe en la DB
                        // token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
                        break;

                    case 'credentials':
                        token.user = user;
                        break;
                }

            }

            return token;
        },


        async session({ session, token, user }) {
            // console.log({ session, token, user });

            /* A property that is added to the `token` object. */
            session.accessToken = token.accessToken
            session.user = token.user as any;

            return session;
        }


    }

};

export default NextAuth(authOptions);



