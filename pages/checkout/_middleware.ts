import { NextFetchEvent, NextRequest, NextResponse } from "next/server";



import * as jose from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {


    if (request.nextUrl.pathname.startsWith('/checkout')) {
        const response = NextResponse.next();

        // Getting cookies from the request
        const token = request.cookies.get('token');
        let isValidToken = false;

        try {
            await jose.jwtVerify(token || '', new TextEncoder().encode(process.env.JWT_SECRET));
            isValidToken = true;
            return NextResponse.next();
        } catch (error) {
            console.error(`JWT Invalid or not signed in`, { error });
            isValidToken = false;
        }

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