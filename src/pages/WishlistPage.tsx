import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export function WishlistPage() {
  const { items } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddAllToCart = () => {
    let count = 0;
    items.forEach((p) => {
      if (p.colors && p.colors[0]) {
        addItem(p, p.colors[0], 1);
        count++;
      }
    });
    if (count > 0) {
      showToast(`Added ${count} wishlisted designs to your shopping bag.`);
    }
  };

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Saved Wishlist' },
          ]}
        />
        <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-1">
              Personal Curation
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl text-charcoal font-normal">
              Saved Masterpieces
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-warm-grey font-body">
              Your private selection of admired unstitched lawn, festive organza, and luxury formals.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-2 px-6 py-3 bg-mocha text-ivory hover:bg-charcoal text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors shadow-2xs self-start sm:self-auto"
            >
              <ShoppingBag size={14} />
              Add All To Shopping Bag
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-champagne/40 flex items-center justify-center mx-auto text-mocha mb-6">
              <Heart size={26} className="text-burgundy" />
            </div>
            <h2 className="font-heading text-3xl text-charcoal font-normal">
              Your Wishlist Is Empty
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-warm-grey font-body leading-relaxed">
              When exploring our collections, tap the heart icon on any design to preserve it for future styling decisions.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-mocha text-ivory hover:bg-charcoal text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors shadow-2xs"
            >
              Discover Collections
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  );
}
