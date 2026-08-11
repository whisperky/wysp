import { useEffect, useRef } from 'react';
import { AppLink } from '../../../components/navigation/AppLink';
import { landingFaqs } from '../content';
import { CHROME_STORE_HREF, REEL_ROUTES } from '../config';
import { Check, ChromeGlyph, Cross } from './ReelGlyphs';

export function LandingPage() {
  const rootRef = useRef<HTMLElement>(null);

  // Scroll reveal + count-up stats (vanilla behavior ported into an effect).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveals = root.querySelectorAll<HTMLElement>('.reel-reveal');
    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window && reveals.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
      );
      reveals.forEach((el) => io?.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('is-in'));
    }

    const format = (value: number, comma: boolean) =>
      comma ? value.toLocaleString('en-US') : String(value);

    const runCount = (el: HTMLElement) => {
      const target = parseInt(el.getAttribute('data-count') || '', 10);
      const comma = el.getAttribute('data-comma') === '1';
      if (Number.isNaN(target)) return;
      const duration = 1100;
      let start: number | null = null;
      const tick = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(Math.round(target * eased), comma);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = format(target, comma);
      };
      requestAnimationFrame(tick);
    };

    const counters = root.querySelectorAll<HTMLElement>('[data-count]');
    let co: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window && counters.length) {
      co = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCount(entry.target as HTMLElement);
              co?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      counters.forEach((el) => co?.observe(el));
    }

    return () => {
      io?.disconnect();
      co?.disconnect();
    };
  }, []);

  return (
    <main ref={rootRef} id="top">
      {/* ════ HERO ════ */}
      <header className="reel-hero">
        <div className="reel-hero-inner">
          <div className="reel-hero-copy">
            <span className="reel-hero-badge">
              <span className="reel-hero-badge-tag">New</span>
              <b>Reel</b>&nbsp;joins Wysp
            </span>
            <h1>
              Read a server like a <span className="reel-glow">database</span>.
            </h1>
            <p className="reel-hero-lead">
              Back up a <b>whole</b> Discord server in one run — channels, threads and forums.
              Then search it by keyword or meaning, or ask an AI.
            </p>
            <div className="reel-hero-cta">
              <AppLink className="reel-btn reel-btn-brand" href={CHROME_STORE_HREF}>
                <ChromeGlyph />
                Add to Chrome
              </AppLink>
              <AppLink className="reel-btn reel-btn-ghost" href={REEL_ROUTES.analyze}>
                See it work
              </AppLink>
            </div>
            <div className="reel-hero-trust">
              <span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 4.5 6v5.2c0 4.4 3.1 8.4 7.5 9.6 4.4-1.2 7.5-5.2 7.5-9.6V6L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                Local-first by design
              </span>
              <span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="10" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                No password · no bot
              </span>
              <span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m8.5 12 2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Whole server in one run
              </span>
            </div>

            <div className="reel-hero-proof">
              <div>
                <div className="reel-hero-proof-num">38,421</div>
                <div className="reel-hero-proof-label">messages indexed locally</div>
              </div>
              <div>
                <div className="reel-hero-proof-num">0</div>
                <div className="reel-hero-proof-label">raw messages uploaded</div>
              </div>
            </div>
          </div>

          {/* LENS visual */}
          <div className="reel-lens-stage" aria-hidden="true">
            <div className="reel-lens-aura"></div>
            <div className="reel-lens">
              <svg viewBox="0 0 240 240">
                <circle className="reel-ring reel-ring-outer" cx="120" cy="120" r="92" strokeWidth="2" opacity="0.4" strokeDasharray="6 14" />
                <circle className="reel-ring reel-ring-outer" cx="120" cy="120" r="78" strokeWidth="3" opacity="0.5" />
                <circle className="reel-ring reel-ring-mid" cx="120" cy="120" r="54" strokeWidth="2" opacity="0.35" strokeDasharray="6 14" />
                <circle className="reel-ring reel-ring-mid" cx="120" cy="120" r="54" strokeWidth="3" opacity="0.75" strokeDasharray="120 220" strokeLinecap="round" />
                <g className="reel-ring-tick">
                  <line x1="120" y1="105" x2="120" y2="42" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
                </g>
                <circle className="reel-lens-core" cx="120" cy="120" r="15" />
                <g className="reel-blip-track"><circle className="reel-blip" cx="120" cy="42" r="4" /></g>
                <g className="reel-blip-track reel-blip-track-2"><circle className="reel-blip" cx="120" cy="66" r="3" /></g>
              </svg>
            </div>
            <div className="reel-lens-tag reel-lens-tag-1">
              <span className="reel-dot-live is-pulsing"></span> indexing <span className="mono">#job-board</span>
            </div>
            <div className="reel-lens-tag reel-lens-tag-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v18M3 12h18" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
              </svg>{' '}
              <span className="mono">1,842</span> users
            </div>
            <div className="reel-lens-tag reel-lens-tag-3">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="m12 2 2.4 6.8H21l-5.3 4 2 6.9L12 15.6 6.3 19.7l2-6.9L3 8.8h6.6L12 2Z" stroke="var(--ember)" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>{' '}
              evidence found
            </div>
          </div>
        </div>
      </header>

      {/* ════ TRUST BAND ════ */}
      <section className="reel-band">
        <div className="reel-band-inner">
          <div className="reel-stat"><strong data-count="7">0</strong><span>servers indexed</span></div>
          <div className="reel-stat"><strong data-count="23">0</strong><span>channels</span></div>
          <div className="reel-stat"><strong data-count="318">0</strong><span>threads &amp; forums</span></div>
          <div className="reel-stat"><strong className="reel-stat-jade">100%</strong><span>stays on your device</span></div>
        </div>
      </section>

      {/* ════ FEATURE 1 · AI ANALYSIS ════ */}
      <section className="reel-section" id="analyze">
        <div className="reel-wrap">
          <div className="reel-feature reel-reveal">
            <div className="reel-feature-copy">
              <span className="reel-eyebrow"><span className="reel-eyebrow-dot"></span>Search &amp; AI research</span>
              <h3>Find anything. Search or ask.</h3>
              <p>
                Search by keyword or by meaning. On Pro, an AI agent does the research — every claim
                linked to the messages behind it.
              </p>
              <ul className="reel-feature-list">
                <li><Check /><span><b>Search by meaning.</b> On-device. Free tier too.</span></li>
                <li><Check /><span><b>Cross-channel.</b> One question, every channel and thread. One-click recipes.</span></li>
                <li><Check /><span><b>Receipts, not vibes.</b> Answers link to the messages. Only ≤25 rows leave.</span></li>
              </ul>
              <div className="reel-tagline"><span className="mono-jade">$</span> reel.ask("what's the consensus — and who explains it best?")</div>
            </div>

            <div className="reel-feature-visual reel-mock">
              <div className="reel-mock-bar">
                <span className="reel-mock-dots"><span></span><span></span><span></span></span>
                <span className="reel-mock-title">Thread · <span className="mono">Acme Builders</span></span>
              </div>
              <div className="reel-mock-body">
                <div className="reel-thread">
                  <div className="reel-msg">
                    <div className="reel-msg-avatar is-you">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="2" />
                        <path d="M5.5 19c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="reel-msg-label">You</div>
                      <div className="reel-msg-text">What does the community recommend for <span className="reel-hl">state management</span> — and who explains it best?</div>
                    </div>
                  </div>

                  <div className="reel-toolchain">
                    <div className="reel-toolchain-head">
                      <span className="reel-tc-title"><span className="reel-tc-check"><Check size={10} sw={3} /></span>Tool chain · 4 steps</span>
                      <span className="mono">2.89s · claude-sonnet</span>
                    </div>
                    <div className="reel-toolrows">
                      <div className="reel-toolrow"><span className="reel-toolrow-idx">1</span><span className="reel-tool-name">summarize_corpus</span><span className="reel-tool-sum">38k msgs · scope</span><span className="reel-tool-ms">60ms</span></div>
                      <div className="reel-toolrow"><span className="reel-toolrow-idx">2</span><span className="reel-tool-name">investigate_topic</span><span className="reel-tool-sum">Zustand · Redux · Jotai</span><span className="reel-tool-ms">840ms</span></div>
                      <div className="reel-toolrow"><span className="reel-toolrow-idx">3</span><span className="reel-tool-name">semantic_search</span><span className="reel-tool-sum">by meaning · 60 hits</span><span className="reel-tool-ms">215ms</span></div>
                      <div className="reel-toolrow is-running"><span className="reel-toolrow-idx">4</span><span className="reel-tool-name">investigate_user</span><span className="reel-tool-sum">top contributor</span><span className="reel-tool-ms"><span className="reel-dot-live is-pulsing"></span></span></div>
                    </div>
                  </div>

                  <div className="reel-evidence">
                    <div className="reel-evidence-head">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      Answer <span className="reel-chip reel-chip-brand">3 picks</span><span className="reel-chip">21 messages</span>
                    </div>
                    <div className="reel-evrow is-top">
                      <div className="reel-avatar reel-av-a">AL</div>
                      <div><div className="reel-evrow-name"><strong>Ada Lovelace</strong><span>@ada</span><span className="reel-chip">5.3y</span></div><div className="reel-evrow-sub">42 messages on state mgmt · shared 3 guides</div></div>
                      <div className="reel-score"><span className="mono">0.94</span><div className="reel-score-bar"><i style={{ width: '94%' }}></i></div></div>
                    </div>
                    <div className="reel-evrow">
                      <div className="reel-avatar reel-av-b">MR</div>
                      <div><div className="reel-evrow-name"><strong>Marco Reus</strong><span>@marcor</span><span className="reel-chip">7.1y</span></div><div className="reel-evrow-sub">explained Zustand patterns · 18 messages</div></div>
                      <div className="reel-score"><span className="mono">0.88</span><div className="reel-score-bar"><i style={{ width: '88%' }}></i></div></div>
                    </div>
                    <div className="reel-evrow">
                      <div className="reel-avatar reel-av-c">LT</div>
                      <div><div className="reel-evrow-name"><strong>Linus T.</strong><span>@linus</span><span className="reel-chip">8.4y</span></div><div className="reel-evrow-sub">benchmarks + trade-offs · 9 messages</div></div>
                      <div className="reel-score"><span className="mono">0.71</span><div className="reel-score-bar"><i style={{ width: '71%' }}></i></div></div>
                    </div>
                  </div>

                  <div className="reel-composer">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" fill="currentColor" />
                    </svg>
                    <span className="reel-composer-input">Ask a follow-up across the server…</span>
                    <span className="reel-kbd">⏎</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ FEATURE 2 · EXPORT ════ */}
      <section className="reel-section reel-section-tight" id="export">
        <div className="reel-wrap">
          <div className="reel-feature is-flip reel-reveal">
            <div className="reel-feature-copy">
              <span className="reel-eyebrow"><span className="reel-eyebrow-dot"></span>Back up the whole server</span>
              <h3>The whole server at once.</h3>
              <p>
                Other tools export one channel at a time — brutal across dozens. Reel grabs the whole
                server in one run: channels, threads and forums, to HTML, Excel, CSV or JSON.
              </p>
              <ul className="reel-feature-list">
                <li><Check /><span><b>Channels, threads &amp; forums.</b> The posts other tools miss.</span></li>
                <li><Check /><span><b>Four formats.</b> <code>HTML</code> · <code>XLSX</code> · <code>CSV</code> · <code>JSONL</code>.</span></li>
                <li><Check /><span><b>Gentle &amp; resumable.</b> Re-sync in seconds.</span></li>
              </ul>
              <div className="reel-tagline"><span className="mono-jade">→</span> acme-builders archive · HTML · 38,421 rows</div>
            </div>

            <div className="reel-feature-visual reel-mock">
              <div className="reel-export-head">
                <span className="reel-export-scope">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="m12 3 9 4-9 4-9-4 9-4ZM3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                  Export scope · <b>entire server</b>
                </span>
                <span className="reel-export-formats"><span className="reel-chip reel-chip-brand">HTML</span><span className="reel-chip">XLSX</span><span className="reel-chip">CSV</span><span className="reel-chip">JSON</span></span>
              </div>
              <div className="reel-channel-tree">
                <div className="reel-tree-server"><span className="reel-srv-mark">AB</span><strong>Acme Builders</strong><span className="mono">7 channels · 18 threads · 12.4k</span></div>
                <div className="reel-tree-row"><span className="reel-tree-check"><Check size={9} sw={3.4} /></span><span className="reel-tree-hash">#</span><span className="reel-tree-name">job-board</span><div className="reel-tree-bar"><i style={{ width: '100%' }}></i></div><span className="mono">4,128</span></div>
                <div className="reel-tree-row"><span className="reel-tree-check"><Check size={9} sw={3.4} /></span><span className="reel-tree-hash">#</span><span className="reel-tree-name">introductions</span><div className="reel-tree-bar"><i style={{ width: '58%' }}></i></div><span className="mono">2,401</span></div>
                <div className="reel-tree-row"><span className="reel-tree-check"><Check size={9} sw={3.4} /></span><span className="reel-tree-hash">#</span><span className="reel-tree-name">showcase</span><div className="reel-tree-bar"><i style={{ width: '44%' }}></i></div><span className="mono">1,822</span></div>
                <div className="reel-tree-row"><span className="reel-tree-check"><Check size={9} sw={3.4} /></span><span className="reel-tree-hash">#</span><span className="reel-tree-name">general</span><div className="reel-tree-bar"><i style={{ width: '30%' }}></i></div><span className="mono">1,240</span></div>
                <div className="reel-tree-row"><span className="reel-tree-check"><Check size={9} sw={3.4} /></span><span className="reel-tree-hash">#</span><span className="reel-tree-name">announcements</span><div className="reel-tree-bar"><i style={{ width: '10%' }}></i></div><span className="mono">412</span></div>
                <div className="reel-tree-row"><span className="reel-tree-check"><Check size={9} sw={3.4} /></span><span className="reel-tree-hash">#</span><span className="reel-tree-name">q3-hiring</span><div className="reel-tree-bar"><i style={{ width: '6%' }}></i></div><span className="mono">213</span></div>
                <div className="reel-tree-row"><span className="reel-tree-check"><Check size={9} sw={3.4} /></span><span className="reel-tree-hash">↳</span><span className="reel-tree-name">design-help · thread</span><div className="reel-tree-bar"><i style={{ width: '8%' }}></i></div><span className="mono">96</span></div>
                <div className="reel-tree-row"><span className="reel-tree-check"><Check size={9} sw={3.4} /></span><span className="reel-tree-hash">↳</span><span className="reel-tree-name">showcase · forum post</span><div className="reel-tree-bar"><i style={{ width: '5%' }}></i></div><span className="mono">58</span></div>
              </div>
              <div className="reel-progress"><i></i></div>
              <div className="reel-export-foot">
                <span className="reel-export-count">Queued <b>7 channels + 18 threads</b> · 12,410 rows</span>
                <span className="reel-btn reel-btn-brand reel-btn-sm">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Export server
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════ */}
      <section className="reel-section" id="how">
        <div className="reel-wrap">
          <div className="reel-section-head is-center reel-reveal">
            <span className="reel-eyebrow" style={{ justifyContent: 'center' }}><span className="reel-eyebrow-dot"></span>How it works</span>
            <h2>Three moves: back up, index, search.</h2>
            <p>No bot, no crawling. Reel uses your own session — only when you click.</p>
          </div>
          <div className="reel-steps reel-reveal">
            <div className="reel-step">
              <div className="reel-step-num">STEP 01</div>
              <div className="reel-step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M3 9h18" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="6" cy="7" r="0.6" fill="currentColor" />
                </svg>
              </div>
              <h3>Back up a server</h3>
              <p>Click the lens, pick channels. Reel fetches channels, threads and forums — gently, resumably.</p>
              <div className="reel-step-arrow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div className="reel-step">
              <div className="reel-step-num">STEP 02</div>
              <div className="reel-step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </div>
              <h3>Index locally</h3>
              <p>Full-text + on-device semantic search, in IndexedDB. Fully offline.</p>
              <div className="reel-step-arrow">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div className="reel-step">
              <div className="reel-step-num">STEP 03</div>
              <div className="reel-step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Search, ask, or export</h3>
              <p>Search by keyword or meaning, ask the AI, or export to HTML / Excel / CSV / JSON.</p>
              <div className="reel-step-arrow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ PRIVACY ════ */}
      <section className="reel-section reel-privacy" id="privacy">
        <div className="reel-wrap">
          <div className="reel-privacy-inner reel-reveal">
            <div className="reel-privacy-intro">
              <div className="reel-shield">
                <svg width="58" height="58" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.5 4 6v6c0 5 3.4 9.2 8 10.5 4.6-1.3 8-5.5 8-10.5V6l-8-3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="m8.6 12 2.2 2.2 4.6-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="reel-eyebrow"><span className="reel-eyebrow-dot"></span>Privacy is the product</span>
              <h2>Your data has nowhere to leak.</h2>
              <p>Local-first, not a scraper. Your corpus stays in your browser — only a tiny AI snippet leaves, Pro only.</p>
            </div>
            <div>
              <div className="reel-privacy-grid">
                <div className="reel-privacy-card">
                  <div className="reel-privacy-ico">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="10" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </div>
                  <h4>Your session, used locally</h4>
                  <p>Reuses your existing Discord session — passive, in-memory, Discord-only. No password, no bot.</p>
                </div>
                <div className="reel-privacy-card">
                  <div className="reel-privacy-ico">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12c2.5-4.5 13.5-4.5 16 0-2.5 4.5-13.5 4.5-16 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </div>
                  <h4>Nothing runs on its own</h4>
                  <p>Every fetch is a click, paced gently. No crawling, no schedulers.</p>
                </div>
                <div className="reel-privacy-card">
                  <div className="reel-privacy-ico">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </div>
                  <h4>Stored on your device</h4>
                  <p>Messages and embeddings sit in IndexedDB. Free tier needs no backend.</p>
                </div>
                <div className="reel-privacy-card">
                  <div className="reel-privacy-ico">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4>≤25 rows to the AI</h4>
                  <p>Pro sends only the snippets a tool picks — never your whole corpus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ PRICING ════ */}
      <section className="reel-section" id="pricing">
        <div className="reel-wrap">
          <div className="reel-section-head is-center reel-reveal">
            <span className="reel-eyebrow" style={{ justifyContent: 'center' }}><span className="reel-eyebrow-dot"></span>Pricing</span>
            <h2>Free is useful. Pro is for research.</h2>
            <p>No trial games. Free is complete for what it holds. Pro adds AI research and the whole server.</p>
          </div>
          <div className="reel-pricing reel-reveal">
            <div className="reel-plan">
              <div className="reel-plan-name">Free</div>
              <div className="reel-plan-price"><strong>$0</strong><span>forever</span></div>
              <p className="reel-plan-note">Runs fully offline. No account.</p>
              <AppLink className="reel-btn reel-btn-ghost reel-plan-cta" href={CHROME_STORE_HREF}>Add to Chrome</AppLink>
              <ul className="reel-plan-feats">
                <li><Check size={14} sw={2.4} />1 server, 1 channel, 500 messages</li>
                <li><Check size={14} sw={2.4} />Keyword + semantic search, sort &amp; filter</li>
                <li><Check size={14} sw={2.4} />Export to HTML, XLSX, CSV &amp; JSON</li>
                <li className="is-muted"><Cross />AI research agent</li>
                <li className="is-muted"><Cross />Whole-server backup &amp; live sync</li>
              </ul>
            </div>
            <div className="reel-plan is-featured">
              <span className="reel-plan-tag">Full power</span>
              <div className="reel-plan-name">Pro</div>
              <div className="reel-plan-price"><strong>$14.99</strong><span>/ month</span></div>
              <p className="reel-plan-note">or $149 / year — 17% off · best value</p>
              <AppLink className="reel-btn reel-btn-brand reel-plan-cta" href={CHROME_STORE_HREF}>Go Pro</AppLink>
              <ul className="reel-plan-feats">
                <li><Check size={14} sw={2.4} /><span><b>AI research agent</b> · 15M tokens / month</span></li>
                <li><Check size={14} sw={2.4} />Whole-server backup — channels, threads &amp; forums</li>
                <li><Check size={14} sw={2.4} />Unlimited servers &amp; channels · live sync</li>
                <li><Check size={14} sw={2.4} />Cross-channel user profiles</li>
                <li><Check size={14} sw={2.4} />100k messages per channel</li>
              </ul>
            </div>
          </div>
          <p className="reel-pricing-foot">14-day money-back guarantee · 2 devices per license · billed via LemonSqueezy</p>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section className="reel-section reel-section-tight" id="faq">
        <div className="reel-wrap">
          <div className="reel-section-head is-center reel-reveal">
            <span className="reel-eyebrow" style={{ justifyContent: 'center' }}><span className="reel-eyebrow-dot"></span>FAQ</span>
            <h2>Questions, answered plainly.</h2>
          </div>
          <div className="reel-faq reel-reveal">
            {landingFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="reel-faq-ico"></span>
                </summary>
                <div>{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FINAL CTA ════ */}
      <section className="reel-section reel-final" id="get">
        <div className="reel-wrap reel-final-inner reel-reveal">
          <h2>Back up a server. Search it. Ask it anything.</h2>
          <p>Back up a channel, then search or ask in a minute. Free, no account, all local.</p>
          <div className="reel-final-cta">
            <AppLink className="reel-btn reel-btn-brand" href={CHROME_STORE_HREF}>
              <ChromeGlyph />
              Add to Chrome — Free
            </AppLink>
            <AppLink className="reel-btn reel-btn-ghost" href={REEL_ROUTES.pricing}>Compare plans</AppLink>
          </div>
          <p className="reel-final-note">Chrome Web Store listing coming soon · MV3 · works offline</p>
        </div>
      </section>
    </main>
  );
}
