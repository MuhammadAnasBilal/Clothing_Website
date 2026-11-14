import { useState, FormEvent } from 'react';
import { useToast } from '../../context/ToastContext';
import { Mail, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubscribed(true);
    showToast('Welcome to The Heritage Circle! Your invitation has been dispatched.');
    setEmail('');
  };

  return (
    <section className="bg-[#EAE0D3] py-20 md:py-28 px-6 border-y border-border/80">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-[11px] uppercase tracking-[0.22em] font-body font-semibold text-mocha/80 block mb-3">
          Curated Private Access
        </span>
        <h2 className="font-heading text-3xl md:text-5xl text-charcoal font-normal tracking-wide">
          Join The Heritage Circle
        </h2>
        <p className="mt-3.5 text-xs md:text-sm text-warm-grey leading-relaxed max-w-lg mx-auto font-body">
          Be the first to preview seasonal unstitched lawn drops, private festive previews, and bespoke styling edits from our master ateliers.
        </p>

        {isSubscribed ? (
          <div className="mt-8 p-4 bg-ivory rounded-sm border border-mocha/30 inline-flex items-center gap-2.5 text-xs font-body text-mocha">
            <CheckCircle2 size={16} className="text-emerald-700" />
            <span>Thank you for subscribing. You have been added to our private register.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-ivory/90 border border-border px-4 py-3 text-xs md:text-sm font-body text-charcoal rounded-xs placeholder:text-warm-grey/60 focus:outline-none focus:border-mocha transition-colors"
              />
              <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-warm-grey/60" />
            </div>
            <button
              type="submit"
              className="bg-mocha text-ivory px-7 py-3 text-[11px] tracking-[0.18em] uppercase font-body font-medium rounded-xs hover:bg-charcoal transition-colors whitespace-nowrap shadow-xs"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-[10px] text-warm-grey/80 tracking-wider uppercase font-body">
          Complimentary priority shipping · No spam · Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
