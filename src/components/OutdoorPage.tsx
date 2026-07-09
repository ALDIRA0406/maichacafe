import { useEffect } from 'react';
import InfiniteGallery from './InfiniteGallery';

interface OutdoorPageProps {
  onClose: () => void;
}

const modules = import.meta.glob('../assets/spaces/outdoor/**/*.{JPG,jpg,jpeg,png,webp}', { query: '?url', import: 'default', eager: true });
const dynamicImages = Object.values(modules) as string[];

const fallbackImages = [
  '/images/space-outdoor.jpg',
  '/images/gallery-2.jpg'
];

const OUTDOOR_IMAGES = dynamicImages.length > 0 ? dynamicImages : fallbackImages;

export default function OutdoorPage({ onClose }: OutdoorPageProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (!window.location.hash.includes('outdoor')) onClose();
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { window.location.hash = 'space'; onClose(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] w-full h-full overflow-y-auto bg-charcoal text-cream no-scrollbar reveal-fade-in">
      {/* Nav Bar */}
      <div className="absolute top-0 left-0 w-full z-[160] px-4 py-4 md:px-12 md:py-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <button
            onClick={() => { window.location.hash = 'space'; onClose(); }}
            className="flex items-center gap-2 bg-white/5 hover:bg-gold/15 hover:text-gold border border-white/10 px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 tap-target"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Kembali</span>
          </button>
        </div>
        <div className="pointer-events-auto">
          <button
            onClick={() => { window.location.hash = 'space'; onClose(); }}
            className="w-11 h-11 bg-white/5 hover:bg-gold/15 hover:text-gold border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 tap-target"
            aria-label="Tutup Halaman"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[50vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/space-outdoor.jpg" alt="Luxury Outdoor Garden Cafe Maicha" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-cinematic-gradient" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl reveal-scale-up">
          <span className="text-matcha font-bold text-[10px] md:text-xs tracking-[0.50em] uppercase mb-3 md:mb-4 block">The Al Fresco Experience</span>
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-display font-bold text-cream mb-4 md:mb-6 tracking-tight leading-none">
            Premium <span className="italic font-light text-matcha">Outdoor</span>
          </h1>
          <div className="w-12 md:w-16 h-[2px] bg-gold/50 mx-auto my-4 md:my-6" />
          <p className="text-cream/80 text-[10px] sm:text-sm md:text-base font-sans tracking-[0.2em] uppercase">
            Tropical Garden • Refreshing Breeze • Cozy Vibe
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="relative px-5 md:px-12 py-10 md:py-20 max-w-[1400px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-20 items-center">
        <div className="space-y-5 md:space-y-8 reveal-slide-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-matcha/25 bg-cream/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-matcha">
            Natural Sanctuary
          </div>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-cream leading-tight">
            Oase Tropis Estetik<br />
            <span className="italic font-light text-matcha">di Tengah Jakarta</span>
          </h2>
          <div className="w-16 h-[1px] bg-white/10" />
          <p className="text-cream/70 text-sm md:text-base lg:text-lg leading-relaxed">
            Area outdoor Maicha dirancang sebagai peristirahatan alami yang rindang. Dikelilingi oleh tanaman hias tropis, berlantai batu alam estetik, serta dihiasi gantungan lampu pijar hangat yang temaram syahdu kala senja.
          </p>
          <p className="text-cream/55 text-sm md:text-base leading-relaxed">
            Sangat cocok untuk menikmati kopi sore hari, bercengkerama santai bersama rekan, maupun mencari inspirasi baru di ruang terbuka yang asri.
          </p>
        </div>

        {/* Quote card */}
        <div className="glass-premium-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-executive reveal-slide-right flex flex-col justify-center text-center">
          <span className="text-4xl text-matcha font-display leading-none mb-3">"</span>
          <p className="text-cream/80 text-base md:text-xl font-display italic leading-relaxed mb-4 md:mb-6">
            "Sebuah ruang bernapas yang hijau, di mana kopi bertemu angin segar."
          </p>
          <div className="w-10 h-[1px] bg-gold/50 mx-auto mb-3" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold">Maicha Garden Manifesto</span>
        </div>
      </section>

      {/* Gallery */}
      <InfiniteGallery
        images={OUTDOOR_IMAGES}
        label="Showcase Gallery"
        title="Garden Ambience"
        captionLabel="Maicha Garden Space"
        captionTitle="Suasana Al Fresco"
        accentColor="matcha"
      />

      {/* Facilities */}
      <section className="relative px-5 md:px-12 py-12 md:py-20 max-w-[1280px] mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-xl md:text-4xl font-display font-bold text-cream">Fasilitas Outdoor</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { title: 'Cozy Seating', d: 'Tempat duduk nyaman untuk bersantai menikmati udara segar.', icon: '🪑' },
            { title: 'Smoking Area', d: 'Area merokok khusus yang lapang dan nyaman.', icon: '🚬' },
            { title: 'Natural Ventilation', d: 'Sirkulasi udara alami yang segar dan menyejukkan.', icon: '🌿' },
            { title: 'Garden View', d: 'Pemandangan taman tropis yang menyegarkan mata.', icon: '🌳' }
          ].map((item, idx) => (
            <div key={idx} className="glass-premium-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5 hover:border-gold/30 hover:bg-white/5 shadow-executive transition-all duration-500 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 text-xl sm:text-2xl flex items-center justify-center rounded-xl sm:rounded-2xl mb-3 sm:mb-6 shadow-md group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h4 className="text-sm font-bold text-cream mb-1 sm:mb-3 tracking-wide">{item.title}</h4>
              <p className="text-cream/50 text-[10px] sm:text-xs leading-relaxed hidden sm:block">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 md:px-12 py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-matcha/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-5 md:space-y-8">
          <h3 className="text-2xl md:text-5xl font-display font-bold text-cream tracking-tight">
            Rasakan Kesejukan Hembusan Angin<br />
            <span className="italic font-light text-matcha">di Outdoor Garden Maicha</span>
          </h3>
          <p className="text-cream/55 text-sm md:text-base max-w-lg mx-auto">
            Nikmati sore santai dikelilingi taman tropis asri. Kopi dingin, kudapan hangat, dan atmosfer menenangkan.
          </p>
          <a
            href="https://wa.me/6282321230190?text=Halo%20Maicha%2C%20saya%20tertarik%20tempat%20di%20Outdoor%20Garden"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-matcha text-cream hover:bg-matcha-dark px-8 md:px-10 py-4 md:py-5 font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] transition-all duration-300 shadow-2xl hover:-translate-y-1 group tap-target"
          >
            <span>Hubungi Garden Cafe</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
