import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Truck, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError('Invalid promotion code. Try "HERITAGE10" for 10% off.');
    } else {
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 5000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-ivory">
        <div className="w-16 h-16 rounded-full bg-champagne/50 flex items-center justify-center text-mocha mb-6">
          <ShoppingBag size={28} />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl text-charcoal font-normal">
          Your Shopping Bag Is Empty
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-warm-grey font-body max-w-md">
          Explore our seasonal unstitched lawn, festive formals, and chiffon collections to begin crafting your personalized ensemble.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-mocha text-ivory text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm hover:bg-charcoal transition-colors shadow-2xs"
        >
          Explore Catalog
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shopping Bag' },
          ]}
        />
        <h1 className="font-heading text-3xl sm:text-5xl text-charcoal font-normal mt-4">
          Shopping Bag ({items.length} {items.length === 1 ? 'Design' : 'Designs'})
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-card border border-border rounded-sm mb-8">
          <div className="flex items-center justify-between text-xs font-body mb-2">
            <span className="flex items-center gap-2 text-charcoal font-medium">
              <Truck size={16} className="text-burgundy" />
              {amountToFreeShipping > 0 ? (
                <>Add <span className="font-semibold text-burgundy">{formatPrice(amountToFreeShipping)}</span> more for Free Delivery Across Pakistan</>
              ) : (
                <span className="text-emerald-700 font-semibold">Congratulations! You have unlocked Free Nationwide Delivery</span>
              )}
            </span>
            <span className="text-warm-grey">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-champagne/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-burgundy rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ITEMS LIST */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card border border-border rounded-sm divide-y divide-border">
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor.name}-${idx}`} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  {/* Image & Title */}
                  <div className="flex items-center gap-5">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="w-20 h-26 shrink-0 rounded-sm overflow-hidden bg-champagne border border-border"
                    >
                      <img
                        src={item.selectedColor.image || item.product.mainImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-body text-burgundy font-semibold">
                        {item.product.pieces}-Piece Unstitched
                      </span>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-heading text-xl text-charcoal hover:text-burgundy font-medium block mt-0.5"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5 text-xs font-body text-warm-grey">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-border"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                        <span>•</span>
                        <span>{item.product.fabricType}</span>
                      </div>
                      <div className="sm:hidden font-heading text-lg text-charcoal font-medium mt-2">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-border/60">
                    <div className="flex items-center border border-border rounded-sm bg-ivory">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.quantity - 1)}
                        className="px-3 py-1.5 text-xs text-charcoal hover:bg-champagne/40"
                      >
                        -
                      </button>
                      <span className="px-3.5 py-1.5 text-xs font-body font-semibold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.name, item.quantity + 1)}
                        className="px-3 py-1.5 text-xs text-charcoal hover:bg-champagne/40"
                      >
                        +
                      </button>
                    </div>

                    <div className="hidden sm:block text-right min-w-[100px]">
                      <div className="font-heading text-xl text-charcoal font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-warm-grey font-body">
                          {formatPrice(item.product.price)} each
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id, item.selectedColor.name)}
                      className="p-2 text-warm-grey hover:text-burgundy transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/shop"
                className="text-xs uppercase tracking-[0.14em] font-semibold text-mocha hover:text-burgundy font-body inline-flex items-center gap-1.5"
              >
                ← Continue Exploring
              </Link>
            </div>
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="lg:col-span-4 bg-card border border-border rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
            <h2 className="font-heading text-2xl text-charcoal font-normal pb-4 border-b border-border">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <div>
              {couponCode ? (
                <div className="p-3 bg-champagne/30 rounded-sm border border-border flex items-center justify-between text-xs font-body">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-burgundy" />
                    <span className="font-semibold text-charcoal">{couponCode} (10% Off)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-burgundy hover:underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo Code (try HERITAGE10)"
                      className="flex-1 px-3.5 py-2.5 bg-ivory border border-border rounded-sm text-xs font-body text-charcoal focus:outline-none focus:border-mocha uppercase placeholder:normal-case"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-mocha text-ivory text-xs uppercase tracking-[0.14em] font-body font-semibold rounded-sm hover:bg-charcoal transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-burgundy font-body">{couponError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Subtotal Breakdown */}
            <div className="space-y-3 text-xs font-body text-warm-grey border-t border-border pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-burgundy">
                  <span>Special Promotion (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="text-charcoal font-medium">
                  {shipping === 0 ? <span className="text-emerald-700">Free</span> : formatPrice(shipping)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4 flex justify-between items-baseline">
              <div>
                <span className="font-heading text-lg text-charcoal font-medium block">
                  Estimated Total
                </span>
                <span className="text-[10px] text-warm-grey font-body">Including all taxes</span>
              </div>
              <span className="font-heading text-3xl text-charcoal font-medium">
                {formatPrice(total)}
              </span>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-mocha text-ivory hover:bg-charcoal text-xs uppercase tracking-[0.18em] font-body font-semibold rounded-sm transition-all shadow-xs flex items-center justify-center gap-2"
            >
              Proceed to Secure Checkout
              <ArrowRight size={14} />
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-warm-grey font-body">
              <ShieldCheck size={14} className="text-mocha" />
              <span>Cash on Delivery & Secure Bank Transfers Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
