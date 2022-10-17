import { NextFetchEvent, NextRequest, NextResponse } from "next/server";



import * as jose from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {


    if (request.nextUrl.pathname.startsWith('/checkout')) {
        const response = NextResponse.next();

        // Getting cookies from the request
        const token = request.cookies.get('token');
        /* Setting the default value of the variable to false. */
        let isValidToken = false;

        /* Checking if the token is valid. */
        try {
            await jose.jwtVerify(token || '', new TextEncoder().encode(process.env.JWT_SECRET));
            isValidToken = true;
            return response;
        } catch (error) {
            console.error(`JWT Invalid or not signed in`, { error });
            isValidToken = false;
        }

        /* This is redirecting the user to the login page if the token is not valid. */
        if (!isValidToken) {
            const { pathname } = request.nextUrl;
            return NextResponse.redirect(
                new URL(`/auth/login?redirect=${pathname}`, request.url)
            );
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/checkout/:path*'],
};