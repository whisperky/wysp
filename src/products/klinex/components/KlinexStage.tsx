import { useEffect, useRef } from 'react';

/**
 * The living "Ember" stage backdrop, ported from the Klinex design's KX.bg
 * canvas painter: a slow forge glow low-center plus rising bokeh embers.
 * Pure ambience behind the hero — never the game. Client-only (no work
 * during SSR/prerender) and disabled under prefers-reduced-motion, with a
 * static CSS gradient (.klinex-hero-fallback) sitting behind it as the
 * still fallback.
 */
type Mote = { x: number; y: number; r: number; sp: number; ph: number; sw: number; a: number };

const PAL = { amber: '#e9b45a', amberHi: '#f6cd77', amberLo: '#c7913a', ember: '#e5705b' };

function hexA(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export function KlinexStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    let raf = 0;
    let t = 0;
    let running = true;

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(rect.width * DPR));
      canvas.height = Math.max(2, Math.round(rect.height * DPR));
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);

    const motes: Mote[] = [];
    for (let i = 0; i < 34; i++) {
      motes.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.5 + Math.random() * 2.4,
        sp: 0.00012 + Math.random() * 0.0004,
        ph: Math.random() * 7,
        sw: 0.01 + Math.random() * 0.03,
        a: 0.12 + Math.random() * 0.5,
      });
    }

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const S = Math.min(W, H);

      ctx.fillStyle = '#070608';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // deep forge glow, low-center, breathing
      const breathe = 0.85 + 0.15 * Math.sin(t * 0.6);
      let g = ctx.createRadialGradient(W * 0.5, H * 1.04, S * 0.04, W * 0.5, H * 1.04, S * 1.05 * breathe);
      g.addColorStop(0, hexA(PAL.amber, 0.42));
      g.addColorStop(0.4, hexA(PAL.amberLo, 0.12));
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // faint warm halo high (the "apse")
      g = ctx.createRadialGradient(W * 0.5, H * 0.12, S * 0.02, W * 0.5, H * 0.12, S * 0.5);
      g.addColorStop(0, hexA(PAL.ember, 0.1));
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // rising bokeh embers (soft, never hard dots)
      motes.forEach((m) => {
        m.y -= m.sp;
        if (m.y < -0.05) {
          m.y = 1.05;
          m.x = Math.random();
        }
        const x = (m.x + m.sw * Math.sin(t * 0.7 + m.ph)) * W;
        const y = m.y * H;
        const rad = m.r * S * 0.012;
        const flick = 0.6 + 0.4 * Math.sin(t * 1.3 + m.ph);
        const gg = ctx.createRadialGradient(x, y, 0, x, y, rad * 3.2);
        gg.addColorStop(0, hexA(PAL.amberHi, m.a * flick));
        gg.addColorStop(0.5, hexA(PAL.amber, m.a * 0.4 * flick));
        gg.addColorStop(1, 'transparent');
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(x, y, rad * 3.2, 0, 7);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = () => {
      if (!running) return;
      t += 0.016;
      draw();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
