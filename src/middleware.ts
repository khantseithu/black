import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request) => {
  console.log("Middleware invoked with request:", request.url);

  const isPublic = isPublicPage(request);
  const isAuthenticated = isAuthenticatedNextjs();

  console.log("Is public page:", isPublic);
  console.log("Is authenticated:", isAuthenticated);

  if (!isPublic && !isAuthenticated) {
    console.log("Redirecting to /auth");
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  if (isPublic && isAuthenticated) {
    console.log("Redirecting to /");
    return nextjsMiddlewareRedirect(request, "/");
  }

  console.log("No redirection needed");
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
