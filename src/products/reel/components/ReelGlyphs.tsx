/* Small inline SVG glyphs used across the Reel microsite. */

export function ChromeGlyph() {
  return (
    <svg className="reel-chrome-glyph" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 24 6.7 14A20 20 0 0 1 41.3 14Z" />
      <path fill="#FBBC05" d="M24 24 41.3 14A20 20 0 0 1 24 44Z" />
      <path fill="#34A853" d="M24 24 24 44A20 20 0 0 1 6.7 14Z" />
      <circle cx="24" cy="24" r="9.4" fill="#fff" />
      <circle cx="24" cy="24" r="6.4" fill="#4285F4" />
    </svg>
  );
}

export function Check({ size = 16, sw = 2 }: { size?: number; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5 10 17l9-10"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Cross() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
