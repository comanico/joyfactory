import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isSiteReady } from "@/lib/siteReady";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUnderConstructionRoute = createRouteMatcher(["/under-construction"]);

export default clerkMiddleware(async (auth, req) => {
  const ready = isSiteReady();

  if (!ready) {
    if (!isUnderConstructionRoute(req)) {
      return NextResponse.redirect(new URL("/under-construction", req.url));
    }
    return;
  }

  if (isUnderConstructionRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
