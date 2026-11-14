import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onClearFilters?: () => void;
}

export function ProductGrid({ products, onClearFilters }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (products.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4 bg-champagne/20 rounded-md border border-border/80">
        <PackageOpen size={44} strokeWidth={1.2} className="text-mocha/60 mb-4" />
        <h3 className="font-heading text-2xl text-charcoal">No Designs Found</h3>
        <p className="mt-2 text-xs md:text-sm text-warm-grey max-w-md font-body">
          We couldn&apos;t find any unstitched collections matching your chosen filter criteria. Try expanding your search or clearing selected filters.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-6 bg-mocha text-ivory px-6 py-2.5 text-[11px] tracking-[0.16em] uppercase font-body font-medium rounded-xs hover:bg-charcoal transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: Math.min(idx * 0.04, 0.35),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProductCard product={product} onQuickView={handleQuickView} />
          </motion.div>
        ))}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
