import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag, Menu, X, Phone, Mail, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchOverlay } from './SearchOverlay';
import { MobileBottomNav } from './MobileBottomNav';

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Collections', href: '/collections' },
  { label: 'Unstitched', href: '/shop' },
  { label: 'Luxury Edit', href: '/shop?filter=luxury' },
  { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
  { label: 'About Us', href: '/about' },
];

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { items: cartItems, setIsCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce((sum: number, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const isTransparentState = transparent && !scrolled;

  const navbarBg = isTransparentState
    ? 'bg-transparent'
    : 'bg-ivory/95 backdrop-blur-md border-b border-border shadow-xs';

  const textColor = isTransparentState ? 'text-white' : 'text-charcoal';
  const subtitleColor = isTransparentState ? 'text-white/75' : 'text-warm-grey';
  const iconColor = isTransparentState ? 'text-white hover:text-white/80' : 'text-mocha hover:text-charcoal';
  const badgeBg = isTransparentState ? 'bg-white text-mocha' : 'bg-burgundy text-white';

  return (
    <>
      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Announcement Bar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-mocha text-ivory text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-widest uppercase py-1.5 sm:py-2 px-3 text-center font-body font-medium transition-transform duration-300 truncate ${
          scrolled ? '-translate-y-full' : 'translate-y-0'
        }`}
        role="banner"
      >
        <span>Complimentary Express Delivery on Orders Above Rs. 5,000 · Authentic Pakistani Craftsmanship</span>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${navbarBg} ${
          scrolled ? 'translate-y-0 py-2 sm:py-2.5' : 'translate-y-[26px] sm:translate-y-[32px] py-2.5 sm:py-4'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-12">
          {/* Top Row: Icons + Logo + Actions */}
          <div className="flex items-center justify-between gap-2">
            {/* Left: Hamburger (mobile) */}
            <div className="flex items-center gap-1 w-auto min-w-[36px] lg:w-[220px]">
              <button
                onClick={() => setDrawerOpen(true)}
                className={`lg:hidden p-1.5 -ml-1 ${iconColor} transition-colors duration-200 cursor-pointer`}
                aria-label="Open menu"
                aria-expanded={drawerOpen}
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>

              <div className="hidden lg:block">
                <span className={`text-[11px] uppercase tracking-[0.2em] font-body ${subtitleColor}`}>
                  Lahore · Karachi · Global
                </span>
              </div>
            </div>

            {/* Center: Brand Logo */}
            <Link
              to="/"
              className="flex flex-col items-center shrink-0 group py-0.5 max-w-[210px] sm:max-w-none text-center"
              aria-label="The Heritage Edit — Home"
            >
              <span
                className={`font-heading text-lg sm:text-2xl lg:text-3xl tracking-[0.18em] sm:tracking-[0.22em] ${textColor} transition-colors duration-300 leading-none text-center font-normal`}
              >
                THE HERITAGE EDIT
              </span>
              <span
                className={`text-[8px] sm:text-[9.5px] tracking-[0.18em] sm:tracking-[0.25em] ${subtitleColor} font-body font-medium mt-1 transition-colors duration-300 uppercase truncate max-w-[200px] sm:max-w-none`}
              >
                Contemporary Pakistani Luxury
              </span>
            </Link>

            {/* Right: Action Icons */}
            <div className="flex items-center justify-end gap-0.5 sm:gap-2 w-auto min-w-[36px] lg:w-[220px]">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-1.5 sm:p-2 ${iconColor} transition-colors duration-200 cursor-pointer`}
                aria-label="Search collections"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className={`relative p-1.5 sm:p-2 ${iconColor} transition-colors duration-200`}
                aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
              >
                <Heart size={19} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span
                    className={`absolute top-0.5 right-0.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full text-[9px] font-body font-semibold leading-none px-1 ${badgeBg} transition-colors duration-300`}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <Link
                to="/account"
                className={`hidden sm:flex p-2 ${iconColor} transition-colors duration-200`}
                aria-label="Customer Account"
              >
                <User size={19} strokeWidth={1.5} />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-1.5 sm:p-2 ${iconColor} transition-colors duration-200 cursor-pointer`}
                aria-label={`Shopping bag${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    className={`absolute top-0.5 right-0.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full text-[9px] font-body font-semibold leading-none px-1 ${badgeBg} transition-colors duration-300`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-9 pt-3 border-t border-border/40 mt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`group relative text-[12px] tracking-[0.16em] uppercase font-body font-medium ${textColor} transition-colors duration-300 py-1 hover:opacity-80`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 ease-out ${
                    isTransparentState ? 'bg-white' : 'bg-mocha'
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-charcoal/50 backdrop-blur-xs"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[60] w-[min(380px,88vw)] bg-ivory flex flex-col shadow-2xl border-r border-border"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-border shrink-0">
                <div>
                  <span className="font-heading text-lg tracking-[0.18em] text-charcoal block">
                    THE HERITAGE EDIT
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-warm-grey">
                    Unstitched Luxury
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 -mr-2 text-mocha hover:opacity-70 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Drawer Nav Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-6">
                <ul className="space-y-0">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.04,
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setDrawerOpen(false)}
                        className="block py-3.5 text-[13px] tracking-[0.14em] uppercase font-body font-medium text-charcoal border-b border-border/50 hover:text-burgundy transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Account Link for mobile */}
                <div className="mt-6 pt-4 border-t border-border/60">
                  <Link
                    to="/account"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 py-3 text-[13px] tracking-[0.14em] uppercase font-body font-medium text-charcoal hover:text-burgundy transition-colors duration-200"
                  >
                    <User size={18} strokeWidth={1.5} />
                    My Account / Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 py-3 text-[13px] tracking-[0.14em] uppercase font-body font-medium text-charcoal hover:text-burgundy transition-colors duration-200"
                  >
                    <Heart size={18} strokeWidth={1.5} />
                    Saved Items ({wishlistCount})
                  </Link>
                </div>
              </nav>

              {/* Drawer Footer: Contact + Socials */}
              <div className="shrink-0 border-t border-border px-6 py-6 space-y-4 bg-champagne/20">
                <div className="space-y-2">
                  <a
                    href="tel:+92421234567"
                    className="flex items-center gap-3 text-warm-grey hover:text-mocha transition-colors text-xs font-body"
                  >
                    <Phone size={14} strokeWidth={1.5} />
                    +92 42 1234567 (Lahore Flagship)
                  </a>
                  <a
                    href="mailto:concierge@theheritageedit.pk"
                    className="flex items-center gap-3 text-warm-grey hover:text-mocha transition-colors text-xs font-body"
                  >
                    <Mail size={14} strokeWidth={1.5} />
                    concierge@theheritageedit.pk
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-grey hover:text-mocha transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={17} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-grey hover:text-mocha transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={17} />
                  </a>
                </div>

                <p className="text-[10px] tracking-[0.15em] uppercase text-warm-grey/60 font-body">
                  © 2026 The Heritage Edit · Unstitched Collections
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Interactive Mobile Bottom Navigation */}
      <MobileBottomNav onOpenSearch={() => setSearchOpen(true)} />
    </>
  );
}
