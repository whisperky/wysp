import {
  ArrowRight,
  Check,
  CheckCircle2,
  Coins,
  History,
  Layers,
  MessageCircle,
  Play,
  Plug,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { AppLink } from '../../../components/navigation/AppLink';
import {
  ART_ROOT,
  ASSET_ROOT,
  CLAUTOWN_DEMO_HREF,
  CLAUTOWN_PLAY_HREF,
  CLAUTOWN_PRIVACY_HREF,
  CLAUTOWN_TERMS_HREF,
  SHOTS_ROOT,
  STILLS_ROOT,
} from '../config';
import { landingFaqs } from '../content';
import { FilmDialog, HeroVideo } from './ClautownFilm';
import { DistrictMap, FAMILIES } from './ClautownHexMap';

const STORY = [
  {
    still: 'night-build',
    width: 1600,
    height: 716,
    position: '0% 50%',
    alt: 'A night district where a golden comet streaks into a building wrapped in scaffolding.',
    title: 'Every session builds it.',
    text: 'Claude Code calls small hooks while you work. The department that is working shows a hoarding and a crane, so the town builds live.',
  },
  {
    still: 'isles-day',
    width: 1600,
    height: 676,
    alt: 'A sunlit archipelago of islands, with a beam of light rising from the capital.',
    title: 'It grows while you work.',
    text: 'Every project is a district. Its buildings climb through the tiers as the work piles up, and a timelapse replays your town from its first day.',
  },
  {
    still: 'capital-dusk',
    width: 1600,
    height: 716,
    alt: 'A palace capital with towers, a rainbow arch and glowing landmarks at dusk.',
    title: 'Your capital grows with you.',
    text: 'Your Town Hall is a palace. Civic hexes open around it as your town level rises, and a cup stands on its plinth for every achievement.',
  },
];

const APP_POINTS = [
  { icon: Layers, title: 'A district for every project', text: 'Labels show each project and its tier.' },
  { icon: History, title: 'A timeline from day one', text: 'Scrub back and replay how the town grew.' },
  { icon: Radio, title: 'Live while Claude works', text: 'Press Live to watch the town build as Claude works.' },
];

const THEMES = [
  { file: 'theme-archipelago.webp', name: 'Tropical', alt: 'A tropical island town with a white castle, farms and cherry blossom.' },
  { file: 'theme-autumn.webp', name: 'Lantern Valley', alt: 'The same island town at dusk, warm with lantern light.' },
  { file: 'theme-dune.webp', name: 'Dune Oasis', alt: 'The same island town set in golden desert dunes with camels.' },
  { file: 'theme-skyisles.webp', name: 'Sky Isles', alt: 'The same island town floating among pink clouds, with an airship.' },
];

const PIECES = [
  { file: 'monument-pagoda.webp', kind: 'Monument', name: 'Pagoda of Five Stories' },
  { file: 'monument-clock-tower.webp', kind: 'Monument', name: 'Great Clock Tower' },
  { file: 'monument-amphitheatre.webp', kind: 'Monument', name: 'Grand Amphitheatre' },
  { file: 'monument-marble-palace.webp', kind: 'Monument', name: 'Marble Palace and Pool' },
  { file: 'monument-water-gate.webp', kind: 'Monument', name: 'Gate in the Water' },
  { file: 'style-bazaar.webp', kind: 'Style', name: 'Desert Bazaar' },
  { file: 'style-cathedral.webp', kind: 'Style', name: 'Cathedral Quarter' },
  { file: 'style-eastern.webp', kind: 'Style', name: 'Eastern Court' },
  { file: 'style-future.webp', kind: 'Style', name: 'Future City' },
  { file: 'airship-whale.webp', kind: 'Airship', name: 'Whale Ship' },
  { file: 'airship-steampunk.webp', kind: 'Airship', name: 'Steampunk Airship' },
  { file: 'airship-galleon.webp', kind: 'Airship', name: 'Crystal Galleon' },
];

export function LandingPage() {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <main id="top">
      <header className="clautown-hero">
        <HeroVideo />
        <div className="clautown-wrap clautown-hero-inner">
          <div className="clautown-hero-copy">
            <span className="clautown-badge">
              <span className="clautown-badge-tag">Live</span>
              Founding a town is free
            </span>
            <h1>
              Your town grows every time you code with <em>Claude</em>.
            </h1>
            <p className="clautown-hero-lead">
              Claude builds your town while you work. Every Claude Code project becomes a district in a living 3D
              world, and its buildings rise as the work piles up.
            </p>
            <div className="clautown-actions">
              <AppLink className="clautown-btn clautown-btn-gold clautown-btn-lg" href={CLAUTOWN_PLAY_HREF}>
                Play Clautown
                <ArrowRight size={18} aria-hidden="true" />
              </AppLink>
              <button
                type="button"
                className="clautown-btn clautown-btn-ghost clautown-btn-lg"
                onClick={() => setFilmOpen(true)}
              >
                <Play size={16} aria-hidden="true" />
                Watch the film
                <span className="clautown-btn-meta">1:00</span>
              </button>
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
                Free to found a town
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="clautown-section" id="story" aria-labelledby="story-title">
        <div className="clautown-wrap">
          <div className="clautown-head">
            <span className="clautown-eyebrow">The idea</span>
            <h2 id="story-title">
              What if your Claude Code history was a <em>city</em>?
            </h2>
            <p>Clautown makes it one. Connect once and keep coding. The town does the rest.</p>
          </div>
          <ol className="clautown-story">
            {STORY.map((item, index) => (
              <li className="clautown-shot" key={item.title}>
                <div className="clautown-shot-image">
                  <img
                    src={`${STILLS_ROOT}/${item.still}.webp`}
                    width={item.width}
                    height={item.height}
                    style={{ objectPosition: item.position }}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="clautown-shot-body">
                  <span className="clautown-shot-num">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="clautown-section clautown-section-alt" id="app" aria-labelledby="app-title">
        <div className="clautown-wrap">
          <div className="clautown-head clautown-head-center">
            <span className="clautown-eyebrow">The real app</span>
            <h2 id="app-title">
              Not a mock-up.
              <br />
              This is the <em>town view</em>.
            </h2>
            <p>
              A sample town, as the app shows it today. Every project is a labelled district. Click one to see its
              project, its Claude model shares and its effort.
            </p>
          </div>
          <figure className="clautown-app">
            <div className="clautown-screen">
              <div className="clautown-screen-bar" aria-hidden="true">
                <span className="clautown-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="clautown-url">clautown.com/u/demo</span>
              </div>
              <img
                src={SHOTS_ROOT + '/town-hud.webp'}
                width={1920}
                height={1080}
                alt="The Clautown town view: an island town with labelled districts, a stats bar on top and a timeline with a Live button at the bottom."
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="clautown-widget">
              <img
                src={SHOTS_ROOT + '/district-widget.webp'}
                width={684}
                height={1312}
                alt="A district panel showing its project details, a bar of Claude model shares and effort levels."
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              The sample town “Atlas Archipelago”.{' '}
              <AppLink className="clautown-link" href={CLAUTOWN_DEMO_HREF}>
                Open it live
                <ArrowRight size={15} aria-hidden="true" />
              </AppLink>
            </figcaption>
          </figure>
          <ul className="clautown-callouts">
            {APP_POINTS.map((point) => (
              <li key={point.title}>
                <span className="clautown-hexnum">
                  <span>
                    <point.icon size={20} aria-hidden="true" />
                  </span>
                </span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="clautown-section" id="how" aria-labelledby="how-title">
        <div className="clautown-wrap clautown-how">
          <div>
            <span className="clautown-eyebrow">How it connects</span>
            <h2 id="how-title">
              Connect in <em>one click</em>.
            </h2>
            <p className="clautown-lead">One click on the site, then one Enter key in Claude Code.</p>
            <ol className="clautown-steps">
              <li>
                <span className="clautown-hexnum">
                  <span>1</span>
                </span>
                <div>
                  <h3>Name your town</h3>
                  <p>Sign in on the site and pick a town name. Your town starts empty.</p>
                </div>
              </li>
              <li>
                <span className="clautown-hexnum">
                  <span>2</span>
                </span>
                <div>
                  <h3>Press Connect Claude Code</h3>
                  <p>
                    The site opens Claude Code with a ready prompt. Press Enter. Claude reads the short setup script,
                    tells you what it does, then runs it. Prefer a terminal? Copy one line instead.
                  </p>
                </div>
              </li>
              <li>
                <span className="clautown-hexnum">
                  <span>3</span>
                </span>
                <div>
                  <h3>Watch it build</h3>
                  <p>
                    Claude Code calls small hooks while you work. When the first pulse arrives, the site shows
                    Connected.
                  </p>
                </div>
              </li>
            </ol>
            <p className="clautown-note">
              Your town builds only from what Claude Code does after you connect. Past sessions are never read.
            </p>
          </div>
          <figure className="clautown-device">
            <img
              src={STILLS_ROOT + '/connect-laptop.webp'}
              width={1230}
              height={714}
              alt="A laptop showing the Connect Claude Code panel, which lists what is counted and what is never sent."
              loading="lazy"
              decoding="async"
            />
            <figcaption>The connect panel lists what is counted and what is never sent.</figcaption>
          </figure>
        </div>
      </section>

      <section className="clautown-section clautown-section-alt" id="districts" aria-labelledby="districts-title">
        <div className="clautown-wrap">
          <div className="clautown-head">
            <span className="clautown-eyebrow">Districts</span>
            <h2 id="districts-title">
              Each project becomes a <em>district</em>.
            </h2>
            <p>
              A district has a 7-hex core. Its hall stands in the centre, and six department families stand around
              it. Each family grows through tiers as Claude works.
            </p>
          </div>
          <div className="clautown-districts">
            <figure className="clautown-hexstage">
              <DistrictMap />
              <figcaption>One project, one district: six department families around the hall.</figcaption>
            </figure>
            <div>
              <ul className="clautown-families">
                {FAMILIES.map((family) => (
                  <li className={`clautown-family clautown-fam-${family.tone}`} key={family.name}>
                    <span className="clautown-family-hex" aria-hidden="true" />
                    <div>
                      <h3>{family.name}</h3>
                      <p>{family.building}</p>
                    </div>
                    <span className="clautown-family-place">{family.place}</span>
                  </li>
                ))}
              </ul>
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
          </div>
        </div>
      </section>

      <section className="clautown-section" id="yours" aria-labelledby="yours-title">
        <div className="clautown-wrap">
          <div className="clautown-head">
            <span className="clautown-eyebrow">Make it yours</span>
            <h2 id="yours-title">
              Monuments. Landscapes. <em>Styles.</em>
            </h2>
            <p>
              Name your town and its flag, pick a world and a theme, and give every district its own look. Eight
              natural wonders, each earned by one achievement, are yours to place by hand.
            </p>
          </div>
          <ul className="clautown-themes">
            {THEMES.map((theme) => (
              <li key={theme.name}>
                <figure>
                  <img
                    src={`${ART_ROOT}/${theme.file}`}
                    width={576}
                    height={384}
                    alt={theme.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{theme.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="clautown-note">
            Pick a world when you found your town: Isles, Mainland, Park City, Terraces or Caldera. Change the look
            any time with one of five themes: Tropical, Neon Harbor, Dune Oasis, Lantern Valley or Sky Isles.
          </p>
          <ul className="clautown-collection">
            {PIECES.map((piece) => (
              <li className="clautown-piece" key={piece.file}>
                <img
                  src={`${ART_ROOT}/${piece.file}`}
                  width={384}
                  height={384}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="clautown-piece-kind">{piece.kind}</span>
                <span className="clautown-piece-name">{piece.name}</span>
              </li>
            ))}
          </ul>
          <p className="clautown-note">
            Up to six monuments stand in a town at a time. Optional decoration never changes your level, your country
            or your Fame.
          </p>
        </div>
      </section>

      <section className="clautown-section clautown-section-alt" id="together" aria-labelledby="together-title">
        <div className="clautown-wrap clautown-split">
          <figure className="clautown-frame">
            <img
              src={STILLS_ROOT + '/social-split.webp'}
              width={1600}
              height={666}
              alt="A night town, a dusk town and a day town side by side, with a whale-shaped airship and cheering hearts."
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div>
            <span className="clautown-eyebrow">Together</span>
            <h2 id="together-title">
              Meet other <em>Claude fans</em>.
            </h2>
            <p className="clautown-lead">
              Every town has a public page at <code>clautown.com/u/your-name</code>. Anyone can visit. Only the owner
              can sync.
            </p>
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
        </div>
      </section>

      <section className="clautown-section" id="world" aria-labelledby="world-title">
        <div className="clautown-wrap clautown-split clautown-split-flip">
          <div>
            <span className="clautown-eyebrow">World map</span>
            <h2 id="world-title">
              Found a country on a <em>shared map</em>.
            </h2>
            <p className="clautown-lead">
              At town level 5, and once your account is 48 hours old, your town can found a country. The shared map
              has 1,024 by 512 hexes and wraps from east to west.
            </p>
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
          <figure className="clautown-frame clautown-frame-map">
            <img
              src={STILLS_ROOT + '/world-map.webp'}
              width={1600}
              height={734}
              alt="A parchment world map with islands, a compass rose and trade routes between towns."
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <section className="clautown-section clautown-section-alt" id="privacy" aria-labelledby="privacy-title">
        <div className="clautown-wrap">
          <div className="clautown-head">
            <span className="clautown-eyebrow">Privacy</span>
            <h2 id="privacy-title">
              Safe by design. Counts and short labels, <em>never your words</em>.
            </h2>
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
          <div className="clautown-head">
            <span className="clautown-eyebrow">FAQ</span>
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
        <div className="clautown-final-bg" aria-hidden="true">
          <img src={SHOTS_ROOT + '/title-sea.webp'} width={1920} height={1080} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="clautown-wrap">
          <img
            className="clautown-final-logo"
            src={ASSET_ROOT + '/clautown-logo-256.webp'}
            srcSet={`${ASSET_ROOT}/clautown-logo-256.webp 1x, ${ASSET_ROOT}/clautown-logo-512.webp 2x`}
            width={128}
            height={128}
            alt=""
            aria-hidden="true"
          />
          <p className="clautown-wordmark">Clautown</p>
          <h2 id="play-title">Start with one Claude Code project.</h2>
          <p className="clautown-final-lead">
            Connect once. The site shows Connected when the first pulse from Claude Code arrives, and your district
            keeps growing while you work.
          </p>
          <div className="clautown-actions">
            <AppLink className="clautown-btn clautown-btn-gold clautown-btn-lg" href={CLAUTOWN_PLAY_HREF}>
              Play Clautown
              <ArrowRight size={18} aria-hidden="true" />
            </AppLink>
            <button
              type="button"
              className="clautown-btn clautown-btn-ghost clautown-btn-lg"
              onClick={() => setFilmOpen(true)}
            >
              <Play size={16} aria-hidden="true" />
              Watch the film
            </button>
          </div>
          <AppLink className="clautown-final-url" href={CLAUTOWN_PLAY_HREF}>
            clautown.com
          </AppLink>
        </div>
      </section>

      <FilmDialog open={filmOpen} onClose={() => setFilmOpen(false)} />
    </main>
  );
}
