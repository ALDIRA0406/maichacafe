import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { MENU_DATA, MenuItem } from "../data/menu";

import SearchBar from "./menu/SearchBar";
import CategoryTabs, { CategoryType, CATEGORIES } from "./menu/CategoryTabs";
import MenuCard from "./menu/MenuCard";
import MenuDetailModal from "./menu/MenuDetailModal";
import EmptyState from "./menu/EmptyState";

export default function Menu() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("Coffee Based");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const handleSelectItem = useCallback((item: MenuItem) => {
    setSelectedItem(item);
  }, []);

  const handleCategoryChange = useCallback((cat: CategoryType) => {
    setActiveCategory(cat);
    setVisibleCount(12);
  }, []);

  const handleSearchChange = useCallback((val: string) => {
    setSearchQuery(val);
    setVisibleCount(12);
  }, []);

  const itemsCount = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      "Coffee Based": 0,
      "Flavour Coffee": 0,
      "Milk Based": 0,
      "Soda Based": 0,
      "Tea Based": 0,
      Additional: 0,
      Snack: 0,
      Dessert: 0,
      "Main Course": 0,
      "Rice Bowl": 0,
      "Pasta & Mie": 0,
    };
    MENU_DATA.forEach((item) => {
      const sub = item.subcategory as CategoryType;
      if (counts[sub] !== undefined) counts[sub]++;
    });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    const trimmedQuery = searchQuery.trim();
    const categoryFiltered = MENU_DATA.filter((item) => {
      if (item.subcategory !== activeCategory) return false;
      if (trimmedQuery !== "") {
        const query = trimmedQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.tag ? item.tag.toLowerCase().includes(query) : false)
        );
      }
      return true;
    });

    if (categoryFiltered.length > 0 || trimmedQuery === "") {
      return { items: categoryFiltered, isGlobalSearch: false };
    }

    const globalFiltered = MENU_DATA.filter((item) => {
      const query = trimmedQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.tag ? item.tag.toLowerCase().includes(query) : false)
      );
    });
    return { items: globalFiltered, isGlobalSearch: true };
  }, [activeCategory, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory("Coffee Based");
    setSearchQuery("");
    setVisibleCount(12);
  };

  const displayedItems = useMemo(
    () => filteredData.items.slice(0, visibleCount),
    [filteredData.items, visibleCount],
  );

  const hasMore = filteredData.items.length > visibleCount;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };

  return (
    <SectionWrapper
      id="menu"
      bg="cream"
      className="relative pt-16 sm:pt-24 pb-20 sm:pb-32"
    >
      {/* Editorial Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none opacity-20 bg-radial-gradient from-matcha/20 to-transparent" />

      {/* HEADER SECTION */}
      <div className="w-full max-w-6xl mx-auto mb-6 sm:mb-10 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-charcoal/10 pb-5 sm:pb-6">
          <div>
            <span className="text-matcha font-bold text-[13px] tracking-[0.5em] uppercase mb-2 sm:mb-3 block">
              The Selection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tighter leading-none text-charcoal">
              Menu Kopi &amp;
              <br />
              <span className="italic font-light text-matcha">Hidangan.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:block text-[15px] font-mono text-charcoal/40 tracking-widest">
              {MENU_DATA.length} TOTAL ITEMS
            </span>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Menumaicha.pdf";
                link.download = "Menumaicha.pdf";
                link.click();
              }}
              className="flex items-center gap-2 bg-charcoal text-cream px-4 sm:px-5 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-matcha hover:scale-105 active:scale-95 transition-all shadow-executive cursor-pointer font-sans tap-target"
            >
              <svg
                className="w-3.5 h-3.5 text-cream"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="hidden xs:inline">PDF Menu</span>
              <span className="xs:hidden">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      {/* TABS & DISPLAY */}
      <div id="menu-display-section" className="w-full scroll-mt-[120px]">
        <CategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          itemsCount={itemsCount}
        />

        {/* Global Search Alert */}
        {filteredData.isGlobalSearch && (
          <div className="w-full max-w-6xl mx-auto px-4 mt-4 sm:mt-6">
            <div className="bg-matcha/10 border border-matcha/20 rounded-2xl p-3 sm:p-4 flex items-center gap-3 text-xs text-charcoal/80 font-sans">
              <span className="text-base">✨</span>
              <span className="text-[11px] sm:text-xs leading-snug">
                Tidak ada menu &ldquo;{searchQuery}&rdquo; di{" "}
                <strong>{activeCategory}</strong>. Menampilkan hasil global.
              </span>
            </div>
          </div>
        )}

        {/* Menu Grid */}
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 mt-5 sm:mt-8 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {displayedItems.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-5"
              >
                {displayedItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onClick={handleSelectItem}
                  />
                ))}
              </motion.div>
            ) : (
              <EmptyState onReset={handleResetFilters} />
            )}
          </AnimatePresence>

          {/* Load More */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center mt-10 sm:mt-12 gap-3"
            >
              <span className="text-[9px] font-mono text-charcoal/40 tracking-widest uppercase">
                {displayedItems.length} dari {filteredData.items.length} Menu
              </span>
              <div className="w-32 sm:w-40 h-1 bg-charcoal/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-matcha transition-all duration-500 rounded-full"
                  style={{
                    width: `${(displayedItems.length / filteredData.items.length) * 100}%`,
                  }}
                />
              </div>
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="mt-2 flex items-center gap-2 bg-charcoal text-cream px-7 sm:px-8 py-3.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-matcha hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer font-sans tap-target"
              >
                Lihat Lebih Banyak
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom sheet / Modal */}
      <MenuDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </SectionWrapper>
  );
}
