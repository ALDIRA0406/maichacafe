import { useEffect, useState } from 'react';
import InfiniteGallery from './InfiniteGallery';

const modules = import.meta.glob('../assets/spaces/private/**/*.{JPG,jpg,jpeg,png,webp}', { query: '?url', import: 'default', eager: true });
const dynamicImages = Object.values(modules) as string[];
const fallbackImages = [
  '/images/space-private.jpg',
  '/images/gallery-5.jpg'
];
const PRIVATE_IMAGES = dynamicImages.length > 0 ? dynamicImages : fallbackImages;

interface PrivateRoomPageProps {
  onClose: () => void;
}

export default function PrivateRoomPage({ onClose }: PrivateRoomPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (!window.location.hash.includes('private-room')) onClose();
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { window.location.hash = 'space'; onClose(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
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

      {/* Hero Section with Sharp Background Image & Video Play CTA */}
      <section className="relative w-full h-[55vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="/images/space-private.jpg"
            alt="Private Room"
            className="w-full h-full object-cover scale-105 opacity-60 filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-cinematic-gradient" />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl reveal-scale-up flex flex-col items-center">
          <span className="text-matcha font-bold text-[10px] md:text-xs tracking-[0.50em] uppercase mb-3 md:mb-4 block">
            Executive Meeting &amp; Event Room
          </span>
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-display font-bold text-cream mb-4 md:mb-6 tracking-tight leading-none">
            Private <span className="italic font-light text-matcha">Room</span>
          </h1>
          <div className="w-12 md:w-16 h-[2px] bg-gold/50 mx-auto my-4 md:my-6" />
          <p className="text-cream/80 text-[10px] sm:text-sm md:text-base font-sans tracking-[0.2em] uppercase mb-6 md:mb-8">
            Estetika • Privasi • Layanan Eksklusif
          </p>
          
          {/* Play Video Tour Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-3 bg-matcha/90 hover:bg-matcha text-cream border border-matcha/40 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-[10px] md:text-[11px] uppercase tracking-[0.25em] transition-all duration-300 shadow-xl hover:shadow-matcha/20 hover:-translate-y-0.5 cursor-pointer tap-target"
          >
            <span className="w-6 h-6 bg-cream text-matcha rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span>Tonton Video Tur</span>
          </button>
        </div>

        {/* Scroll hint — desktop only */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-50">
          <span className="text-[8px] uppercase tracking-[0.3em]">Explore Detail</span>
          <div className="w-1 h-8 bg-gradient-to-b from-cream to-transparent rounded-full animate-bounce" />
        </div>
      </section>

      {/* Narrative + Info Cards */}
      <section className="relative px-5 md:px-12 py-10 md:py-20 max-w-[1400px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-20 items-start">
        <div className="space-y-5 md:space-y-8 reveal-slide-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-matcha/25 bg-cream/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-matcha">
            Visual Storytelling
          </div>
          <h2 className="text-2xl md:text-5xl font-display font-bold text-cream leading-tight">
            Kemewahan dalam<br />
            <span className="italic font-light text-matcha">Setiap Sudut Tersembunyi</span>
          </h2>
          <div className="w-16 h-[1px] bg-white/10" />
          <p className="text-cream/70 text-sm md:text-base lg:text-lg leading-relaxed">
            Ruang Private Maicha adalah representasi dari kemewahan kontemporer. Dirancang dengan dinding peredam suara berkualitas tinggi untuk menjaga kerahasiaan diskusi bisnis penting, rapat direksi, maupun kehangatan perayaan pribadi Anda.
          </p>
          <p className="text-cream/50 text-sm md:text-base leading-relaxed">
            Pencahayaan tersembunyi yang hangat, meja kayu solid premium, pendingin udara mandiri, dan integrasi Smart TV UHD menghadirkan fungsionalitas modern yang dipadukan dengan suasana elegan untuk mendukung produktivitas dan kenyamanan diskusi Anda.
          </p>
        </div>

        {/* Info cards — 2 col on mobile too */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 reveal-slide-right">
          {[
            {
              label: 'Atmosphere', title: 'Exclusive & Silent',
              desc: 'Tenang, damai, bebas gangguan. Pencahayaan temaram untuk fokus maksimal.',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )
            },
            {
              label: 'Capacity', title: 'Up to 15 Pax',
              desc: 'Nyaman untuk rapat intim, presentasi direksi, atau jamuan eksklusif.',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            {
              label: 'Features', title: 'Smart TV & AC',
              desc: 'Smart TV UHD, WiFi cepat, AC Control mandiri, Soundproof.',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )
            },
            {
              label: 'Perfect For', title: 'Board Meeting',
              desc: 'Negosiasi penting, rapat strategis bisnis, private dinner kelas atas.',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )
            }
          ].map((card) => (
            <div key={card.label} className="glass-premium-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-executive group hover:border-gold/30 hover:bg-white/[0.06] transition-all duration-500">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold block mb-0.5">{card.label}</span>
              <h3 className="text-sm font-bold text-cream mb-1 sm:mb-2 leading-tight">{card.title}</h3>
              <p className="text-cream/45 text-[10px] leading-relaxed hidden sm:block">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Room Tour Video Section */}
      <section className="relative px-5 md:px-12 py-12 md:py-24 bg-gradient-to-b from-charcoal via-espresso/10 to-charcoal border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting & Highlights */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 reveal-slide-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-cream/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Eksplorasi Virtual
            </div>
            <h2 className="text-2xl md:text-5xl font-display font-bold text-cream leading-tight">
              Saksikan Suasana<br />
              <span className="italic font-light text-matcha">Private Room Secara Nyata</span>
            </h2>
            <div className="w-16 h-[1px] bg-white/10" />
            <p className="text-cream/70 text-sm md:text-base lg:text-lg leading-relaxed">
              Kami merancang Ruang Private untuk memberikan ketenangan pikiran dan privasi absolut. Video singkat ini memperlihatkan detail sudut ruangan, kualitas kedap suara, pencahayaan eksklusif, serta fasilitas premium yang siap menunjang rapat penting maupun momen berharga Anda.
            </p>
            
            {/* Feature Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-matcha/10 flex items-center justify-center text-matcha shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cream">Acoustic Checked</h4>
                  <p className="text-cream/45 text-[10px] mt-0.5">Peredam suara tingkat profesional untuk diskusi bisnis rahasia.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-matcha/10 flex items-center justify-center text-matcha shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cream">Warm Ambience</h4>
                  <p className="text-cream/45 text-[10px] mt-0.5">Tata cahaya temaram dan hangat yang meningkatkan kenyamanan & fokus.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-matcha/10 flex items-center justify-center text-matcha shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cream">Smart Connectivity</h4>
                  <p className="text-cream/45 text-[10px] mt-0.5">Smart TV UHD & koneksi internet cepat untuk presentasi digital yang mulus.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-matcha/10 flex items-center justify-center text-matcha shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cream">Premium Amenities</h4>
                  <p className="text-cream/45 text-[10px] mt-0.5">Meja kayu solid, AC mandiri, dan berbagai kelengkapan penunjang premium lainnya.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Portrait 9:16 Video Player Container */}
          <div className="lg:col-span-5 flex justify-center reveal-slide-right">
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-[2.5rem] p-3 bg-[#1A110D] border-4 border-[#3A2A21] shadow-2xl shadow-black/80 hover:border-gold/30 hover:scale-[1.02] transition-all duration-500 group">
              
              {/* Speaker & Sensor Mockup notch at the top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#3A2A21] rounded-b-2xl z-20 flex items-center justify-center gap-2">
                <div className="w-12 h-1 bg-black/40 rounded-full" />
                <div className="w-2 h-2 bg-black/40 rounded-full" />
              </div>
              
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-charcoal">
                {!isInlinePlaying ? (
                  /* Video Poster & Play Trigger overlay */
                  <div className="absolute inset-0 w-full h-full z-10 cursor-pointer" onClick={() => setIsInlinePlaying(true)}>
                    <img
                      src="/images/space-private.jpg"
                      alt="Private Room Video Tour Poster"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                    
                    {/* Pulsing Play Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-matcha/90 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20 transform group-hover:scale-110 transition-all duration-500 relative">
                        <div className="absolute inset-0 rounded-full bg-matcha animate-ping opacity-25" />
                        <svg className="w-5 h-5 fill-cream ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cream mt-3 bg-charcoal/60 px-3 py-1 rounded-full backdrop-blur-sm">
                        Putar Video
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Embed player in native 9:16 aspect ratio with controls */
                  <iframe
                    className="w-full h-full border-0"
                    src="https://www.youtube.com/embed/OKemaiVTWXU?autoplay=1&controls=1&rel=0&modestbranding=1"
                    title="Private Room Video Tour Inline"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Full screen Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[200] bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video preview"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-cream/70 hover:text-cream transition-colors z-10 w-11 h-11 flex items-center justify-center rounded-full bg-charcoal/50 hover:bg-charcoal/80 cursor-pointer tap-target"
            aria-label="Tutup Video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Portrait 9:16 Cinematic Video Player Container */}
          <div
            className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-scale-in bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/OKemaiVTWXU?autoplay=1&controls=1&rel=0&modestbranding=1"
              title="Private Room Video Tour Modal"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Gallery */}
      <InfiniteGallery
        images={PRIVATE_IMAGES}
        label="Showcase Gallery"
        title="Private Room Atmosphere"
        captionLabel="Maicha Private Room"
        captionTitle="Suasana Ruang Pertemuan"
        accentColor="matcha"
      />

      {/* Facilities Strip */}
      <section className="relative px-5 md:px-12 py-10 md:py-16 bg-black/10 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 md:mb-10">
            <h3 className="text-xl md:text-3xl font-display font-bold text-cream">Fasilitas Eksekutif</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { title: 'Soundproof Room', d: 'Peredam suara premium untuk privasi maksimal.' },
              { title: 'Smart TV Screen', d: 'Layar UHD untuk presentasi atau video call.' },
              { title: 'A/C Independent', d: 'Kontrol pendingin suhu sesuai kenyamanan Anda.' },
              { title: 'High-Speed WiFi', d: 'Koneksi internet nirkabel ultra cepat untuk kelancaran presentasi online.' }
            ].map((f) => (
              <div key={f.title} className="glass-premium-white p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-matcha/40 transition-colors duration-300">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-matcha rounded-full mb-3 sm:mb-4 shadow-[0_0_10px_rgba(141,154,115,0.7)]" />
                <h4 className="text-xs sm:text-sm font-bold text-cream mb-1 sm:mb-2 uppercase tracking-wider leading-tight">{f.title}</h4>
                <p className="text-cream/40 text-[10px] leading-relaxed hidden sm:block">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 md:px-12 py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-matcha/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-5 md:space-y-8">
          <h3 className="text-2xl md:text-5xl font-display font-bold text-cream tracking-tight">
            Pesan Ruang Pertemuan<br />
            <span className="italic font-light text-matcha">Eksekutif Anda Sekarang</span>
          </h3>
          <p className="text-cream/55 text-sm md:text-base max-w-lg mx-auto">
            Nikmati suasana tenang, privat, dan mewah dengan pelayanan kopi serta hidangan kelas dunia dari Maicha.<br /><br />
            <span className="text-matcha font-bold">Harga Paket Meeting Room:</span><br />
            Per 3 Jam: 200K | Extra +1 Jam: 100K
          </p>
          <a
            href="https://wa.me/6282321230190?text=Halo%20Maicha%2C%20saya%20tertarik%20reservasi%20Private%20Room"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-matcha text-cream hover:bg-matcha-dark border border-matcha/30 px-8 md:px-10 py-4 md:py-5 font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] transition-all duration-300 shadow-2xl hover:-translate-y-1 group tap-target"
          >
            <span>Reservasi Via WhatsApp</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
