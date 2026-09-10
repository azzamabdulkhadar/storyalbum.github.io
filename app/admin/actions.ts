"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAuth } from "@/lib/auth";
import type { ActionResult } from "@/app/contribute/actions";

async function requireOwner() {
  const { role } = await getAuth();
  return role === "owner";
}

function randomCode() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let s = "";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  for (const b of bytes) s += alphabet[b % alphabet.length];
  return `HER-${s.slice(0, 4)}-${s.slice(4)}`;
}

/** Owner-only: create a single-use invite code. */
export async function generateInviteCode(): Promise<
  ActionResult & { code?: string }
> {
  if (!(await requireOwner()))
    return { ok: false, message: "Owner access required." };

  const supabase = await createClient();
  const code = randomCode();
  const { error } = await supabase.from("signup_codes").insert({ code });
  if (error) return { ok: false, message: "Couldn't generate the code." };
  revalidatePath("/admin");
  return { ok: true, message: "Invite code created ✓", code };
}

/** Owner-only: list unused codes. */
export async function listInviteCodes() {
  if (!(await requireOwner())) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("signup_codes")
    .select("code, created_at, used_by")
    .order("created_at", { ascending: false })
    .limit(10);
  return data ?? [];
}

/** Owner-only: add a song to the soundtrack (optional audio upload). */
export async function addSong(formData: FormData): Promise<ActionResult> {
  if (!(await requireOwner()))
    return { ok: false, message: "Owner access required." };

  const title = String(formData.get("title") ?? "").trim().slice(0, 120);
  const artist = String(formData.get("artist") ?? "").trim().slice(0, 120);
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 300);
  const duration = String(formData.get("duration") ?? "").trim().slice(0, 8);
  const audio = formData.get("audio") as File | null;

  if (title.length < 1) return { ok: false, message: "Song title is required." };
  if (audio && audio.size > 0) {
    if (audio.size > 15 * 1024 * 1024)
      return { ok: false, message: "Audio file is larger than 15 MB." };
    if (!audio.type.startsWith("audio/"))
      return { ok: false, message: "That file isn't audio." };
  }

  const supabase = await createClient();
  let audioPath: string | null = null;

  if (audio && audio.size > 0) {
    const ext = audio.name.split(".").pop()?.toLowerCase() ?? "mp3";
    audioPath = `${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("audio")
      .upload(audioPath, audio, { contentType: audio.type });
    if (upErr) return { ok: false, message: "Audio upload failed — try again." };
  }

  const { error } = await supabase.from("songs").insert({
    title,
    artist,
    reason,
    duration: duration || null,
    audio_url: audioPath,
  });
  if (error) {
    if (audioPath) await supabase.storage.from("audio").remove([audioPath]);
    return { ok: false, message: "Couldn't save the song — try again." };
  }
  revalidatePath("/admin");
  return { ok: true, message: `“${title}” added to the soundtrack ✓` };
}

/** Owner-only: add a timeline chapter. */
export async function addChapter(formData: FormData): Promise<ActionResult> {
  if (!(await requireOwner()))
    return { ok: false, message: "Owner access required." };

  const year = String(formData.get("year") ?? "").trim().slice(0, 10);
  const title = String(formData.get("title") ?? "").trim().slice(0, 120);
  const description = String(formData.get("description") ?? "").trim().slice(0, 500);
  if (year.length < 2 || title.length < 2)
    return { ok: false, message: "Year and title are required." };

  const supabase = await createClient();
  const { count } = await supabase
    .from("chapters")
    .select("*", { count: "exact", head: true });
  const { error } = await supabase
    .from("chapters")
    .insert({ year, title, description, sort_order: (count ?? 0) + 1 });
  if (error) return { ok: false, message: "Couldn't save the chapter." };
  revalidatePath("/admin");
  return { ok: true, message: `Chapter “${title}” added ✓` };
}

type Table = "quotes" | "memories" | "letters";

/** Owner-only: toggle visibility of a row. */
export async function toggleVisibility(
  table: Table,
  id: string,
  makePublic: boolean
): Promise<ActionResult> {
  if (!(await requireOwner()))
    return { ok: false, message: "Owner access required." };

  const supabase = await createClient();
  const patch =
    table === "letters" ? { is_private: !makePublic } : { is_public: makePublic };
  const { error } = await supabase.from(table).update(patch).eq("id", id);
  if (error) return { ok: false, message: "Update failed." };
  revalidatePath("/admin");
  return { ok: true, message: makePublic ? "Published ✓" : "Unpublished ✓" };
}

/** Owner-only: delete a row. */
export async function deleteRow(table: Table, id: string): Promise<ActionResult> {
  if (!(await requireOwner()))
    return { ok: false, message: "Owner access required." };

  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, message: "Delete failed." };
  revalidatePath("/admin");
  return { ok: true, message: "Deleted ✓" };
}
