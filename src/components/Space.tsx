import { useState, useEffect, lazy, Suspense } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionWrapper from './SectionWrapper';

const IndoorPage = lazy(() => import('./IndoorPage'));
const PrivateRoomPage = lazy(() => import('./PrivateRoomPage'));
const KaraokePage = lazy(() => import('./KaraokePage'));
const OutdoorPage = lazy(() => import('./OutdoorPage'));

interface SpaceType {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  mood: string;
  mainImage?: string;
  video?: string;
  gallery?: string[];
  features: string[];
  capacity: string;
  bestFor: string;
}

const SPACES: SpaceType[] = [
  {
    id: 'indoor',
    title: 'Indoor',
    subtitle: 'The Core Space',
    desc: 'Ruangan utama Maicha dirancang dengan nuansa earthy—perpaduan moka, krem hangat, dan sentuhan hijau lembut yang membuat mata lebih rileks. Material kayu, lampu temaram, dan layout yang lapang menciptakan rasa hangat sejak langkah pertama.',
    mood: 'Calm & Focused',
    mainImage: '/images/space-indoor.jpg',
    gallery: [
      '/images/gallery-5.jpg', 
      '/images/gallery-1.jpg', 
      '/images/gallery-2.jpg', 
      '/images/gallery-3.jpg'
    ],
    features: ['Free WiFi', 'Silent Zone', 'Power Outlets', 'Air Purifier'],
    capacity: '40 seats',
    bestFor: 'Working, Reading, Deep Conversation'
  },
  {
    id: 'private',
    title: 'Private Room',
    subtitle: 'The Executive Room',
    desc: 'Ruang kedap suara berkualitas tinggi, dirancang untuk privasi maksimal tanpa meninggalkan estetika. Cocok untuk meeting direksi, workshop kreatif, atau perayaan keluarga.',
    mood: 'Exclusive & Private',
    mainImage: '/images/space-private.jpg',
    video: 'https://youtube.com/shorts/OKemaiVTWXU',
    features: ['Smart TV', 'Soundproof', 'A/C Control', 'High-Speed WiFi'],
    capacity: 'Up to 15 pax',
    bestFor: 'Meeting, Workshop, Private Event'
  },
  {
    id: 'karaoke',
    title: 'Karaoke',
    subtitle: 'Entertainment Room',
    desc: 'Nikmati hiburan maksimal di ruang karaoke eksklusif Maicha. Dilengkapi dengan sistem tata suara (sound system) kelas premium, layar besar ultra-HD, peredam suara profesional, serta pilihan lagu terupdate. Tempat terbaik untuk bersenang-senang bersama kerabat dan rekan kerja.',
    mood: 'Fun & Festive',
    mainImage: '/images/hero.jpg',
    gallery: [
      '/images/gallery-1.jpg', 
      '/images/gallery-2.jpg', 
      '/images/gallery-3.jpg', 
      '/images/gallery-4.jpg'
    ],
    features: ['Premium Sound', 'Smart TV', 'UHD Screen', 'Exclusive Service'],
    capacity: 'Up to 12 pax',
    bestFor: 'Singing, Birthday Party, Casual Gathering'
  },
  {
    id: 'outdoor',
    title: 'Outdoor',
    subtitle: 'Al Fresco Experience',
    desc: 'Area outdoor kami adalah oase di tengah beton Jakarta. Dikelilingi tanaman tropis yang menyaring udara, dengan lampu pijar hangat yang menawan saat malam tiba.',
    mood: 'Fresh & Breezy',
    mainImage: '/images/space-outdoor.jpg',
    gallery: [
      '/images/gallery-2.jpg', 
      '/images/gallery-3.jpg', 
      '/images/gallery-4.jpg', 
      '/images/gallery-5.jpg'
    ],
    features: ['Tropical Oasis', 'Smoking Area', 'Natural Ventilation', 'Garden View'],
    capacity: '25 seats',
    bestFor: 'Casual Hangout, Photos, Evening Chill'
  }
];

export default function Space() {
  const [activeOverlay, setActiveOverlay] = useState<'indoor' | 'private' | 'karaoke' | 'outdoor' | null>(null);
  const { ref, isVisible } = useScrollAnimation(0.1);

  // Sync state with URL hash for premium navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#indoor') {
        setActiveOverlay('indoor');
      } else if (hash === '#private-room') {
        setActiveOverlay('private');
      } else if (hash === '#karaoke') {
        setActiveOverlay('karaoke');
      } else if (hash === '#outdoor') {
        setActiveOverlay('outdoor');
      } else {
        setActiveOverlay(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleCardClick = (id: string) => {
    if (id === 'indoor') {
      window.location.hash = 'indoor';
    } else if (id === 'private') {
      window.location.hash = 'private-room';
    } else if (id === 'karaoke') {
      window.location.hash = 'karaoke';
    } else if (id === 'outdoor') {
      window.location.hash = 'outdoor';
    }
  };

  return (
    <SectionWrapper id="space" bg="espresso" className="!pt-20 !pb-16 md:!pt-26 md:!pb-24">
 
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#C69C6D]/5 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-[#E8D5B7]/4 rounded-full blur-[90px] sm:blur-[110px] pointer-events-none animate-glow-pulse" style={{ animationDelay: '2s' }} />

      <div ref={ref} className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <span className="text-[#C69C6D] font-bold text-[10px] tracking-[0.5em] uppercase mb-4 block">The Ambience</span>
        <h2 className="text-4xl md:text-7xl text-[#E8D5B7] font-display font-bold mb-4">
          Jelajahi <span className="italic font-light text-[#C69C6D]">Sudut</span> Kami
        </h2>
        <p className="text-cream/50 italic text-sm">Klik area untuk melihat detail portofolio eksklusif.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {SPACES.map((s) => (
          <div
            key={s.id}
            onClick={() => handleCardClick(s.id)}
            className="group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-xl hover:shadow-executive hover:-translate-y-2 transition-all duration-500"
          >
            <div className="aspect-[3/4] overflow-hidden bg-black relative">
              {s.mainImage ? (
                <div className="w-full h-full relative">
                  <img
                    src={s.mainImage}
                    className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-in-out"
                    alt={s.title}
                    loading="lazy"
                  />
                  {/* Premium Play/Arrow indicator badge on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#A67C52]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-500 text-[#E8D5B7] border border-[#C69C6D]/20 shadow-[0_0_15px_rgba(198,156,109,0.25)]">
                      {s.id === 'private' ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <span className="text-[#C69C6D] text-[7px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 sm:mb-2 block">{s.subtitle}</span>
              <h3 className="text-xl sm:text-3xl text-[#E8D5B7] font-display font-bold mb-2 sm:mb-3 leading-tight">{s.title}</h3>
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                {s.features.slice(0, 1).map(f => (
                  <span key={f} className="bg-[#A67C52]/15 backdrop-blur-md text-[#E8D5B7]/90 border border-[#C69C6D]/20 text-[7px] sm:text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">{f}</span>
                ))}
              </div>
              <div className="w-0 group-hover:w-full h-[1px] sm:h-[2px] bg-[#C69C6D] transition-all duration-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Premium Full-Viewport Experience Pages */}
      <Suspense fallback={null}>
        {activeOverlay === 'indoor' && (
          <IndoorPage onClose={() => setActiveOverlay(null)} />
        )}
        {activeOverlay === 'private' && (
          <PrivateRoomPage onClose={() => setActiveOverlay(null)} />
        )}
        {activeOverlay === 'karaoke' && (
          <KaraokePage onClose={() => setActiveOverlay(null)} />
        )}
        {activeOverlay === 'outdoor' && (
          <OutdoorPage onClose={() => setActiveOverlay(null)} />
        )}
      </Suspense>
    </SectionWrapper>
  );
}
