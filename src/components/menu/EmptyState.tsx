import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg mx-auto my-12 p-10 text-center bg-white/40 backdrop-blur-xl border border-charcoal/10 rounded-[2.5rem] shadow-executive-glow"
    >
      <div className="text-6xl mb-6 animate-pulse">😔</div>
      
      <h3 className="font-display text-2xl font-bold text-charcoal mb-3">
        Menu tidak ditemukan
      </h3>
      
      <p className="text-charcoal/60 text-sm leading-relaxed mb-8 font-sans font-light">
        Coba gunakan kata kunci lain atau pilih kategori berbeda untuk menemukan hidangan favoritmu.
      </p>

      <button
        onClick={onReset}
        className="px-8 py-3 bg-charcoal text-cream font-bold text-[10px] tracking-widest uppercase rounded-full hover:bg-matcha hover:scale-105 active:scale-98 transition-all duration-300 shadow-md font-sans"
      >
        Reset Filter
      </button>
    </motion.div>
  );
}
