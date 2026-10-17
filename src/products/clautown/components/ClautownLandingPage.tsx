import { Check, CheckCircle2, Coins, Globe, Landmark, MessageCircle, Plug, ShieldCheck, Sparkles, Trophy, Users, X } from 'lucide-react';
import { AppLink } from '../../../components/navigation/AppLink';
import { CLAUTOWN_PLAY_HREF, CLAUTOWN_PRIVACY_HREF, CLAUTOWN_ROUTES, CLAUTOWN_TERMS_HREF } from '../config';
import { landingFaqs } from '../content';

const FAMILIES = [
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

function DistrictMap() {
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

export function LandingPage() {
  return (
    <main id="top">
      <header className="clautown-hero">
        <div className="clautown-wrap clautown-hero-inner">
          <div className="clautown-hero-copy">
            <span className="clautown-hero-badge">
              <span className="clautown-hero-tag">Live</span>
              Found your town free, in your browser
            </span>
            <h1>
              Watch your Claude Code work build a <span className="clautown-glow">3D town</span>.
            </h1>
            <p className="clautown-hero-lead">
              Every project becomes a district on a hex map. While Claude works, the buildings rise. Visit any
              town, cheer its districts, and see who is around right now.
            </p>
            <div className="clautown-actions">
              <AppLink className="clautown-btn clautown-btn-gold" href={CLAUTOWN_PLAY_HREF}>
                Play Clautown
              </AppLink>
              <AppLink className="clautown-btn clautown-btn-ghost" href={CLAUTOWN_ROUTES.how}>
                How it connects
              </AppLink>
            </div>
            <ul className="clautown-hero-trust">
              <li>
                <ShieldCheck size={16} aria-hidden="true" />
                Counts only, never your words
              </li>
              <li>
                <Plug size={16} aria-hidden="true" />
                Connects in one click
              </li>
              <li>
                <Coins size={16} aria-hidden="true" />
                Founding a town is free
              </li>
            </ul>
          </div>
          <figure className="clautown-map-stage">
            <DistrictMap />
            <figcaption className="clautown-map-caption">
              One project, one district: six department families around the Town Hall.
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="clautown-section" id="how" aria-labelledby="how-title">
        <div className="clautown-wrap">
          <div className="clautown-section-head">
            <span className="clautown-eyebrow">
              <span className="clautown-eyebrow-dot" />
              How it connects
            </span>
            <h2 id="how-title">Connect in three steps.</h2>
            <p>One click on the site, then one Enter key in Claude Code.</p>
          </div>
          <ol className="clautown-steps">
            <li className="clautown-plate clautown-step">
              <span className="clautown-step-num">Step 01</span>
              <h3>Name your town</h3>
              <p>Sign in on the site and pick a town name. Your town starts empty.</p>
            </li>
            <li className="clautown-plate clautown-step">
              <span className="clautown-step-num">Step 02</span>
              <h3>Press Connect Claude Code</h3>
              <p>
                The site opens Claude Code with a ready prompt. Press Enter, and the collector installs its hooks
                on your computer.
              </p>
            </li>
            <li className="clautown-plate clautown-step">
              <span className="clautown-step-num">Step 03</span>
              <h3>Watch it build</h3>
              <p>
                Claude Code calls the hooks while you work. When the first pulse arrives, the site shows
                Connected.
              </p>
            </li>
          </ol>
          <p className="clautown-note">
            Your town builds only from what Claude Code does after you connect. Past sessions are never read.
          </p>
        </div>
      </section>

      <section className="clautown-section clautown-section-alt" id="districts" aria-labelledby="districts-title">
        <div className="clautown-wrap">
          <div className="clautown-section-head">
            <span className="clautown-eyebrow">
              <span className="clautown-eyebrow-dot" />
              Districts
            </span>
            <h2 id="districts-title">Each project becomes a district.</h2>
            <p>
              A district has a 7-hex core. Its hall stands in the centre, and six department families stand around
              it. Each family grows through six tiers as Claude works.
            </p>
          </div>
          <div className="clautown-families">
            {FAMILIES.map((family) => (
              <article className={`clautown-family clautown-fam-${family.tone}`} key={family.name}>
                <div className="clautown-family-head">
                  <h3>{family.name}</h3>
                  <span className="clautown-family-place">{family.place}</span>
                </div>
                <p>{family.building}</p>
              </article>
            ))}
          </div>
          <ul className="clautown-points">
            <li>
              <CheckCircle2 size={18} aria-hidden="true" />
              While Claude works, the department that works shows a hoarding and a crane.
            </li>
            <li>
              <CheckCircle2 size={18} aria-hidden="true" />A timelapse replays the town from its first day.
            </li>
            <li>
              <CheckCircle2 size={18} aria-hidden="true" />
              Rename districts, and give them titles, mottos, emblems and colours.
            </li>
          </ul>
        </div>
      </section>

      <section className="clautown-section" id="capital" aria-labelledby="capital-title">
        <div className="clautown-wrap">
          <div className="clautown-section-head">
            <span className="clautown-eyebrow">
              <span className="clautown-eyebrow-dot" />
              Your capital
            </span>
            <h2 id="capital-title">The Town Hall is your capital.</h2>
            <p>It grows with your town level, and every achievement you earn shows on it.</p>
          </div>
          <div className="clautown-cards">
            <article className="clautown-plate">
              <Landmark size={24} className="clautown-card-icon" aria-hidden="true" />
              <h3>Civic hexes</h3>
              <p>
                Civic hexes open as your level rises: 1 at levels 1 to 3, 3 at levels 4 to 9, 7 at levels 10 to 29,
                and 19 from level 30.
              </p>
            </article>
            <article className="clautown-plate">
              <Trophy size={24} className="clautown-card-icon" aria-hidden="true" />
              <h3>Natural wonders</h3>
              <p>
                Eight wonders, each earned by one achievement: Glow Lake, Ancient Tree, Red Cliffs, Aurora Meadow,
                Crystal Cavern, Ice Peak, Twin Falls and Ember Volcano. You place each one by hand.
              </p>
            </article>
            <article className="clautown-plate">
              <Globe size={24} className="clautown-card-icon" aria-hidden="true" />
              <h3>Worlds and themes</h3>
              <p>
                Pick a world when you found your town: Isles, Mainland, Park City, Terraces or Caldera. Re-founding
                is possible after 180 days. Change the look any time with one of five themes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="clautown-section clautown-section-alt" id="visit" aria-labelledby="visit-title">
        <div className="clautown-wrap clautown-split">
          <div>
            <span className="clautown-eyebrow">
              <span className="clautown-eyebrow-dot" />
              Towns
            </span>
            <h2 id="visit-title">Visit, cheer and chat.</h2>
            <p>
              Every town has a public page at clautown.vercel.app/your-name. Anyone can visit. Only the owner can
              sync.
            </p>
          </div>
          <ul className="clautown-points">
            <li>
              <Users size={18} aria-hidden="true" />
              Follow a town, cheer a district, and sign the guestbook.
            </li>
            <li>
              <MessageCircle size={18} aria-hidden="true" />
              See who is in town right now, and chat in public rooms.
            </li>
            <li>
              <Sparkles size={18} aria-hidden="true" />
              Search, and get recommendations for towns like yours.
            </li>
            <li>
              <CheckCircle2 size={18} aria-hidden="true" />
              Eleven sample towns are always there, labelled sample.
            </li>
          </ul>
        </div>
      </section>

      <section className="clautown-section" id="world" aria-labelledby="world-title">
        <div className="clautown-wrap clautown-split">
          <div>
            <span className="clautown-eyebrow">
              <span className="clautown-eyebrow-dot" />
              World map
            </span>
            <h2 id="world-title">Found a country on a shared map.</h2>
            <p>
              At town level 5, and once your account is 48 hours old, your town can found a country. The shared map
              has 1,024 by 512 hexes and wraps from east to west.
            </p>
          </div>
          <ul className="clautown-points">
            <li>
              <CheckCircle2 size={18} aria-hidden="true" />
              Growth comes from real work. There is no war.
            </li>
            <li>
              <CheckCircle2 size={18} aria-hidden="true" />
              Nothing a player does can reduce another player’s goods, land or Fame.
            </li>
            <li>
              <CheckCircle2 size={18} aria-hidden="true" />
              Trade routes and alliances connect countries.
            </li>
            <li>
              <CheckCircle2 size={18} aria-hidden="true" />
              Countries work together on shared World Works to restore miracles.
            </li>
          </ul>
        </div>
      </section>

      <section className="clautown-section clautown-section-alt" id="privacy" aria-labelledby="privacy-title">
        <div className="clautown-wrap">
          <div className="clautown-section-head">
            <span className="clautown-eyebrow">
              <span className="clautown-eyebrow-dot" />
              Privacy
            </span>
            <h2 id="privacy-title">Counts and short labels, never your words.</h2>
            <p>
              The collector sends counts and labels from fixed lists. Every field it can send is listed in one table
              in the code, and the tests fail if the code and that table do not match.
            </p>
          </div>
          <div className="clautown-privacy-grid">
            <article className="clautown-plate clautown-privacy-sent">
              <h3>Sent, as counts and labels</h3>
              <ul>
                <li>
                  <Check size={18} aria-hidden="true" />
                  Counts of tool calls, turns, sessions, lines written, commits and errors
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  Token counts per project and day, with the model family and effort level
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  A project code (a hash of the folder path), and the project name or Project 1
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  Up to three file types from a fixed list, and one topic word per session
                </li>
                <li>
                  <Check size={18} aria-hidden="true" />
                  Whether Claude is working now, and what kind of work it does
                </li>
              </ul>
            </article>
            <article className="clautown-plate clautown-privacy-never">
              <h3>Never sent</h3>
              <ul>
                <li>
                  <X size={18} aria-hidden="true" />
                  Your prompts and Claude’s answers
                </li>
                <li>
                  <X size={18} aria-hidden="true" />
                  Code, file contents, commands and their output
                </li>
                <li>
                  <X size={18} aria-hidden="true" />
                  File names and paths, including the folder you work in
                </li>
                <li>
                  <X size={18} aria-hidden="true" />
                  Branch names, commit messages and repository names, unless you share them
                </li>
                <li>
                  <X size={18} aria-hidden="true" />
                  Your e-mail address, your Claude login, and cost or plan limits
                </li>
                <li>
                  <X size={18} aria-hidden="true" />
                  Chats on claude.ai, which cannot be seen
                </li>
              </ul>
            </article>
          </div>
          <div className="clautown-privacy-actions">
            <p>
              Check it yourself: run <code>node ~/.clautown/clautown.mjs preview</code>. It prints the exact data the
              next upload would send, and it sends nothing.
            </p>
            <div className="clautown-actions">
              <AppLink className="clautown-btn clautown-btn-ghost" href={CLAUTOWN_PRIVACY_HREF}>
                Read the privacy policy
              </AppLink>
              <AppLink className="clautown-btn clautown-btn-ghost" href={CLAUTOWN_TERMS_HREF}>
                Terms
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      <section className="clautown-section" id="faq" aria-labelledby="faq-title">
        <div className="clautown-wrap clautown-wrap-narrow">
          <div className="clautown-section-head">
            <span className="clautown-eyebrow">
              <span className="clautown-eyebrow-dot" />
              FAQ
            </span>
            <h2 id="faq-title">Questions people ask first.</h2>
          </div>
          <div className="clautown-faq">
            {landingFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <div>
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="clautown-final" id="play" aria-labelledby="play-title">
        <div className="clautown-wrap">
          <h2 id="play-title">Start with one Claude Code project.</h2>
          <p>
            Connect once. The site shows Connected when the first pulse from Claude Code arrives, and your district
            keeps growing while you work.
          </p>
          <div className="clautown-actions">
            <AppLink className="clautown-btn clautown-btn-gold" href={CLAUTOWN_PLAY_HREF}>
              Play Clautown
            </AppLink>
            <AppLink className="clautown-btn clautown-btn-ghost" href={CLAUTOWN_ROUTES.how}>
              How it connects
            </AppLink>
          </div>
        </div>
      </section>
    </main>
  );
}
