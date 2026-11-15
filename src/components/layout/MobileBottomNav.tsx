import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface MobileBottomNavProps {
  onOpenSearch: () => void;
}

export function MobileBottomNav({ onOpenSearch }: MobileBottomNavProps) {
  const location = useLocation();
  const { items: cartItems, setIsCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Don't show bottom nav on checkout to avoid distraction
  if (location.pathname === '/checkout') return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-border/80 shadow-[0_-4px_20px_rgba(41,35,33,0.06)] px-2 pt-1 pb-[max(0.35rem,env(safe-area-inset-bottom))]"
      role="navigation"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-sm transition-colors ${
            isActive('/') ? 'text-burgundy' : 'text-warm-grey hover:text-charcoal'
          }`}
          aria-label="Home"
        >
          <motion.div whileTap={{ scale: 0.85 }}>
            <Home size={19} strokeWidth={isActive('/') ? 2 : 1.5} />
          </motion.div>
          <span className="text-[9px] font-body font-medium uppercase tracking-[0.14em] mt-0.5">
            Home
          </span>
        </Link>

        {/* Catalog */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-sm transition-colors ${
            isActive('/shop') ? 'text-burgundy' : 'text-warm-grey hover:text-charcoal'
          }`}
          aria-label="Shop Catalog"
        >
          <motion.div whileTap={{ scale: 0.85 }}>
            <Compass size={19} strokeWidth={isActive('/shop') ? 2 : 1.5} />
          </motion.div>
          <span className="text-[9px] font-body font-medium uppercase tracking-[0.14em] mt-0.5">
            Catalog
          </span>
        </Link>

        {/* Search Trigger */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-sm text-warm-grey hover:text-charcoal transition-colors cursor-pointer"
          aria-label="Search"
        >
          <motion.div whileTap={{ scale: 0.85 }}>
            <Search size={19} strokeWidth={1.5} />
          </motion.div>
          <span className="text-[9px] font-body font-medium uppercase tracking-[0.14em] mt-0.5">
            Search
          </span>
        </button>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-sm transition-colors ${
            isActive('/wishlist') ? 'text-burgundy' : 'text-warm-grey hover:text-charcoal'
          }`}
          aria-label={`Wishlist (${wishlistCount})`}
        >
          <motion.div whileTap={{ scale: 0.85 }} className="relative">
            <Heart size={19} strokeWidth={isActive('/wishlist') ? 2 : 1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] flex items-center justify-center rounded-full text-[8px] font-body font-bold bg-burgundy text-ivory px-1 leading-none">
                {wishlistCount}
              </span>
            )}
          </motion.div>
          <span className="text-[9px] font-body font-medium uppercase tracking-[0.14em] mt-0.5">
            Saved
          </span>
        </Link>

        {/* Shopping Bag Trigger */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-3 rounded-sm text-warm-grey hover:text-charcoal transition-colors cursor-pointer"
          aria-label={`Shopping Bag (${cartCount})`}
        >
          <motion.div whileTap={{ scale: 0.85 }} className="relative">
            <ShoppingBag size={19} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] flex items-center justify-center rounded-full text-[8px] font-body font-bold bg-burgundy text-ivory px-1 leading-none shadow-xs">
                {cartCount}
              </span>
            )}
          </motion.div>
          <span className="text-[9px] font-body font-medium uppercase tracking-[0.14em] mt-0.5">
            Bag
          </span>
        </button>
      </div>
    </nav>
  );
}
