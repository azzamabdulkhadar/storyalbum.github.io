"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { initSounds, isMuted, toggleMute, playChime } from "@/lib/sounds";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    initSounds();
    setMuted(isMuted());
  }, []);

  return (
    <button
      onClick={() => setMuted(toggleMute())}
      aria-label={muted ? "Turn sounds on" : "Turn sounds off"}
      title={muted ? "Sounds off" : "Sounds on"}
      className="fixed bottom-5 right-5 z-50 grid size-11 place-items-center rounded-full border border-blush/60 bg-white/85 text-rose shadow-[var(--shadow-polaroid)] backdrop-blur transition-transform hover:scale-105 active:scale-95"
    >
      {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      {!muted && (
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-dusty/40" />
      )}
    </button>
  );
}
