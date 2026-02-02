import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export default async function proxy(request: NextRequest) {
  return auth0.middleware(request);
}

export const config = {
  matcher: [
    "/auth/:path*", 
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)", 
    "/dashboard/:path*",
    "/jobRequirementExtractor/:path*",
    "/autoApply/:path*",
    "/settings/:path*"
  ],
};

