import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { products, collections } from '../data/products';
import { FilterState, Product } from '../types';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductGrid } from '../components/product/ProductGrid';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SortDropdown } from '../components/ui/SortDropdown';

const INITIAL_FILTERS: FilterState = {
  priceRange: [0, 45000],
  fabricTypes: [],
  categories: [],
  collections: [],
  colors: [],
  pieces: [],
  embroideryTypes: [],
  seasons: [],
  availability: [],
  occasions: [],
  onSale: false,
  newArrivals: false,
  bestSellers: false,
};

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync URL search params to initial state
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    const collectionParam = searchParams.get('collection');
    const categoryParam = searchParams.get('category');
    const occasionParam = searchParams.get('occasion');
    const fabricParam = searchParams.get('fabric');

    setFilters(prev => {
      const next = { ...prev };
      if (filterParam === 'new') next.newArrivals = true;
      if (filterParam === 'bestsellers') next.bestSellers = true;
      if (filterParam === 'sale') next.onSale = true;
      if (collectionParam) {
        const found = collections.find(c => c.slug === collectionParam);
        if (found && !next.collections.includes(found.id)) {
          next.collections = [found.id];
        }
      }
      if (categoryParam && !next.categories.includes(categoryParam)) {
        next.categories = [categoryParam];
      }
      if (occasionParam && !next.occasions.includes(occasionParam)) {
        next.occasions = [occasionParam];
      }
      if (fabricParam && !next.fabricTypes.includes(fabricParam)) {
        next.fabricTypes = [fabricParam];
      }
      return next;
    });
  }, [searchParams]);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // Price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      // Fabric types
      if (filters.fabricTypes.length > 0 && !filters.fabricTypes.includes(product.fabricType)) {
        return false;
      }
      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      // Collections
      if (filters.collections.length > 0 && !filters.collections.includes(product.collection)) {
        return false;
      }
      // Colors
      if (filters.colors.length > 0) {
        const productHasColor = product.colors.some(c => filters.colors.includes(c.name));
        if (!productHasColor) return false;
      }
      // Pieces
      if (filters.pieces.length > 0 && !filters.pieces.includes(product.pieces)) {
        return false;
      }
      // Seasons
      if (filters.seasons.length > 0 && !filters.seasons.includes(product.season)) {
        return false;
      }
      // Occasions
      if (filters.occasions.length > 0) {
        const matchesOccasion = product.occasion.some(occ => filters.occasions.includes(occ));
        if (!matchesOccasion) return false;
      }
      // Boolean flags
      if (filters.onSale && (!product.discount || product.discount <= 0)) {
        return false;
      }
      if (filters.newArrivals && !product.isNewArrival) {
        return false;
      }
      if (filters.bestSellers && !product.isBestseller) {
        return false;
      }
      return true;
    });
  }, [filters]);

  // Sort products logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return list.filter(p => p.isNewArrival).concat(list.filter(p => !p.isNewArrival));
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'best-selling':
        return list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      case 'highest-rated':
        return list.sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Unstitched Catalog' },
          ]}
        />
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-normal tracking-tight leading-[0.98]">
              All Unstitched Collections
            </h1>
            <p className="mt-3 text-sm sm:text-base text-warm-grey font-body max-w-xl">
              Immerse yourself in handpicked Pakistani lawn, chiffon, cambric, and organza ensembles. Each design accompanied by authentic embroidery and fabric details.
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.16em] text-mocha font-body font-medium">
            Showing {sortedProducts.length} of {products.length} Designs
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Mobile controls bar */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-champagne/50 hover:bg-champagne text-charcoal rounded-sm text-xs uppercase tracking-[0.14em] font-semibold font-body transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
          <div className="w-48">
            <SortDropdown value={sortBy} onChange={setSortBy} className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onClear={handleClearFilters}
              productCount={sortedProducts.length}
            />
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {/* Desktop Sort Header */}
            <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-border/60">
              <span className="text-xs text-warm-grey font-body">
                Curated Pakistani Unstitched Luxury
              </span>
              <div className="w-56">
                <SortDropdown value={sortBy} onChange={setSortBy} className="w-full" />
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={sortedProducts}
              onClearFilters={handleClearFilters}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <ProductFilters
        filters={filters}
        onFilterChange={setFilters}
        onClear={handleClearFilters}
        productCount={sortedProducts.length}
        isMobileOpen={isMobileFiltersOpen}
        onMobileClose={() => setIsMobileFiltersOpen(false)}
      />
    </div>
  );
}
