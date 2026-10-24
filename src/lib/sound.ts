"use client";

/**
 * Web Audio API Sound Synthesizer
 * Generates tactile micro-audio chimes and ticks without external mp3 files.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private volume: number = 0.25;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      const storedMute = localStorage.getItem("rendo_sfx_muted");
      this.muted = storedMute !== null ? storedMute === "true" : false;

      // Lazy unlock on first interaction
      const unlock = () => {
        this.init();
        window.removeEventListener("click", unlock);
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("touchstart", unlock);
      };
      window.addEventListener("click", unlock);
      window.addEventListener("keydown", unlock);
      window.addEventListener("touchstart", unlock);
    }
  }

  private init() {
    if (this.ctx || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch {
      // Audio not supported or blocked
    }
  }

  private ensure() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("rendo_sfx_muted", String(muted));
    }
    this.notify();
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public subscribe(cb: (muted: boolean) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.muted));
  }

  /** Subtle hover tick */
  public playHover() {
    if (this.muted) return;
    this.ensure();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(640, t + 0.03);

      gain.gain.setValueAtTime(this.volume * 0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {
      // ignore audio errors
    }
  }

  /** Card expand signature chime */
  public playOpen() {
    if (this.muted) return;
    this.ensure();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [440, 659.25].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t + i * 0.04);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.25, t + i * 0.04 + 0.18);

        gain.gain.setValueAtTime(0.001, t + i * 0.04);
        gain.gain.linearRampToValueAtTime(this.volume * 0.25, t + i * 0.04 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + i * 0.04);
        osc.stop(t + i * 0.04 + 0.25);
      });
    } catch {
      // ignore
    }
  }

  /** Card collapse / back tone */
  public playClose() {
    if (this.muted) return;
    this.ensure();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(560, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.12);

      gain.gain.setValueAtTime(this.volume * 0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.15);
    } catch {
      // ignore
    }
  }

  /** Tab click / filter switch */
  public playTab() {
    if (this.muted) return;
    this.ensure();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.exponentialRampToValueAtTime(840, t + 0.04);

      gain.gain.setValueAtTime(this.volume * 0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch {
      // ignore
    }
  }

  /** Success chime (e.g. email copy or form action) */
  public playSuccess() {
    if (this.muted) return;
    this.ensure();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + idx * 0.07);

        gain.gain.setValueAtTime(0.001, t + idx * 0.07);
        gain.gain.linearRampToValueAtTime(this.volume * 0.22, t + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.07);
        osc.stop(t + idx * 0.07 + 0.22);
      });
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
