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

	const url = request.nextUrl;
	// Check if the URL matches the pattern for a project page
  // This assumes your dynamic route is '/dashboard/project/[projectid]'
	// Check if the URL matches the base project path '/dashboard/project/[projectid]'
	if (url.pathname.startsWith('/dashboard/project/') 
			&& !url.pathname.includes('/overview') 
			&& !url.pathname.includes('/tasks') 
			&& !url.pathname.includes('/board') 
			&& !url.pathname.includes('/settings')) {
		const projectId = url.pathname.split('/')[3]; // Extract projectid from the URL
	
		// Redirect to the overview page for that project
		return NextResponse.redirect(new URL(`/dashboard/project/${projectId}/overview`, url));
	  }
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/dashboard/:path*"], // Specify the routes the middleware applies to
};