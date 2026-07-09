import { useEffect } from 'react';
import InfiniteGallery from './InfiniteGallery';

interface KaraokePageProps {
  onClose: () => void;
}

const modules = import.meta.glob('../assets/spaces/karaoke/**/*.{JPG,jpg,jpeg,png,webp}', { query: '?url', import: 'default', eager: true });
const dynamicImages = Object.values(modules) as string[];

const fallbackImages = [
  '/images/hero.jpg',
  '/images/gallery-1.jpg'
];

const KARAOKE_IMAGES = dynamicImages.length > 0 ? dynamicImages : fallbackImages;

export default function KaraokePage({ onClose }: KaraokePageProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (!window.location.hash.includes('karaoke')) onClose();
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

      {/* Hero — full screen on desktop, 50vh on mobile */}
      <section className="relative w-full h-[50vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt="Premium Karaoke Room Maicha" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-cinematic-gradient" />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl reveal-scale-up">
          <span className="text-gold font-bold text-[10px] md:text-xs tracking-[0.60em] uppercase mb-3 md:mb-4 block">
            Exclusive Entertainment Suite
          </span>
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-display font-bold text-cream mb-4 md:mb-6 tracking-tight leading-none">
            Premium <span className="italic font-light text-gold">Karaoke</span>
          </h1>
          <div className="w-12 md:w-16 h-[2px] bg-gold/50 mx-auto my-4 md:my-6" />
          <p className="text-cream/90 text-[10px] sm:text-sm md:text-base font-sans tracking-[0.2em] uppercase">
            Acoustic Perfection • Smart Technology • Ultimate Gathering
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="relative px-5 md:px-12 py-10 md:py-20 max-w-[1400px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-20 items-center">
        <div className="space-y-5 md:space-y-8 reveal-slide-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-cream/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            Entertainment Redefined
          </div>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-cream leading-tight">
            Ruang Hiburan Privat
          </h2>
          <div className="w-16 h-[1px] bg-white/10" />
          <p className="text-cream/70 text-sm md:text-base lg:text-lg leading-relaxed">
            Karaoke Room Maicha menghadirkan ruang ekspresi tak berbatas bagi Anda, kolega, maupun keluarga. Dirancang dengan teknologi akustik canggih serta sistem tata suara berkualitas tinggi untuk melantunkan melodi favorit dengan kedalaman audio yang memukau.
          </p>
        </div>
        <div className="glass-premium-matcha p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-executive reveal-slide-right space-y-4 md:space-y-6">
          <span className="text-gold font-bold text-[10px] tracking-[0.3em] uppercase block">Room Capacity</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-cream">Up to 12 Pax</h3>
          <p className="text-cream/60 text-sm leading-relaxed">
            Sangat lega untuk pesta ulang tahun, sesi seru-seruan bersama rekan kerja, hingga pertemuan santai keluarga.
          </p>
          <div className="h-px bg-white/10 w-full" />
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-charcoal bg-gold/30 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-cream">{i}</div>
              ))}
            </div>
            <span className="text-cream/40 text-xs italic">Ideal for close circles</span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <InfiniteGallery
        images={KARAOKE_IMAGES}
        label="Showcase Gallery"
        title="Karaoke Room Atmosphere"
        captionLabel="Maicha Entertainment Room"
        captionTitle="Suasana Karaoke Room"
        accentColor="gold"
      />

      {/* Facilities */}
      <section className="relative px-5 md:px-12 py-12 md:py-20 max-w-[1280px] mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h3 className="text-xl md:text-4xl font-display font-bold text-cream">Fasilitas Karaoke</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {[
            { title: 'Smart TV Screen', d: 'Layar Ultra-HD resolusi tinggi untuk lirik yang tajam.', icon: '📺' },
            { title: 'Wireless Mic', d: 'Mikrofon nirkabel profesional, kejernihan suara tingkat tinggi.', icon: '🎤' },
            { title: 'Premium Sound', d: 'Tata suara kelas premium dengan resonansi bass bulat.', icon: '🔊' },
            { title: 'Air Conditioner', d: 'Pendingin mandiri menjaga suhu ruangan optimal.', icon: '❄️' },
            { title: 'Private Room', d: 'Dinding peredam suara profesional untuk privasi total.', icon: '🔒' },
          ].map((item, idx) => (
            <div key={idx} className="glass-premium-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5 hover:border-gold/30 hover:bg-white/5 shadow-executive transition-all duration-500 group text-center">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gold/10 flex items-center justify-center rounded-xl sm:rounded-2xl mb-3 sm:mb-6 mx-auto text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h4 className="text-sm font-bold text-cream mb-1 sm:mb-2">{item.title}</h4>
              <p className="text-cream/50 text-[10px] leading-relaxed hidden sm:block">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 md:px-12 py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-gold/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-5 md:space-y-8">
          <h3 className="text-2xl md:text-5xl font-display font-bold text-cream tracking-tight">
            Nyalakan Melodi Favorit<br />
            <span className="italic font-light text-gold">di Karaoke Suite Maicha</span>
          </h3>
          <p className="text-cream/55 text-sm md:text-base max-w-lg mx-auto">
            Reservasi sekarang untuk mendapatkan slot terbaik. Nikmati espresso hangat dan seru bernyanyi bersama.<br /><br />
            <span className="text-gold font-bold">Harga Paket Karaoke:</span><br />
            1 Jam: 150K | 2 Jam: 250K | Extra +1 Jam: 100K
          </p>
          <a
            href="https://wa.me/6282321230190?text=Halo%20Maicha%2C%20saya%20tertarik%20memesan%20Premium%20Karaoke%20Room"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold text-charcoal hover:bg-gold/80 px-8 md:px-10 py-4 md:py-5 font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] transition-all duration-300 shadow-2xl hover:-translate-y-1 group tap-target"
          >
            <span>Booking Karaoke Room</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
