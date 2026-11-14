import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FilterState } from '../../types';
import {
  fabricTypes,
  categories,
  collections,
  allColors,
  seasons,
  occasions,
} from '../../data/products';
import { formatPrice } from '../../utils/helpers';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClear: () => void;
  productCount: number;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function ProductFilters({
  filters,
  onFilterChange,
  onClear,
  productCount,
  isMobileOpen = false,
  onMobileClose,
}: ProductFiltersProps) {
  // Collapsible accordion states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    price: true,
    fabric: true,
    category: true,
    collection: false,
    color: false,
    pieces: true,
    season: false,
    occasion: false,
    status: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Generic toggle helper for arrays
  const toggleArrayItem = <T,>(arr: T[], item: T): T[] => {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  };

  const handlePriceChange = (index: 0 | 1, val: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = val;
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleFabricToggle = (fabric: string) => {
    onFilterChange({
      ...filters,
      fabricTypes: toggleArrayItem(filters.fabricTypes, fabric),
    });
  };

  const handleCategoryToggle = (category: string) => {
    onFilterChange({
      ...filters,
      categories: toggleArrayItem(filters.categories, category),
    });
  };

  const handleCollectionToggle = (collectionId: string) => {
    onFilterChange({
      ...filters,
      collections: toggleArrayItem(filters.collections, collectionId),
    });
  };

  const handleColorToggle = (color: string) => {
    onFilterChange({
      ...filters,
      colors: toggleArrayItem(filters.colors, color),
    });
  };

  const handlePieceToggle = (piece: number) => {
    onFilterChange({
      ...filters,
      pieces: toggleArrayItem(filters.pieces, piece),
    });
  };

  const handleSeasonToggle = (season: string) => {
    onFilterChange({
      ...filters,
      seasons: toggleArrayItem(filters.seasons, season),
    });
  };

  const handleOccasionToggle = (occ: string) => {
    onFilterChange({
      ...filters,
      occasions: toggleArrayItem(filters.occasions, occ),
    });
  };

  // Active filter count calculation
  const activeChips: { label: string; onRemove: () => void }[] = [];

  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) {
    activeChips.push({
      label: `${formatPrice(filters.priceRange[0])} – ${formatPrice(filters.priceRange[1])}`,
      onRemove: () => onFilterChange({ ...filters, priceRange: [0, 100000] }),
    });
  }

  filters.fabricTypes.forEach((f) =>
    activeChips.push({
      label: f,
      onRemove: () => handleFabricToggle(f),
    })
  );

  filters.categories.forEach((c) =>
    activeChips.push({
      label: c,
      onRemove: () => handleCategoryToggle(c),
    })
  );

  filters.collections.forEach((colId) => {
    const col = collections.find((c) => c.id === colId);
    activeChips.push({
      label: col?.name || colId,
      onRemove: () => handleCollectionToggle(colId),
    });
  });

  filters.colors.forEach((col) =>
    activeChips.push({
      label: `Color: ${col}`,
      onRemove: () => handleColorToggle(col),
    })
  );

  filters.pieces.forEach((p) =>
    activeChips.push({
      label: `${p}-Piece`,
      onRemove: () => handlePieceToggle(p),
    })
  );

  filters.seasons.forEach((s) =>
    activeChips.push({
      label: s,
      onRemove: () => handleSeasonToggle(s),
    })
  );

  filters.occasions.forEach((o) =>
    activeChips.push({
      label: o,
      onRemove: () => handleOccasionToggle(o),
    })
  );

  if (filters.onSale) {
    activeChips.push({
      label: 'On Sale',
      onRemove: () => onFilterChange({ ...filters, onSale: false }),
    });
  }

  if (filters.newArrivals) {
    activeChips.push({
      label: 'New Arrivals',
      onRemove: () => onFilterChange({ ...filters, newArrivals: false }),
    });
  }

  if (filters.bestSellers) {
    activeChips.push({
      label: 'Best Sellers',
      onRemove: () => onFilterChange({ ...filters, bestSellers: false }),
    });
  }

  const FilterContent = (
    <div className="space-y-6">
      {/* Header with count and reset */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <span className="text-[11px] uppercase tracking-[0.18em] font-body font-semibold text-charcoal block">
            Filter Unstitched Edit
          </span>
          <span className="text-xs text-warm-grey font-body">
            {productCount} items found
          </span>
        </div>

        {activeChips.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-burgundy hover:text-mocha transition-colors font-body font-medium"
          >
            <RotateCcw size={12} />
            Clear ({activeChips.length})
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-2">
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-champagne/60 text-charcoal text-[11px] font-body px-2.5 py-1 rounded-xs border border-border"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={chip.onRemove}
                className="text-warm-grey hover:text-burgundy"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Toggle Quick Switches */}
      <div className="pb-4 border-b border-border space-y-2">
        <label className="flex items-center justify-between cursor-pointer py-1 text-xs font-body text-charcoal hover:text-mocha">
          <span>New Arrivals Only</span>
          <input
            type="checkbox"
            checked={filters.newArrivals}
            onChange={(e) => onFilterChange({ ...filters, newArrivals: e.target.checked })}
            className="accent-mocha w-4 h-4 cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer py-1 text-xs font-body text-charcoal hover:text-mocha">
          <span>Best Sellers</span>
          <input
            type="checkbox"
            checked={filters.bestSellers}
            onChange={(e) => onFilterChange({ ...filters, bestSellers: e.target.checked })}
            className="accent-mocha w-4 h-4 cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer py-1 text-xs font-body text-charcoal hover:text-mocha">
          <span>Sale & Marked Down</span>
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={(e) => onFilterChange({ ...filters, onSale: e.target.checked })}
            className="accent-mocha w-4 h-4 cursor-pointer"
          />
        </label>
      </div>

      {/* 1. Price Range */}
      <div className="border-b border-border pb-5">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal py-1"
        >
          <span>Price Range (PKR)</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${openSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.price && (
          <div className="mt-3.5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-body">
              <div className="flex-1">
                <span className="text-[10px] text-warm-grey block mb-1">Min (Rs.)</span>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  step={500}
                  min={0}
                  max={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full border border-border px-2.5 py-1.5 rounded-xs text-xs font-body bg-transparent focus:outline-none focus:border-mocha"
                />
              </div>
              <span className="text-warm-grey mt-4">–</span>
              <div className="flex-1">
                <span className="text-[10px] text-warm-grey block mb-1">Max (Rs.)</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  step={1000}
                  min={filters.priceRange[0]}
                  max={120000}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full border border-border px-2.5 py-1.5 rounded-xs text-xs font-body bg-transparent focus:outline-none focus:border-mocha"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Fabric Type */}
      <div className="border-b border-border pb-5">
        <button
          type="button"
          onClick={() => toggleSection('fabric')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal py-1"
        >
          <span>Fabric Craftsmanship</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${openSections.fabric ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.fabric && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
            {fabricTypes.map((fabric) => (
              <label
                key={fabric}
                className="flex items-center gap-2.5 cursor-pointer text-xs font-body text-charcoal hover:text-mocha"
              >
                <input
                  type="checkbox"
                  checked={filters.fabricTypes.includes(fabric)}
                  onChange={() => handleFabricToggle(fabric)}
                  className="accent-mocha w-3.5 h-3.5 rounded-xs"
                />
                <span>{fabric}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. Category */}
      <div className="border-b border-border pb-5">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal py-1"
        >
          <span>Apparel Category</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${openSections.category ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.category && (
          <div className="mt-3 space-y-2 max-h-44 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2.5 cursor-pointer text-xs font-body text-charcoal hover:text-mocha"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="accent-mocha w-3.5 h-3.5 rounded-xs"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Number of Pieces */}
      <div className="border-b border-border pb-5">
        <button
          type="button"
          onClick={() => toggleSection('pieces')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal py-1"
        >
          <span>Suit Configuration</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${openSections.pieces ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.pieces && (
          <div className="mt-3 space-y-2">
            {[2, 3].map((piece) => (
              <label
                key={piece}
                className="flex items-center gap-2.5 cursor-pointer text-xs font-body text-charcoal hover:text-mocha"
              >
                <input
                  type="checkbox"
                  checked={filters.pieces.includes(piece)}
                  onChange={() => handlePieceToggle(piece)}
                  className="accent-mocha w-3.5 h-3.5 rounded-xs"
                />
                <span>{piece}-Piece Unstitched Suit</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Colors Palette */}
      <div className="border-b border-border pb-5">
        <button
          type="button"
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal py-1"
        >
          <span>Color Palette</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${openSections.color ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.color && (
          <div className="mt-3 flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
            {allColors.map((color) => {
              const isSelected = filters.colors.includes(color);
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorToggle(color)}
                  className={`text-[11px] font-body px-2.5 py-1 rounded-xs border transition-colors ${
                    isSelected
                      ? 'bg-mocha text-ivory border-mocha'
                      : 'bg-card text-charcoal border-border hover:border-mocha'
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Collections */}
      <div className="border-b border-border pb-5">
        <button
          type="button"
          onClick={() => toggleSection('collection')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal py-1"
        >
          <span>Heritage Collections</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${openSections.collection ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.collection && (
          <div className="mt-3 space-y-2 max-h-44 overflow-y-auto pr-1">
            {collections.map((col) => (
              <label
                key={col.id}
                className="flex items-center gap-2.5 cursor-pointer text-xs font-body text-charcoal hover:text-mocha"
              >
                <input
                  type="checkbox"
                  checked={filters.collections.includes(col.id)}
                  onChange={() => handleCollectionToggle(col.id)}
                  className="accent-mocha w-3.5 h-3.5 rounded-xs"
                />
                <span>{col.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 7. Occasion */}
      <div className="border-b border-border pb-5">
        <button
          type="button"
          onClick={() => toggleSection('occasion')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal py-1"
        >
          <span>Wear Occasion</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${openSections.occasion ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.occasion && (
          <div className="mt-3 space-y-2 max-h-44 overflow-y-auto pr-1">
            {occasions.map((occ) => (
              <label
                key={occ}
                className="flex items-center gap-2.5 cursor-pointer text-xs font-body text-charcoal hover:text-mocha"
              >
                <input
                  type="checkbox"
                  checked={filters.occasions.includes(occ)}
                  onChange={() => handleOccasionToggle(occ)}
                  className="accent-mocha w-3.5 h-3.5 rounded-xs"
                />
                <span>{occ}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 8. Season */}
      <div className="pb-2">
        <button
          type="button"
          onClick={() => toggleSection('season')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal py-1"
        >
          <span>Weather & Season</span>
          <ChevronDown
            size={14}
            className={`transition-transform ${openSections.season ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.season && (
          <div className="mt-3 space-y-2">
            {seasons.map((season) => (
              <label
                key={season}
                className="flex items-center gap-2.5 cursor-pointer text-xs font-body text-charcoal hover:text-mocha"
              >
                <input
                  type="checkbox"
                  checked={filters.seasons.includes(season)}
                  onChange={() => handleSeasonToggle(season)}
                  className="accent-mocha w-3.5 h-3.5 rounded-xs"
                />
                <span>{season}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-card p-6 rounded-sm border border-border self-start sticky top-28">
        {FilterContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/50 backdrop-blur-xs"
              onClick={onMobileClose}
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 bottom-0 w-[min(380px,88vw)] bg-card shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
                  <span className="font-heading text-lg text-charcoal">Filter Collections</span>
                  <button
                    type="button"
                    onClick={onMobileClose}
                    className="p-1 text-warm-grey hover:text-charcoal"
                    aria-label="Close filters"
                  >
                    <X size={20} />
                  </button>
                </div>
                {FilterContent}
              </div>

              <div className="pt-6 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={onMobileClose}
                  className="w-full bg-mocha text-ivory py-3 text-xs uppercase tracking-[0.16em] font-medium rounded-xs text-center"
                >
                  Show Results ({productCount})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
