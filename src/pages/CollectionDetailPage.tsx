import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { collections, products } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export function CollectionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-ivory">
        <h1 className="font-heading text-4xl text-charcoal">Collection Not Found</h1>
        <p className="mt-3 text-sm text-warm-grey font-body">
          The requested collection could not be located in our archives.
        </p>
        <Link
          to="/collections"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-mocha text-ivory text-xs uppercase tracking-[0.16em] font-body rounded-sm"
        >
          <ArrowLeft size={14} /> Back to Collections
        </Link>
      </div>
    );
  }

  const collectionProducts = products.filter(
    (product) => product.collection === collection.id
  );

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Collections', href: '/collections' },
            { label: collection.name },
          ]}
        />

        <div className="mt-8 relative overflow-hidden rounded-sm bg-charcoal text-ivory min-h-[320px] flex items-end p-8 md:p-14 shadow-md">
          {/* Background image with tint */}
          <div className="absolute inset-0 z-0">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover brightness-[0.6] scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl">
            {collection.season && (
              <span className="text-[10px] uppercase tracking-[0.22em] font-body font-semibold px-3 py-1 bg-ivory/20 backdrop-blur-md rounded-full text-champagne inline-block mb-3">
                {collection.season} Edition
              </span>
            )}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-ivory font-normal leading-tight">
              {collection.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-champagne/90 font-body leading-relaxed max-w-xl">
              {collection.description}
            </p>
            <div className="mt-4 text-xs uppercase tracking-[0.16em] font-body text-champagne font-medium">
              {collectionProducts.length} Exclusive Unstitched Designs
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-mocha font-body font-semibold hover:text-burgundy"
          >
            <ArrowLeft size={14} /> All Collections
          </Link>
          <span className="text-xs text-warm-grey font-body">
            Displaying {collectionProducts.length} Designs
          </span>
        </div>

        <ProductGrid products={collectionProducts} />
      </div>
    </div>
  );
}
