import { useEffect, useRef } from 'react';

type ProductVideoProps = {
  src: string;
  poster: string;
  label: string;
};

export function ProductVideo({ src, poster, label }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return <video ref={videoRef} src={src} poster={poster} role="img" aria-label={label} muted loop playsInline preload="none" />;
}
