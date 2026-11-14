import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/helpers';
import type { Product } from '../../types';

const POPULAR_SEARCHES = ['Lawn', 'Chiffon', 'Festive', 'Bridal', 'Embroidered', 'Luxury', 'Organza', 'Silk'];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.2 },
  },
};

export function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto-focus when opened
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timeout);
    }
    setQuery('');
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Filter products
  const filteredResults: Product[] = query.trim()
    ? products
        .filter((product) => {
          const q = query.toLowerCase();
          const nameMatch = product.name?.toLowerCase().includes(q);
          const categoryMatch = product.category?.toLowerCase().includes(q);
          const fabricMatch = product.fabricType?.toLowerCase().includes(q);
          const tagMatch = product.tags?.some((tag: string) =>
            tag.toLowerCase().includes(q),
          );
          return nameMatch || categoryMatch || fabricMatch || tagMatch;
        })
        .slice(0, 6)
    : [];

  const handleResultClick = (slug: string) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] bg-[#F8F4ED]/98 backdrop-blur-lg"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-8 top-8 text-charcoal transition-colors hover:text-burgundy p-2"
            aria-label="Close search"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {/* Centered content */}
          <motion.div
            className="mx-auto max-w-2xl px-6 pt-32"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Search input */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections, fabrics, designs..."
                className="w-full border-b-2 border-mocha bg-transparent py-4 pr-10 font-heading text-3xl text-charcoal outline-none placeholder:text-warm-grey/50 md:text-5xl"
                autoComplete="off"
              />
              <Search
                size={22}
                strokeWidth={1.5}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-mocha"
              />
            </div>

            {/* Results area */}
            {query.trim() === '' ? (
              /* Popular searches */
              <div>
                <p className="mb-4 mt-12 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-warm-grey">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {POPULAR_SEARCHES.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="rounded-sm border border-border px-4 py-2 font-body text-xs tracking-wider uppercase text-charcoal transition-colors hover:bg-champagne hover:border-mocha"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Filtered results */
              <div className="mt-8 max-h-[55vh] overflow-y-auto pr-2">
                {filteredResults.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredResults.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => handleResultClick(product.slug)}
                          className="flex w-full items-center gap-4 rounded-sm p-2 text-left transition-colors hover:bg-champagne/60 group"
                        >
                          <img
                            src={product.mainImage || product.colors[0]?.image}
                            alt={product.name}
                            className="h-20 w-16 rounded-sm object-cover bg-champagne flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-body text-sm font-medium text-charcoal group-hover:text-mocha transition-colors">
                              {product.name}
                            </p>
                            <p className="text-xs text-warm-grey font-body mt-0.5">
                              {product.fabricType} · {product.pieces}-Piece Unstitched
                            </p>
                            <p className="mt-1 font-body text-sm font-semibold text-mocha">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-12 text-center font-body text-sm text-warm-grey">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
