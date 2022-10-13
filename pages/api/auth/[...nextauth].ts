import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';




export default NextAuth({

    // OAuth authentication providers...
    providers: [

        Credentials({
            name: 'Custom login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@gmail.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' }
            },
            async authorize(credentials) {

                console.log({ credentials })
                //TODO validar contra base de datos

                return { name: 'Dani', email: 'dani@gmail.com', role: 'admin' };
            }
        }),

        /* A provider for Github. */
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),
    ],

    // Callbacks
    jwt: {
        // secret: process.env.JWT_SECRET_SEED, // deprecated
    },

    session: {
        maxAge: 2592000, /// 30d
        strategy: 'jwt',
        updateAge: 86400, // cada día
    },


    callbacks: {

        async jwt({ token, account, user }) {
            // console.log({ token, account, user });

            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {

                    case 'oauth':
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

});



