import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AppLink } from '../../../components/navigation/AppLink';
import { landingFaqs } from '../content';
import { BRAND_ROOT, INVITE_HREF, TC_ROUTES } from '../config';
import { ArrowRight, Check } from './TrustContractGlyphs';

type FlowKey = 'client' | 'developer';

type BandKey = 'elite' | 'trusted' | 'reliable' | 'developing' | 'new' | 'risk' | 'blocked';

type Band = {
  key: BandKey;
  name: string;
  range: string;
  color: string;
  title: string;
  mark: number;
  desc: string;
  meaningLead: string;
  meaningRest: string;
};

const BANDS: Band[] = [
  {
    key: 'elite', name: 'Elite', range: '95–100', color: 'var(--tc-elite)',
    title: 'Elite — 95 to 100', mark: 97,
    desc: 'Rare, long history, staff-vouched, with no recent risk signals. Only reachable with 15+ completed contracts, a clean safety record, and staff support.',
    meaningLead: 'How you get here:', meaningRest: " sustained delivery, strong client ratings, and zero disputes over a long window. Score is capped by proven history, so the top can't be rushed.",
  },
  {
    key: 'trusted', name: 'Trusted', range: '80–94', color: 'var(--tc-trusted)',
    title: 'Trusted — 80 to 94', mark: 87,
    desc: 'Strong delivery and a clean safety history. The band most repeat clients look for first when reviewing private suggestions.',
    meaningLead: 'How you get here:', meaningRest: ' a run of completed contracts, consistently good ratings, and no recent stops or disputes. Eight or more completions unlocks this ceiling.',
  },
  {
    key: 'reliable', name: 'Reliable', range: '60–79', color: 'var(--tc-reliable)',
    title: 'Reliable — 60 to 79', mark: 70,
    desc: "Good marketplace history. You've proven you finish what you start and communicate through the deal room.",
    meaningLead: 'How you get here:', meaningRest: ' several completed contracts with steady feedback. A few more clean deliveries — and richer profile proof — push you toward Trusted.',
  },
  {
    key: 'developing', name: 'Developing', range: '40–59', color: 'var(--tc-developing)',
    title: 'Developing — 40 to 59', mark: 50,
    desc: 'Some positive signal, still building history. Early proof is landing, but the record is thin.',
    meaningLead: 'How you get here:', meaningRest: ' a first completion or two, a complete profile, and active responsiveness. Keep delivering to lift the evidence cap.',
  },
  {
    key: 'new', name: 'New', range: '20–39', color: 'var(--tc-new)',
    title: 'New — 20 to 39', mark: 30,
    desc: 'The normal entry band. Every account starts here at 20 — no penalty, just no history yet.',
    meaningLead: 'How you get here:', meaningRest: ' you just joined. Complete your profile, win a first contract, and collect honest feedback to start climbing.',
  },
  {
    key: 'risk', name: 'Risk', range: '0–19', color: 'var(--tc-risk)',
    title: 'Risk — 0 to 19', mark: 10,
    desc: "Restricted until behavior improves. Applications, drafts, and active conversations are rate-limited, and you're hidden from suggestions.",
    meaningLead: 'How you recover:', meaningRest: ' resolve outstanding issues, avoid stopped contracts, and rebuild slowly. Paid tier does not fully bypass these limits.',
  },
  {
    key: 'blocked', name: 'Blocked', range: '— removed', color: 'var(--tc-blocked)',
    title: 'Blocked — removed', mark: 1.5,
    desc: 'An active block removes marketplace access entirely. Score is set to zero and can carry through to a Discord ban.',
    meaningLead: "How it's applied:", meaningRest: ' only on verified safety or block history. Unblocking recalculates trust from whatever clean history remains.',
  },
];

const CLIENT_STEPS = [
  { num: '01', title: 'Join as Client', text: 'One tap on the start-here panel. Bronze access is instant, fully private, and free.' },
  { num: '02', title: 'Open a job room', text: 'Write the brief in a private room. Pick a tier and up to four forum tags before publishing.' },
  { num: '03', title: 'Bot posts it anonymously', text: 'The job appears in #jobs authored by the bot. You are never named.' },
  { num: '04', title: 'Review & invite', text: 'Read ranked, vetted profiles. Invite anyone — even lower tiers — into a private discussion.' },
  { num: '05', title: 'Hire & archive', text: 'Hire, work, then complete. The bot files a private contract archive with a verified transcript.' },
];

const DEV_STEPS = [
  { num: '01', title: 'Join as Developer', text: 'Submit the profile modal — headline, skills, projects, links. Access unlocks on submit.' },
  { num: '02', title: 'Build your profile', text: 'Upload a resume, add portfolio links, sharpen skill tags. Run a Profile Audit to see gaps.' },
  { num: '03', title: 'Apply or get matched', text: "Apply to public jobs in your tier, or get surfaced in a client's private ranked suggestions." },
  { num: '04', title: 'Talk in a private room', text: 'Connected applicants move into a private deal room. Use premium tools to read the fit and risk.' },
  { num: '05', title: 'Deliver & rank up', text: 'Completed contracts raise your Trust Score and delivery history — visible proof for the next client.' },
];

function bandStyle(color: string): CSSProperties {
  return { ['--band' as string]: color } as CSSProperties;
}

function Steps({ steps }: { steps: typeof CLIENT_STEPS }) {
  return (
    <div className="tc-steps">
      {steps.map((step, i) => (
        <div className="tc-step" key={step.num}>
          <span className="tc-step-num">{step.num}</span>
          <h4>{step.title}</h4>
          <p>{step.text}</p>
          {i < steps.length - 1 ? (
            <span className="tc-step-connect">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [flow, setFlow] = useState<FlowKey>('client');
  const [activeBand, setActiveBand] = useState<BandKey>('elite');
  const band = BANDS.find((b) => b.key === activeBand) ?? BANDS[0];

  // Reveal-on-scroll: additive entrance animation that never hides content.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = root.querySelectorAll<HTMLElement>(
      '.tc-principle, .tc-step, .tc-tier, .tc-feature, .tc-safety-card, .tc-price-group, .tc-stat',
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.animate(
              [
                { opacity: 0, transform: 'translateY(16px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 560, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' },
            );
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [flow]);

  return (
    <div ref={rootRef}>
      {/* ============ HERO ============ */}
      <header className="tc-hero" id="top">
        <div className="tc-container tc-hero-grid">
          <div className="tc-hero-copy">
            <span className="tc-eyebrow on-ink">Privacy-first hiring · Discord</span>
            <h1 className="tc-display">Hire with <em>proof</em>,<br />not promises.</h1>
            <p className="tc-hero-lead">
              Trust Contract is a Discord server that runs a whole hiring marketplace for you — anonymous job posts,
              private deal rooms, vetted developers, and a behavior-based Trust Score. The bot owns every public post,
              so clients stay private and developers see jobs, never profiles.
            </p>
            <div className="tc-hero-cta">
              <AppLink className="tc-btn tc-btn-gold" href={INVITE_HREF}>
                Request an invite
                <ArrowRight />
              </AppLink>
              <AppLink className="tc-btn tc-btn-ghost" href={TC_ROUTES.how}>See how it works</AppLink>
            </div>
            <div className="tc-hero-assure">
              <span>Clients stay anonymous</span>
              <span>Bot-authored job posts</span>
              <span>Trust earned, not bought</span>
            </div>
          </div>

          <div className="tc-hero-visual tc-dc">
            <span className="tc-float-chip tc-float-chip-a">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22M6.61 6.61A18.5 18.5 0 0 0 2 12s3 8 10 8a9.12 9.12 0 0 0 5.39-1.61" /></svg>
              Client identity hidden
            </span>
            <span className="tc-float-chip tc-float-chip-b">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4M8 16h.01M16 16h.01" /></svg>
              Posted by the bot
            </span>

            <div className="tc-dc-window">
              <div className="tc-dc-titlebar">
                <span className="tc-dc-dot"></span><span className="tc-dc-dot"></span><span className="tc-dc-dot"></span>
                <span className="tc-dc-channel"># <b>jobs</b> · public forum</span>
              </div>
              <div className="tc-dc-msg">
                <div className="tc-dc-avatar">
                  <img src={BRAND_ROOT + '/avatar.png'} alt="Trust Contract" />
                </div>
                <div>
                  <div className="tc-dc-author">
                    <strong>Trust Contract</strong>
                    <span className="tc-dc-bot-tag">✓ Bot</span>
                    <span className="tc-dc-time">Today at 14:08</span>
                  </div>
                  <div className="tc-embed">
                    <div className="tc-embed-head">
                      <span className="tc-badge-pill is-gold"><span className="tc-badge-diamond"></span> Gold Job</span>
                      <span className="tc-embed-title">Senior Discord Bot Engineer</span>
                    </div>
                    <p className="tc-embed-desc">Build a moderation + onboarding bot with payments, role automation, and a private ticketing flow. TypeScript, production-grade.</p>
                    <div className="tc-embed-fields">
                      <div>
                        <div className="tc-embed-field-label">Budget</div>
                        <div className="tc-embed-field-value">$4,000 – $6,000 · Fixed</div>
                      </div>
                      <div>
                        <div className="tc-embed-field-label">Timeline</div>
                        <div className="tc-embed-field-value">3 – 4 weeks</div>
                      </div>
                    </div>
                    <div className="tc-embed-tags">
                      <span className="tc-tag">AI/Automation</span>
                      <span className="tc-tag">Discord/Community</span>
                      <span className="tc-tag">New Build</span>
                      <span className="tc-tag">Fixed Price</span>
                    </div>
                    <div className="tc-embed-footer">
                      <span className="tc-ref">Ref: JOB-0184</span> · Apply privately · Client never shown
                    </div>
                    <div className="tc-dc-actions">
                      <span className="tc-dc-button is-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                        Apply
                      </span>
                      <span className="tc-dc-button">Check job fit</span>
                      <span className="tc-dc-button">Client signals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ STATS ============ */}
      <section className="tc-section-ink" style={{ padding: '0 0 clamp(40px,5vw,56px)' }}>
        <div className="tc-container">
          <div className="tc-stats">
            <div className="tc-stat"><strong>0–100</strong><span>Behavior-based Trust Score</span></div>
            <div className="tc-stat"><strong>3 tiers</strong><span>Bronze · Silver · Gold</span></div>
            <div className="tc-stat"><strong>100%</strong><span>Anonymous public job posts</span></div>
            <div className="tc-stat"><strong>1 bot</strong><span>Runs the whole marketplace</span></div>
          </div>
        </div>
      </section>

      {/* ============ PRINCIPLES ============ */}
      <section className="tc-section-ink" id="why">
        <div className="tc-container">
          <div className="tc-head">
            <span className="tc-eyebrow on-ink" style={{ marginInline: 'auto' }}>Why it's built this way</span>
            <h2 className="tc-display">Privacy isn't a setting.<br />It's the architecture.</h2>
            <p>Most freelance marketplaces leak. Clients expose their plans, developers get profiled, and search history becomes someone else's data. Trust Contract removes the exposure by design.</p>
          </div>
          <div className="tc-principles">
            <div className="tc-principle">
              <span className="tc-principle-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22M6.61 6.61A18.5 18.5 0 0 0 2 12s3 8 10 8a9.12 9.12 0 0 0 5.39-1.61" /></svg>
              </span>
              <h3>Clients are never exposed</h3>
              <p>Clients never post in public. The bot authors every job post anonymously, with only a <span className="tc-mono" style={{ color: 'var(--tc-gold-bright)' }}>Ref: JOB-0001</span> line. Identity and search history stay private — always.</p>
            </div>
            <div className="tc-principle">
              <span className="tc-principle-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </span>
              <h3>Developers see jobs, not people</h3>
              <p>Developers browse work, not client profiles. Clients review developer profiles, not other clients. Each side sees exactly what it needs — and nothing it shouldn't.</p>
            </div>
            <div className="tc-principle">
              <span className="tc-principle-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4M8 16h.01M16 16h.01" /></svg>
              </span>
              <h3>The bot runs everything</h3>
              <p>Onboarding, private rooms, payments, tags, trust scoring, archives, and lifecycle sweeps are all bot-managed. No manual moderation overhead, no leaked role lists, no human bottleneck.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS / FLOW ============ */}
      <section className="tc-section" id="how">
        <div className="tc-container">
          <div className="tc-head">
            <span className="tc-eyebrow" style={{ marginInline: 'auto' }}>How it works</span>
            <h2 className="tc-display">Two sides. One private pipeline.</h2>
            <p>The same job moves through a clean, bot-driven lifecycle — whether you're hiring or getting hired.</p>
          </div>

          <div className="tc-flow-switch-wrap">
            <div className="tc-flow-switch" role="tablist">
              <button className={flow === 'client' ? 'is-active' : ''} role="tab" type="button" onClick={() => setFlow('client')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /></svg>
                I'm hiring
              </button>
              <button className={flow === 'developer' ? 'is-active' : ''} role="tab" type="button" onClick={() => setFlow('developer')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                I'm a developer
              </button>
            </div>
          </div>

          <div className={'tc-flow-panel' + (flow === 'client' ? ' is-active' : '')} data-flow-panel="client">
            <Steps steps={CLIENT_STEPS} />
          </div>
          <div className={'tc-flow-panel' + (flow === 'developer' ? ' is-active' : '')} data-flow-panel="developer">
            <Steps steps={DEV_STEPS} />
          </div>
        </div>
      </section>

      {/* ============ TRUST SCORE ============ */}
      <section className="tc-section-ink" id="trust">
        <div className="tc-container">
          <div className="tc-head is-left">
            <span className="tc-eyebrow on-ink">The reputation layer</span>
            <h2 className="tc-display">Your Trust Score is earned,<br />never purchased.</h2>
            <p>A 0–100 reputation that measures behavior and reliability — not how much you paid. Paid tiers can improve access and priority, but never the safety reputation itself. Tap a band to explore it.</p>
          </div>

          <div className="tc-trust-layout">
            <div className="tc-bands" role="tablist">
              {BANDS.map((b) => (
                <button
                  key={b.key}
                  type="button"
                  className={'tc-band' + (b.key === activeBand ? ' is-active' : '')}
                  style={bandStyle(b.color)}
                  onClick={() => setActiveBand(b.key)}
                >
                  <span className="tc-band-dot"></span>
                  <span className="tc-band-name">{b.name}</span>
                  <span className="tc-band-range">{b.range}</span>
                </button>
              ))}
            </div>

            <div className="tc-band-detail" style={bandStyle(band.color)}>
              <span className="tc-band-detail-badge"><span className="tc-band-dot"></span><span>{band.name}</span></span>
              <div className="tc-band-meter">
                <span className="tc-band-meter-mark" style={{ left: band.mark + '%' }}></span>
              </div>
              <h3>{band.title}</h3>
              <p>{band.desc}</p>
              <div className="tc-band-meaning">
                <b>{band.meaningLead}</b>{band.meaningRest}
              </div>
            </div>
          </div>

          <div className="tc-trust-note">
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>Completed contracts raise it; stopped contracts and disputes lower it.</span>
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>Evidence caps stop new accounts from looking elite.</span>
            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>You see your band and next steps — never the exact formula.</span>
          </div>
        </div>
      </section>

      {/* ============ TIERS ============ */}
      <section className="tc-section" id="tiers">
        <div className="tc-container">
          <div className="tc-head">
            <span className="tc-eyebrow" style={{ marginInline: 'auto' }}>Bronze · Silver · Gold</span>
            <h2 className="tc-display">Tiers control access,<br />trust controls placement.</h2>
            <p>A job's badge decides who can publicly apply. A developer's tier decides which jobs they can reach. Everything else is earned.</p>
          </div>
          <div className="tc-tiers">
            <div className="tc-tier">
              <span className="tc-tier-flag">Free</span>
              <img className="tc-badge-img" src={BRAND_ROOT + '/badge_bronze.png'} alt="Bronze tier badge" />
              <h3>Bronze</h3>
              <p className="tc-tier-sub">The open floor — no cost to start.</p>
              <ul className="tc-tier-list">
                <li><Check />Clients post Bronze jobs free</li>
                <li><Check />All approved developers can apply</li>
                <li><Check />Up to 20 ranked profile suggestions</li>
                <li><Check />14-day hire window</li>
              </ul>
            </div>
            <div className="tc-tier">
              <img className="tc-badge-img" src={BRAND_ROOT + '/badge_silver.png'} alt="Silver tier badge" />
              <h3>Silver</h3>
              <p className="tc-tier-sub">Serious work, gated applicants.</p>
              <ul className="tc-tier-list">
                <li><Check />Silver &amp; Gold developers can apply</li>
                <li><Check />Up to 30 ranked profile suggestions</li>
                <li><Check />Premium dev tools: job fit, client signals</li>
                <li><Check />21-day hire window</li>
              </ul>
            </div>
            <div className="tc-tier is-featured">
              <span className="tc-tier-flag">Top tier</span>
              <img className="tc-badge-img" src={BRAND_ROOT + '/badge_gold.png'} alt="Gold tier badge" />
              <h3>Gold</h3>
              <p className="tc-tier-sub">Highest-trust, concierge-grade.</p>
              <ul className="tc-tier-list">
                <li><Check />Only Gold developers can publicly apply</li>
                <li><Check />Up to 50 ranked profile suggestions</li>
                <li><Check />Concierge review &amp; shortlist requests</li>
                <li><Check />30-day hire window · priority tie-breaks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INSIDE THE SERVER ============ */}
      <section className="tc-section-ink" id="server">
        <div className="tc-container">
          <div className="tc-head">
            <span className="tc-eyebrow on-ink" style={{ marginInline: 'auto' }}>Inside the server</span>
            <h2 className="tc-display">A full marketplace, provisioned by the bot.</h2>
            <p>Drop the bot into a blank server and it builds the entire layout — public channels, hidden member areas, private ticket categories, a tagged jobs forum, and locked marketplace stats.</p>
          </div>

          <div className="tc-server tc-dc">
            <div className="tc-sidebar">
              <div className="tc-sidebar-server">
                <img className="tc-brand-seal" src={BRAND_ROOT + '/avatar.png'} style={{ width: 26, height: 26 }} alt="Trust Contract" />
                <strong>Trust Contract</strong>
              </div>

              <div className="tc-sidebar-cat">Start Here</div>
              <div className="tc-sidebar-ch"><HashIcon />start-here</div>
              <div className="tc-sidebar-ch"><HashIcon />rules</div>
              <div className="tc-sidebar-ch"><HashIcon />market-info</div>

              <div className="tc-sidebar-cat">Marketplace</div>
              <div className="tc-sidebar-ch is-active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" /></svg>jobs <span className="tc-tag" style={{ marginLeft: 'auto', fontSize: '0.6rem', padding: '1px 7px' }}>forum</span></div>
              <div className="tc-sidebar-ch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M6 4h12v5a6 6 0 0 1-12 0V4zM8 20h8M12 15v5" /></svg>wins</div>
              <div className="tc-sidebar-ch"><HashIcon />questions</div>

              <div className="tc-sidebar-cat">Client Area</div>
              <div className="tc-sidebar-ch is-locked"><HashIcon />client-desk<LockIcon /></div>

              <div className="tc-sidebar-cat">Developer Hub</div>
              <div className="tc-sidebar-ch is-locked"><HashIcon />developer-desk<LockIcon /></div>
              <div className="tc-sidebar-ch is-locked"><HashIcon />silver-hub<LockIcon /></div>
              <div className="tc-sidebar-ch is-locked"><HashIcon />gold-hub<LockIcon /></div>

              <div className="tc-sidebar-cat">Trust &amp; Safety</div>
              <div className="tc-sidebar-ch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" /></svg>safety-desk</div>
            </div>

            <div className="tc-server-side">
              <div className="tc-server-feature">
                <span className="tc-server-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" /></svg></span>
                <div>
                  <h4>One public jobs forum, fully tagged</h4>
                  <p>Twenty managed forum tags — field, task-shape, and commercial — applied by name. Badge tags are automatic; clients pick up to four extra before the bot publishes.</p>
                </div>
              </div>
              <div className="tc-server-feature">
                <span className="tc-server-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg></span>
                <div>
                  <h4>Hidden areas unlock on join</h4>
                  <p>Everyone sees start-here and jobs. Client Area and Developer Hub stay invisible until someone joins that side — and premium hubs sync to internal tiers, not public roles.</p>
                </div>
              </div>
              <div className="tc-server-feature">
                <span className="tc-server-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M6 4h12v5a6 6 0 0 1-12 0V4zM8 20h8M12 15v5" /></svg></span>
                <div>
                  <h4>Wins, anonymized</h4>
                  <p>Completed contracts post an anonymous activity update to <span className="tc-mono">#wins</span> and link back to the exact public job thread — proof of motion without exposing anyone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEVELOPER PREMIUM TOOLS ============ */}
      <section className="tc-section" id="tools">
        <div className="tc-container">
          <div className="tc-head">
            <span className="tc-eyebrow" style={{ marginInline: 'auto' }}>Premium developer tools</span>
            <h2 className="tc-display">Read the job before you spend the pitch.</h2>
            <p>Silver and Gold developers get private intelligence panels — so effort goes where it converts.</p>
          </div>

          <div className="tc-feature-list">
            {/* Job Fit */}
            <div className="tc-feature">
              <div className="tc-feature-copy">
                <span className="tc-eyebrow">Job Fit Check</span>
                <h3>Know your odds, skill by skill.</h3>
                <p>Score any open job against your profile — eligibility, fit band, matched skills, and the gaps that would sink a generic pitch. The recommendation tells you whether to apply at all.</p>
                <ul className="tc-feature-points">
                  <li><Check />Fit blends skill overlap, trust, and delivery history</li>
                  <li><Check />Flags tier eligibility before you waste an application</li>
                </ul>
              </div>
              <div className="tc-feature-visual">
                <div className="tc-tool">
                  <div className="tc-tool-head">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                    <strong>Job Fit Check</strong>
                    <span className="tc-tool-tag">JOB-0184</span>
                  </div>
                  <div className="tc-tool-body">
                    <div className="tc-tool-row"><span>Fit Score</span><div className="tc-meter"><i style={{ width: '82%' }}></i></div><span>82/100</span></div>
                    <div className="tc-tool-row"><span>Trust</span><div className="tc-meter"><i style={{ width: '88%' }}></i></div><span>88/100</span></div>
                    <div className="tc-tool-row"><span>Delivery</span><div className="tc-meter"><i style={{ width: '76%' }}></i></div><span>76/100</span></div>
                    <div>
                      <div className="tc-embed-field-label" style={{ marginBottom: 7 }}>Matched · Gaps</div>
                      <div className="tc-tool-skills">
                        <span className="tc-tool-skill is-match">TypeScript</span>
                        <span className="tc-tool-skill is-match">Discord.js</span>
                        <span className="tc-tool-skill is-match">Payments</span>
                        <span className="tc-tool-skill is-gap">Postgres</span>
                      </div>
                    </div>
                    <div className="tc-tool-verdict">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      Strong Fit — apply now. Lead with matched work, keep the pitch tight.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Signals */}
            <div className="tc-feature is-flip">
              <div className="tc-feature-visual">
                <div className="tc-tool">
                  <div className="tc-tool-head">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" /></svg>
                    <strong>Client Signals</strong>
                    <span className="tc-tool-tag">anonymized</span>
                  </div>
                  <div className="tc-tool-body">
                    <div className="tc-tool-row"><span>Brief score</span><div className="tc-meter"><i style={{ width: '80%' }}></i></div><span>80/100</span></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
                      <div><div className="tc-embed-field-label">Activity</div><div className="tc-embed-field-value" style={{ color: '#dbdee1' }}>Repeat client</div></div>
                      <div><div className="tc-embed-field-label">Trust band</div><div className="tc-embed-field-value" style={{ color: 'var(--tc-trusted)' }}>🟢 Trusted</div></div>
                      <div><div className="tc-embed-field-label">Deal history</div><div className="tc-embed-field-value" style={{ color: '#dbdee1' }}>5 done · 0 stopped</div></div>
                      <div><div className="tc-embed-field-label">Reliability</div><div className="tc-embed-field-value" style={{ color: '#dbdee1' }}>High</div></div>
                    </div>
                    <div className="tc-tool-verdict">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      Directional, anonymized signals — judge risk without seeing the client.
                    </div>
                  </div>
                </div>
              </div>
              <div className="tc-feature-copy">
                <span className="tc-eyebrow">Client Signals</span>
                <h3>Vet the client, without ever seeing them.</h3>
                <p>Every public job carries hidden, anonymized signals: repeat-client status, trust band, completed-vs-stopped history, current load, and brief quality. Enough to judge risk — nothing that breaks privacy.</p>
                <ul className="tc-feature-points">
                  <li><Check />Brief quality score rewards clear, fundable jobs</li>
                  <li><Check />Reliability bands surface mixed-history clients early</li>
                </ul>
              </div>
            </div>

            {/* Profile Audit */}
            <div className="tc-feature">
              <div className="tc-feature-copy">
                <span className="tc-eyebrow">Profile Audit &amp; Market Position</span>
                <h3>See yourself the way clients rank you.</h3>
                <p>Your profile is what clients see in ranked private suggestions. The audit scores coverage, trust, delivery, and rating — then hands you the three highest-leverage moves to climb the next band.</p>
                <ul className="tc-feature-points">
                  <li><Check />Prioritized fixes, not a vanity dashboard</li>
                  <li><Check />Exact rank stays hidden, so the system can't be gamed</li>
                </ul>
              </div>
              <div className="tc-feature-visual">
                <div className="tc-tool">
                  <div className="tc-tool-head">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9M14 17H5M17 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM7 13a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /></svg>
                    <strong>Profile Audit</strong>
                    <span className="tc-tool-tag">Gold Developer</span>
                  </div>
                  <div className="tc-tool-body">
                    <div className="tc-tool-row"><span>Overall</span><div className="tc-meter"><i style={{ width: '74%' }}></i></div><span>74/100</span></div>
                    <div className="tc-tool-row"><span>Profile</span><div className="tc-meter"><i style={{ width: '90%' }}></i></div><span>90/100</span></div>
                    <div className="tc-tool-row"><span>Trust</span><div className="tc-meter"><i style={{ width: '80%' }}></i></div><span>80/100</span></div>
                    <div className="tc-tool-row"><span>Rating</span><div className="tc-meter"><i style={{ width: '84%' }}></i></div><span>84/100</span></div>
                    <div className="tc-tool-verdict is-warn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
                      Add portfolio links and one more completed contract to reach Trusted.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SAFETY ============ */}
      <section className="tc-section-ink" id="safety">
        <div className="tc-container">
          <div className="tc-head">
            <span className="tc-eyebrow on-ink" style={{ marginInline: 'auto' }}>Trust &amp; safety</span>
            <h2 className="tc-display">Guardrails that work quietly.</h2>
            <p>Safety isn't a report button bolted on later. It's wired through onboarding, limits, archives, and blocks.</p>
          </div>
          <div className="tc-safety">
            <div className="tc-safety-card">
              <span className="tc-safety-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></span>
              <h4>Account-age gates</h4>
              <p>Fresh throwaway accounts are held at the door, with staff overrides for known, vouched people.</p>
            </div>
            <div className="tc-safety-card">
              <span className="tc-safety-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg></span>
              <h4>Risk-band limits</h4>
              <p>Low-trust users get rate-limited applications, drafts, and active conversations. Paid tier doesn't fully bypass it.</p>
            </div>
            <div className="tc-safety-card">
              <span className="tc-safety-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13l2 2 4-4" /></svg></span>
              <h4>Verified transcripts</h4>
              <p>Each archived contract stores a transcript with byte length and a SHA-256 hash, so a downloaded copy can be verified later.</p>
            </div>
            <div className="tc-safety-card">
              <span className="tc-safety-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4M17 8l4 4M21 8l-4 4" /></svg></span>
              <h4>Blocks that stick</h4>
              <p>A verified block sets the score to zero, removes marketplace access, and can carry through to a Discord ban.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="tc-section" id="pricing">
        <div className="tc-container">
          <div className="tc-head">
            <span className="tc-eyebrow" style={{ marginInline: 'auto' }}>Pricing</span>
            <h2 className="tc-display">Two sides, two honest models.</h2>
            <p>Developers subscribe monthly for access and tools. Clients pay once per paid job — Bronze is always free for both.</p>
          </div>

          <div className="tc-pricing-split">
            {/* Developers */}
            <div className="tc-price-group">
              <div className="tc-price-group-head">
                <span className="tc-price-group-head-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></span>
                <div>
                  <h3>Developers</h3>
                  <p>Monthly membership · cancel anytime</p>
                </div>
              </div>
              <div className="tc-price-rows">
                <div className="tc-price-row is-free">
                  <img className="tc-badge-img-sm" src={BRAND_ROOT + '/badge_bronze.png'} alt="bronze badge" />
                  <div className="tc-price-row-label"><strong>Bronze</strong><span>Apply to Bronze jobs · build history</span></div>
                  <div className="tc-price-amount"><strong>Free</strong></div>
                </div>
                <div className="tc-price-row">
                  <img className="tc-badge-img-sm" src={BRAND_ROOT + '/badge_silver.png'} alt="silver badge" />
                  <div className="tc-price-row-label"><strong>Silver</strong><span>Silver jobs + premium tools</span></div>
                  <div className="tc-price-amount"><strong>$19</strong><span>/mo</span></div>
                </div>
                <div className="tc-price-row">
                  <img className="tc-badge-img-sm" src={BRAND_ROOT + '/badge_gold.png'} alt="gold badge" />
                  <div className="tc-price-row-label"><strong>Gold</strong><span>All jobs · concierge · priority</span></div>
                  <div className="tc-price-amount"><strong>$49</strong><span>/mo</span></div>
                </div>
              </div>
              <p className="tc-price-note">Membership improves access and priority — never your Trust Score.</p>
            </div>

            {/* Clients */}
            <div className="tc-price-group">
              <div className="tc-price-group-head">
                <span className="tc-price-group-head-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" /></svg></span>
                <div>
                  <h3>Clients</h3>
                  <p>One-time job credit packs · pay per job</p>
                </div>
              </div>
              <div className="tc-price-rows">
                <div className="tc-price-row is-free">
                  <img className="tc-badge-img-sm" src={BRAND_ROOT + '/badge_bronze.png'} alt="bronze badge" />
                  <div className="tc-price-row-label"><strong>Bronze job</strong><span>Post unlimited · all developers apply</span></div>
                  <div className="tc-price-amount"><strong>Free</strong></div>
                </div>
                <div className="tc-price-row">
                  <img className="tc-badge-img-sm" src={BRAND_ROOT + '/badge_silver.png'} alt="silver badge" />
                  <div className="tc-price-row-label"><strong>Silver credits</strong><span>1 · 3 · 10 packs</span></div>
                  <div className="tc-price-amount"><strong>$19</strong><span className="tc-price-per"> → $14.90/job</span></div>
                </div>
                <div className="tc-price-row">
                  <img className="tc-badge-img-sm" src={BRAND_ROOT + '/badge_gold.png'} alt="gold badge" />
                  <div className="tc-price-row-label"><strong>Gold credits</strong><span>1 · 3 · 10 packs</span></div>
                  <div className="tc-price-amount"><strong>$39</strong><span className="tc-price-per"> → $29.90/job</span></div>
                </div>
              </div>
              <p className="tc-price-note">One credit creates one job. Unpublished drafts refund the credit automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="tc-section" id="faq" style={{ paddingTop: 0 }}>
        <div className="tc-narrow">
          <div className="tc-head">
            <span className="tc-eyebrow" style={{ marginInline: 'auto' }}>Questions</span>
            <h2 className="tc-display">Plainly answered.</h2>
          </div>
          <div className="tc-faq">
            {landingFaqs.map((faq, i) => (
              <details key={faq.question} open={i === 0}>
                <summary><span>{faq.question}</span><span className="tc-faq-icon" aria-hidden="true"></span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="tc-section-ink tc-final" id="join">
        <div className="tc-narrow tc-final-inner">
          <span className="tc-eyebrow on-ink" style={{ marginInline: 'auto' }}>Get started</span>
          <h2>Hire — or get hired — on proof.</h2>
          <p>Trust Contract is rolling out invites for clients and developers. Request access and the bot will onboard you into the right side of the marketplace, privately.</p>
          <div className="tc-hero-cta">
            <AppLink className="tc-btn tc-btn-gold" href={INVITE_HREF}>
              Request an invite
              <ArrowRight />
            </AppLink>
            <AppLink className="tc-btn tc-btn-ghost" href={TC_ROUTES.how}>Read how it works</AppLink>
          </div>
          <p className="tc-final-meta">Bronze is free · No public roles · Identity stays private</p>
        </div>
      </section>
    </div>
  );
}

function HashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" /></svg>
  );
}

function LockIcon() {
  return (
    <svg className="tc-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  );
}
