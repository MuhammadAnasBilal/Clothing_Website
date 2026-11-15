import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Scissors,
  Check,
  ChevronDown,
  Star,
  Sparkles,
} from 'lucide-react';
import { products, reviews } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/helpers';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ProductGrid } from '../components/product/ProductGrid';
import { ReviewCard } from '../components/ui/ReviewCard';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { showToast } = useToast();

  const product = products.find((p) => p.slug === slug);

  // States
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'fabric' | 'model' | 'details'>('fabric');
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('components');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-ivory">
        <h1 className="font-heading text-4xl text-charcoal">Design Not Found</h1>
        <p className="mt-2 text-sm text-warm-grey font-body">
          The requested luxury unstitched design is unavailable or has been archived.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center px-6 py-3 bg-mocha text-ivory text-xs uppercase tracking-[0.16em] font-body rounded-sm"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const isWishlisted = isInWishlist(product.id);

  // Gallery array based on current color & active tab
  const gallery = useMemo(() => {
    const list = [
      currentColor?.image || product.mainImage,
      currentColor?.modelImage || product.modelImage,
      ...(product.galleryImages || []),
    ];
    return Array.from(new Set(list));
  }, [currentColor, product]);

  const currentActiveImage = gallery[activeImgIdx] || gallery[0];

  // Related products (same category or collection)
  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
      .slice(0, 4);
  }, [product]);

  // Product reviews
  const productReviews = useMemo(() => {
    const matched = reviews.filter((r) => r.productId === product.id);
    return matched.length > 0 ? matched : reviews.slice(0, 2);
  }, [product]);

  // Handlers
  const handleColorChange = (idx: number) => {
    setSelectedColorIdx(idx);
    setActiveImgIdx(0);
  };

  const handleAddToCart = () => {
    addItem(product, currentColor, quantity);
    showToast(`Added ${quantity}x "${product.name}" (${currentColor.name}) to your shopping bag.`);
  };

  const handleBuyNow = () => {
    addItem(product, currentColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` },
            { label: product.name },
          ]}
        />
      </div>

      {/* Main Two-Column Product Layout */}
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: INTERACTIVE IMAGE GALLERY */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center gap-2 p-1.5 bg-champagne/40 rounded-full w-fit">
              <button
                onClick={() => {
                  setActiveTab('fabric');
                  setActiveImgIdx(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-body uppercase tracking-[0.12em] font-medium transition-all ${
                  activeTab === 'fabric'
                    ? 'bg-mocha text-ivory shadow-xs'
                    : 'text-charcoal hover:bg-champagne'
                }`}
              >
                Unstitched Fabric
              </button>
              <button
                onClick={() => {
                  setActiveTab('model');
                  setActiveImgIdx(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-body uppercase tracking-[0.12em] font-medium transition-all ${
                  activeTab === 'model'
                    ? 'bg-mocha text-ivory shadow-xs'
                    : 'text-charcoal hover:bg-champagne'
                }`}
              >
                Tailored Silhouette
              </button>
              <button
                onClick={() => {
                  setActiveTab('details');
                  setActiveImgIdx(2 < gallery.length ? 2 : 0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-body uppercase tracking-[0.12em] font-medium transition-all ${
                  activeTab === 'details'
                    ? 'bg-mocha text-ivory shadow-xs'
                    : 'text-charcoal hover:bg-champagne'
                }`}
              >
                Craft Details
              </button>
            </div>

            {/* Main Image Display with Hover Zoom */}
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-sm bg-champagne border border-border cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={currentActiveImage}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Magnified zoom layer */}
              {isZoomed && (
                <div
                  className="absolute inset-0 pointer-events-none bg-no-repeat transition-all duration-75"
                  style={{
                    backgroundImage: `url(${currentActiveImage})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: '240%',
                  }}
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.isNewArrival && (
                  <span className="px-3 py-1 bg-mocha text-ivory text-[10px] uppercase tracking-[0.2em] font-body font-semibold rounded-full shadow-2xs">
                    New Arrival
                  </span>
                )}
                {product.discount && product.discount > 0 && (
                  <span className="px-3 py-1 bg-burgundy text-ivory text-[10px] uppercase tracking-[0.2em] font-body font-semibold rounded-full shadow-2xs">
                    -{product.discount}% Off
                  </span>
                )}
              </div>

              {/* Hover hint */}
              <div className="absolute bottom-4 right-4 pointer-events-none bg-charcoal/60 backdrop-blur-sm text-ivory text-[10px] uppercase tracking-[0.14em] font-body px-3 py-1 rounded-full">
                Hover to Zoom Weave
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`relative w-20 h-24 shrink-0 rounded-sm overflow-hidden border-2 transition-all ${
                    activeImgIdx === idx
                      ? 'border-mocha shadow-sm scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS & ACTIONS */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] font-body font-semibold text-burgundy">
                  {product.category} · {product.pieces}-Piece Unstitched
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 text-warm-grey hover:text-charcoal transition-colors rounded-full hover:bg-champagne/50"
                    title="Share Design"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => toggleItem(product)}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted
                        ? 'text-burgundy bg-burgundy/10'
                        : 'text-warm-grey hover:text-charcoal hover:bg-champagne/50'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl text-charcoal font-normal mt-2 leading-tight">
                {product.name}
              </h1>

              {/* SKU & Rating */}
              <div className="mt-3 flex items-center gap-4 text-xs font-body text-warm-grey">
                <span className="tracking-[0.14em] uppercase">SKU: {product.sku}</span>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-mocha font-medium">
                  <div className="flex text-burgundy">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                        className={i < Math.floor(product.rating) ? 'text-burgundy' : 'text-border'}
                      />
                    ))}
                  </div>
                  <span>{product.rating}</span>
                  <span className="text-warm-grey">({product.reviewCount} Reviews)</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-heading text-3xl sm:text-4xl text-charcoal font-medium">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-body text-base text-warm-grey line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs uppercase tracking-[0.14em] font-semibold text-burgundy font-body">
                    Save {product.discount}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-warm-grey font-body mt-1">
                Tax included. Complimentary delivery across Pakistan on orders over Rs. 5,000.
              </p>
            </div>

            {/* Product Overview Description */}
            <p className="text-xs sm:text-sm text-warm-grey font-body leading-relaxed border-t border-border pt-4">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            <div className="border-t border-border pt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-body font-semibold uppercase tracking-[0.14em] text-charcoal">
                  Selected Hue: <span className="text-mocha font-normal">{currentColor?.name}</span>
                </span>
                <span className="text-[11px] text-warm-grey font-body">
                  {product.colors.length} Colorways Available
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(idx)}
                    className={`group relative flex items-center gap-2 p-1.5 rounded-sm border transition-all ${
                      selectedColorIdx === idx
                        ? 'border-mocha bg-champagne/30'
                        : 'border-border hover:border-warm-grey'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-border shadow-2xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-body text-charcoal pr-1 hidden sm:inline">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="border-t border-border pt-5 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-body font-semibold uppercase tracking-[0.14em] text-charcoal">
                  Quantity:
                </span>
                <div className="inline-flex items-center border border-border rounded-sm bg-card">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-sm text-charcoal hover:bg-champagne/40 transition-colors font-body"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-body font-semibold text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-sm text-charcoal hover:bg-champagne/40 transition-colors font-body"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] font-body text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Ready in Lahore Atelier
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-mocha text-ivory hover:bg-charcoal transition-all duration-200 font-body text-xs uppercase tracking-[0.18em] font-semibold rounded-sm shadow-xs flex items-center justify-center gap-2"
                >
                  Add To Shopping Bag
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-burgundy text-ivory hover:bg-[#5f2430] transition-all duration-200 font-body text-xs uppercase tracking-[0.18em] font-semibold rounded-sm shadow-xs flex items-center justify-center gap-2"
                >
                  Buy Now · Direct Checkout
                </button>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="bg-champagne/25 border border-border/80 rounded-sm p-4 grid grid-cols-3 gap-2 text-center text-warm-grey">
              <div className="flex flex-col items-center">
                <Truck size={18} className="text-mocha mb-1" />
                <span className="text-[10px] uppercase tracking-[0.12em] font-body font-semibold text-charcoal">2-4 Days</span>
                <span className="text-[9px] font-body">Nationwide Delivery</span>
              </div>
              <div className="flex flex-col items-center border-x border-border/60">
                <ShieldCheck size={18} className="text-mocha mb-1" />
                <span className="text-[10px] uppercase tracking-[0.12em] font-body font-semibold text-charcoal">100% Genuine</span>
                <span className="text-[9px] font-body">Pakistani Lawn</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw size={18} className="text-mocha mb-1" />
                <span className="text-[10px] uppercase tracking-[0.12em] font-body font-semibold text-charcoal">7 Days</span>
                <span className="text-[9px] font-body">Uncut Exchange</span>
              </div>
            </div>

            {/* ACCORDIONS: Fabric meterage, embroidery, care, shipping */}
            <div className="border-t border-border pt-4 divide-y divide-border/80">
              {/* Accordion 1: Components & Meterage */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('components')}
                  className="w-full flex items-center justify-between text-left font-body text-xs font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  <span>Fabric Components & Meterage ({product.pieces} Pieces)</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'components' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'components' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2 text-xs font-body text-warm-grey"
                    >
                      {product.components.map((comp, idx) => (
                        <div key={idx} className="p-2.5 bg-champagne/20 rounded-sm border border-border/50">
                          <span className="font-semibold text-charcoal">{comp.name}: </span>
                          <span className="text-mocha font-medium">{comp.fabric}</span>
                          <p className="mt-0.5 text-[11px] text-warm-grey">{comp.details}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Embroidery Art */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('embroidery')}
                  className="w-full flex items-center justify-between text-left font-body text-xs font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  <span>Artisanal Embroidery & Motifs</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'embroidery' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'embroidery' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 text-xs font-body text-warm-grey leading-relaxed"
                    >
                      <p>{product.embroideryDetails}</p>
                      <p className="mt-2 text-[11px]">
                        Traditional motifs inspired by Mughal floral vines and handcrafted geometry, executed with silk thread and tilla accents.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Care & Maintenance */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-left font-body text-xs font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  <span>Wash & Care Guidelines</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'care' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 text-xs font-body text-warm-grey space-y-1.5"
                    >
                      <p>• Dry clean recommended for embroidered organza, chiffon, and velvet suits.</p>
                      <p>• For Swiss lawn, wash gently in cold water with mild detergent.</p>
                      <p>• Do not wring or soak embroidered panels. Dry in shade.</p>
                      <p>• Warm iron inside-out or use garment steamer to preserve threadwork.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 4: Shipping & Dispatch */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-left font-body text-xs font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  <span>Delivery & Tailoring Advisory</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openAccordion === 'shipping' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 text-xs font-body text-warm-grey space-y-1.5"
                    >
                      <p>• Dispatched from our central Lahore facility within 24 hours.</p>
                      <p>• Delivery across Lahore, Karachi, Islamabad within 2-3 business days; all other cities 3-4 days.</p>
                      <p>• Unstitched fabric allows tailoring according to any modest or contemporary design preference.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: PATRON REVIEWS FOR THIS PRODUCT */}
        <div className="mt-24 pt-16 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-1">
                Patron Feedback
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-normal">
                Reviews For This Masterpiece
              </h2>
            </div>
            <Link
              to="/reviews"
              className="text-xs uppercase tracking-[0.14em] font-semibold text-mocha hover:text-burgundy font-body"
            >
              Write A Review →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>

        {/* SECTION: RELATED DESIGNS */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-taupe block mb-1">
                Complementary Pieces
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-charcoal font-normal">
                You May Also Admire
              </h2>
            </div>

            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Bag Bar */}
      <div className="lg:hidden fixed bottom-[max(3.3rem,env(safe-area-inset-bottom))] left-0 right-0 z-30 bg-ivory/95 backdrop-blur-md border-t border-border/80 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={currentColor?.image || product.mainImage}
            alt=""
            className="w-10 h-12 object-cover rounded-xs border border-border shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-body font-medium text-charcoal truncate">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-semibold text-mocha font-body">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] text-warm-grey uppercase tracking-wider font-body truncate">
                · {currentColor?.name}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-mocha hover:bg-charcoal text-ivory text-[10px] uppercase tracking-[0.16em] font-semibold py-2.5 px-4 rounded-xs shrink-0 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          Add To Bag
        </button>
      </div>
    </div>
  );
}
