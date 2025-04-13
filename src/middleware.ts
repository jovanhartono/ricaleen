import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";
import { auth } from "../auth";

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing);

// Create a combined middleware function
export default auth((request: NextRequest) => {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return intlMiddleware(request); // <- handles redirect if not authenticated
  }
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
