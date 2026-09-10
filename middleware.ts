export { middleware } from "@/lib/supabase/middleware";
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|textures|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
