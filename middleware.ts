// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {

    // if(req.nextUrl.pathname.startsWith('/admin/')){
    //     /* Getting the pathname and removing the `/admin/` from it. */
    //     const role = req.nextUrl.pathname.replace('/admin/','');
       
    //     console.log(role);
    //     const noneValidRole = 'client';
    //     if(noneValidRole.match(role)){
    //         const url=req.nextUrl.clone()
    //         url.pathname = '/api/bad-request';
    //         return NextResponse.rewrite(url)
    //     }
    // }
        const role = req.cookies.get('next-auth.session-token');
        console.log({role})

        if(req.nextUrl.pathname.includes('/admin')){
            console.log('validating admin')
        }

        return NextResponse.next()

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/admin','/admin/:path/',
    ]
}