import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
    console.log("Inside middlewhere")
	const sessionCookie = getSessionCookie(request, {
        // Optionally pass config if cookie name, prefix or useSecureCookies option is customized in auth config.
		cookieName: "session_token",
		cookiePrefix: "better-auth",
		useSecureCookies: true,
    });
 
	if (!sessionCookie) {
        console.log("There is no cookie")
		return NextResponse.redirect(new URL("/", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/dashboard/:path*"], // Specify the routes the middleware applies to
};