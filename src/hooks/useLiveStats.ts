import { useEffect, useState } from 'react';

export type LiveStatsMetrics = {
  downloads: number;
  activeUsers: number;
  subscribers: number;
};

export type LiveStats = {
  generatedAt: string | null;
  metrics: LiveStatsMetrics;
};

/**
 * Reads the static, read-only stats snapshot served at /stats.json.
 *
 * The file is regenerated hourly by a scheduled job that calls the LemonSqueezy
 * API server-side, so the API key never reaches the browser and no per-customer
 * data is exposed — only aggregate counts. Returns null while loading, or if the
 * snapshot is missing/unreadable, in which case HomePage falls back to the
 * honest pre-launch facts.
 */
export function useLiveStats(): LiveStats | null {
  const [data, setData] = useState<LiveStats | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/stats.json', { cache: 'no-store' })
      .then((response) => (response.ok ? (response.json() as Promise<LiveStats>) : null))
      .then((json) => {
        if (!cancelled) {
          setData(json);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
