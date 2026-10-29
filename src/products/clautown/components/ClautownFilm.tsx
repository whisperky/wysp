import { Pause, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FILM_POSTER, FILM_VIDEO, HERO_POSTER, HERO_VIDEO } from '../config';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'idle' | 'playing' | 'paused'>('idle');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || saveData) {
      video.pause();
      setState('paused');
      return;
    }

    video.muted = true;
    void video.play().catch(() => {});
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  return (
    <>
      <div className="clautown-hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="clautown-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          onPlaying={() => setState('playing')}
          onPause={() => setState('paused')}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>
      {state !== 'idle' && (
        <button
          type="button"
          className="clautown-media-toggle"
          onClick={toggle}
          aria-label={state === 'playing' ? 'Pause background video' : 'Play background video'}
        >
          {state === 'playing' ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      )}
    </>
  );
}

export function FilmDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video) {
      return;
    }

    if (open) {
      setLoaded(true);
      document.body.style.overflow = 'hidden';
      if (!dialog.open) {
        dialog.showModal();
      }
      void video.play().catch(() => {});
    } else {
      video.pause();
      document.body.style.overflow = '';
      if (dialog.open) {
        dialog.close();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="clautown-film"
      aria-label="The Clautown film"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button type="button" className="clautown-film-close" onClick={onClose} aria-label="Close the film">
        <X size={20} aria-hidden="true" />
      </button>
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        preload="none"
        poster={FILM_POSTER}
        src={loaded ? FILM_VIDEO : undefined}
      />
    </dialog>
  );
}
