// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';


export async function middleware(req: NextRequest) {

    try {
        await jose.jwtVerify(req.cookies.get('token') as string,
            new TextEncoder().encode(process.env.JWT_SECRET_SEED));

        return NextResponse.next();


    } catch (error) {

        return NextResponse.redirect(`http://localhost:3000/auth/login?p=${config.matcher}`);
    }


}

export const config = {
    matcher: '/checkout/address',
};