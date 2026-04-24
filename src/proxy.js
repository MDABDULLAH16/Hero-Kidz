import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute=["/dashboard","/cart","/checkout","/orders"]
// This function can be marked `async` if using `await` inside
export async function proxy(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    //   return  NextResponse.redirect(new URL("/", request.url));
    const isAuthenticated = Boolean(token);
 const reqPath= req.nextUrl.pathname;
    const isPrivateRoute = privateRoute.some(route => reqPath.startsWith(route));
    if (isPrivateRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL(`/login?callbackUrl=${ req.url}`, req.url));
    }
    
 
    
    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/dashboard/:path*", "/cart", "/checkout/:path*", "/orders/:path*"],
};
