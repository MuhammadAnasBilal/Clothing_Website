import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatPrice } from '../../utils/helpers';
import { QuickViewModal } from '../product/QuickViewModal';

interface HangingRailProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function HangingRail({
  products,
  title = 'The Boutique Clothes Rail',
  subtitle = 'Interactive 3D Wardrobe · Garments Hang in Profile · Hover to Swing Front',
}: HangingRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setIsQuickViewOpen(true);
  };

  const anyHovered = hoveredId !== null;

  return (
    <div className="relative w-full">
      {/* Presentation Framing */}
      <div className="relative max-w-[1440px] mx-auto select-none">
        {/* Navigation Arrows — Floating Glass Buttons */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute -left-2 sm:left-2 md:left-4 top-[48%] -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-ivory/95 backdrop-blur-md border border-border shadow-xl flex items-center justify-center text-charcoal hover:bg-mocha hover:text-ivory transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Scroll clothes rail left"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute -right-2 sm:right-2 md:right-4 top-[48%] -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-ivory/95 backdrop-blur-md border border-border shadow-xl flex items-center justify-center text-charcoal hover:bg-mocha hover:text-ivory transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Scroll clothes rail right"
        >
          <ChevronRight size={22} />
        </button>

        {/* 1. ARCHITECTURAL HANGING RAIL ROD (Brushed Brass) */}
        <div className="relative w-full px-2 sm:px-6 md:px-10 pt-2">
          {/* Main Solid Brass Rod */}
          <div
            className="w-full h-[9px] rounded-full relative z-20 shadow-md"
            style={{
              background: 'linear-gradient(180deg, #D4AF37 0%, #E6C762 30%, #997A15 70%, #68520A 100%)',
            }}
          >
            {/* Specular Light Highlight */}
            <div className="absolute top-[1.5px] left-6 right-6 h-[2px] bg-white/70 rounded-full blur-[0.5px]" />
          </div>

          {/* Wall-Mount Mounting Brackets */}
          <div className="absolute left-2 sm:left-6 md:left-10 top-0 w-5 h-12 bg-gradient-to-b from-[#4A3B18] via-[#7D6526] to-[#362A10] rounded-sm shadow-lg z-10 flex flex-col items-center justify-end pb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] border border-[#2E230B] shadow-inner" />
          </div>
          <div className="absolute right-2 sm:right-6 md:right-10 top-0 w-5 h-12 bg-gradient-to-b from-[#4A3B18] via-[#7D6526] to-[#362A10] rounded-sm shadow-lg z-10 flex flex-col items-center justify-end pb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] border border-[#2E230B] shadow-inner" />
          </div>

          {/* Rail Wall Shadow */}
          <div className="w-[98%] mx-auto h-4 bg-black/12 blur-md -mt-1 rounded-full z-0" />
        </div>

        {/* 2. SCROLLABLE WARDROBE CLOSET TRACK */}
        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar pt-2 pb-16 px-8 sm:px-14 md:px-20 scroll-smooth snap-x snap-mandatory"
          style={{
            perspective: '1800px',
            perspectiveOrigin: '50% 30%',
          }}
        >
          {products.map((product, idx) => {
            const isHovered = hoveredId === product.id;
            const isOther = anyHovered && !isHovered;
            const mainFabric = product.colors[0]?.image || product.mainImage;
            const stitchedModel = product.colors[0]?.modelImage || product.modelImage;
            const woodId = `woodGrain-${product.id}`;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex-shrink-0 w-[170px] sm:w-[200px] md:w-[230px] snap-center flex flex-col items-center cursor-pointer relative py-2"
                style={{
                  zIndex: isHovered ? 50 : 20 - idx,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* UNIFIED 3D HANGING UNIT (Hook + Hanger + Garment swing together!) */}
                <motion.div
                  initial={false}
                  animate={{
                    // DEFAULT: Facing to the LEFT in profile (-65deg)
                    // HOVERED: Swings smoothly to face FRONT (0deg) with wave oscillation
                    rotateY: isHovered ? 0 : -65,
                    rotateZ: isHovered ? [0, -3.5, 2.5, -1, 0] : 0,
                    y: isHovered ? -26 : isOther ? 4 : 0,
                    scale: isHovered ? 1.16 : isOther ? 0.88 : 0.96,
                    skewY: isHovered ? 0 : 2.5,
                  }}
                  transition={{
                    rotateY: isHovered
                      ? { type: 'spring', stiffness: 200, damping: 15, mass: 0.75 }
                      : { type: 'spring', stiffness: 140, damping: 20 },
                    rotateZ: isHovered
                      ? { duration: 0.85, ease: 'easeOut', times: [0, 0.25, 0.55, 0.8, 1] }
                      : { duration: 0.4 },
                    y: { type: 'spring', stiffness: 220, damping: 18 },
                    scale: { type: 'spring', stiffness: 200, damping: 18 },
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'top center',
                    filter: isOther ? 'blur(3.5px) brightness(0.65)' : 'none',
                    opacity: isOther ? 0.42 : 1,
                    transition: 'filter 0.4s ease, opacity 0.4s ease',
                  }}
                  className="w-full flex flex-col items-center"
                >
                  {/* HANGER HOOK & WOODEN HANGER ASSEMBLY */}
                  <div className="flex flex-col items-center z-30 -mb-[2px]">
                    {/* Metal Wire Hook Curling Over Rail */}
                    <div
                      className="w-[14px] h-[26px] border-[2.5px] border-[#C49B38] rounded-tr-full rounded-tl-xs -mb-[2px] shadow-xs"
                      style={{
                        borderBottom: 'none',
                        borderLeft: 'none',
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.25))',
                      }}
                    />

                    {/* Contoured Wooden Hanger */}
                    <div className="relative w-[140px] sm:w-[165px] md:w-[185px] h-[26px] flex items-center justify-center">
                      <svg viewBox="0 0 185 28" className="w-full h-full drop-shadow-md">
                        <defs>
                          <linearGradient id={woodId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8A5A36" />
                            <stop offset="35%" stopColor="#5E381E" />
                            <stop offset="70%" stopColor="#432612" />
                            <stop offset="100%" stopColor="#2F1808" />
                          </linearGradient>
                          <linearGradient id={`${woodId}-brass`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#E6C762" />
                            <stop offset="50%" stopColor="#D4AF37" />
                            <stop offset="100%" stopColor="#997A15" />
                          </linearGradient>
                        </defs>

                        {/* Wooden Arms */}
                        <polygon
                          points="92.5,2 180,22 174,26 92.5,8 11,26 5,22"
                          fill={`url(#${woodId})`}
                          stroke="#2A1406"
                          strokeWidth="0.8"
                        />

                        {/* Brass Swivel Collar */}
                        <circle
                          cx="92.5"
                          cy="4"
                          r="3.2"
                          fill={`url(#${woodId}-brass)`}
                          stroke="#54400E"
                          strokeWidth="0.5"
                        />

                        {/* Gold Trouser / Dupatta Hanging Crossbar */}
                        <line
                          x1="16"
                          y1="23.5"
                          x2="169"
                          y2="23.5"
                          stroke={`url(#${woodId}-brass)`}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        {/* Left & Right Brass End Caps */}
                        <circle cx="16" cy="23.5" r="1.8" fill="#D4AF37" />
                        <circle cx="169" cy="23.5" r="1.8" fill="#D4AF37" />
                      </svg>
                    </div>
                  </div>

                  {/* GARMENT BODY (Hanging Fabric & Stitched Reveal) */}
                  <div
                    className="relative w-full aspect-[3/4.4] overflow-hidden bg-[#241E1C] rounded-[3px] -mt-[3px] shadow-lg"
                    style={{
                      boxShadow: isHovered
                        ? '0 32px 64px -12px rgba(41,35,33,0.55), 0 14px 28px -6px rgba(41,35,33,0.3)'
                        : '0 12px 24px -6px rgba(41,35,33,0.3)',
                      transition: 'box-shadow 0.4s ease',
                    }}
                  >
                    {/* Unstitched Fabric Image (Default View) */}
                    <img
                      src={mainFabric}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        opacity: isHovered ? 0 : 1,
                        transition: 'opacity 0.45s ease 0.12s',
                      }}
                      loading="lazy"
                    />

                    {/* Stitched Model Ensemble Image (Reveals on front flip) */}
                    {stitchedModel && (
                      <img
                        src={stitchedModel}
                        alt={`${product.name} — Tailored Ensemble`}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transition: 'opacity 0.45s ease 0.12s',
                        }}
                        loading="lazy"
                      />
                    )}

                    {/* Fabric Crease / Draped Shadow Line (Simulates natural hanging cloth folds) */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        opacity: isHovered ? 0.15 : 0.45,
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 28%, rgba(255,255,255,0.18) 32%, transparent 40%, rgba(0,0,0,0.4) 65%, transparent 100%)',
                      }}
                    />

                    {/* Top Fabric Spec Badge */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <span className="bg-charcoal/85 backdrop-blur-md text-champagne text-[8px] sm:text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-xs font-body font-semibold border border-champagne/20 shadow-sm">
                        {product.fabricType}
                      </span>
                    </div>

                    {/* 3-Piece Heirloom Pill */}
                    <div className="absolute top-2.5 right-2.5 z-20">
                      <span className="bg-burgundy/90 text-ivory text-[8px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-xs font-body font-medium shadow-sm">
                        {product.pieces}pc
                      </span>
                    </div>

                    {/* Editorial Overlay — Active on Hover */}
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 z-20"
                      style={{
                        background: isHovered
                          ? 'linear-gradient(to top, rgba(29,23,21,0.94) 0%, rgba(29,23,21,0.5) 55%, transparent 100%)'
                          : 'transparent',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.35s ease 0.1s, background 0.35s ease 0.1s',
                        pointerEvents: isHovered ? 'auto' : 'none',
                      }}
                    >
                      <span className="text-[9px] text-champagne/90 uppercase tracking-[0.22em] font-body font-medium">
                        Atelier Heirloom
                      </span>
                      <h3 className="font-heading text-lg sm:text-xl text-ivory line-clamp-1 mt-0.5 font-normal">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-champagne mt-0.5 font-body">
                        {formatPrice(product.price)}
                      </p>

                      <div className="mt-2.5 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickView(product);
                          }}
                          className="flex-1 bg-ivory text-mocha py-2 text-[9px] uppercase tracking-[0.16em] font-semibold font-body rounded-xs hover:bg-champagne transition-colors flex items-center justify-center gap-1 shadow-sm active:scale-95 cursor-pointer"
                        >
                          <Eye size={12} /> Quick View
                        </button>

                        <Link
                          to={`/product/${product.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 bg-burgundy text-ivory rounded-xs flex items-center justify-center hover:bg-[#5a212c] transition-colors shadow-sm active:scale-95 shrink-0"
                          aria-label={`View ${product.name}`}
                        >
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Floor Shadow beneath Garment */}
                  <div
                    className="mx-auto rounded-full mt-3 transition-all duration-500"
                    style={{
                      width: isHovered ? '85%' : '45%',
                      height: isHovered ? '10px' : '4px',
                      background: isHovered
                        ? 'radial-gradient(ellipse, rgba(41,35,33,0.35) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse, rgba(41,35,33,0.15) 0%, transparent 70%)',
                      filter: isHovered ? 'blur(4px)' : 'blur(2px)',
                    }}
                  />
                </motion.div>

                {/* Garment Title & Price Label below Rail */}
                <div
                  className="text-center mt-3 transition-all duration-300 w-full px-1"
                  style={{
                    opacity: isOther ? 0.35 : 1,
                  }}
                >
                  <h4 className="font-heading text-xs sm:text-sm md:text-base text-charcoal font-medium line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-body text-mocha font-semibold mt-0.5">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </div>
  );
}
