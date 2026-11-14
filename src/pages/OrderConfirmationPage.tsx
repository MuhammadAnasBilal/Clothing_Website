import { useLocation, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Package, MapPin, CreditCard, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import { Order } from '../types';
import { useAuth } from '../context/AuthContext';

export function OrderConfirmationPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const location = useLocation();
  const { orders } = useAuth();

  // Try finding order from location.state or auth orders
  const stateOrder = (location.state as { order?: Order })?.order;
  const order = stateOrder || orders.find((o) => o.orderNumber === orderNumber);

  return (
    <div className="min-h-screen bg-ivory pt-8 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Celebration Header */}
        <div className="text-center pt-8 pb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="w-20 h-20 bg-mocha text-ivory rounded-full flex items-center justify-center mx-auto mb-6 shadow-md"
          >
            <Check size={36} strokeWidth={2.5} />
          </motion.div>

          <span className="text-[11px] uppercase tracking-[0.25em] font-body font-semibold text-burgundy block mb-2">
            Order Confirmed & Atelier Dispatched
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl text-charcoal font-normal">
            Thank You For Honoring The Craft
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-warm-grey font-body max-w-lg mx-auto leading-relaxed">
            Your unstitched masterwork has entered our queue. Master inspectors are verifying fabric meterage, cutwork, and thread integrity before packing in our signature heirloom box.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-champagne/40 border border-border rounded-full text-xs font-body text-charcoal font-medium">
            <span className="text-warm-grey">Order Reference:</span>
            <span className="font-semibold text-mocha tracking-wider">{orderNumber || order?.orderNumber || 'HE-HEIRLOOM-01'}</span>
          </div>
        </div>

        {/* Order Details Card */}
        {order ? (
          <div className="bg-card border border-border rounded-sm shadow-2xs divide-y divide-border overflow-hidden">
            {/* Header row */}
            <div className="p-6 bg-champagne/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] font-body text-warm-grey block">
                  Date Placed
                </span>
                <span className="text-xs font-body font-semibold text-charcoal">
                  {order.date}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] font-body text-warm-grey block">
                  Delivery Timeline
                </span>
                <span className="text-xs font-body font-semibold text-emerald-700">
                  2 – 4 Business Days Across Pakistan
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] font-body text-warm-grey block">
                  Status
                </span>
                <span className="text-xs font-body uppercase tracking-[0.12em] font-semibold text-burgundy">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items summary */}
            <div className="p-6 sm:p-8 space-y-4">
              <h3 className="font-heading text-xl text-charcoal font-medium mb-4">
                Ordered Creations
              </h3>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                  <img
                    src={item.selectedColor.image || item.product.mainImage}
                    alt=""
                    className="w-16 h-20 rounded-sm object-cover bg-champagne border border-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-lg text-charcoal font-medium truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-xs text-warm-grey font-body mt-0.5">
                      Hue: <span className="text-charcoal font-medium">{item.selectedColor.name}</span> · Qty: {item.quantity} · {item.product.pieces}-Piece
                    </div>
                  </div>
                  <div className="font-heading text-lg text-charcoal font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping & Payment summary */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-ivory/40">
              <div>
                <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-3">
                  <MapPin size={15} className="text-mocha" />
                  Delivery Destination
                </h4>
                <div className="text-xs font-body text-warm-grey space-y-1">
                  <p className="font-semibold text-charcoal">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, Pakistan {order.shippingAddress.postalCode}</p>
                  <p>Contact: {order.shippingAddress.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-3">
                  <CreditCard size={15} className="text-mocha" />
                  Payment Details
                </h4>
                <div className="text-xs font-body text-warm-grey space-y-1">
                  <p className="font-semibold text-charcoal">{order.paymentMethod}</p>
                  <p>Amount Due on Arrival: <span className="font-semibold text-burgundy">{formatPrice(order.total)}</span></p>
                  <p className="text-[11px] text-warm-grey mt-2">
                    Please keep exact cash ready upon arrival of the courier rider.
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Totals */}
            <div className="p-6 sm:p-8 bg-card space-y-2 text-xs font-body text-warm-grey">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-burgundy">
                  <span>Promotion Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-border font-heading text-2xl text-charcoal font-medium">
                <span>Total Amount</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 bg-card border border-border rounded-sm text-center">
            <Package size={36} className="mx-auto text-mocha mb-3" />
            <h3 className="font-heading text-2xl text-charcoal">Order #{orderNumber} Logged</h3>
            <p className="mt-2 text-xs text-warm-grey font-body">
              A formal confirmation message with tracking link has been dispatched to your email and phone number.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-mocha text-ivory hover:bg-charcoal text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors text-center shadow-xs"
          >
            Continue Exploring Collections
          </Link>
          <Link
            to="/account"
            className="w-full sm:w-auto px-8 py-3.5 border border-border bg-card hover:bg-champagne/40 text-charcoal text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors text-center"
          >
            View In Account Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
