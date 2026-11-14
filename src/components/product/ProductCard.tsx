import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/helpers';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(
    product.selectedColorIndex ?? 0
  );
  const { isInWishlist, toggleItem } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const mainImg = currentColor?.image || product.mainImage;
  const modelImg = currentColor?.modelImage || product.modelImage;

  const visibleSwatches = product.colors.slice(0, 4);
  const extraCount = product.colors.length - 4;
  const hasDiscount = typeof product.discount === 'number' && product.discount > 0;

  return (
    <motion.div
      className="group relative flex flex-col h-full"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-champagne rounded-sm">
        {/* Card Main Link */}
        <Link
          to={`/product/${product.slug}`}
          className="absolute inset-0 block z-0"
          aria-label={`View ${product.name}`}
        >
          {/* Primary image (Unstitched fabric) */}
          <img
            src={mainImg}
            alt={`${product.name} — ${currentColor?.name || 'Fabric'}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out group-hover:scale-102 transition-transform"
            loading="lazy"
          />

          {/* Secondary image (Stitched model interpretation on hover) */}
          {modelImg && (
            <img
              src={modelImg}
              alt={`${product.name} — Stitched interpretation on model`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-in-out"
              loading="lazy"
            />
          )}

          {/* Stitched Inspiration Badge on hover */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <span className="bg-charcoal/80 text-ivory text-[9px] uppercase tracking-[0.16em] px-2.5 py-0.5 rounded-xs backdrop-blur-xs whitespace-nowrap">
              Stitched Inspiration
            </span>
          </div>
        </Link>

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="bg-mocha text-ivory text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 font-body font-medium shadow-xs">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-burgundy text-ivory text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 font-body font-medium shadow-xs">
              Bestseller
            </span>
          )}
          {hasDiscount && (
            <span className="bg-burgundy text-ivory text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 font-body font-medium shadow-xs">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-ivory/85 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors hover:bg-ivory"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            size={16}
            className={
              wishlisted
                ? 'fill-burgundy text-burgundy transition-colors'
                : 'text-charcoal/70 hover:text-burgundy transition-colors'
            }
          />
        </motion.button>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            type="button"
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-ivory/95 hover:bg-ivory backdrop-blur-sm text-center py-2.5 text-[11px] tracking-[0.16em] uppercase text-mocha font-body font-medium z-20 rounded-xs shadow-md flex items-center justify-center gap-1.5"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <Eye size={14} strokeWidth={1.5} />
            Quick View
          </button>
        )}
      </div>

      {/* Product Details Below Image */}
      <div className="pt-3.5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[11px] uppercase tracking-[0.14em] text-warm-grey font-body">
              {product.fabricType} · {product.pieces}-Piece
            </span>
            {product.rating && (
              <span className="text-[11px] text-warm-grey font-body">
                ★ {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          <Link to={`/product/${product.slug}`} className="block mt-1 group-hover:text-mocha transition-colors">
            <h3 className="text-sm font-medium text-charcoal font-body line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-2 pt-1 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-mocha font-body">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-warm-grey/80 line-through font-body">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5" aria-label="Available colors">
              {visibleSwatches.map((color, idx) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIdx(idx);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border border-black/10 transition-all ${
                    idx === selectedColorIdx
                      ? 'ring-1.5 ring-offset-1 ring-mocha scale-110'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              ))}
              {extraCount > 0 && (
                <span className="text-[10px] text-warm-grey font-body">
                  +{extraCount}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
