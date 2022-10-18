import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {

        const session = await getToken({req, secret:process.env.NEXTAUTH_SECRET});

        console.log({session});

        if(!session){
            const requestedPage = req.page.name;
            return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
        }

        return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/checkout/:path*'],
};