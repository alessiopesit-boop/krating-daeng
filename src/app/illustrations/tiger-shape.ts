// Stylized charging tiger silhouette used inside Logo, TigerBadge and PosterBundle.
// Returns the raw <g> markup so the parent SVG can position/scale it freely.
export function tigerShape(opts: { color?: string; ink?: string; flip?: boolean } = {}): string {
  const color = opts.color ?? '#c8261c';
  const ink = opts.ink ?? '#1a1410';
  const flipAttr = opts.flip ? 'scale(-1 1)' : '';
  return `
    <g transform="${flipAttr}">
      <path d="M 0 0 C -8 -22, 12 -32, 28 -28 C 38 -25, 46 -18, 50 -8 C 54 2, 50 14, 42 18 L 40 24 L 32 22 L 28 28 L 20 24 L 16 30 L 8 26 L 4 32 L -2 26 L -8 28 L -12 22 L -10 12 C -16 8, -18 -4, -10 -8 Z"
            fill="${color}" stroke="${ink}" stroke-width="2.2" stroke-linejoin="round" />
      <path d="M 38 -22 C 48 -28, 60 -26, 64 -16 C 68 -8, 62 -2, 56 0 L 60 4 L 52 6 L 50 -2 L 42 -4 Z"
            fill="${color}" stroke="${ink}" stroke-width="2.2" stroke-linejoin="round" />
      <path d="M 54 -22 L 58 -28 L 62 -22 Z" fill="${ink}" />
      <circle cx="54" cy="-14" r="1.5" fill="${ink}" />
      <path d="M 14 -18 L 18 -10" stroke="${ink}" stroke-width="2" stroke-linecap="round" />
      <path d="M 22 -22 L 24 -12" stroke="${ink}" stroke-width="2" stroke-linecap="round" />
      <path d="M 30 -22 L 32 -12" stroke="${ink}" stroke-width="2" stroke-linecap="round" />
      <path d="M 0 -8 L 4 0" stroke="${ink}" stroke-width="2" stroke-linecap="round" />
      <path d="M -4 0 L 0 8" stroke="${ink}" stroke-width="2" stroke-linecap="round" />
      <path d="M -10 -4 C -22 -10, -28 4, -20 12 C -16 16, -10 14, -8 8"
            stroke="${ink}" stroke-width="2.2" fill="none" stroke-linecap="round" />
    </g>
  `;
}
