import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Scissors } from 'lucide-react';
import { products, collections, reviews, occasionCollections } from '../data/products';
import { HangingRail } from '../components/sections/HangingRail';
import { ProductGrid } from '../components/product/ProductGrid';
import { ReviewCard } from '../components/ui/ReviewCard';
import { Newsletter } from '../components/ui/Newsletter';

export function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'lawn' | 'festive' | 'formals'>('all');

  // Filter products for New Arrivals tab
  const filteredNewArrivals = products.filter(p => {
    if (activeTab === 'lawn') return p.category.toLowerCase().includes('lawn');
    if (activeTab === 'festive') return p.category.toLowerCase().includes('festive');
    if (activeTab === 'formals') return p.category.toLowerCase().includes('formal');
    return p.isNewArrival || p.isFeatured;
  }).slice(0, 8);

  const bestSellers = products.filter(p => p.isBestseller).slice(0, 6);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-ivory">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-charcoal text-ivory">
        {/* Background Image with subtle zoom and editorial tint */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bridal.jpg"
            alt="The Heritage Edit — Luxury Pakistani Unstitched Fashion"
            className="w-full h-full object-cover object-center brightness-[0.70] scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-champagne/15 backdrop-blur-md border border-champagne/25 text-champagne mb-8"
          >
            <Sparkles size={14} className="text-champagne" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-body font-medium">
              The Heritage Edit · Unstitched Luxury '24
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] tracking-tight leading-[0.92] max-w-6xl font-normal"
          >
            Heirloom Artistry, <br />
            <span className="italic font-light text-champagne">Woven Without Bounds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg text-champagne/80 font-body max-w-2xl leading-relaxed font-light"
          >
            Experience the finest Pakistani Swiss lawn, pure organza, and zardozi craftsmanship. 
            Three-piece unstitched masterworks crafted for those who define personal elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/shop?filter=new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-ivory text-charcoal hover:bg-champagne transition-all duration-300 font-body text-xs tracking-[0.18em] uppercase font-semibold rounded-sm shadow-md"
            >
              Explore Collection
              <ArrowRight size={14} />
            </Link>
            <a
              href="#boutique-rail"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 border border-champagne/40 text-ivory hover:bg-champagne/10 transition-all duration-300 font-body text-xs tracking-[0.18em] uppercase font-medium rounded-sm backdrop-blur-sm"
            >
              Interactive Closet Rail
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-8 border-t border-champagne/20 text-center"
          >
            <div>
              <div className="font-heading text-2xl sm:text-3xl text-champagne">100% Pure</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-champagne/70 font-body mt-1">Swiss & Cambric Lawn</div>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl text-champagne">Hand-Embroidered</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-champagne/70 font-body mt-1">Zardozi & Tilla Art</div>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl text-champagne">Free Delivery</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-champagne/70 font-body mt-1">All Over Pakistan</div>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl text-champagne">3-Piece Sets</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-champagne/70 font-body mt-1">Shirt · Dupatta · Trouser</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div className="bg-mocha text-ivory py-3.5 border-y border-border overflow-hidden whitespace-nowrap select-none">
        <div className="flex animate-marquee items-center gap-8 text-[11px] font-body tracking-[0.25em] uppercase font-medium">
          <span>• AUTHENTIC PAKISTANI ATELIER WEAVE</span>
          <span>• COMPLIMENTARY EXPRESS DISPATCH OVER RS. 5,000</span>
          <span>• 3-PIECE UNSTITCHED HEIRLOOM COLLECTIONS</span>
          <span>• PURE SWISS LAWN & SILK CHIFFON DUPATTAS</span>
          <span>• CASH ON DELIVERY ACROSS ALL CITIES</span>
          <span>• AUTHENTIC PAKISTANI ATELIER WEAVE</span>
          <span>• COMPLIMENTARY EXPRESS DISPATCH OVER RS. 5,000</span>
          <span>• 3-PIECE UNSTITCHED HEIRLOOM COLLECTIONS</span>
          <span>• PURE SWISS LAWN & SILK CHIFFON DUPATTAS</span>
          <span>• CASH ON DELIVERY ACROSS ALL CITIES</span>
        </div>
      </div>

      {/* SIGNATURE 3D BOUTIQUE CLOTHES RAIL */}
      <section id="boutique-rail" className="py-24 md:py-36 bg-[#F4EFEB] border-b border-border/80 relative">
        <div className="max-w-7xl mx-auto px-6 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] font-body font-semibold text-burgundy block mb-3">
              Signature Interactive Wardrobe · 3D Atelier Closet
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-normal tracking-tight leading-[0.98]">
              The Boutique Rail
            </h2>
            <p className="mt-4 text-sm sm:text-base text-warm-grey font-body max-w-2xl leading-relaxed">
              Garments hang perpendicular in wardrobe profile. Hover over any design to lift it from the rack, swing it facing front, and reveal its complete stitched silhouette.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-mocha hover:text-burgundy transition-colors font-body"
          >
            Explore Complete Wardrobe
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* The 3D Rail Component */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <HangingRail products={products.slice(0, 8)} />
        </div>
      </section>

      {/* CURATED COLLECTIONS EDITORIAL GRID */}
      <section className="py-24 md:py-36 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] font-body font-semibold text-taupe block mb-3">
            Seasonal Curations
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-normal tracking-tight leading-[0.98]">
            Collections of Distinction
          </h2>
          <p className="mt-4 text-sm sm:text-base text-warm-grey font-body max-w-xl mx-auto">
            From breezy summer lawns to heavily hand-embellished festive bridals, explore the distinct fabric stories of Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.slice(0, 6).map((col, idx) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group relative overflow-hidden bg-champagne aspect-[4/5] rounded-sm block shadow-2xs hover:shadow-md transition-all duration-500"
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-ivory">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-body bg-ivory/20 backdrop-blur-md px-3 py-1 rounded-full text-ivory font-medium">
                    {col.season || 'Collection'}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-ivory/15 backdrop-blur-md flex items-center justify-center group-hover:bg-ivory group-hover:text-charcoal transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-ivory font-normal group-hover:text-champagne transition-colors">
                    {col.name}
                  </h3>
                  <p className="mt-2 text-xs text-champagne/80 font-body line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-body tracking-[0.16em] uppercase text-champagne font-medium">
                    <span>{col.productCount} Unstitched Designs</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS SPOTLIGHT WITH TABS */}
      <section className="py-20 md:py-28 bg-[#FBF9F5] border-t border-border/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-2">
                Fresh From The Atelier
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
                New Arrivals
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Curations' },
                { id: 'lawn', label: 'Summer Lawn' },
                { id: 'festive', label: 'Festive Edit' },
                { id: 'formals', label: 'Luxury Formals' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.14em] font-body font-medium rounded-full transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-charcoal text-ivory shadow-xs'
                      : 'bg-champagne/40 text-charcoal hover:bg-champagne'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={filteredNewArrivals} />

          <div className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-mocha text-ivory hover:bg-charcoal transition-colors font-body text-xs tracking-[0.18em] uppercase font-semibold rounded-sm shadow-xs"
            >
              View Complete Catalog
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* EDITORIAL SPLIT CAMPAIGN — "THE ART OF UNSTITCHED" */}
      <section className="py-24 md:py-36 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden rounded-sm shadow-xl bg-champagne">
                <img
                  src="/images/model_emerald.jpg"
                  alt="Pakistani Textile Craftsmanship — Emerald Suit"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-64 aspect-[3/4] overflow-hidden rounded-sm shadow-2xl border-4 border-ivory bg-champagne">
                <img
                  src="/images/fabric_rose.jpg"
                  alt="Intricate Embroidered Chiffon Detail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-5 lg:pl-6">
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.3em] font-body font-semibold text-taupe block mb-3">
                The Heritage Atelier
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal font-normal leading-[1.05] tracking-tight">
                Why Unstitched Is The Ultimate Luxury
              </h2>
              <div className="mt-6 space-y-4 text-warm-grey text-sm sm:text-base font-body leading-relaxed">
                <p>
                  In Pakistani fashion, an unstitched suit is a blank canvas. It grants complete freedom: tailored to your bespoke measurements, adorned with your preferred neckline, sleeve length, and silhouette.
                </p>
                <p>
                  Every piece in The Heritage Edit is woven from 100% genuine high-thread-count cotton lawn and paired with pure silk, chiffon, or organza dupattas, embellished with traditional hand-embroidered borders.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-border">
                <div className="flex items-start gap-3">
                  <Scissors className="text-burgundy mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-heading text-lg text-charcoal font-medium">Bespoke Fit</h4>
                    <p className="text-xs text-warm-grey font-body mt-0.5">Tailor exactly to your proportions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-burgundy mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-heading text-lg text-charcoal font-medium">Authentic Fabrics</h4>
                    <p className="text-xs text-warm-grey font-body mt-0.5">Swiss lawn, tilla, organza & velvet</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-mocha hover:text-burgundy transition-colors font-body"
                >
                  Discover Our Atelier Heritage
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="py-20 md:py-28 bg-[#F4EFEB] border-y border-border/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-2">
                Most Revered By Our Patrons
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
                Bestselling Masterpieces
              </h2>
            </div>
            <Link
              to="/shop?filter=bestsellers"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-mocha hover:text-burgundy transition-colors font-body"
            >
              View All Best Sellers
              <ArrowRight size={14} />
            </Link>
          </div>

          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* SHOP BY OCCASION */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-taupe block mb-2">
              Curated Moments
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
              Shop by Occasion
            </h2>
            <p className="mt-3 text-sm text-warm-grey font-body">
              Whether celebrating Eid, attending an opulent wedding, or embracing daily grace.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {occasionCollections.map((occ) => (
              <Link
                key={occ.slug}
                to={`/shop?occasion=${encodeURIComponent(occ.name)}`}
                className="group flex flex-col items-center text-center p-4 bg-champagne/30 rounded-sm hover:bg-champagne/70 transition-all duration-300 border border-border/60"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-border group-hover:border-mocha transition-colors shadow-2xs">
                  <img
                    src={occ.image}
                    alt={occ.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-heading text-base sm:text-lg text-charcoal font-medium group-hover:text-burgundy transition-colors">
                  {occ.name}
                </h4>
                <p className="text-[11px] text-warm-grey font-body mt-0.5 line-clamp-1">
                  {occ.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND VALUES & PROMISES */}
      <section className="py-16 bg-ivory border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <Truck className="text-mocha shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-heading text-lg text-charcoal font-medium">Free Delivery Across Pakistan</h4>
                <p className="text-xs text-warm-grey font-body mt-1">Complimentary expedited shipping on all orders over Rs. 5,000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-mocha shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-heading text-lg text-charcoal font-medium">100% Authentic Guarantee</h4>
                <p className="text-xs text-warm-grey font-body mt-1">Direct from master weavers with genuine unstitched fabric certificates</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <RefreshCw className="text-mocha shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-heading text-lg text-charcoal font-medium">Hassle-Free 7-Day Exchange</h4>
                <p className="text-xs text-warm-grey font-body mt-1">Uncut and unaltered fabrics can be exchanged seamlessly</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Sparkles className="text-mocha shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-heading text-lg text-charcoal font-medium">Cash On Delivery</h4>
                <p className="text-xs text-warm-grey font-body mt-1">Inspect your parcel at the doorstep before payment across 200+ cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATRON REVIEWS / TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-taupe block mb-2">
                Words From The Heritage Circle
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
                Patron Impressions
              </h2>
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-mocha hover:text-burgundy transition-colors font-body"
            >
              Read All Verified Reviews
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />
    </div>
  );
}
