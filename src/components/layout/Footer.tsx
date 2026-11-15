import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail } from 'lucide-react';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Size Guide', to: '/size-guide' },
];

const shopLinks = [
  { label: 'New Arrivals', to: '/collections/new-arrivals' },
  { label: 'Best Sellers', to: '/collections/best-sellers' },
  { label: 'Lawn Collection', to: '/collections/lawn' },
  { label: 'Chiffon', to: '/collections/chiffon' },
  { label: 'Festive Edit', to: '/collections/festive' },
  { label: 'Luxury Formals', to: '/collections/luxury-formals' },
];

const customerCareLinks = [
  { label: 'Shipping Policy', to: '/shipping-policy' },
  { label: 'Return Policy', to: '/return-policy' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Track Order', to: '/track-order' },
];

const socialLinks = [
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://wa.me/923001234567', label: 'WhatsApp' },
];

const paymentMethods = ['COD', 'Bank Transfer', 'JazzCash', 'Easypaisa'];

function FooterLinkGroup({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.15em] uppercase font-body font-medium text-[#F8F4ED] mb-6">
        {heading}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-[#E8DED0]/70 hover:text-[#F8F4ED] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  }

  return (
    <footer className="bg-[#292321] text-[#E8DED0] px-6 md:px-12 lg:px-16 pt-16 pb-24 sm:py-20">
      {/* ── Main Grid ── */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="lg:pr-6">
          <Link to="/" className="inline-block mb-5">
            <span className="font-heading text-xl tracking-[0.2em] text-[#F8F4ED]">
              THE HERITAGE EDIT
            </span>
          </Link>
          <p className="text-sm text-[#E8DED0]/70 leading-relaxed mb-6">
            Curating the finest Pakistani fashion — where heritage
            craftsmanship meets contemporary elegance. Every piece tells a
            story of tradition, artistry, and timeless style.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#E8DED0]/60 hover:text-[#F8F4ED] transition-colors"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="space-y-2.5 text-sm text-[#E8DED0]/60">
            <a
              href="tel:+924212345678"
              className="flex items-center gap-2.5 hover:text-[#F8F4ED] transition-colors"
            >
              <Phone size={14} strokeWidth={1.5} />
              <span>+92 42 1234567</span>
            </a>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-[#F8F4ED] transition-colors"
            >
              <MessageCircle size={14} strokeWidth={1.5} />
              <span>+92 300 1234567</span>
            </a>
            <a
              href="mailto:hello@theheritageedit.pk"
              className="flex items-center gap-2.5 hover:text-[#F8F4ED] transition-colors"
            >
              <Mail size={14} strokeWidth={1.5} />
              <span>hello@theheritageedit.pk</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <FooterLinkGroup heading="Quick Links" links={quickLinks} />

        {/* Shop */}
        <FooterLinkGroup heading="Shop" links={shopLinks} />

        {/* Customer Care */}
        <FooterLinkGroup heading="Customer Care" links={customerCareLinks} />
      </div>

      {/* ── Newsletter ── */}
      <div className="max-w-[1400px] mx-auto mt-16 border-t border-[#E8DED0]/10 pt-12">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-heading text-2xl text-[#F8F4ED] mb-2">
            Join the Heritage Circle
          </h3>
          <p className="text-sm text-[#E8DED0]/60 mb-6">
            Be the first to know about exclusive launches, limited editions,
            and members-only offers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border border-[#E8DED0]/30 text-[#F8F4ED] placeholder-[#E8DED0]/50 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#E8DED0]/60 transition-colors"
            />
            <button
              type="submit"
              className="bg-[#9B7865] text-[#F8F4ED] px-6 py-3 text-[11px] tracking-[0.15em] uppercase font-body font-medium rounded-sm hover:bg-[#49352F] transition-colors"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <p className="mt-4 text-sm text-[#9B7865]">
              Thank you for subscribing — welcome to the circle.
            </p>
          )}
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="max-w-[1400px] mx-auto border-t border-[#E8DED0]/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DED0]/50">
        <span>&copy; 2024 The Heritage Edit. All rights reserved.</span>

        <div className="flex items-center gap-3">
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="border border-[#E8DED0]/20 rounded-sm px-2.5 py-1 text-[10px] tracking-wide uppercase"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
