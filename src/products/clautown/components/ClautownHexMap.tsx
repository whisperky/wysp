export const FAMILIES = [
  { name: 'Code', place: 'East', building: 'Codeworks', tone: 'code' },
  { name: 'Research', place: 'North-east', building: 'Code Library and Research Tower', tone: 'research' },
  { name: 'Test', place: 'North-west', building: 'Test Lab', tone: 'test' },
  { name: 'Build', place: 'West', building: 'Terminal Works', tone: 'build' },
  { name: 'Ship', place: 'South-west', building: 'Release Harbor', tone: 'ship' },
  { name: 'Delegate', place: 'South-east', building: 'Agent Guild and Integrations Market', tone: 'delegate' },
] as const;

const HEX_RADIUS = 34;
const HEX_STEP = Math.sqrt(3) * HEX_RADIUS;
const CENTRE = 200;

// Pointy-top hexes; the six families sit at 0, 60 … 300 degrees, east first.
function hexCentre(angle: number, distance: number) {
  const radians = (angle * Math.PI) / 180;
  return { x: CENTRE + distance * Math.cos(radians), y: CENTRE - distance * Math.sin(radians) };
}

function hexPoints(x: number, y: number, radius: number) {
  return Array.from({ length: 6 }, (_, corner) => {
    const angle = ((30 + 60 * corner) * Math.PI) / 180;
    return `${(x + radius * Math.cos(angle)).toFixed(1)},${(y - radius * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');
}

const FAMILY_HEXES = FAMILIES.map((family, index) => ({ ...family, ...hexCentre(60 * index, HEX_STEP) }));

const RING_TWO = [
  ...[0, 60, 120, 180, 240, 300].map((angle) => ({
    key: `corner-${angle}`,
    ...hexCentre(angle, 2 * HEX_STEP),
    water: [60, 180, 300].includes(angle),
  })),
  ...[30, 90, 150, 210, 270, 330].map((angle) => ({
    key: `edge-${angle}`,
    ...hexCentre(angle, Math.sqrt(3) * HEX_STEP),
    water: false,
  })),
];

export function DistrictMap() {
  const { x: codeX, y: codeY } = FAMILY_HEXES[0];

  return (
    <svg className="clautown-hex-map" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      {RING_TWO.map((hex) => (
        <polygon
          key={hex.key}
          className={hex.water ? 'clautown-hex-water' : 'clautown-hex-wild'}
          points={hexPoints(hex.x, hex.y, HEX_RADIUS)}
        />
      ))}
      {FAMILY_HEXES.map((hex) => (
        <g key={hex.name}>
          <polygon className={`clautown-hex-face clautown-hex-${hex.tone}`} points={hexPoints(hex.x, hex.y, HEX_RADIUS)} />
          <polygon className="clautown-hex-plate" points={hexPoints(hex.x, hex.y, HEX_RADIUS * 0.66)} />
          <text className="clautown-hex-label" x={hex.x} y={hex.y + 14}>
            {hex.name}
          </text>
        </g>
      ))}
      <polygon className="clautown-hex-hall" points={hexPoints(CENTRE, CENTRE, HEX_RADIUS)} />
      <path className="clautown-hall-roof" d="M193 194 L200 181 L207 194 Z" />
      <rect className="clautown-hall-body" x="193" y="194" width="14" height="13" />
      <line className="clautown-crane" x1={codeX + 7} y1={codeY + 6} x2={codeX + 7} y2={codeY - 14} />
      <line className="clautown-crane" x1={codeX - 6} y1={codeY - 14} x2={codeX + 12} y2={codeY - 14} />
      <line className="clautown-crane" x1={codeX - 6} y1={codeY - 14} x2={codeX - 6} y2={codeY - 4} />
      <rect className="clautown-hoarding" x={codeX - 10} y={codeY - 4} width="20" height="11" rx="1.5" />
      <circle className="clautown-live-dot" cx={codeX - 2} cy={codeY - 22} r="2.6" />
      <circle className="clautown-star" cx="48" cy="58" r="1.6" />
      <circle className="clautown-star" cx="352" cy="66" r="1.2" />
      <circle className="clautown-star" cx="360" cy="330" r="1.6" />
      <circle className="clautown-star" cx="40" cy="336" r="1.2" />
    </svg>
  );
}
