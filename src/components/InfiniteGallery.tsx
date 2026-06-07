import { useRef, useState, useEffect, useCallback } from 'react';

interface InfiniteGalleryProps {
  images: string[];
  label: string;
  title: string;
  captionLabel: string;
  captionTitle: string;
  accentColor?: 'gold' | 'matcha';
}

export default function InfiniteGallery({
  images,
  label,
  title,
  captionLabel,
  captionTitle,
  accentColor = 'gold',
}: InfiniteGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalImages = images.length;
  const accentClass = accentColor === 'matcha' ? 'text-matcha' : 'text-gold';
  const dotActiveClass = accentColor === 'matcha' ? 'bg-matcha' : 'bg-gold';
  const btnHoverClass = accentColor === 'matcha' ? 'hover:bg-matcha/15 hover:text-matcha' : 'hover:bg-gold/15 hover:text-gold';

  // Infinite loop navigation
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  // Auto-play infinite loop
  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 4000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [nextSlide]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextSlide, 4000);
  }, [nextSlide]);

  const handlePrev = () => { prevSlide(); resetAutoPlay(); };
  const handleNext = () => { nextSlide(); resetAutoPlay(); };
  const handleDotClick = (i: number) => { setActiveIndex(i); resetAutoPlay(); };

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  // Mouse drag (desktop)
  const mouseStartX = useRef<number | null>(null);
  const handleMouseDown = (e: React.MouseEvent) => { mouseStartX.current = e.clientX; };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? handleNext() : handlePrev(); }
    mouseStartX.current = null;
  };

  return (
    <section className="relative py-6 sm:py-8 md:py-12 bg-black/15 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex items-end justify-between mb-4 sm:mb-5 md:mb-8">
        <div>
          <span className={`${accentClass} font-bold text-[10px] tracking-[0.3em] uppercase block mb-1`}>
            {label}
          </span>
          <h3 className="text-lg sm:text-xl md:text-3xl font-display font-bold text-cream">{title}</h3>
        </div>
        <div className="flex gap-2 sm:gap-3 z-20">
          <button
            onClick={handlePrev}
            className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 ${btnHoverClass} flex items-center justify-center transition-all duration-300`}
            aria-label="Sebelumnya"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 ${btnHoverClass} flex items-center justify-center transition-all duration-300`}
            aria-label="Selanjutnya"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slideshow - Full image, one at a time, fade transition */}
      <div
        className="relative w-full select-none cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-auto max-w-[1400px] px-0 sm:px-4 md:px-12">
          <div className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  index === activeIndex
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 z-0'
                }`}
              >
                {/* Full image */}
                <img
                  src={img}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index <= 1 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />

                {/* Caption - always visible on active slide */}
                <div className="absolute bottom-4 sm:bottom-5 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
                  <span className={`text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] ${accentClass} font-bold block mb-0.5 sm:mb-1`}>
                    {captionLabel}
                  </span>
                  <h4 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-display font-bold text-cream leading-tight">
                    {captionTitle}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-8 md:top-6 md:right-16 z-20 bg-charcoal/50 backdrop-blur-sm text-cream/70 text-[9px] sm:text-[10px] md:text-xs font-mono px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10">
            {activeIndex + 1} / {totalImages}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 md:mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Slide ${index + 1}`}
            className={`rounded-full transition-all duration-500 ${
              index === activeIndex
                ? `w-5 sm:w-6 md:w-8 h-1.5 ${dotActiveClass}`
                : 'w-1.5 sm:w-2 md:w-2.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
