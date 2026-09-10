"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await createClient().auth.signOut();
        router.push("/");
        router.refresh();
      }}
      className="inline-flex items-center gap-2 rounded-full border border-blush bg-white px-5 py-2.5 text-sm font-semibold text-burgundy transition-all hover:-translate-y-0.5 hover:border-dusty"
    >
      <LogOut className="size-4" /> Sign out
    </button>
  );
}
