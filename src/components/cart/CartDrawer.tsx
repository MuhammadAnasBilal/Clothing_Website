import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useScrollLock } from '../../hooks/useScrollLock';
import { formatPrice } from '../../utils/helpers';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring' as const, damping: 25, stiffness: 200 },
  },
};

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    itemCount,
  } = useCart();

  useScrollLock(isCartOpen);

  const close = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    if (isCartOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, close]);

  const freeShippingThreshold = 5000;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[80]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-ivory flex flex-col shadow-2xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="text-[13px] tracking-[0.15em] uppercase font-medium font-body text-charcoal">
                Shopping Bag ({itemCount})
              </span>
              <button
                onClick={close}
                className="p-1 text-warm-grey hover:text-charcoal transition-colors duration-200"
                aria-label="Close shopping bag"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
                <ShoppingBag size={48} className="text-champagne" strokeWidth={1} />
                <p className="text-warm-grey text-sm font-body">
                  Your bag is empty
                </p>
                <Link
                  to="/shop"
                  onClick={close}
                  className="text-[12px] tracking-[0.15em] uppercase font-medium font-body border border-mocha text-mocha px-8 py-3 hover:bg-mocha hover:text-ivory transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Scrollable item list */}
                <ul className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                  {items.map((item) => (
                    <li
                      key={`${item.product.id}-${item.selectedColor.name}`}
                      className="flex gap-4 pb-4 border-b border-border/50 last:border-b-0"
                    >
                      {/* Product image */}
                      <img
                        src={item.selectedColor.image || item.product.mainImage}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-sm flex-shrink-0 bg-champagne"
                      />

                      {/* Product info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <p className="text-sm font-medium text-charcoal font-body truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-warm-grey font-body mt-0.5 flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-border inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name} · {item.product.fabricType}
                          </p>
                          <p className="text-sm font-semibold text-mocha font-body mt-1">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="inline-flex items-center border border-border rounded-sm">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-warm-grey hover:text-charcoal transition-colors duration-200 disabled:opacity-40"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={13} strokeWidth={1.5} />
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center text-xs font-medium font-body text-charcoal select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.name,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-warm-grey hover:text-charcoal transition-colors duration-200"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <Plus size={13} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedColor.name)
                        }
                        className="self-start mt-0.5 p-0.5 text-warm-grey hover:text-burgundy transition-colors duration-200"
                        aria-label={`Remove ${item.product.name} from bag`}
                      >
                        <X size={15} strokeWidth={1.5} />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Bottom sticky section */}
                <div className="border-t border-border px-6 py-5 bg-ivory space-y-3">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-charcoal">
                      Subtotal
                    </span>
                    <span className="text-sm font-semibold font-body text-charcoal">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Shipping info */}
                  <p className="text-xs text-warm-grey font-body">
                    {qualifiesForFreeShipping
                      ? 'Free shipping on orders over Rs. 5,000'
                      : `Shipping: ${formatPrice(shipping)}`}
                  </p>

                  {/* Action buttons */}
                  <div className="pt-1">
                    <Link
                      to="/cart"
                      onClick={close}
                      className="block border border-mocha text-mocha text-center py-3 text-[12px] tracking-[0.15em] uppercase font-medium font-body hover:bg-mocha hover:text-ivory transition-colors duration-200"
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={close}
                      className="block bg-mocha text-ivory text-center py-3 text-[12px] tracking-[0.15em] uppercase font-medium font-body mt-2 hover:bg-charcoal transition-colors duration-200"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
