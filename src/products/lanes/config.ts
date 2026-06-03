import { contact } from '../../data/siteData';

export const SITE_ORIGIN = 'https://wysp.pro';
export const PRODUCT_ROOT = '/lanes/';
export const LANES_GUIDE_ROOT = PRODUCT_ROOT + 'guides/';

export const LANES_ROUTES = {
  home: PRODUCT_ROOT,
  guides: LANES_GUIDE_ROOT,
  nameMacosSpaces: LANES_GUIDE_ROOT + 'name-macos-spaces/',
  missionControlLabels: LANES_GUIDE_ROOT + 'mission-control-labels/',
  switchDesktopsFast: LANES_GUIDE_ROOT + 'switch-desktops-fast/',
  autoRearrangeSpaces: LANES_GUIDE_ROOT + 'auto-rearrange-spaces/',
  press: PRODUCT_ROOT + 'press/',
} as const;

export const ASSET_ROOT = '/assets/lanes';
export const CONTACT_EMAIL = contact.email;
export const EARLY_ACCESS_HREF = 'mailto:' + CONTACT_EMAIL + '?subject=Lanes early access';
export const LAST_UPDATED = '2026-05-21';

export const guideNavLinks = [
  { href: LANES_ROUTES.nameMacosSpaces, title: 'Name macOS Spaces' },
  { href: LANES_ROUTES.missionControlLabels, title: 'Mission Control labels' },
  { href: LANES_ROUTES.switchDesktopsFast, title: 'Switch desktops fast' },
  { href: LANES_ROUTES.autoRearrangeSpaces, title: 'Auto-rearrange fix' },
];

export function lanesAbsoluteUrl(path: string) {
  return SITE_ORIGIN + path;
}
