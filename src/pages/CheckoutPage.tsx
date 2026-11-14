import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, generateOrderNumber } from '../utils/helpers';
import { Order, Address } from '../types';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, ArrowLeft } from 'lucide-react';

const PAKISTANI_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Gujrat',
  'Sheikhupura',
  'Mardan',
  'Rahim Yar Khan',
  'Mirpur (AJK)',
  'Other City',
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, discount, total, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Ayesha Ahmed',
    email: user?.email || 'ayesha@example.com',
    phone: user?.phone || '+92 300 1234567',
    city: 'Lahore',
    address: 'House 42, Street 7, Phase 5, DHA',
    postalCode: '54000',
    deliveryMethod: 'standard', // standard | express
    paymentMethod: 'cod', // cod | bank | card
    orderNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-ivory">
        <h1 className="font-heading text-3xl text-charcoal">Your Bag Is Empty</h1>
        <p className="mt-2 text-xs sm:text-sm text-warm-grey font-body">
          Please add items to your shopping bag before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center px-6 py-3 bg-mocha text-ivory text-xs uppercase tracking-[0.16em] font-body rounded-sm"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const shippingCost = formData.deliveryMethod === 'express' ? shipping + 350 : shipping;
  const finalTotal = total + (formData.deliveryMethod === 'express' ? 350 : 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('Please fill out all required shipping fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    const orderNumber = generateOrderNumber();
    const shippingAddress: Address = {
      id: 'addr-' + Date.now(),
      fullName: formData.fullName,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      postalCode: formData.postalCode,
      isDefault: true,
    };

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      items: [...items],
      subtotal,
      shipping: shippingCost,
      discount,
      total: finalTotal,
      status: 'confirmed',
      date: new Date().toISOString().split('T')[0],
      shippingAddress,
      paymentMethod:
        formData.paymentMethod === 'cod'
          ? 'Cash on Delivery (COD)'
          : formData.paymentMethod === 'bank'
          ? 'Direct Bank Transfer'
          : 'Card / Digital Wallet',
    };

    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      showToast(`Order ${orderNumber} placed successfully!`);
      navigate(`/order-confirmation/${orderNumber}`, { state: { order: newOrder } });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shopping Bag', href: '/cart' },
            { label: 'Checkout' },
          ]}
        />
        <h1 className="font-heading text-3xl sm:text-5xl text-charcoal font-normal mt-4">
          Bespoke Checkout
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT: SHIPPING & PAYMENT DETAILS */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Contact Information */}
              <div className="bg-card border border-border rounded-sm p-6 sm:p-8 shadow-2xs">
                <span className="text-[10px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-1">
                  Step 1 of 3
                </span>
                <h2 className="font-heading text-2xl text-charcoal font-medium mb-6">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                      Phone Number (For Courier SMS & Call) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 3XX XXXXXXX"
                      className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                      Email Address (For Order Updates & Tracking) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Address in Pakistan */}
              <div className="bg-card border border-border rounded-sm p-6 sm:p-8 shadow-2xs">
                <span className="text-[10px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-1">
                  Step 2 of 3
                </span>
                <h2 className="font-heading text-2xl text-charcoal font-medium mb-6">
                  Shipping Destination (Pakistan)
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                        City *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                      >
                        {PAKISTANI_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="e.g. 54000"
                        className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                      Complete Street Address / House / Sector / Phase *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. House 42, Street 7, Phase 5, DHA"
                      className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                    />
                  </div>

                  {/* Delivery Speed Options */}
                  <div className="pt-2">
                    <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-3">
                      Dispatch Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`p-4 border rounded-sm flex items-start gap-3 cursor-pointer transition-all ${
                          formData.deliveryMethod === 'standard'
                            ? 'border-mocha bg-champagne/30'
                            : 'border-border hover:border-warm-grey'
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="standard"
                          checked={formData.deliveryMethod === 'standard'}
                          onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                          className="mt-1"
                        />
                        <div>
                          <span className="text-xs font-body font-semibold text-charcoal block">
                            Standard Courier (2-4 Days)
                          </span>
                          <span className="text-[11px] text-warm-grey font-body block mt-0.5">
                            {shipping === 0 ? 'Free Nationwide Delivery' : formatPrice(shipping)}
                          </span>
                        </div>
                      </label>

                      <label
                        className={`p-4 border rounded-sm flex items-start gap-3 cursor-pointer transition-all ${
                          formData.deliveryMethod === 'express'
                            ? 'border-mocha bg-champagne/30'
                            : 'border-border hover:border-warm-grey'
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="express"
                          checked={formData.deliveryMethod === 'express'}
                          onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                          className="mt-1"
                        />
                        <div>
                          <span className="text-xs font-body font-semibold text-charcoal block">
                            Express Atelier Flight (1-2 Days)
                          </span>
                          <span className="text-[11px] text-warm-grey font-body block mt-0.5">
                            +{formatPrice(350)} Priority Dispatch
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-card border border-border rounded-sm p-6 sm:p-8 shadow-2xs">
                <span className="text-[10px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-1">
                  Step 3 of 3
                </span>
                <h2 className="font-heading text-2xl text-charcoal font-medium mb-6">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`p-4 border rounded-sm flex items-start gap-4 cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-mocha bg-champagne/30'
                        : 'border-border hover:border-warm-grey'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote size={16} className="text-burgundy" />
                        <span className="text-xs font-body font-semibold text-charcoal">
                          Cash on Delivery (COD) — Most Popular
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-warm-grey font-body leading-relaxed">
                        Pay cash directly to the courier rider upon parcel delivery at your doorstep across 200+ Pakistani cities.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`p-4 border rounded-sm flex items-start gap-4 cursor-pointer transition-all ${
                      formData.paymentMethod === 'bank'
                        ? 'border-mocha bg-champagne/30'
                        : 'border-border hover:border-warm-grey'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-mocha" />
                        <span className="text-xs font-body font-semibold text-charcoal">
                          Direct Bank Transfer / IBFT
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-warm-grey font-body leading-relaxed">
                        Transfer to our Meezan Bank / HBL official account. Account details provided immediately upon order placement.
                      </p>
                    </div>
                  </label>

                  {/* Card / JazzCash / EasyPaisa */}
                  <label
                    className={`p-4 border rounded-sm flex items-start gap-4 cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-mocha bg-champagne/30'
                        : 'border-border hover:border-warm-grey'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-mocha" />
                        <span className="text-xs font-body font-semibold text-charcoal">
                          Credit / Debit Card / JazzCash / EasyPaisa
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-warm-grey font-body leading-relaxed">
                        Secure instant payment via 256-bit encrypted gateway. Visa, Mastercard, and UnionPay supported.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Optional Tailoring / Order Notes */}
                <div className="mt-6 pt-6 border-t border-border">
                  <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                    Special Tailoring or Delivery Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    placeholder="e.g. Please include extra matching borders if available, or deliver after 2 PM..."
                    className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:col-span-5 bg-card border border-border rounded-sm p-6 sm:p-8 shadow-2xs space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h2 className="font-heading text-2xl text-charcoal font-normal">
                  Your Masterpiece Bag
                </h2>
                <Link to="/cart" className="text-xs text-mocha hover:underline font-body font-medium">
                  Edit Bag
                </Link>
              </div>

              {/* Items Mini List */}
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 no-scrollbar divide-y divide-border/60">
                {items.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-center gap-4">
                    <img
                      src={item.selectedColor.image || item.product.mainImage}
                      alt=""
                      className="w-14 h-18 rounded-sm object-cover bg-champagne border border-border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-base text-charcoal font-medium truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-warm-grey font-body flex items-center gap-2 mt-0.5">
                        <span>{item.selectedColor.name}</span>
                        <span>•</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="text-xs font-semibold text-charcoal font-body mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotals */}
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
                  <span>Shipping</span>
                  <span className="text-charcoal font-medium">
                    {shippingCost === 0 ? <span className="text-emerald-700">Free</span> : formatPrice(shippingCost)}
                  </span>
                </div>
              </div>

              {/* Final Total */}
              <div className="border-t border-border pt-4 flex justify-between items-baseline">
                <div>
                  <span className="font-heading text-xl text-charcoal font-medium block">
                    Total Amount
                  </span>
                  <span className="text-[10px] text-warm-grey font-body">Pakistani Rupees (PKR)</span>
                </div>
                <span className="font-heading text-3xl text-charcoal font-medium">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-burgundy text-ivory hover:bg-[#5f2430] text-xs uppercase tracking-[0.18em] font-body font-semibold rounded-sm transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Securing Atelier Order...' : 'Confirm & Place Order'}
                <ArrowRight size={14} />
              </button>

              <div className="pt-2 text-center text-[10px] text-warm-grey font-body leading-relaxed">
                By placing this order, you confirm your acceptance of our 7-day uncut fabric inspection and exchange policy.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
