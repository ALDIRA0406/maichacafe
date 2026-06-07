import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export const CATEGORIES = [
  'Coffee Based',
  'Flavour Coffee',
  'Milk Based',
  'Soda Based',
  'Tea Based',
  'Additional',
  'Snack',
  'Dessert',
  'Main Course',
  'Rice Bowl',
  'Pasta & Mie',
] as const;

export type CategoryType = typeof CATEGORIES[number];

// Category icons untuk tampilan lebih menarik
const CATEGORY_ICONS: Record<CategoryType, string> = {
  'Coffee Based': '☕',
  'Flavour Coffee': '✨',
  'Milk Based': '🥛',
  'Soda Based': '🫧',
  'Tea Based': '🍵',
  'Additional': '➕',
  'Snack': '🍟',
  'Dessert': '🍌',
  'Main Course': '🍽️',
  'Rice Bowl': '🍚',
  'Pasta & Mie': '🍝',
};

interface CategoryTabsProps {
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  itemsCount: Record<CategoryType, number>;
}

export default function CategoryTabs({
  activeCategory,
  setActiveCategory,
  itemsCount
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 8);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFades();
    el.addEventListener('scroll', updateFades, { passive: true });
    window.addEventListener('resize', updateFades);
    return () => {
      el.removeEventListener('scroll', updateFades);
      window.removeEventListener('resize', updateFades);
    };
  }, [updateFades]);

  // Scroll active tab into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector('[data-active="true"]') as HTMLElement | null;
    if (activeBtn) {
      const containerRect = el.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const scrollOffset = btnRect.left - containerRect.left - (containerRect.width / 2) + (btnRect.width / 2);
      el.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  }, [activeCategory]);

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing';
      scrollRef.current.style.userSelect = 'none';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) hasMoved.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = '';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) handleMouseUp();
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) hasMoved.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleCategoryClick = (cat: CategoryType) => {
    // Prevent click if user was dragging
    if (hasMoved.current) return;
    setActiveCategory(cat);
  };

  return (
    <div className="sticky top-[72px] z-50 w-full bg-cream/80 backdrop-blur-xl border-y border-charcoal/5 shadow-executive-glow py-3 sm:py-4 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto relative">
        {/* Left fade indicator */}
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-cream/90 to-transparent z-10 pointer-events-none" />
        )}
        {/* Right fade indicator */}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-cream/90 to-transparent z-10 pointer-events-none" />
        )}

        {/* Scrollable container with drag */}
        <div
          ref={scrollRef}
          className="w-full flex items-center overflow-x-auto no-scrollbar px-3 sm:px-4 cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'auto' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex gap-2 sm:gap-2.5 px-1 sm:px-2 py-1">
            {CATEGORIES.filter((cat) => (itemsCount[cat] || 0) > 0).map((cat) => {
              const isActive = activeCategory === cat;
              const count = itemsCount[cat] || 0;

              return (
                <button
                  key={cat}
                  data-active={isActive ? 'true' : 'false'}
                  onClick={() => handleCategoryClick(cat)}
                  className={`relative whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold font-sans uppercase tracking-wider transition-colors duration-300 flex items-center gap-1 sm:gap-1.5 border border-charcoal/5 select-none ${
                    isActive
                      ? 'text-cream shadow-sm border-transparent'
                      : 'text-charcoal/50 bg-charcoal/5 hover:text-charcoal hover:bg-charcoal/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-charcoal rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 text-xs sm:text-sm leading-none">{CATEGORY_ICONS[cat]}</span>
                  <span className="relative z-10">{cat}</span>
                  <span
                    className={`relative z-10 text-[7px] sm:text-[8px] font-mono px-1 sm:px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-matcha text-cream'
                        : 'bg-charcoal/10 text-charcoal/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
