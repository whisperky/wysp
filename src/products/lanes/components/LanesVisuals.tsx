import type { CSSProperties } from 'react';
import { BriefcaseBusiness, Code2, Inbox, PenLine, type LucideIcon } from 'lucide-react';
import { ASSET_ROOT } from '../config';
import type { VisualVariant } from '../types';

type Lane = {
  name: string;
  color: 'blue' | 'amber' | 'green' | 'pink';
  apps: string;
  icon: LucideIcon;
};

const lanes: Lane[] = [
  { name: 'Focus Build', color: 'blue', apps: 'Xcode, Terminal', icon: Code2 },
  { name: 'Client Joe', color: 'amber', apps: 'Figma, Safari', icon: BriefcaseBusiness },
  { name: 'Ops Desk', color: 'green', apps: 'Mail, Slack', icon: Inbox },
  { name: 'Writing', color: 'pink', apps: 'Notes, Preview', icon: PenLine },
];

export function ProductVisual({ variant }: { variant: VisualVariant }) {
  if (variant === 'hero') {
    return (
      <div className="lanes-product-shot lanes-product-shot-hero" aria-label="Lanes switching flow preview">
        <HeroFlowVisual />
      </div>
    );
  }

  return (
    <div className={`lanes-product-shot lanes-product-${variant}`} aria-hidden="true">
      {variant === 'quick-switcher' ? <QuickSwitcherVisual /> : null}
      {variant === 'menu-bar' ? <MenuBarVisual /> : null}
      {variant === 'mission-control' ? <MissionControlVisual /> : null}
      {variant === 'automations' ? <AutomationsVisual /> : null}
      {variant === 'time-report' ? <TimeReportVisual /> : null}
      {variant === 'health' ? <HealthVisual /> : null}
      {variant === 'shortcuts' ? <ShortcutsVisual /> : null}
    </div>
  );
}

function HeroFlowVisual() {
  return (
    <div className="lanes-flow-hero">
      <div className="lanes-flow-menubar">
        <i className="fa-brands fa-apple lanes-apple-mark" role="img" aria-label="Apple menu" />
        <span>Lanes</span>
        <span>File</span>
        <span>Edit</span>
        <span className="lanes-flow-chip">
          <img src={ASSET_ROOT + '/lanes-icon-256.png'} alt="" />
          <span>Client Joe</span>
        </span>
      </div>
      <div className="lanes-flow-stage">
        <div className="lanes-flow-spaces">
          {lanes.map((lane) => {
            const LaneIcon = lane.icon;

            return (
              <span className={`lanes-flow-space lanes-flow-${lane.color}`} key={lane.name}>
                <LaneIcon aria-hidden="true" size={13} strokeWidth={2.2} />
                <span>{lane.name}</span>
              </span>
            );
          })}
        </div>
        <div className="lanes-flow-switcher">
          <div className="lanes-flow-search">
            <kbd>Cmd - G</kbd>
            <strong>joe</strong>
            <i />
          </div>
          <div className="lanes-flow-grid">
            <div className="lanes-flow-results">
              {lanes.map((lane) => {
                const LaneIcon = lane.icon;

                return (
                  <div className={`lanes-flow-result lanes-flow-${lane.color}`} key={lane.name}>
                    <span className="lanes-lane-icon">
                      <LaneIcon aria-hidden="true" size={14} strokeWidth={2.2} />
                    </span>
                    <div>
                      <strong>{lane.name}</strong>
                      <small>{lane.apps}</small>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lanes-flow-preview">
              <span>On enter</span>
              <strong>Client Joe</strong>
              <p>Focus on</p>
              <p>Dock hidden</p>
              <p>Open folder</p>
            </div>
          </div>
        </div>
        <div className="lanes-flow-automation">
          <span>Switch</span>
          <i />
          <span>Apply profile</span>
        </div>
      </div>
    </div>
  );
}

function QuickSwitcherVisual() {
  return (
    <div className="lanes-switcher-ui lanes-animated-card">
      <div className="lanes-switcher-search">
        <span>Cmd - G</span>
        <strong>joe</strong>
        <i className="lanes-type-caret" />
      </div>
      <div className="lanes-switcher-body">
        <div className="lanes-switcher-list">
          {lanes.map((lane) => {
            const LaneIcon = lane.icon;

            return (
              <div className={`lanes-switcher-row lanes-row-${lane.color}`} key={lane.name}>
                <span className="lanes-lane-icon">
                  <LaneIcon aria-hidden="true" size={14} strokeWidth={2.2} />
                </span>
                <div>
                  <strong>{lane.name}</strong>
                  <small>{lane.apps}</small>
                </div>
              </div>
            );
          })}
        </div>
        <div className="lanes-preview-pane">
          <p>Live preview</p>
          <strong>Client Joe</strong>
          <div className="lanes-preview-apps">
            <span>Figma</span>
            <span>Safari</span>
            <span>Finder</span>
          </div>
          <div className="lanes-preview-toggles">
            <span>Focus on</span>
            <span>Dock hidden</span>
            <span>Open folder</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuBarVisual() {
  return (
    <div className="lanes-menubar-visual lanes-animated-card">
      <div className="lanes-menubar-top">
        <i className="fa-brands fa-apple lanes-apple-mark" role="img" aria-label="Apple menu" />
        <span>Lanes</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span className="lanes-menubar-chip">
          <img src={ASSET_ROOT + '/lanes-icon-256.png'} alt="" />
          <span className="lanes-chip-label">
            <span>Deep Work</span>
            <span>Client Joe</span>
            <span>Writing</span>
          </span>
        </span>
      </div>
      <div className="lanes-menubar-desktop">
        <div className="lanes-window-main" />
        <div className="lanes-window-side" />
        <div className="lanes-window-small" />
      </div>
    </div>
  );
}

function MissionControlVisual() {
  const labels = ['Focus Build', 'Client Joe', 'Ops Desk', 'Writing'];

  return (
    <div className="lanes-mission-visual lanes-animated-card">
      {labels.map((label, index) => (
        <div className="lanes-mission-space" key={label}>
          <span className={index === 1 ? 'lanes-mission-label is-active' : 'lanes-mission-label'}>
            {label}
          </span>
          <div className="lanes-mission-window" />
          <div className="lanes-mission-window lanes-mission-window-small" />
        </div>
      ))}
      <span className="lanes-mission-sweep" />
    </div>
  );
}

function AutomationsVisual() {
  const items = ['Mute audio', 'Dark appearance', 'Focus shortcut', 'Hide Dock', 'Open folder'];

  return (
    <div className="lanes-settings-visual lanes-animated-card">
      <div className="lanes-settings-sidebar">
        <span>General</span>
        <span>Lanes</span>
        <span className="is-active">Automations</span>
        <span>Health</span>
      </div>
      <div className="lanes-settings-panel">
        <h4>Client Joe</h4>
        {items.map((item, index) => (
          <div className="lanes-toggle-row" key={item}>
            <span>{item}</span>
            <i className={index < 4 ? 'is-on' : ''} />
          </div>
        ))}
        <div className="lanes-automation-output">
          <span>on enter</span>
          <strong>Focus + Dock + apps applied</strong>
        </div>
      </div>
    </div>
  );
}

function TimeReportVisual() {
  const bars = ['62%', '88%', '42%', '70%', '54%'];

  return (
    <div className="lanes-time-visual lanes-animated-card">
      <div className="lanes-time-head">
        <span>Today</span>
        <strong>5h 42m</strong>
      </div>
      <div className="lanes-time-chart">
        {bars.map((height, index) => (
          <i style={{ '--bar-height': height } as CSSProperties} key={index} />
        ))}
      </div>
      <div className="lanes-time-list">
        <span>Xcode</span>
        <strong>2h 14m</strong>
        <span>Safari</span>
        <strong>1h 08m</strong>
      </div>
      <span className="lanes-live-dot">tracking</span>
    </div>
  );
}

function HealthVisual() {
  const checks = [
    ['Accessibility allowed', 'Ready', 'pass'],
    ['Auto-rearrange off', 'Open Desktop and Dock', 'warning'],
    ['Space reader access', 'Ready', 'pass'],
  ];

  return (
    <div className="lanes-health-visual lanes-animated-card">
      <h4>Setup Health</h4>
      {checks.map(([title, detail, state]) => (
        <div className="lanes-health-row" key={title}>
          <span className={state === 'warning' ? 'needs-action' : ''}>
            {state === 'warning' ? '!' : 'ok'}
          </span>
          <div>
            <strong>{title}</strong>
            <small>{detail}</small>
          </div>
        </div>
      ))}
      <button type="button">Re-check</button>
    </div>
  );
}

function ShortcutsVisual() {
  const shortcuts = [
    ['Quick Switcher', 'Cmd - G'],
    ['Jump Back', 'Shift Cmd Z'],
    ['Open Time Report', 'Shift Cmd D'],
    ['Open Automations', 'Shift Cmd F'],
  ];

  return (
    <div className="lanes-shortcuts-visual lanes-animated-card">
      {shortcuts.map(([label, shortcut]) => (
        <div className="lanes-shortcut-row" key={label}>
          <span>{label}</span>
          <kbd>{shortcut}</kbd>
        </div>
      ))}
      <p>Conflict check passed</p>
    </div>
  );
}
