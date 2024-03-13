import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // const token = request.cookies.get("token")?.value || "";

  // const isAuthPath = pathname === "/auth";

  // if (isAuthPath && token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }

  // //* for getting the previous protected route path to redirect the user back when login
  // if (!isAuthPath && !token) {
  //   return NextResponse.redirect(
  //     new URL(`/auth?path=${pathname}`, request.nextUrl)
  //   );
  // }

  const token = request.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.redirect(
      new URL(`/?path=${pathname}`, request.nextUrl)
    );
  }
}

//* Add more protected routes here
export const config = {
  matcher: [
    "/auth",
    "/orders/:path*",
    "/favorites",
    "/rewards",
    "/referEarn",
    "/coupons",
    // "/cart/:path*",
    "/address/:path*",
    "/profile",
  ],
};
