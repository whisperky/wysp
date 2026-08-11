/* Small inline stroke glyphs used across the Klinex microsite.
   Mirrors the design's inline icon set; stroke-based, currentColor. */

type GlyphProps = { size?: number; sw?: number };

export function Check({ size = 16, sw = 2 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Spark({ size = 16, sw = 1.6 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  );
}

export function Play({ size = 16 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function Shield({ size = 16, sw = 1.6 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5 4 6v6c0 5 3.4 9.2 8 10.5 4.6-1.3 8-5.5 8-10.5V6l-8-3.5Z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" />
      <path d="m8.6 12 2.2 2.2 4.6-4.8" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wand({ size = 16, sw = 1.7 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 16 8m0 0 3-3M16 8l-3-3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="m18 13 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13Z" stroke="currentColor" strokeWidth={sw * 0.8} strokeLinejoin="round" />
    </svg>
  );
}

export function Cube({ size = 16, sw = 1.6 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  );
}

export function Layers({ size = 16, sw = 1.6 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 3 9 4-9 4-9-4 9-4ZM3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  );
}

export function Share({ size = 16, sw = 1.7 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="2.6" stroke="currentColor" strokeWidth={sw} />
      <circle cx="6" cy="12" r="2.6" stroke="currentColor" strokeWidth={sw} />
      <circle cx="18" cy="19" r="2.6" stroke="currentColor" strokeWidth={sw} />
      <path d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}

export function Fork({ size = 16, sw = 1.7 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="5" r="2.4" stroke="currentColor" strokeWidth={sw} />
      <circle cx="18" cy="5" r="2.4" stroke="currentColor" strokeWidth={sw} />
      <circle cx="12" cy="19" r="2.4" stroke="currentColor" strokeWidth={sw} />
      <path d="M6 7.4V10c0 1.2 1 2 2 2h8c1 0 2-.8 2-2V7.4M12 12v4.6" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Info({ size = 16, sw = 1.7 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={sw} />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRight({ size = 16, sw = 1.8 }: GlyphProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
