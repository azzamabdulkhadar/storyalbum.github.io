import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type Role = "owner" | "member" | "anon";

/**
 * Returns the signed-in user and their site role.
 * Owner = first account (full control). Member = invited user.
 * Wrapped in React cache so one render pass = one query.
 */
export const getAuth = cache(async (): Promise<{
  user: { id: string; email?: string } | null;
  role: Role;
}> => {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { user: null, role: "anon" };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, role: "anon" };

  const { data } = await supabase
    .from("site_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  const role: Role = data?.role === "owner" ? "owner" : "member";
  return { user: { id: user.id, email: user.email }, role };
});
