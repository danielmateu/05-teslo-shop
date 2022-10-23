import { getSession } from "next-auth/react";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest | any , ev: NextFetchEvent){

    const cookie = req.headers.get('cookie');

    const session: any = await getSession({ req: {headers: {cookie}} as any });
    const url = req.nextUrl.clone();

    if(!session){
        const requestedPage = req.nexturl.pathname;
        return NextResponse.redirect(`${url.origin}/auth/login?prev=${requestedPage}`)
    }

    const validRoles = ['admin', 'super-user', 'SEO'];

    if(!validRoles.includes(session.user.role)){
        return NextResponse.redirect(url.origin);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/address', '/admin', ]
}