import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../../data/menu/types';

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

const CATEGORY_ICONS: Record<MenuItem['subcategory'], string> = {
  'Coffee Based': '☕',
  'Flavour Coffee': '☕',
  'Milk Based': '🥛',
  'Soda Based': '🫧',
  'Tea Based': '🍵',
  'Additional': '➕',
  'Snack': '🍟',
  'Dessert': '🍰',
  'Main Course': '🍽️',
  'Rice Bowl': '🍚',
  'Pasta & Mie': '🍝',
};

function MenuCard({ item, onClick }: MenuCardProps) {
  const icon = CATEGORY_ICONS[item.subcategory];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(item)}
      className="group cursor-pointer flex flex-col p-1.5 sm:p-2.5 bg-white border border-charcoal/5 rounded-2xl sm:rounded-[1.75rem] shadow-sm hover:shadow-executive transition-all duration-300 relative overflow-hidden h-full mobile-tap-scale"
    >
      {/* Product Content Details */}
      <div className="flex-grow grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3 px-3 sm:py-4 sm:px-4">
        
        {/* Emoji kiri */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-cream flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-inner">
          {icon}
        </div>

        {/* Nama dan harga */}
        <div className="text-center">
          <h4 className="text-[12px] sm:text-base font-display font-bold text-charcoal group-hover:text-matcha transition-colors duration-300 leading-tight">
            {item.name}
          </h4>

          <span className="text-matcha font-bold text-[11px] sm:text-sm font-sans mt-1 block leading-snug">
            {item.price}
          </span>
        </div>

        {/* Penyeimbang kanan supaya teks tetap di tengah */}
        <div className="w-9 sm:w-11 shrink-0" />
      </div>
    </motion.div>
  );
}

export default memo(MenuCard);