"use client";

export const COLS = 26;
export const ROWS = 16;

export interface StaticBlock {
  c: number;
  r: number;
  thresholdLeftToRight: number;
  color: string;
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function hash2D(x: number, y: number): number {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453123);
}

function organicNoise(c: number, r: number): number {
  const n1 = hash2D(c, r);
  const n2 = hash2D(Math.floor(c / 2.6), Math.floor(r / 2.6));
  const n3 = hash2D(Math.floor(c / 5.2), Math.floor(r / 5.2));
  return (n1 * 0.45 + n2 * 0.35 + n3 * 0.2 - 0.5) * 0.38;
}

// Precomputed static block matrix (calculated once at module load, zero runtime allocations)
export const STATIC_BLOCKS: StaticBlock[] = (() => {
  const list: StaticBlock[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const noise = organicNoise(c, r);

      // Strict sweep from LEFT to RIGHT:
      // Column c = 0 (left edge) has low threshold (~0.10) -> dissolves FIRST!
      // Column c = 25 (right edge) has high threshold (~0.90) -> dissolves LAST!
      const norm = c / (COLS - 1);
      const thresholdLeftToRight = Math.max(0.04, Math.min(0.96, norm * 0.76 + noise + 0.12));

      const colorSeed = hash2D(c * 17.3 + 5.1, r * 29.7 + 11.9);
      let color: string;
      if (colorSeed < 0.56) {
        const p = Math.floor(colorSeed * 1000) % 4;
        color = p === 0 ? "#7c3aed" : p === 1 ? "#8b5cf6" : p === 2 ? "#6d28d9" : "#9333ea";
      } else if (colorSeed < 0.84) {
        const o = Math.floor(colorSeed * 1000) % 3;
        color = o === 0 ? "#07080f" : o === 1 ? "#0c0f18" : "#111422";
      } else {
        color = Math.floor(colorSeed * 1000) % 2 === 0 ? "#06b6d4" : "#38bdf8";
      }

      list.push({
        c,
        r,
        thresholdLeftToRight,
        color,
      });
    }
  }
  return list;
})();

/**
 * Pure 1:1 scrubbed pixel dissolve renderer.
 * Strictly dissolves from LEFT to RIGHT.
 * Solid, crisp, fully-opaque cyber voxels with zero muddy opacity fade.
 * - progress: 0.0 (fully covered in solid cyber voxels) to 1.0 (fully revealed & transparent).
 */
export function drawScrubbedDissolve(
  canvas: HTMLCanvasElement,
  progress: number
) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;

  // Fully revealed: clean canvas and return immediately
  if (progress >= 0.98) {
    ctx.clearRect(0, 0, w, h);
    return;
  }

  ctx.clearRect(0, 0, w, h);

  // 100% Solid, crisp cyber voxels (NO muddy alpha transparency fading)
  ctx.globalAlpha = 1.0;

  const cellW = w / COLS;
  const cellH = h / ROWS;

  for (let i = 0; i < STATIC_BLOCKS.length; i++) {
    const block = STATIC_BLOCKS[i];

    // Blocks dissolve away strictly from LEFT to RIGHT as progress increases
    if (progress < block.thresholdLeftToRight) {
      const x = block.c * cellW;
      const y = block.r * cellH;

      ctx.fillStyle = block.color;
      ctx.fillRect(x, y, cellW, cellH);

      // Fine digital circuit grid hairline
      ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, cellW, cellH);
    }
  }
}
