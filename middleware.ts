import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Enable redirect for all root paths
    "/",
    // Enable all paths with locales
    "/(ru|en|ky)/:path*",
    // Exclude static files, api routes, admin and internal paths
    "/((?!_next|_vercel|api|admin|.*\\..*).*)",
  ],
};
