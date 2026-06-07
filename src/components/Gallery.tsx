import { useRef, useState, useEffect } from 'react';

const modules = import.meta.glob('../assets/spaces/**/*.{JPG,jpg,jpeg,png,webp}', { query: '?url', import: 'default', eager: true });

let dynamicPosts = Object.keys(modules).map((path, index) => ({
  id: index + 1,
  image: modules[path] as string,
  likes: (Math.floor(Math.random() * 1000) + 100).toString(),
  comments: (Math.floor(Math.random() * 50) + 5).toString(),
  caption: 'New memories added ✨',
  time: 'Baru saja'
}));

const fallbackPosts = [
  { id: 1, image: '/images/about.jpg', likes: '942', comments: '21', caption: 'Hands that craft your story 🙌', time: '4 hari lalu' },
];

const posts = dynamicPosts.length > 0 ? dynamicPosts : fallbackPosts;

type GalleryProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Gallery({ isOpen, onClose }: GalleryProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const handleMobileScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = slider.scrollWidth / posts.length;
    if (isProgrammaticScroll.current) {
      const targetLeft = cardWidth * activeSlide;
      if (Math.abs(slider.scrollLeft - targetLeft) < 2) {
        isProgrammaticScroll.current = false;
      }
      return;
    }

    const index = Math.round(slider.scrollLeft / cardWidth);
    const newSlide = Math.min(index, posts.length - 1);
    if (newSlide !== activeSlide) {
      setActiveSlide(newSlide);
    }
  };

  const scrollToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = slider.scrollWidth / posts.length;
    const targetLeft = cardWidth * index;
    if (Math.abs(slider.scrollLeft - targetLeft) > 2) {
      isProgrammaticScroll.current = true;
      slider.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
    setActiveSlide(index);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const next = (activeSlide + 1) % posts.length;
      scrollToSlide(next);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeSlide, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-charcoal/70 backdrop-blur-sm flex items-center justify-center px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-charcoal rounded-3xl border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 text-cream hover:bg-matcha hover:text-charcoal transition-all"
          aria-label="Tutup gallery"
        >
          ✕
        </button>

        {/* Header */}
        <div className="px-6 sm:px-12 pt-12 pb-8">
          <span className="text-matcha font-bold text-[10px] tracking-[0.6em] uppercase mb-3 block italic">
            Social Presence
          </span>

          <h2 className="text-4xl md:text-6xl font-display font-bold leading-none tracking-tighter text-cream">
            Live <br />
            <span className="italic font-light text-matcha">Archive.</span>
          </h2>
        </div>

        {/* Desktop Gallery */}
        <div className="hidden md:grid grid-cols-3 gap-5 px-6 sm:px-12 pb-12">
          {posts.map((p) => (
            <div
              key={p.id}
              className="bg-charcoal-light rounded-2xl overflow-hidden border border-white/5 group"
            >
              <div className="flex items-center gap-3 p-3">
                <div className="flex items-center gap-3 p-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-leaf to-matcha p-[1.5px] overflow-hidden">
                    <div className="w-full h-full rounded-full bg-cream flex items-center justify-center overflow-hidden">
                      <img
                        src="/images/logo-maicha.png"
                        alt="Logo Cafe"
                        className="w-full h-full rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  </div>

                <div>
                  <p className="text-[10px] font-bold text-cream leading-none">
                    maichacoffee
                  </p>
                  <p className="text-[8px] text-cream/30 mt-0.5">{p.time}</p>
                </div>
              </div>

              <div className="aspect-square overflow-hidden">
                <img
                  src={p.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={p.caption}
                  loading="lazy"
                />
              </div>

              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-cream/70 text-xs">❤️ {p.likes}</span>
                    <span className="text-cream/70 text-xs">💬 {p.comments}</span>
                  </div>
                  <span className="text-cream/70 text-xs">🔖</span>
                </div>

                <p className="text-cream/60 text-[10px] leading-snug">
                  <span className="font-bold text-cream/80">maichacoffee</span>{' '}
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Gallery */}
        <div className="md:hidden pb-10">
          <div
            ref={sliderRef}
            onScroll={handleMobileScroll}
            onTouchStart={() => { isProgrammaticScroll.current = false; }}
            className="flex overflow-x-scroll gap-3 px-4 pb-3 no-scrollbar"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {posts.map((p, i) => {
              const isActive = i === activeSlide;

              return (
                <div
                  key={p.id}
                  style={{ scrollSnapAlign: 'center' }}
                  className={`flex-shrink-0 w-[80vw] max-w-[300px] rounded-2xl overflow-hidden border transition-all duration-500 ${
                    isActive
                      ? 'border-matcha/40 scale-100 opacity-100'
                      : 'border-white/5 scale-[0.97] opacity-70'
                  } bg-white/5`}
                >
                  <div className="flex items-center gap-2.5 p-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-leaf to-matcha p-[1.5px] flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center text-[8px] font-bold text-cream">
                        M
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-cream leading-none">
                        maichacoffee
                      </p>
                      <p className="text-[9px] text-cream/40 mt-0.5">{p.time}</p>
                    </div>
                  </div>

                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={p.image}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isActive ? 'scale-100' : 'scale-105'
                      }`}
                      alt={p.caption}
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-cream/80 text-xs">❤️ {p.likes}</span>
                        <span className="text-cream/80 text-xs">💬 {p.comments}</span>
                      </div>
                      <span className="text-cream/50 text-xs">🔖</span>
                    </div>

                    <p className="text-cream/60 text-[10px] leading-snug">
                      <span className="font-bold text-cream/80">maichacoffee</span>{' '}
                      {p.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                aria-label={`Lihat foto ${i + 1}`}
                className={`rounded-full transition-all duration-400 ${
                  i === activeSlide
                    ? 'w-6 h-1.5 bg-matcha'
                    : 'w-1.5 h-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>

          <p className="text-center text-cream/25 text-[9px] tracking-wider mt-3 uppercase font-mono">
            ← Geser untuk melihat lebih →
          </p>
        </div>
      </div>
    </div>
  );
}