import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MenuItem } from '../../data/menu/types';

interface MenuDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuDetailModal({ item, onClose }: MenuDetailModalProps) {
  const dragControls = useDragControls();
  const isMobileRef = useRef(false);

  // Detect mobile safely (client-side only, no SSR issue)
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [item]);

  // Close on Escape key
  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item, onClose]);

  if (!item) return null;

  const waMessage = `Halo Maicha 👋\n\nSaya tertarik untuk memesan:\n\n📌 Nama Menu: ${item.name}\n💰 Harga: ${item.price}\n\nApakah menu ini tersedia hari ini?\n\nTerima kasih.`;
  const waUrl = `https://wa.me/6282321230190?text=${encodeURIComponent(waMessage)}`;

  const handlePointerDown = (e: React.PointerEvent) => {
    dragControls.start(e);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal/90 backdrop-blur-md cursor-pointer"
        />

        {/* Sheet / Modal Container */}
        <motion.div
          drag="y"
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.02, bottom: 0.85 }}
          onDragEnd={(_e, info) => {
            if (info.offset.y > 120 || info.velocity.y > 600) {
              onClose();
            }
          }}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          className="relative mt-auto md:my-auto w-full md:max-w-4xl bg-cream rounded-t-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl z-10 border border-charcoal/5 max-h-[92svh] md:max-h-[85vh]"
        >
          {/* Pull bar — drag zone */}
          <div
            onPointerDown={handlePointerDown}
            className="flex justify-center pt-3 pb-2 w-full md:hidden flex-shrink-0 cursor-grab active:cursor-grabbing z-30 bg-cream/95 backdrop-blur-sm"
          >
            <div className="w-10 h-1 rounded-full bg-charcoal/15" />
          </div>

          {/* Product Content */}
          <div className="w-full flex flex-col overflow-y-auto no-scrollbar md:max-h-none relative">
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal/5 flex items-center justify-center shadow-sm md:hidden text-charcoal hover:bg-matcha hover:text-cream transition-colors z-20 tap-target"
              aria-label="Tutup"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Desktop Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-charcoal/30 hover:text-matcha hover:scale-110 transition-all hidden md:flex items-center justify-center w-11 h-11 z-20"
              aria-label="Tutup"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-5 sm:p-7 md:p-12 flex flex-col gap-4 flex-grow">
              {/* Category badges */}
              <div className="flex items-center gap-2">
                <span className="text-matcha font-bold text-[8px] tracking-[0.4em] uppercase">
                  {item.category}
                </span>
                <span className="text-charcoal/20 text-[8px]">•</span>
                <span className="text-matcha-dark font-semibold text-[8px] tracking-widest uppercase bg-matcha/10 px-2 py-0.5 rounded">
                  {item.subcategory}
                </span>
              </div>

              {/* Name & Price */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-charcoal leading-tight pr-6">
                  {item.name}
                </h2>
                <p className="text-xl sm:text-2xl font-light italic text-matcha-dark mt-1 font-sans">
                  {item.price}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-charcoal/5" />

              {/* Description */}
              <div className="space-y-3">
                <div>
                  <h5 className="text-[9px] font-bold text-charcoal/40 uppercase tracking-[0.2em] mb-1.5 font-sans flex items-center gap-1.5">
                    <span>🌟</span> Profil Rasa
                  </h5>
                  <p className="text-charcoal/70 leading-relaxed italic text-xs sm:text-sm font-light font-sans pl-3 border-l-2 border-matcha/20">
                    &ldquo;{item.description}&rdquo;
                  </p>
                </div>
                <div>
                  <h5 className="text-[9px] font-bold text-charcoal/40 uppercase tracking-[0.2em] mb-1.5 font-sans flex items-center gap-1.5">
                    <span>🧪</span> Behind the Process
                  </h5>
                  <p className="text-charcoal/60 text-[11px] sm:text-xs pl-3 leading-relaxed font-sans font-light">
                    {item.process}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA — sticky at bottom */}
            <div className="p-5 sm:p-7 md:p-12 md:pt-0 pt-0 flex-shrink-0 bottom-sheet-safe">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-charcoal text-cream font-bold text-[10px] tracking-widest uppercase rounded-full hover:bg-matcha transition-all duration-300 shadow-executive-glow hover:-translate-y-0.5 active:translate-y-0 font-sans tap-target"
              >
                <svg className="w-4 h-4 text-cream flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Pesan via WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
