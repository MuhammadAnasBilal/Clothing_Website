import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MapPin, Phone, Mail, Clock, ArrowRight, Award, Compass, HeartHandshake, Sparkles } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Our Story & Craft' },
          ]}
        />
        <div className="mt-4 max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.25em] font-body font-semibold text-burgundy block mb-2">
            The Philosophy of The Heritage Edit
          </span>
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-charcoal font-normal leading-[0.98] tracking-tight">
            Where Pakistani Artistry Meets Modern Discretion
          </h1>
          <p className="mt-6 text-base sm:text-xl text-warm-grey font-body leading-relaxed font-light max-w-3xl mx-auto">
            Founded with the belief that true luxury resides in the intimacy of unstitched fabric, tailored specifically for the woman who wears it.
          </p>
        </div>
      </div>

      {/* Editorial Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-14">
        <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-sm overflow-hidden bg-charcoal shadow-xl">
          <img
            src="/images/hero_bridal.jpg"
            alt="Artisans weaving textiles"
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 max-w-xl text-ivory">
            <span className="text-[10px] uppercase tracking-[0.2em] font-body font-medium text-champagne block mb-2">
              Lahore & Multan Craft Clusters
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-normal text-ivory">
              "Every thread preserves an artisan’s lineage."
            </h2>
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-4xl mx-auto px-6 mt-20">
        <div className="space-y-6 text-warm-grey font-body text-base sm:text-lg leading-relaxed">
          <p className="first-letter:text-5xl first-letter:font-heading first-letter:float-left first-letter:mr-3 first-letter:text-charcoal">
            The Heritage Edit was established to honor the historic textile legacies of South Asia. For centuries, our region’s weavers, dyers, and embroiderers clothed nobility in fabrics so light they were dubbed <em>baft hawa</em> (woven wind).
          </p>
          <p>
            In an era dominated by mass-produced, identical ready-to-wear fast fashion, we champion the unstitched suit as the highest form of personalized luxury. When you purchase an unstitched 3-piece suit, you become the creative director of your own garment. You decide the neckline, the sleeve cut, the daman length, and the trouser silhouette.
          </p>
          <p>
            We work directly with master craftspeople across Multan, Bahawalpur, Lahore, and Karachi. We select premium combed Swiss lawn, pure crinkle chiffon, handloom organza, and artisanal velvets, embellishing each panel with authentic zardozi, gota, tilla, and fine resham threadwork.
          </p>
        </div>
      </div>

      {/* Craftsmanship Pillars */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-taupe block mb-2">
            Techniques & Traditions
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl text-charcoal font-normal">
            Four Pillars of Our Atelier
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-card border border-border rounded-sm p-6 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-12 h-12 rounded-full bg-champagne/40 flex items-center justify-center text-burgundy mb-5">
              <Sparkles size={22} />
            </div>
            <h3 className="font-heading text-xl text-charcoal font-medium">Zardozi & Tilla Handwork</h3>
            <p className="mt-2 text-xs text-warm-grey font-body leading-relaxed">
              Centuries-old metallic wire embroidery crafted by master artisans using genuine gold and silver toned metallic threads and delicate pearls.
            </p>
          </div>

          <div className="bg-card border border-border rounded-sm p-6 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-12 h-12 rounded-full bg-champagne/40 flex items-center justify-center text-burgundy mb-5">
              <Award size={22} />
            </div>
            <h3 className="font-heading text-xl text-charcoal font-medium">Combed Swiss Lawn</h3>
            <p className="mt-2 text-xs text-warm-grey font-body leading-relaxed">
              Spun from ultra-long staple cotton yarns to deliver unparalleled softness, breathability, and drape in the intense South Asian summers.
            </p>
          </div>

          <div className="bg-card border border-border rounded-sm p-6 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-12 h-12 rounded-full bg-champagne/40 flex items-center justify-center text-burgundy mb-5">
              <Compass size={22} />
            </div>
            <h3 className="font-heading text-xl text-charcoal font-medium">Chikankari & Shadow-Work</h3>
            <p className="mt-2 text-xs text-warm-grey font-body leading-relaxed">
              Delicate, micro-stitch needlework creating subtle floral shadows on sheer voiles and cambric cotton panels.
            </p>
          </div>

          <div className="bg-card border border-border rounded-sm p-6 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-12 h-12 rounded-full bg-champagne/40 flex items-center justify-center text-burgundy mb-5">
              <HeartHandshake size={22} />
            </div>
            <h3 className="font-heading text-xl text-charcoal font-medium">Ethical Artisan Lineage</h3>
            <p className="mt-2 text-xs text-warm-grey font-body leading-relaxed">
              Fair-wage compensation, clean atelier workrooms, and preservation of rare embroidery skills passed down through generational families.
            </p>
          </div>
        </div>
      </div>

      {/* Flagship Ateliers (PLACEHOLDER DATA) */}
      <div className="max-w-7xl mx-auto px-6 mt-28 pt-20 border-t border-border">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-taupe block mb-2">
            Physical Presence
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl text-charcoal font-normal">
            Visit Our Flagship Salons
          </h2>
          <p className="mt-2 text-xs text-warm-grey font-body">
            Experience our fabric archives in person and consult with our master stylists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Atelier 1: Lahore (PLACEHOLDER DATA) */}
          <div className="bg-champagne/30 border border-border rounded-sm p-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-2">
              Flagship Atelier
            </span>
            <h3 className="font-heading text-2xl text-charcoal font-medium">Lahore — Gulberg III</h3>
            <p className="mt-3 text-xs text-warm-grey font-body leading-relaxed flex items-start gap-2">
              <MapPin size={16} className="text-mocha shrink-0 mt-0.5" />
              <span>{/* PLACEHOLDER ADDRESS */}Plot 42-B, M.M. Alam Road, Gulberg III, Lahore, Pakistan</span>
            </p>
            <p className="mt-2 text-xs text-warm-grey font-body flex items-center gap-2">
              <Phone size={14} className="text-mocha shrink-0" />
              <span>{/* PLACEHOLDER PHONE */}+92 42 3578 9901</span>
            </p>
            <p className="mt-2 text-xs text-warm-grey font-body flex items-center gap-2">
              <Clock size={14} className="text-mocha shrink-0" />
              <span>Mon – Sat: 11:00 AM – 10:00 PM</span>
            </p>
          </div>

          {/* Atelier 2: Karachi (PLACEHOLDER DATA) */}
          <div className="bg-champagne/30 border border-border rounded-sm p-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-2">
              Coastal Salon
            </span>
            <h3 className="font-heading text-2xl text-charcoal font-medium">Karachi — Clifton</h3>
            <p className="mt-3 text-xs text-warm-grey font-body leading-relaxed flex items-start gap-2">
              <MapPin size={16} className="text-mocha shrink-0 mt-0.5" />
              <span>{/* PLACEHOLDER ADDRESS */}Block 4, Marine Promenade, Clifton, Karachi, Pakistan</span>
            </p>
            <p className="mt-2 text-xs text-warm-grey font-body flex items-center gap-2">
              <Phone size={14} className="text-mocha shrink-0" />
              <span>{/* PLACEHOLDER PHONE */}+92 21 3584 7720</span>
            </p>
            <p className="mt-2 text-xs text-warm-grey font-body flex items-center gap-2">
              <Clock size={14} className="text-mocha shrink-0" />
              <span>Mon – Sun: 12:00 PM – 11:00 PM</span>
            </p>
          </div>

          {/* Atelier 3: Islamabad (PLACEHOLDER DATA) */}
          <div className="bg-champagne/30 border border-border rounded-sm p-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-2">
              Capital Sanctuary
            </span>
            <h3 className="font-heading text-2xl text-charcoal font-medium">Islamabad — F-7</h3>
            <p className="mt-3 text-xs text-warm-grey font-body leading-relaxed flex items-start gap-2">
              <MapPin size={16} className="text-mocha shrink-0 mt-0.5" />
              <span>{/* PLACEHOLDER ADDRESS */}Jinnah Super Market, Sector F-7 Markaz, Islamabad, Pakistan</span>
            </p>
            <p className="mt-2 text-xs text-warm-grey font-body flex items-center gap-2">
              <Phone size={14} className="text-mocha shrink-0" />
              <span>{/* PLACEHOLDER PHONE */}+92 51 2650 3410</span>
            </p>
            <p className="mt-2 text-xs text-warm-grey font-body flex items-center gap-2">
              <Clock size={14} className="text-mocha shrink-0" />
              <span>Mon – Sat: 11:00 AM – 9:00 PM</span>
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-24 text-center">
        <div className="bg-charcoal text-ivory rounded-sm p-12 sm:p-16">
          <h2 className="font-heading text-3xl sm:text-5xl font-normal">
            Experience Unstitched Luxury
          </h2>
          <p className="mt-3 text-sm text-champagne/80 font-body max-w-lg mx-auto">
            Discover our latest collection of Swiss lawn, pure organza, and hand-embroidered 3-piece masterworks.
          </p>
          <div className="mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-ivory text-charcoal hover:bg-champagne font-body text-xs uppercase tracking-[0.18em] font-semibold rounded-sm transition-colors"
            >
              Explore Unstitched Catalog
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
