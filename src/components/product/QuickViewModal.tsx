import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, Minus, Plus, ChevronDown, Check, ShieldCheck, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { useScrollLock } from '../../hooks/useScrollLock';
import { formatPrice } from '../../utils/helpers';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = 'unstitched' | 'styled' | 'details';

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  useScrollLock(isOpen);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { showToast } = useToast();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('unstitched');
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<'components' | 'shipping' | 'returns' | null>('components');

  // Zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setSelectedColorIdx(product.selectedColorIndex ?? 0);
      setActiveThumbIdx(0);
      setViewMode('unstitched');
      setQuantity(1);
      setExpandedSection('components');
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIdx] || product.colors[0];

  // Determine current active image based on view mode and thumbnails
  let displayedImage = product.mainImage;
  if (viewMode === 'styled') {
    displayedImage = currentColor?.modelImage || product.modelImage;
  } else if (viewMode === 'details') {
    displayedImage = product.galleryImages[2] || product.galleryImages[1] || product.mainImage;
  } else {
    // Unstitched
    if (product.galleryImages[activeThumbIdx]) {
      displayedImage = product.galleryImages[activeThumbIdx];
    } else {
      displayedImage = currentColor?.image || product.mainImage;
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addItem(product, currentColor, quantity);
    showToast(`Added ${quantity} × ${product.name} (${currentColor.name}) to shopping bag`);
  };

  const handleBuyNow = () => {
    addItem(product, currentColor, quantity);
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10 lg:p-12 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Card — Native bottom-sheet on mobile, centered modal on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full sm:max-w-5xl max-h-[92vh] sm:max-h-[90vh] bg-card rounded-t-2xl sm:rounded-md shadow-2xl border-t sm:border border-border overflow-hidden flex flex-col z-10"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} Quick View`}
          >
            {/* Mobile Drag Handle */}
            <div className="sm:hidden w-12 h-1 bg-border/80 rounded-full mx-auto my-2.5 shrink-0" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-ivory/80 backdrop-blur-xs border border-border/80 flex items-center justify-center text-charcoal hover:bg-ivory hover:text-burgundy transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
              {/* LEFT: Image Gallery (lg:col-span-6) */}
              <div className="lg:col-span-6 bg-champagne/30 p-5 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
                {/* View Mode Tabs */}
                <div className="flex items-center gap-1 bg-ivory/90 p-1 rounded-sm border border-border mb-4 self-start">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('unstitched');
                      setActiveThumbIdx(0);
                    }}
                    className={`px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase font-body font-medium rounded-xs transition-colors ${
                      viewMode === 'unstitched'
                        ? 'bg-mocha text-ivory shadow-xs'
                        : 'text-warm-grey hover:text-charcoal'
                    }`}
                  >
                    Unstitched Fabric
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('styled')}
                    className={`px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase font-body font-medium rounded-xs transition-colors ${
                      viewMode === 'styled'
                        ? 'bg-mocha text-ivory shadow-xs'
                        : 'text-warm-grey hover:text-charcoal'
                    }`}
                  >
                    Stitched Inspiration
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('details')}
                    className={`px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase font-body font-medium rounded-xs transition-colors ${
                      viewMode === 'details'
                        ? 'bg-mocha text-ivory shadow-xs'
                        : 'text-warm-grey hover:text-charcoal'
                    }`}
                  >
                    Detail & Texture
                  </button>
                </div>

                {/* Main Zoomable Image */}
                <div
                  ref={imageContainerRef}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                  className="relative aspect-[3/4] overflow-hidden rounded-sm bg-champagne cursor-crosshair border border-border/60"
                >
                  <img
                    src={displayedImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-200"
                    style={{
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
                    }}
                  />

                  {/* Mode disclaimer pill */}
                  {viewMode === 'styled' && (
                    <div className="absolute bottom-3 left-3 right-3 bg-charcoal/85 backdrop-blur-xs text-ivory text-[10px] tracking-wide px-3 py-1.5 rounded-xs text-center pointer-events-none">
                      Styling interpretation shown. Item delivered is authentic unstitched fabric with embroidery trims.
                    </div>
                  )}

                  {!isZoomed && (
                    <span className="absolute bottom-3 right-3 bg-ivory/80 backdrop-blur-xs text-charcoal text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-xs pointer-events-none">
                      Hover to zoom
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 no-scrollbar">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setViewMode('unstitched');
                        setActiveThumbIdx(idx);
                      }}
                      className={`relative w-14 h-18 rounded-xs overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeThumbIdx === idx && viewMode === 'unstitched'
                          ? 'border-mocha shadow-xs scale-102'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  {currentColor.modelImage && (
                    <button
                      type="button"
                      onClick={() => setViewMode('styled')}
                      className={`relative w-14 h-18 rounded-xs overflow-hidden flex-shrink-0 border-2 transition-all ${
                        viewMode === 'styled'
                          ? 'border-mocha shadow-xs scale-102'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={currentColor.modelImage} alt="Styled model" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-charcoal/80 text-[8px] text-ivory text-center py-0.5">
                        Model
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT: Product Information (lg:col-span-6) */}
              <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  {/* Category & Collection */}
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-warm-grey">
                    <span>{product.category} · {product.fabricType}</span>
                    <span className="font-mono text-warm-grey/80">SKU: {product.sku}</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-2xl md:text-3xl text-charcoal font-normal mt-2 leading-tight">
                    {product.name}
                  </h2>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-3 mt-2.5">
                    <div className="flex items-center text-amber-600">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-champagne'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-warm-grey font-body">
                      {product.rating.toFixed(1)} ({product.reviewCount} verified reviews)
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mt-4">
                    <span className="font-body text-2xl font-semibold text-mocha">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="font-body text-sm text-warm-grey line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-burgundy text-ivory text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-xs font-medium">
                        Save {product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs md:text-sm text-warm-grey leading-relaxed font-body">
                    {product.description}
                  </p>

                  <div className="my-5 border-t border-border" />

                  {/* Color Selector */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-body mb-2.5">
                      <span className="uppercase tracking-[0.14em] font-medium text-charcoal">
                        Color Selection: <strong className="font-semibold text-mocha">{currentColor.name}</strong>
                      </span>
                      <span className="text-warm-grey text-[11px]">{product.colors.length} options available</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {product.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => {
                            setSelectedColorIdx(idx);
                            setActiveThumbIdx(0);
                          }}
                          className={`group flex items-center gap-2 p-1 rounded-sm border transition-all ${
                            idx === selectedColorIdx
                              ? 'border-mocha bg-champagne/30 ring-1 ring-mocha'
                              : 'border-border hover:border-warm-grey'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-black/15 shadow-2xs inline-block"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs font-body text-charcoal pr-1">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & CTA Row */}
                  <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Quantity controls */}
                    <div className="inline-flex items-center border border-border rounded-sm self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-11 flex items-center justify-center text-warm-grey hover:text-charcoal transition-colors disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 h-11 flex items-center justify-center font-body text-sm font-semibold text-charcoal">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-11 flex items-center justify-center text-warm-grey hover:text-charcoal transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 bg-mocha text-ivory py-3 px-6 text-[12px] tracking-[0.16em] uppercase font-body font-medium rounded-xs hover:bg-charcoal transition-colors shadow-sm text-center"
                    >
                      Add To Shopping Bag
                    </button>

                    {/* Wishlist Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleItem(product)}
                      className={`w-11 h-11 rounded-xs border flex items-center justify-center transition-colors ${
                        wishlisted
                          ? 'border-burgundy bg-burgundy/10 text-burgundy'
                          : 'border-border text-warm-grey hover:text-burgundy hover:border-burgundy'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Heart size={18} className={wishlisted ? 'fill-burgundy' : ''} />
                    </button>
                  </div>

                  {/* Buy Now Button */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full mt-2 border border-mocha text-mocha py-3 text-[12px] tracking-[0.16em] uppercase font-body font-medium rounded-xs hover:bg-mocha hover:text-ivory transition-colors text-center"
                  >
                    Express Checkout · Buy Now
                  </button>

                  {/* Accordion Details */}
                  <div className="mt-6 border-t border-border divide-y divide-border">
                    {/* Components Accordion */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setExpandedSection(expandedSection === 'components' ? null : 'components')}
                        className="w-full py-3 flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal hover:text-mocha transition-colors"
                      >
                        <span>Fabric Components & Unstitched Contents</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            expandedSection === 'components' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedSection === 'components' && (
                        <div className="pb-3 text-xs text-warm-grey space-y-2 font-body">
                          {product.components.map((comp, i) => (
                            <div key={i} className="flex justify-between py-1 border-b border-border/40 last:border-b-0">
                              <span className="font-medium text-charcoal">{comp.name} ({comp.fabric})</span>
                              <span className="text-right">{comp.details}</span>
                            </div>
                          ))}
                          <p className="pt-1 text-[11px] text-warm-grey/80 italic">
                            * Includes original brand authenticity tags, embroidered neckline patch, and daman borders.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Shipping Accordion */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setExpandedSection(expandedSection === 'shipping' ? null : 'shipping')}
                        className="w-full py-3 flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal hover:text-mocha transition-colors"
                      >
                        <span>Complimentary Shipping & Delivery</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            expandedSection === 'shipping' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedSection === 'shipping' && (
                        <div className="pb-3 text-xs text-warm-grey font-body space-y-1.5">
                          <p>• <strong>Free standard delivery</strong> across Pakistan on orders above Rs. 5,000.</p>
                          <p>• Delivery timeframe: 2–4 working days in major cities (Lahore, Karachi, Islamabad), 4–6 days rest of Pakistan.</p>
                          <p>• Cash on Delivery (COD) and online card payments accepted at checkout.</p>
                        </div>
                      )}
                    </div>

                    {/* Returns Accordion */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setExpandedSection(expandedSection === 'returns' ? null : 'returns')}
                        className="w-full py-3 flex items-center justify-between text-left text-xs uppercase tracking-[0.14em] font-medium text-charcoal hover:text-mocha transition-colors"
                      >
                        <span>7-Day Return & Exchange Guarantee</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            expandedSection === 'returns' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedSection === 'returns' && (
                        <div className="pb-3 text-xs text-warm-grey font-body space-y-1.5">
                          <p>• Hassle-free 7-day returns for unstitched suits with unbroken security tags and original packing.</p>
                          <p>• Damaged or incorrect items are replaced free of charge with express courier pickup.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer link to full product page */}
                <div className="pt-4 border-t border-border mt-4 flex items-center justify-between text-xs text-warm-grey">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <ShieldCheck size={14} /> 100% Guaranteed Authentic Pakistani Fabric
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/product/${product.slug}`);
                    }}
                    className="text-mocha hover:text-charcoal font-medium underline uppercase tracking-wider text-[11px]"
                  >
                    View Full Product Details →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
