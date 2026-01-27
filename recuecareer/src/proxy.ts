import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export default async function proxy(request: NextRequest) {
  return auth0.middleware(request);
}

export const config = {
  matcher: [
    "/myExperience",
    "/auth/login",
    "/auth/callback",
    "/auth/logout",
  ],
};
