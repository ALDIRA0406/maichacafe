import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionWrapper from './SectionWrapper';

export default function Location() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation(0.1);

  return (
    <SectionWrapper id="location">
      <div
        ref={ref}
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-matcha font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
          Lokasi
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl text-charcoal font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Temukan <span className="text-matcha">Kami</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        <div
          ref={ref2}
          className={`rounded-2xl overflow-hidden h-[350px] sm:h-[400px] md:h-full min-h-[350px] shadow-xl transition-all duration-1000 ${
            isVisible2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.195024794273!2d106.845347!3d-6.237936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d5c8dbae9d%3A0xec2d7cd9bd06f4f7!2sMaicha%20Coffee%20%26%20Eatery!5e0!3m2!1sen!2sid!4v1715511234567"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Maicha Coffee & Eatery"
            className="grayscale-[30%] contrast-[1.05]"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-matcha/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Alamat</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">Jl. Tebet Barat Dalam IX No. 13, Tebet Barat, Jakarta Selatan</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-matcha/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Jam Buka</h3>
                <ul className="text-charcoal/70 text-sm leading-relaxed space-y-1">
                  <li className="flex justify-between gap-4">
                    <span className="text-charcoal/70">Senin – Sabtu</span>
                    <span className="text-charcoal font-medium">09.00 – 23.00</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="text-charcoal/70">Minggu</span>
                    <span className="text-charcoal font-medium">09.00 – 23.00</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a href="https://maps.app.goo.gl/bXjcuyzErRuhBtC46" target="_blank" className="inline-flex items-center justify-center gap-2 bg-charcoal text-cream px-6 py-4 rounded-2xl font-semibold text-sm hover:bg-charcoal-light transition-all duration-300">
                Buka Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
