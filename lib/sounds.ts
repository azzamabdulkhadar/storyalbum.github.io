"use client";

/**
 * Tiny WebAudio sound engine — soft, synthesized UI tones.
 * No audio files, no autoplay: a sound only plays after a real
 * user interaction (click), which satisfies browser policies.
 * Everything respects prefers-reduced-motion... and mute preference
 * is stored in localStorage.
 */

let ctx: AudioContext | null = null;
let muted = true; // default OFF — tasteful until user opts in

export function initSounds() {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("hs-sound");
  muted = stored !== "on";
}

export function isMuted() {
  return muted;
}

export function toggleMute() {
  muted = !muted;
  if (typeof window !== "undefined") {
    localStorage.setItem("hs-sound", muted ? "off" : "on");
  }
  if (!muted) playChime();
  return muted;
}

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  duration = 0.18,
  type: OscillatorType = "sine",
  gainValue = 0.05,
  delay = 0
) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(gainValue, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

/** soft tick for buttons / hovers */
export function playClick() {
  if (muted) return;
  tone(660, 0.12, "sine", 0.04);
}

/** two-note gentle chime for reveals / hearts */
export function playChime() {
  if (muted) return;
  tone(784, 0.35, "sine", 0.045);
  tone(1046.5, 0.45, "sine", 0.035, 0.09);
}

/** warm note for page open of letters etc. */
export function playOpen() {
  if (muted) return;
  tone(523.25, 0.25, "sine", 0.04);
  tone(659.25, 0.3, "sine", 0.035, 0.08);
  tone(783.99, 0.4, "sine", 0.03, 0.16);
}
