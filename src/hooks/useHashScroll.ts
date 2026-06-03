import { useEffect } from 'react';

export function useHashScroll(dependencyKey: string = '') {
  useEffect(() => {
    const { hash } = window.location;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    window.requestAnimationFrame(() => {
      const targetId = decodeURIComponent(hash.slice(1));
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
    });
  }, [dependencyKey]);
}
