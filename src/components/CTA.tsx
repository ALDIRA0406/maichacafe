import { useScrollAnimation } from '../hooks/useScrollAnimation';
import BrandLogo from './BrandLogo';

export default function CTA() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-br from-matcha/20 via-transparent to-leaf/10" />

      {/* Decorative blurs */}
      <div className="absolute top-10 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-matcha/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-leaf/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-matcha font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
            Mulai Sekarang
          </p>
          <h2
            className="text-2xl md:text-2xl lg:text-3xl text-cream font-bold leading-tight max-w-3xl mx-auto mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Temukan tempat nyaman untuk menikmati kopi dan waktu santai Anda di{' '}
            <span className="text-matcha">Maicha</span>
          </h2>

          <div className="relative mb-10 flex flex-col md:flex-row items-center justify-center min-h-[48px]">
            <div className="md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 mb-6 md:mb-0 shrink-0">
              <BrandLogo textTone="light" />
            </div>
            <p className="text-cream/50 text-base sm:text-lg text-center max-w-xl mx-auto leading-relaxed">
              Kami menanti kehadiran Anda. Datang dan rasakan pengalaman yang berbeda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282321230190?text=Halo%20Maicha%2C%20saya%20ingin%20bertanya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-matcha text-charcoal px-8 py-4 rounded-2xl font-semibold hover:bg-matcha-light transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-matcha/20 min-h-[52px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hubungi via WhatsApp
            </a>

            <a
              href="https://www.instagram.com/maichacoffee/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border-2 border-cream/20 text-cream px-8 py-4 rounded-2xl font-semibold hover:bg-cream/10 hover:border-cream/40 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[52px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>

          <div className="mt-16 flex justify-center md:justify-end items-center gap-6">
            <div>
              <p className="text-cream/40 text-sm text-center md:text-right">
                2026 @kelompok 3 PKM teknik informatika
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
