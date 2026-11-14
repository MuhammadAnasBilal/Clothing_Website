import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '../data/products';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export function CollectionsPage() {
  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Collections' },
          ]}
        />
        <div className="mt-4 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-2">
            The Heritage Archives
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-charcoal font-normal">
            Seasonal Curations
          </h1>
          <p className="mt-3 text-sm text-warm-grey font-body leading-relaxed">
            Every collection represents a distinct textile chapter—from breezy summer lawn prints to heavily hand-embroidered festive formals and velvet winter heirlooms.
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group relative flex flex-col bg-card border border-border rounded-sm overflow-hidden shadow-2xs hover:shadow-md transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-champagne">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                
                {col.season && (
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] font-body font-semibold px-3 py-1 bg-ivory/90 backdrop-blur-sm text-charcoal rounded-full">
                    {col.season}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory">
                  <span className="text-xs tracking-[0.16em] uppercase font-body font-medium">
                    {col.productCount} Unstitched Designs
                  </span>
                  <div className="w-9 h-9 rounded-full bg-ivory/20 backdrop-blur-md flex items-center justify-center group-hover:bg-ivory group-hover:text-charcoal transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <h3 className="font-heading text-2xl text-charcoal font-medium group-hover:text-burgundy transition-colors">
                  {col.name}
                </h3>
                <p className="mt-2 text-xs text-warm-grey font-body leading-relaxed line-clamp-2">
                  {col.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-body font-semibold uppercase tracking-[0.14em] text-mocha group-hover:text-burgundy">
                  <span>Explore Collection</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
