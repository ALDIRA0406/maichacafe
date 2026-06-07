import { useRef, useState, useEffect, useCallback } from 'react';

const reviews = [
  { name: "Aditya Pratama", role: "Regular", content: "Kopi terbaik di Jakarta. Suasananya membuat saya betah berjam-jam untuk bekerja." },
  { name: "Siska Wijaya", role: "Food Blogger", content: "Setiap sudut Maicha sangat fotogenik. Kualitas Sourdough-nya luar biasa renyah." },
  { name: "Budi Santoso", role: "Director", content: "Sangat langka menemukan tempat yang memikirkan detail playlist sejauh ini. Maicha adalah inspirasi." },
  { name: "Rina Maria", role: "Freelancer", content: "WiFi cepat dan kopi yang tidak pernah mengecewakan. Tempat favorit saya di Senayan." },
  { name: "Kevin Sanjaya", role: "Entrepreneur", content: "Tempat yang sempurna untuk meeting santai dengan partner bisnis. Sangat prestisius." },
  { name: "Maya Putri", role: "Artist", content: "Estetikanya sangat mendalam. Setiap elemen terasa dipikirkan dengan sangat matang." },
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, idx) => (
        <svg key={idx} className="w-4 h-4 text-matcha-dark" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="w-[280px] sm:w-[400px] flex-shrink-0 p-8 rounded-[32px] bg-white border border-charcoal/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between whitespace-normal">
      <div className="mb-6">
        <StarRating />
        <p className="text-charcoal/70 text-base sm:text-lg italic leading-relaxed">"{review.content}"</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-matcha/10 flex items-center justify-center font-bold text-matcha flex-shrink-0">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-charcoal font-bold text-sm tracking-widest uppercase">{review.name}</p>
          <p className="text-charcoal/30 text-[10px] uppercase">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Mobile Swipe Slider — live drag + spring snap
───────────────────────────────────────────── */
function MobileSlider() {
  const total = reviews.length;
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);   // real-time px offset while dragging
  const [isSnapping, setIsSnapping] = useState(false); // controls CSS transition

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef    = useRef(0);
  const startYRef    = useRef(0);
  const isDragging   = useRef(false);
  const isHorizontal = useRef<boolean | null>(null);   // detect scroll vs swipe direction
  const velocityX    = useRef(0);
  const lastXRef     = useRef(0);
  const lastTimeRef  = useRef(0);
  const autoTimer    = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideWidth = () =>
    containerRef.current ? containerRef.current.clientWidth : window.innerWidth;

  /* ── go to slide with spring animation ── */
  const snapTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    setIsSnapping(true);
    setDragOffset(0);
    setCurrent(clamped);
  }, [total]);

  /* ── reset & restart auto-advance ── */
  const resetAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
      setDragOffset(0);
      setIsSnapping(true);
    }, 5000);
  }, [total]);

  useEffect(() => {
    resetAuto();
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [resetAuto]);

  /* ── track translateX ──
     base position = -(current * slideWidth)
     add dragOffset while finger is moving              */
  const trackX = -(current * slideWidth()) + dragOffset;

  /* ────────── Touch handlers ────────── */
  const onTouchStart = (e: React.TouchEvent) => {
    // Pause auto-advance while user interacts
    if (autoTimer.current) clearInterval(autoTimer.current);

    startXRef.current    = e.touches[0].clientX;
    startYRef.current    = e.touches[0].clientY;
    lastXRef.current     = e.touches[0].clientX;
    lastTimeRef.current  = performance.now();
    velocityX.current    = 0;
    isDragging.current   = true;
    isHorizontal.current = null;   // unknown until first move
    setIsSnapping(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const dx = e.touches[0].clientX - startXRef.current;
    const dy = e.touches[0].clientY - startYRef.current;

    // First move: detect axis
    if (isHorizontal.current === null) {
      if (Math.abs(dx) > Math.abs(dy) + 4) {
        isHorizontal.current = true;
      } else if (Math.abs(dy) > Math.abs(dx) + 4) {
        isHorizontal.current = false; // vertical scroll – bail out
        isDragging.current = false;
        return;
      } else {
        return; // too small to determine yet
      }
    }

    if (!isHorizontal.current) return;

    e.preventDefault(); // prevent page scroll while swiping horizontally

    // Velocity calculation
    const now = performance.now();
    const dt  = now - lastTimeRef.current;
    if (dt > 0) {
      velocityX.current = (e.touches[0].clientX - lastXRef.current) / dt;
    }
    lastXRef.current    = e.touches[0].clientX;
    lastTimeRef.current = now;

    // Rubber-band resistance at edges
    let offset = dx;
    const isAtStart = current === 0 && dx > 0;
    const isAtEnd   = current === total - 1 && dx < 0;
    if (isAtStart || isAtEnd) {
      offset = dx * 0.22; // rubber-band feel
    }

    setDragOffset(offset);
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const sw       = slideWidth();
    const swipeDx  = dragOffset;
    const velocity = velocityX.current;

    // Decide which slide to snap to:
    // - fast swipe (velocity > threshold) → always advance
    // - slow drag → advance if moved more than 30% of slide width
    let next = current;
    if (velocity < -0.4 || swipeDx < -(sw * 0.30)) {
      next = Math.min(total - 1, current + 1);
    } else if (velocity > 0.4 || swipeDx > sw * 0.30) {
      next = Math.max(0, current - 1);
    }

    snapTo(next);
    resetAuto();
  };

  /* ────────── Mouse drag (desktop preview) ────────── */
  const onMouseDown = (e: React.MouseEvent) => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    startXRef.current   = e.clientX;
    lastXRef.current    = e.clientX;
    lastTimeRef.current = performance.now();
    velocityX.current   = 0;
    isDragging.current  = true;
    isHorizontal.current = true;
    setIsSnapping(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx  = e.clientX - startXRef.current;
    const now = performance.now();
    const dt  = now - lastTimeRef.current;
    if (dt > 0) velocityX.current = (e.clientX - lastXRef.current) / dt;
    lastXRef.current    = e.clientX;
    lastTimeRef.current = now;

    let offset = dx;
    const isAtStart = current === 0 && dx > 0;
    const isAtEnd   = current === total - 1 && dx < 0;
    if (isAtStart || isAtEnd) offset = dx * 0.22;

    setDragOffset(offset);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const sw = slideWidth();
    const dx = e.clientX - startXRef.current;
    let next = current;
    if (velocityX.current < -0.4 || dx < -(sw * 0.30)) next = Math.min(total - 1, current + 1);
    else if (velocityX.current > 0.4 || dx > sw * 0.30) next = Math.max(0, current - 1);
    snapTo(next);
    resetAuto();
  };

  const onMouseLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    snapTo(current);
    resetAuto();
  };

  /* ────────── after snap animation ends ────────── */
  const onTransitionEnd = () => setIsSnapping(false);

  return (
    <div className="relative select-none" ref={containerRef}>

      {/* ── Slide track ── */}
      <div
        className="flex"
        style={{
          transform: `translateX(${trackX}px)`,
          transition: isSnapping
            ? 'transform 0.52s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none',
          willChange: 'transform',
          cursor: isDragging.current ? 'grabbing' : 'grab',
        }}
        onTransitionEnd={onTransitionEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {reviews.map((review, i) => {
          const isActive = i === current;
          return (
            <div
              key={i}
              className="flex-shrink-0 px-4"
              style={{ width: '100%' }}
            >
              <div
                className="p-7 rounded-[28px] bg-white border border-charcoal/5 flex flex-col justify-between"
                style={{
                  boxShadow: isActive
                    ? '0 20px 60px -10px rgba(36,24,18,0.18), 0 4px 16px -4px rgba(36,24,18,0.10)'
                    : '0 2px 12px -4px rgba(36,24,18,0.06)',
                  transform: isActive ? 'scale(1)' : 'scale(0.96)',
                  opacity: isActive ? 1 : 0.55,
                  transition: 'transform 0.52s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, box-shadow 0.4s ease',
                }}
              >
                <div className="mb-5">
                  <StarRating />
                  <p className="text-charcoal/70 text-base italic leading-relaxed">"{review.content}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-matcha/10 flex items-center justify-center font-bold text-matcha flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-charcoal font-bold text-sm tracking-widest uppercase">{review.name}</p>
                    <p className="text-charcoal/30 text-[10px] uppercase">{review.role}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to review ${i + 1}`}
            onClick={() => { snapTo(i); resetAuto(); }}
            style={{
              transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
              width:  i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '999px',
              background: i === current ? 'var(--color-matcha-dark)' : 'rgba(36,24,18,0.15)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* ── Prev / Next buttons ── */}
      <div className="flex gap-3 px-4 mt-4">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => { snapTo(current - 1); resetAuto(); }}
          disabled={current === 0}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-charcoal/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-charcoal/40 disabled:opacity-25 active:scale-95 cursor-pointer"
          style={{ transition: 'opacity 0.3s, transform 0.15s' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => { snapTo(current + 1); resetAuto(); }}
          disabled={current === total - 1}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-charcoal/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-charcoal/40 disabled:opacity-25 active:scale-95 cursor-pointer"
          style={{ transition: 'opacity 0.3s, transform 0.15s' }}
        >
          Next
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Desktop infinite marquee ── */
function DesktopMarquee() {
  return (
    <div className="relative flex overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-6 py-4">
        {[...reviews, ...reviews].map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-cream py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 mb-16 text-center">
        <span className="text-matcha font-bold text-xs tracking-[0.5em] uppercase mb-4 block">Social Proof</span>
        <h2 className="text-4xl md:text-6xl text-charcoal font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Suara Para <span className="italic font-light text-matcha">Penjelajah</span>
        </h2>
      </div>

      {/* Mobile: swipe carousel */}
      <div className="sm:hidden">
        <MobileSlider />
      </div>

      {/* Desktop / tablet: auto-scroll marquee */}
      <div className="hidden sm:block">
        <DesktopMarquee />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
