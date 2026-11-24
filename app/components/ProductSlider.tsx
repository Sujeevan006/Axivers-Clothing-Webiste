'use client';

import { Children, useEffect, useId, useRef, useState, type ReactNode } from 'react';

export function ProductSlider({ children, label, autoPlay = false, suspended = false }: { children: ReactNode; label: string; autoPlay?: boolean; suspended?: boolean }) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackId = useId();
  const [position, setPosition] = useState({ previous: false, next: slides.length > 2 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !autoPlay || suspended || hovered || focused || touching || slides.length < 2) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timer);
      if (document.hidden || reducedMotion.matches) return;
      timer = setTimeout(() => {
        const first = track.children[0] as HTMLElement | undefined;
        const second = track.children[1] as HTMLElement | undefined;
        const end = track.scrollWidth - track.clientWidth;
        if (first && second && end > 6) {
          const step = second.offsetLeft - first.offsetLeft;
          track.scrollTo({
            left: track.scrollLeft >= end - 6 ? 0 : Math.min(track.scrollLeft + step, end),
            behavior: 'smooth',
          });
        }
        schedule();
      }, 3000);
    };
    // Restart the dwell time after scrolling, including manual swipes.
    track.addEventListener('scroll', schedule, { passive: true });
    document.addEventListener('visibilitychange', schedule);
    reducedMotion.addEventListener('change', schedule);
    schedule();
    return () => {
      clearTimeout(timer);
      track.removeEventListener('scroll', schedule);
      document.removeEventListener('visibilitychange', schedule);
      reducedMotion.removeEventListener('change', schedule);
    };
  }, [autoPlay, suspended, hovered, focused, touching, slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const atStart = track.scrollLeft <= 4;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 6;
      setPosition({
        previous: !atStart,
        next: !atEnd,
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', update);
    };
  }, [slides.length]);

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    const step = first && second ? second.offsetLeft - first.offsetLeft : 280;
    // On wider screens where 3 or 4 cards are visible, scroll by 2 cards for smoother navigation
    const count = track.clientWidth > 900 ? 2 : 1;
    track.scrollBy({
      left: direction * step * count,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section
      className="product-slider"
      aria-label={label}
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
      onTouchCancel={() => setTouching(false)}
    >
      <div className="slider-toolbar">
        <span className="slider-count">{slides.length} {slides.length === 1 ? 'item' : 'items'}</span>
        <div className="slider-controls">
          <button
            type="button"
            aria-label={`Previous items in ${label}`}
            aria-controls={trackId}
            disabled={!position.previous}
            onClick={() => move(-1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m14 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Next items in ${label}`}
            aria-controls={trackId}
            disabled={!position.next}
            onClick={() => move(1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m10 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <div
        id={trackId}
        ref={trackRef}
        className="product-slider-track"
        tabIndex={0}
        aria-label={`${label}. Scroll horizontally or use the previous and next buttons.`}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        {slides.map((slide, index) => (
          <div
            className="product-slide"
            key={(slide as { key?: string }).key || index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>
    </section>
  );
}
