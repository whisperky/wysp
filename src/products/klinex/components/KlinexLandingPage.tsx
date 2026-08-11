import { Fragment, useEffect, useRef } from 'react';
import { AppLink } from '../../../components/navigation/AppLink';
import { landingFaqs } from '../content';
import { KLINEX_APP_HREF, KLINEX_ROUTES, WAITLIST_HREF } from '../config';
import { ArrowRight, Check, Cube, Fork, Info, Layers, Play, Shield, Spark, Wand } from './KlinexGlyphs';
import { KlinexStage } from './KlinexStage';

type World = {
  title: string;
  handle: string;
  initials: string;
  avatar: string;
  kind: 'Live' | 'Story';
  plays: string;
  likes: string;
  tags: string[];
  floor: string;
  accent: string;
  boss: string;
  marker: string;
};

const WORLDS: World[] = [
  { title: 'Neon Cathedral', handle: 'vex', initials: 'VX', avatar: '#9b8ce0', kind: 'Live', plays: '2.4k', likes: '312', tags: ['Wave survival', 'Boss'], floor: '#241338', accent: '#9b8ce0', boss: '#e5705b', marker: '#f6cd77' },
  { title: 'Ember Keep', handle: 'rin', initials: 'RN', avatar: '#e9b45a', kind: 'Live', plays: '5.6k', likes: '741', tags: ['Horde', 'Fire'], floor: '#2e1608', accent: '#e9b45a', boss: '#e5705b', marker: '#f6cd77' },
  { title: 'Sunken Archive', handle: 'mara', initials: 'MA', avatar: '#5fb8a6', kind: 'Story', plays: '1.1k', likes: '188', tags: ['Exploration'], floor: '#0c2b2a', accent: '#5fb8a6', boss: '#79b7d8', marker: '#e9b45a' },
  { title: 'Frost Hollow', handle: 'juno', initials: 'JU', avatar: '#79b7d8', kind: 'Story', plays: '890', likes: '143', tags: ['Puzzle'], floor: '#10233a', accent: '#79b7d8', boss: '#9b8ce0', marker: '#f6cd77' },
  { title: 'Ashfall Arena', handle: 'kade', initials: 'KA', avatar: '#e5705b', kind: 'Live', plays: '3.2k', likes: '402', tags: ['Arena', 'Boss'], floor: '#2a1210', accent: '#e5705b', boss: '#e9b45a', marker: '#f6cd77' },
  { title: 'Verdant Ruin', handle: 'sol', initials: 'SO', avatar: '#7fbf8e', kind: 'Story', plays: '1.7k', likes: '260', tags: ['Adventure'], floor: '#12240f', accent: '#7fbf8e', boss: '#e9b45a', marker: '#79b7d8' },
];

const JOURNEY = ['Idea', 'Discover', 'Direction', 'Build', 'Play', 'Share'];

export function LandingPage() {
  const rootRef = useRef<HTMLElement>(null);

  // Scroll-reveal (fade/rise) + the verified-pill bloom, ported to an effect.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('.klinex-reveal, .klinex-verified');
    if (!('IntersectionObserver' in window) || !targets.length) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main ref={rootRef} id="top">
      {/* ════ HERO — the living stage ════ */}
      <header className="klinex-hero">
        <div className="klinex-hero-fallback" aria-hidden="true" />
        <div className="klinex-hero-stage" aria-hidden="true">
          <KlinexStage />
        </div>
        <div className="klinex-vignette" aria-hidden="true" />
        <div className="klinex-grain" aria-hidden="true" />

        <div className="klinex-wrap klinex-hero-inner">
          <span className="klinex-hero-eyebrow">
            <span className="klinex-eyebrow-dot" />
            A real game from one sentence
          </span>
          <h1>
            What world do you want to <span className="em">step into?</span>
          </h1>
          <p className="klinex-hero-sub">
            Describe it in one line. Klinex co-designs it with you and builds a real, playable game —
            proven winnable before you ever press play.
          </p>

          <div className="klinex-idea klinex-glass">
            <span className="klinex-idea-input">
              <span className="klinex-caret">›</span> a neon cathedral horde with a lich boss
            </span>
            <AppLink className="klinex-btn klinex-btn-brand klinex-idea-go" href={KLINEX_APP_HREF}>
              Enter
              <ArrowRight size={16} />
            </AppLink>
          </div>
          <p className="klinex-idea-cap">
            That box is the whole interface. Type a world — <b>a cozy farm where the crops fight back</b>,{' '}
            <b>a heist on a moving train</b> — and Klinex builds the game.
          </p>

          <div className="klinex-hero-trust">
            <span><Shield size={15} /> Proven fair &amp; winnable</span>
            <span><Wand size={15} /> Co-designed with you</span>
            <span><Cube size={15} /> Yours to export</span>
          </div>
        </div>
      </header>

      {/* ════ JOURNEY RAIL ════ */}
      <div className="klinex-journey klinex-glass" aria-label="The Klinex journey: Idea, Discover, Direction, Build, Play, Share">
        {JOURNEY.map((step, i) => (
          <Fragment key={step}>
            <span className="klinex-journey-step">
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              {step}
            </span>
            {i < JOURNEY.length - 1 && <span className="klinex-journey-arrow" aria-hidden="true">→</span>}
          </Fragment>
        ))}
      </div>

      {/* ════ DISCOVER · the Director ════ */}
      <section className="klinex-section" id="discover">
        <div className="klinex-wrap">
          <div className="klinex-feature klinex-reveal">
            <div className="klinex-feature-copy">
              <span className="klinex-eyebrow"><span className="klinex-eyebrow-dot" />Co-design, not a form</span>
              <h3>A partner that asks the right questions.</h3>
              <p>
                No sliders, no jargon, no genre picker. The Director asks the few sharp questions that
                make the game <b>yours</b> — one at a time — and names its limits out loud instead of
                quietly guessing wrong.
              </p>
              <ul className="klinex-feature-list">
                <li><Check /><span><b>One question at a time.</b> Pick an option or just say it in your words.</span></li>
                <li><Check /><span><b>It has your back.</b> Honest about what it can’t do — with the closest thing it can.</span></li>
                <li><Check /><span><b>Skip whenever.</b> Start building the moment it feels right.</span></li>
              </ul>
            </div>

            <div className="klinex-q klinex-glass klinex-feature-visual">
              <span className="klinex-preview-tag">Inside Klinex · preview</span>
              <span className="klinex-sig-tag"><Spark size={11} /> the moment that makes it yours</span>
              <div className="klinex-q-ask">How should the horde feel?</div>
              <div className="klinex-q-why">This sets the pace and the pressure of every wave.</div>
              <div className="klinex-q-opts">
                <div className="klinex-q-opt">
                  <div className="klinex-q-sw"><span style={{ background: '#e5705b' }} /><span style={{ background: '#e9b45a' }} /></div>
                  <div className="klinex-q-ot">Relentless tide</div>
                  <div className="klinex-q-ol">Endless pressure — never a quiet moment.</div>
                </div>
                <div className="klinex-q-opt" style={{ borderColor: 'var(--amber-lo)' }}>
                  <div className="klinex-q-sw"><span style={{ background: '#e9b45a' }} /><span style={{ background: '#7fbf8e' }} /></div>
                  <div className="klinex-q-ot">Sacred siege</div>
                  <div className="klinex-q-ol">Holy ground — each wave a last stand.</div>
                </div>
                <div className="klinex-q-opt">
                  <div className="klinex-q-sw"><span style={{ background: '#9b8ce0' }} /><span style={{ background: '#79b7d8' }} /></div>
                  <div className="klinex-q-ot">Rising dread</div>
                  <div className="klinex-q-ol">Slow builds that break into chaos.</div>
                </div>
              </div>
              <div className="klinex-q-foot">
                <span className="dots"><i className="on" /><i className="on" /><i /><i /></span>
                a few questions in
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ DIRECTION · the fingerprint ════ */}
      <section className="klinex-section klinex-section-tight" id="direction">
        <div className="klinex-wrap">
          <div className="klinex-section-head is-center klinex-reveal">
            <span className="klinex-eyebrow"><span className="klinex-eyebrow-dot" />Did I get it?</span>
            <h2>The moment it becomes yours.</h2>
            <p>Before a single thing is built, Klinex shows you the game it heard — so you can nod, or nudge.</p>
          </div>

          <div className="klinex-fp klinex-glass klinex-reveal">
            <div className="klinex-fp-h">
              <div className="klinex-fp-lbl">the game i heard</div>
              <div className="klinex-fp-concept">Hold the nave as a lich’s horde pours through the neon glass.</div>
            </div>
            <div className="klinex-fp-cell full" style={{ textAlign: 'center' }}>
              <div className="klinex-fp-lbl">the moment players will screenshot</div>
              <div className="klinex-sig">the <span className="hl">altar shatters</span> and the whole nave floods with violet light</div>
            </div>
            <div className="klinex-fp-grid">
              <div className="klinex-fp-cell br">
                <div className="klinex-fp-lbl">you play as</div>
                <div className="klinex-cast">
                  <div className="klinex-cr">
                    <span className="a" style={{ background: 'var(--amber-wash)', color: 'var(--amber)' }}><Spark size={15} /></span>
                    <span><span className="role">hero</span><span className="nm">The last cantor</span></span>
                  </div>
                </div>
              </div>
              <div className="klinex-fp-cell">
                <div className="klinex-fp-lbl">who you’ll face</div>
                <div className="klinex-cast">
                  <div className="klinex-cr">
                    <span className="a" style={{ background: 'var(--violet-wash)', color: 'var(--violet)' }}><Shield size={15} /></span>
                    <span><span className="role">boss</span><span className="nm">The Lich</span></span>
                  </div>
                </div>
              </div>
              <div className="klinex-fp-cell br">
                <div className="klinex-fp-lbl">mood</div>
                <div className="klinex-swatches">
                  <span style={{ background: '#241338' }} />
                  <span style={{ background: '#9b8ce0' }} />
                  <span style={{ background: '#e9b45a' }} />
                  <span style={{ background: '#e5705b' }} />
                </div>
              </div>
              <div className="klinex-fp-cell">
                <div className="klinex-fp-lbl">what’s different</div>
                <div className="klinex-diffs">
                  <span className="klinex-chip klinex-tag-violet">Reactive light</span>
                  <span className="klinex-chip klinex-tag-amber">Sacred siege</span>
                </div>
              </div>
            </div>
            <div className="klinex-gap">
              <Info size={16} />
              <div className="t"><b>One honest limit.</b> No online co-op yet — this is a single-player siege. Want it harder instead?</div>
            </div>
            <div className="klinex-fp-foot">
              <span className="meta">Wave survival · ~8 min</span>
              <span className="klinex-btn klinex-btn-brand klinex-btn-sm">Build it<ArrowRight size={15} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* ════ BUILD + VERIFIED ════ */}
      <section className="klinex-section" id="build">
        <div className="klinex-wrap">
          <div className="klinex-feature is-flip klinex-reveal">
            <div className="klinex-feature-copy">
              <span className="klinex-eyebrow"><span className="klinex-eyebrow-dot" />No fake progress</span>
              <h3>Watch it become real — and proven.</h3>
              <p>
                No spinner theatre or made-up percentages. Klinex narrates the real stages as your game
                is composed, then <b>proves it can be won</b> — re-playing it hundreds of times before
                you ever press play.
              </p>
              <ul className="klinex-feature-list">
                <li><Check /><span><b>Honest stages,</b> not a fake <code>%</code> bar.</span></li>
                <li><Check /><span><b>Verified = proven winnable,</b> before you play — never a gate or a grade.</span></li>
                <li><Check /><span><b>Re-proves quietly</b> after every edit, so it always stays fair.</span></li>
              </ul>
            </div>

            <div className="klinex-build klinex-glass klinex-feature-visual">
              <span className="klinex-preview-tag">Inside Klinex · preview</span>
              <div className="klinex-bstage done">
                <span className="rail" />
                <div>
                  <div className="bt">Stage 01</div>
                  <div className="btitle">Composing the cathedral</div>
                  <div className="bd">Geometry, lighting, the shattering glass</div>
                </div>
                <span className="mk"><Check size={18} sw={2.4} /></span>
              </div>
              <div className="klinex-bstage done">
                <span className="rail" />
                <div>
                  <div className="bt">Stage 02</div>
                  <div className="btitle">Placing the horde &amp; the lich</div>
                  <div className="bd">Waves, escalation, the boss fight</div>
                </div>
                <span className="mk"><Check size={18} sw={2.4} /></span>
              </div>
              <div className="klinex-bstage done">
                <span className="rail" />
                <div>
                  <div className="bt">Stage 03</div>
                  <div className="btitle">Proving it’s winnable</div>
                  <div className="bd">Re-played 240 times — fair and beatable</div>
                </div>
                <span className="mk"><Check size={18} sw={2.4} /></span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span className="klinex-verified"><Check size={14} sw={2.6} /> Verified — fair &amp; winnable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ OWN IT · cosmetics safety ════ */}
      <section className="klinex-section klinex-section-tight" id="own">
        <div className="klinex-wrap">
          <div className="klinex-feature klinex-reveal">
            <div className="klinex-feature-copy">
              <span className="klinex-eyebrow"><span className="klinex-eyebrow-dot" />Dress it up fearlessly</span>
              <h3>Change anything. It still works.</h3>
              <p>
                Re-skin it, recolor it, swap a look — cosmetics can <b>never</b> break your game, so you
                dress it up without fear. And when it’s done, it’s yours: set who can see it, and export
                the whole project.
              </p>
              <div className="klinex-own">
                <Cube size={20} />
                <div className="t"><b>You own everything.</b> Private, Friends, or Public — plus a full export of the project.</div>
              </div>
            </div>

            <div className="klinex-q klinex-glass klinex-feature-visual">
              <span className="klinex-preview-tag">Inside Klinex · preview</span>
              <div className="klinex-safe-badge"><Check size={12} sw={3} /> cosmetic — can’t break your game</div>
              <div className="klinex-q-ask" style={{ fontSize: '1.05rem' }}>Swap the look</div>
              <div className="klinex-q-opts">
                <div className="klinex-q-opt" style={{ borderColor: 'var(--amber-lo)' }}>
                  <div className="klinex-q-sw"><span style={{ background: '#9b8ce0' }} /><span style={{ background: '#e5705b' }} /></div>
                  <div className="klinex-q-ot">Stained glass</div>
                  <div className="klinex-q-ol">Violet neon · current</div>
                </div>
                <div className="klinex-q-opt">
                  <div className="klinex-q-sw"><span style={{ background: '#23272e' }} /><span style={{ background: '#5fb8a6' }} /></div>
                  <div className="klinex-q-ot">Obsidian</div>
                  <div className="klinex-q-ol">Cold and quiet</div>
                </div>
                <div className="klinex-q-opt">
                  <div className="klinex-q-sw"><span style={{ background: '#e9b45a' }} /><span style={{ background: '#c7913a' }} /></div>
                  <div className="klinex-q-ot">Gilded</div>
                  <div className="klinex-q-ol">Warm and holy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ COMMUNITY · play & remix ════ */}
      <section className="klinex-section" id="community">
        <div className="klinex-wrap">
          <div className="klinex-section-head is-center klinex-reveal">
            <span className="klinex-eyebrow"><span className="klinex-eyebrow-dot" />A world worth sharing</span>
            <h2>Play what others make. Remix it into yours.</h2>
            <p>Every world is a place you can step into — or open as your own starting point. Remix keeps the lineage.</p>
          </div>

          <div className="klinex-worlds klinex-reveal">
            {WORLDS.map((w) => (
              <article className="klinex-wcard" key={w.title}>
                <div
                  className="klinex-wthumb"
                  style={{ background: `radial-gradient(circle at 50% 66%, ${w.accent}55, transparent 62%), ${w.floor}` }}
                >
                  <span className="klinex-wkind">{w.kind}</span>
                  <span className="klinex-wverified"><Check size={11} sw={3} /></span>
                  <span className="klinex-wdot" style={{ left: '42%', top: '58%', background: w.accent }} />
                  <span className="klinex-wdot" style={{ left: '58%', top: '50%', background: w.boss }} />
                  <span className="klinex-wdot" style={{ left: '50%', top: '72%', background: w.marker }} />
                </div>
                <div className="klinex-wbody">
                  <div className="klinex-wtitle">{w.title}</div>
                  <div className="klinex-wmeta">
                    <span className="klinex-wava" style={{ background: w.avatar }}>{w.initials}</span>
                    <span className="klinex-wcreator">by <b>@{w.handle}</b></span>
                  </div>
                  <div className="klinex-wstats">
                    <span><Play size={12} /> {w.plays}</span>
                    <span><Spark size={12} /> {w.likes}</span>
                  </div>
                  <div className="klinex-wtags">
                    {w.tags.map((tag) => (
                      <span className="klinex-chip" key={tag}>{tag}</span>
                    ))}
                    <span className="klinex-chip klinex-chip-amber"><Fork size={11} /> Remix</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════ EARLY ACCESS ════ */}
      <section className="klinex-section klinex-section-tight" id="get">
        <div className="klinex-wrap">
          <div className="klinex-ea klinex-glass klinex-reveal">
            <span className="klinex-eyebrow" style={{ justifyContent: 'center' }}><span className="klinex-eyebrow-dot" />Early access</span>
            <h2>Be there when the studio opens.</h2>
            <p>
              Klinex is being built in the open. Join the waitlist and you’ll be among the first to turn
              a sentence into a game you own — no engine, no code.
            </p>
            <div className="klinex-ea-cta">
              <a className="klinex-btn klinex-btn-brand" href={WAITLIST_HREF}>
                <Spark size={16} />
                Join the waitlist
              </a>
              <AppLink className="klinex-btn klinex-btn-ghost" href={KLINEX_ROUTES.build}>
                Watch a build
              </AppLink>
            </div>
            <div className="klinex-ea-points">
              <span><Wand size={15} /> Plain-words co-design</span>
              <span><Shield size={15} /> Verified fair &amp; winnable</span>
              <span><Layers size={15} /> Play in browser or Unreal</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="klinex-section klinex-section-tight" id="faq">
        <div className="klinex-wrap">
          <div className="klinex-section-head is-center klinex-reveal">
            <span className="klinex-eyebrow"><span className="klinex-eyebrow-dot" />FAQ</span>
            <h2>Questions, answered plainly.</h2>
          </div>
          <div className="klinex-faq klinex-reveal">
            {landingFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="klinex-faq-ico" aria-hidden="true" />
                </summary>
                <div>{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FINAL CTA ════ */}
      <section className="klinex-section klinex-final">
        <div className="klinex-wrap klinex-final-inner klinex-reveal">
          <h2>Turn one sentence into a game you own.</h2>
          <p>Describe a world. Klinex co-designs it, proves it’s winnable, and hands you the keys.</p>
          <div className="klinex-final-cta">
            <a className="klinex-btn klinex-btn-brand" href={WAITLIST_HREF}>
              <Spark size={16} />
              Get early access
            </a>
            <AppLink className="klinex-btn klinex-btn-ghost" href={KLINEX_ROUTES.discover}>
              Explore the studio
            </AppLink>
          </div>
          <p className="klinex-final-note">Built in the open · no engine · no code · you own everything</p>
        </div>
      </section>
    </main>
  );
}
