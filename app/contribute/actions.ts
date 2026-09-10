"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getAuth } from "@/lib/auth";

export type ActionResult = { ok: boolean; message: string };

const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function clean(text: unknown, max: number): string {
  return String(text ?? "").trim().slice(0, max);
}

/** Upload a photo to the member's own private storage folder. */
export async function uploadPhoto(formData: FormData): Promise<ActionResult> {
  const { user } = await getAuth();
  if (!user) return { ok: false, message: "You need to sign in first." };

  const file = formData.get("photo") as File | null;
  const title = clean(formData.get("title"), 120) || "Untitled memory";
  const note = clean(formData.get("note"), 500);
  const category = clean(formData.get("category"), 40) || "Random";
  const makePublic = formData.get("is_public") === "on";

  if (!file || file.size === 0) return { ok: false, message: "Choose a photo first." };
  if (file.size > MAX_PHOTO_BYTES) return { ok: false, message: "Photo is larger than 8 MB." };
  if (!ALLOWED_PHOTO_TYPES.includes(file.type))
    return { ok: false, message: "Only JPG, PNG, WebP or GIF photos are allowed." };

  const supabase = await createClient();
  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${user.id}/${Date.now()}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from("photos")
    .upload(path, file, { contentType: file.type });
  if (upErr) return { ok: false, message: "Upload failed — please try again." };

  const { error: dbErr } = await supabase.from("memories").insert({
    title,
    description: note,
    category,
    image_path: path,
    is_public: makePublic,
    author_id: user.id,
    memory_date: new Date().toISOString().slice(0, 10),
  });
  if (dbErr) {
    await supabase.storage.from("photos").remove([path]); // don't orphan files
    return { ok: false, message: "Couldn't save the memory — try again." };
  }

  revalidatePath("/contribute");
  return { ok: true, message: makePublic ? "Photo published ✓" : "Photo saved privately ✓" };
}

/** Add a shayari / lovely line. */
export async function addQuote(formData: FormData): Promise<ActionResult> {
  const { user } = await getAuth();
  if (!user) return { ok: false, message: "You need to sign in first." };

  const text = clean(formData.get("text"), 600);
  const category = clean(formData.get("category"), 40) || "Emotional";
  const language = clean(formData.get("language"), 20) || "hinglish";
  const kind = clean(formData.get("kind"), 20) === "line" ? "line" : "shayari";
  const makePublic = formData.get("is_public") === "on";

  if (text.length < 5) return { ok: false, message: "That's a little too short." };

  const supabase = await createClient();
  const { error } = await supabase.from("quotes").insert({
    text,
    category: kind === "line" ? `${category}` : category,
    language,
    is_public: makePublic,
    author_id: user.id,
  });
  if (error) return { ok: false, message: "Couldn't save — try again." };

  revalidatePath("/contribute");
  return { ok: true, message: makePublic ? "Published ✓" : "Saved privately ✓" };
}

/** Add a letter (private by default). */
export async function addLetter(formData: FormData): Promise<ActionResult> {
  const { user } = await getAuth();
  if (!user) return { ok: false, message: "You need to sign in first." };

  const title = clean(formData.get("title"), 120);
  const body = clean(formData.get("body"), 4000);
  const makePublic = formData.get("is_public") === "on";

  if (title.length < 3) return { ok: false, message: "Give the letter a title." };
  if (body.length < 20) return { ok: false, message: "Letters deserve a few more words." };

  const supabase = await createClient();
  const { error } = await supabase.from("letters").insert({
    title,
    content: body.split(/\n{2,}/).filter(Boolean), // paragraphs as jsonb
    is_private: !makePublic,
    author_id: user.id,
  });
  if (error) return { ok: false, message: "Couldn't save — try again." };

  revalidatePath("/contribute");
  return { ok: true, message: makePublic ? "Letter published ✓" : "Letter sealed privately ✓" };
}
