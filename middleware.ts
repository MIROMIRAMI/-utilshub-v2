import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // publicRoutes يحدد المسارات التي يمكن لأي شخص الوصول إليها،
  // سواء كان مسجلاً أم لا. أي مسار آخر سيكون محميًا تلقائيًا.
  publicRoutes: [
    "/",
    "/tools",
    "/about",
    "/contact",
    "/faq",
    "/terms",
    "/blog",
    "/blog/(.*)", // يجعل كل المقالات الفردية عامة
    "/health-hub",
    "/real-estate-hub",
    "/dev-hub",
    "/date-time-hub",
    "/game-hub",
    "/scientific-calculator",
    "/timer",
    "/unit-converter",
    "/percentage",
    "/tip-calculator",
    "/bmi",
    "/age"
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};