import { useState, useEffect, lazy, Suspense } from 'react';
import BrandLogo from './BrandLogo';

const Gallery = lazy(() => import('./Gallery'));


const links = [
  { id: 'hero', label: 'About' },
  { id: 'menu', label: 'Product' },
  { id: 'space', label: 'Ruangan' },
  { id: 'gallery', label: 'Galeri', isAction: true },
  { id: 'location', label: 'Lokasi' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // Scroll spy
      const sectionOffsets = links.map(link => {
        const element = document.getElementById(link.id);
        if (element) {
          return { id: link.id, offset: element.offsetTop - 120 };
        }
        return { id: link.id, offset: 0 };
      });

      const active = [...sectionOffsets]
        .reverse()
        .find(section => currentScrollY >= section.offset);

      if (active) {
        setActiveSection(active.id);
      } else if (currentScrollY < 100) {
        setActiveSection('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click / escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navTone = scrolled
    ? 'bg-charcoal/80 border-b border-white/5 py-1.5 shadow-lg'
    : 'bg-transparent py-4';

  const handleNavClick = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* ── Top Navbar ── */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 backdrop-blur-xl ${navTone}`}>
        <div className="px-6 md:px-12 flex items-center justify-between transition-all duration-500 max-w-[1440px] mx-auto">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center select-none active:scale-98 transition-transform duration-300">
            <BrandLogo textTone="light" size="sm" compact={scrolled} />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              l.isAction ? (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="group relative py-1 transition-all duration-300"
                >
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-500 text-cream/60 group-hover:text-cream">
                    {l.label}
                  </span>
                  <span className="absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 w-0 opacity-0 group-hover:w-full group-hover:opacity-100" />
                </button>
              ) : (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="group relative py-1 transition-all duration-300"
                >
                  <span className={`text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-500 ${activeSection === l.id ? 'text-gold' : 'text-cream/60 group-hover:text-cream'}`}>{l.label}</span>
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 ${activeSection === l.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`} />
                </a>
              )
            ))}
          </div>

          {/* Action Button & Hamburger Toggle */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#location"
              className={`group hidden sm:flex items-center gap-3 bg-cream text-charcoal px-5 rounded-none text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-gold hover:text-cream transition-all duration-500 relative overflow-hidden ${scrolled ? 'py-2.5' : 'py-3'}`}
            >
              <span className="relative z-10">Experience</span>
              <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </a>

            {/* Hamburger — visible on mobile & tablet (hidden on lg+) */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex w-11 h-11 flex-col justify-center items-center gap-1.5 transition-all duration-300 group hover:bg-white/5 rounded-full cursor-pointer"
            >
              <span className={`block h-[1.5px] bg-cream transition-all duration-500 ${open ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'}`} />
              <span className={`block h-[1.5px] bg-cream transition-all duration-500 ${open ? 'opacity-0 w-0' : 'w-5'}`} />
              <span className={`block h-[1.5px] bg-cream transition-all duration-500 ${open ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-5'}`} />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Full-Screen Menu Panel */}
        <div
          className={`lg:hidden fixed inset-0 top-0 z-[-1] transition-all duration-500 ease-in-out ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" />
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-screen opacity-100 bg-charcoal/35 backdrop-blur-md border-b border-white/5' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-6 pt-6 pb-8 grid gap-2">
            {links.map((l) => (
              l.isAction ? (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setGalleryOpen(true);
                  }}
                  className="w-full flex items-center justify-between py-4 text-xs font-bold uppercase tracking-[0.25em] transition-colors border-b border-white/5 cursor-pointer text-cream/80 hover:text-cream"
                >
                  <span>{l.label}</span>
                </button>
              ) : (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => handleNavClick(l.id)}
                  className={`w-full flex items-center justify-between py-4 text-xs font-bold uppercase tracking-[0.25em] transition-colors border-b border-white/5 last:border-0 cursor-pointer ${activeSection === l.id ? 'text-gold' : 'text-cream/80 hover:text-cream'}`}
                >
                  <span>{l.label}</span>
                </button>
              )
            ))}
            <a
              href="#location"
              onClick={() => setOpen(false)}
              className="mt-6 border border-cream/20 py-4 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-cream hover:bg-cream hover:text-charcoal transition-all active:scale-98 block"
            >
              Visit Us
            </a>
          </div>
        </div>
      </nav>
      <Suspense fallback={null}>
        {galleryOpen && (
          <Gallery
            isOpen={galleryOpen}
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
}
