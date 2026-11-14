import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/helpers';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Package, User, MapPin, Heart, LogOut, Plus, CheckCircle, Clock } from 'lucide-react';
import { Address } from '../types';

export function AccountPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, orders, addAddress } = useAuth();
  const { itemCount: wishlistCount } = useWishlist();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    city: 'Lahore',
    address: '',
    postalCode: '',
  });

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-ivory">
        <h1 className="font-heading text-3xl text-charcoal">Sign In Required</h1>
        <p className="mt-2 text-xs sm:text-sm text-warm-grey font-body">
          Please sign in to access your order archives and saved atelier measurements.
        </p>
        <Link
          to="/auth"
          className="mt-6 inline-flex items-center px-6 py-3 bg-mocha text-ivory text-xs uppercase tracking-[0.16em] font-body rounded-sm"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    showToast('You have been signed out.');
    navigate('/');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.address.trim()) {
      showToast('Please enter an address.', 'error');
      return;
    }

    const created: Address = {
      id: 'addr-' + Date.now(),
      fullName: newAddr.fullName,
      phone: newAddr.phone,
      city: newAddr.city,
      address: newAddr.address,
      postalCode: newAddr.postalCode || '54000',
      isDefault: false,
    };

    addAddress(created);
    setIsAddingAddress(false);
    showToast('New delivery address added successfully.');
    setNewAddr({
      fullName: user.name,
      phone: user.phone || '',
      city: 'Lahore',
      address: '',
      postalCode: '',
    });
  };

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Patron Account' },
          ]}
        />
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-1">
              Patron Dashboard
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl text-charcoal font-normal">
              Welcome, {user.name}
            </h1>
            <p className="text-xs text-warm-grey font-body mt-1">
              {user.email} · Member of The Heritage Circle
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs uppercase tracking-[0.14em] font-body text-charcoal hover:bg-champagne/40 rounded-sm transition-colors self-start sm:self-auto"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-1 bg-card border border-border rounded-sm p-3 shadow-2xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-xs uppercase tracking-[0.14em] font-body font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-mocha text-ivory'
                  : 'text-charcoal hover:bg-champagne/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package size={16} />
                <span>Orders ({orders.length})</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-xs uppercase tracking-[0.14em] font-body font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-mocha text-ivory'
                  : 'text-charcoal hover:bg-champagne/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <User size={16} />
                <span>Personal Profile</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-xs uppercase tracking-[0.14em] font-body font-semibold transition-all ${
                activeTab === 'addresses'
                  ? 'bg-mocha text-ivory'
                  : 'text-charcoal hover:bg-champagne/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin size={16} />
                <span>Saved Addresses ({user.addresses.length})</span>
              </div>
            </button>

            <Link
              to="/wishlist"
              className="w-full flex items-center justify-between px-4 py-3 rounded-sm text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal hover:bg-champagne/40 transition-all border-t border-border mt-2 pt-3"
            >
              <div className="flex items-center gap-3">
                <Heart size={16} className="text-burgundy" />
                <span>Saved Wishlist</span>
              </div>
              <span className="text-xs bg-champagne px-2 py-0.5 rounded-full text-mocha">
                {wishlistCount}
              </span>
            </Link>
          </aside>

          {/* Main Tab Content */}
          <main className="lg:col-span-9">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h2 className="font-heading text-2xl text-charcoal font-medium">
                    Order History & Invoices
                  </h2>
                  <span className="text-xs text-warm-grey font-body">
                    {orders.length} Past Inquiries
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 text-center bg-card border border-border rounded-sm">
                    <Package size={36} className="mx-auto text-mocha/50 mb-3" />
                    <h3 className="font-heading text-xl text-charcoal">No Orders Placed Yet</h3>
                    <p className="mt-1 text-xs text-warm-grey font-body">
                      Your purchased unstitched suits and tracking links will appear here.
                    </p>
                    <Link
                      to="/shop"
                      className="mt-5 inline-flex items-center px-6 py-2.5 bg-mocha text-ivory text-xs uppercase tracking-[0.14em] font-body rounded-sm"
                    >
                      Begin Exploring
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-card border border-border rounded-sm overflow-hidden shadow-2xs divide-y divide-border"
                      >
                        <div className="p-4 sm:p-6 bg-champagne/20 flex flex-wrap items-center justify-between gap-4 text-xs font-body">
                          <div>
                            <span className="text-warm-grey text-[10px] uppercase tracking-[0.14em] block">
                              Order Reference
                            </span>
                            <span className="font-semibold text-charcoal">{ord.orderNumber}</span>
                          </div>
                          <div>
                            <span className="text-warm-grey text-[10px] uppercase tracking-[0.14em] block">
                              Date Placed
                            </span>
                            <span className="text-charcoal">{ord.date}</span>
                          </div>
                          <div>
                            <span className="text-warm-grey text-[10px] uppercase tracking-[0.14em] block">
                              Payment
                            </span>
                            <span className="text-charcoal">{ord.paymentMethod}</span>
                          </div>
                          <div>
                            <span className="text-warm-grey text-[10px] uppercase tracking-[0.14em] block">
                              Total
                            </span>
                            <span className="font-semibold text-charcoal">{formatPrice(ord.total)}</span>
                          </div>
                          <span className="px-3 py-1 bg-burgundy/10 text-burgundy font-semibold uppercase tracking-[0.14em] text-[10px] rounded-full">
                            {ord.status}
                          </span>
                        </div>

                        <div className="p-4 sm:p-6 space-y-3">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <img
                                src={item.selectedColor.image || item.product.mainImage}
                                alt=""
                                className="w-12 h-16 rounded-sm object-cover bg-champagne border border-border shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-heading text-base text-charcoal font-medium truncate">
                                  {item.product.name}
                                </h4>
                                <p className="text-xs text-warm-grey font-body">
                                  {item.selectedColor.name} · Qty: {item.quantity} · {formatPrice(item.product.price)} each
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-card border border-border rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
                <h2 className="font-heading text-2xl text-charcoal font-medium pb-3 border-b border-border">
                  Personal Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={user.name}
                      className="w-full px-4 py-2.5 bg-champagne/20 border border-border rounded-sm text-xs font-body text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      readOnly
                      value={user.email}
                      className="w-full px-4 py-2.5 bg-champagne/20 border border-border rounded-sm text-xs font-body text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={user.phone || '+92 300 1234567'}
                      className="w-full px-4 py-2.5 bg-champagne/20 border border-border rounded-sm text-xs font-body text-charcoal"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-warm-grey font-body">
                    To request bespoke atelier alteration notes or update your client profile, reach our private styling concierge at concierge@heritage-edit.pk.
                  </p>
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h2 className="font-heading text-2xl text-charcoal font-medium">
                    Saved Shipping Addresses
                  </h2>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-mocha text-ivory text-xs uppercase tracking-[0.14em] font-body font-semibold rounded-sm hover:bg-charcoal"
                  >
                    <Plus size={14} />
                    {isAddingAddress ? 'Cancel' : 'Add New Address'}
                  </button>
                </div>

                {isAddingAddress && (
                  <form onSubmit={handleCreateAddress} className="p-6 bg-card border border-border rounded-sm shadow-sm space-y-4">
                    <h3 className="font-heading text-xl text-charcoal">New Pakistan Address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddr.fullName}
                          onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                          className="w-full px-3.5 py-2 bg-ivory border border-border rounded-sm text-xs font-body"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full px-3.5 py-2 bg-ivory border border-border rounded-sm text-xs font-body"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full px-3.5 py-2 bg-ivory border border-border rounded-sm text-xs font-body"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={newAddr.postalCode}
                          onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                          className="w-full px-3.5 py-2 bg-ivory border border-border rounded-sm text-xs font-body"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-1">
                          Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddr.address}
                          onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                          placeholder="House, Street, Sector, Phase..."
                          className="w-full px-3.5 py-2 bg-ivory border border-border rounded-sm text-xs font-body"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-mocha text-ivory text-xs uppercase tracking-[0.14em] font-body font-semibold rounded-sm"
                    >
                      Save Address
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-card border border-border rounded-sm p-6 shadow-2xs relative"
                    >
                      {addr.isDefault && (
                        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.14em] font-body font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Primary
                        </span>
                      )}
                      <h4 className="font-heading text-lg text-charcoal font-medium">
                        {addr.fullName}
                      </h4>
                      <p className="mt-2 text-xs text-warm-grey font-body leading-relaxed">
                        {addr.address}<br />
                        {addr.city}, Pakistan {addr.postalCode}
                      </p>
                      <p className="mt-2 text-xs font-body text-mocha">
                        Tel: {addr.phone}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
