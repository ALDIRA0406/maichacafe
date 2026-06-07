import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionWrapper from './SectionWrapper';

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Cozy & Aesthetic',
    description: 'Setiap sudut dirancang untuk kenyamanan dan keindahan visual yang instagramable.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: 'Bahan Berkualitas',
    description: 'Kopi single origin pilihan dan bahan makanan segar terbaik untuk setiap sajian.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Santai & Produktif',
    description: 'WiFi cepat, colokan tersedia, dan suasana tenang untuk bekerja atau bersantai.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: 'Pengalaman Nyaman',
    description: 'Pelayanan ramah, musik yang pas, dan suasana yang bikin betah untuk diam lama.',
  },
];

export default function WhyChoose() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <SectionWrapper id="why" bg="charcoal">
      {/* Header */}
      <div
        ref={ref}
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-matcha font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
          Kenapa Maicha?
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl text-cream font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Pengalaman yang <span className="text-matcha">Berbeda</span>
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`bg-cream/5 border border-cream/10 rounded-2xl p-7 sm:p-8 text-center hover:bg-cream/10 hover:border-matcha/30 transition-all duration-500 hover:-translate-y-2 group cursor-default ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-matcha/10 text-matcha mb-5 group-hover:bg-matcha/20 transition-colors duration-300">
        {feature.icon}
      </div>
      <h3
        className="text-lg sm:text-xl text-cream font-semibold mb-3"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {feature.title}
      </h3>
      <p className="text-cream/60 text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
