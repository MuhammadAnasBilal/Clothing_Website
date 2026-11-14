import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center bg-ivory">
      <span className="text-[11px] uppercase tracking-[0.25em] font-body font-semibold text-burgundy block mb-2">
        Error 404 · Uncharted Archive
      </span>
      <h1 className="font-heading text-5xl sm:text-7xl text-charcoal font-normal">
        Page Not Located
      </h1>
      <p className="mt-4 text-xs sm:text-sm text-warm-grey font-body max-w-md leading-relaxed">
        The textile page or collection you are seeking may have moved or been retired to our private heritage vaults.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-mocha text-ivory hover:bg-charcoal text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors shadow-2xs"
        >
          <ArrowLeft size={14} />
          Return to Sanctuary
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 border border-border bg-card hover:bg-champagne/40 text-charcoal text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors"
        >
          Explore Catalog
        </Link>
      </div>
    </div>
  );
}
