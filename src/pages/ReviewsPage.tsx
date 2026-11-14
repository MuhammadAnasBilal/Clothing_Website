import { useState, useMemo } from 'react';
import { Star, CheckCircle, Image as ImageIcon, MessageSquare, Plus, X } from 'lucide-react';
import { reviews as initialReviews, products } from '../data/products';
import { Review } from '../types';
import { ReviewCard } from '../components/ui/ReviewCard';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useToast } from '../context/ToastContext';

export function ReviewsPage() {
  const { showToast } = useToast();
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [filter, setFilter] = useState<'all' | 'verified' | 'photos' | 'five-star'>('all');
  const [isWritingReview, setIsWritingReview] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    productId: products[0]?.id || '',
    rating: 5,
    title: '',
    content: '',
  });

  // Calculate statistics
  const totalReviews = reviewsList.length;
  const avgRating = useMemo(() => {
    const sum = reviewsList.reduce((acc, r) => acc + r.rating, 0);
    return (sum / totalReviews).toFixed(1);
  }, [reviewsList, totalReviews]);

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsList.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      counts[star] = (counts[star] || 0) + 1;
    });
    return counts;
  }, [reviewsList]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviewsList.filter((r) => {
      if (filter === 'verified') return r.isVerified;
      if (filter === 'photos') return r.hasPhoto;
      if (filter === 'five-star') return r.rating === 5;
      return true;
    });
  }, [reviewsList, filter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.content.trim() || !formData.title.trim()) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    const matchedProduct = products.find((p) => p.id === formData.productId);

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      customerName: formData.customerName,
      rating: formData.rating,
      date: new Date().toISOString().split('T')[0],
      title: formData.title,
      content: formData.content,
      productName: matchedProduct ? matchedProduct.name : 'The Heritage Edit Design',
      productId: formData.productId,
      isVerified: true,
      hasPhoto: false,
      helpful: 0,
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setIsWritingReview(false);
    showToast('Your review has been verified and published to The Heritage Circle.');
    setFormData({
      customerName: '',
      email: '',
      productId: products[0]?.id || '',
      rating: 5,
      title: '',
      content: '',
    });
  };

  return (
    <div className="min-h-screen bg-ivory pt-4 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-border/80">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Patron Reviews' },
          ]}
        />
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-body font-semibold text-burgundy block mb-2">
              Authentic Patron Feedback
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-charcoal font-normal">
              Words of The Heritage Circle
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-warm-grey font-body max-w-xl">
              Unfiltered reflections from clients who have tailored, worn, and cherished our unstitched lawn, festive, and formal designs across Pakistan.
            </p>
          </div>
          <button
            onClick={() => setIsWritingReview(!isWritingReview)}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-mocha text-ivory hover:bg-charcoal text-xs uppercase tracking-[0.16em] font-body font-semibold rounded-sm transition-colors shadow-xs"
          >
            {isWritingReview ? <X size={15} /> : <Plus size={15} />}
            {isWritingReview ? 'Close Review Form' : 'Write A Review'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* WRITE A REVIEW ACCORDION FORM */}
        {isWritingReview && (
          <div className="mb-14 p-8 bg-card border border-border rounded-sm shadow-md animate-in fade-in duration-300">
            <h2 className="font-heading text-2xl sm:text-3xl text-charcoal font-normal mb-2">
              Share Your Experience
            </h2>
            <p className="text-xs text-warm-grey font-body mb-6">
              Tell our atelier and community how your unstitched fabric performed after tailoring and wear.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Zainab Tariq"
                    className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="zainab@example.com"
                    className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                    Product Reviewed *
                  </label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 text-burgundy transition-transform hover:scale-110"
                    >
                      <Star
                        size={24}
                        fill={star <= formData.rating ? 'currentColor' : 'none'}
                        className={star <= formData.rating ? 'text-burgundy' : 'text-border'}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-body font-medium text-mocha">
                    {formData.rating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Masterpiece quality lawn and radiant tilla work"
                  className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] font-body font-semibold text-charcoal mb-2">
                  Detailed Impression *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share details regarding the fabric breathability, threadwork density, and how well it tailored..."
                  className="w-full px-4 py-2.5 bg-ivory border border-border rounded-sm text-sm font-body text-charcoal focus:outline-none focus:border-mocha"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsWritingReview(false)}
                  className="px-6 py-2.5 border border-border text-charcoal text-xs uppercase tracking-[0.14em] font-body hover:bg-champagne/40 rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-mocha text-ivory text-xs uppercase tracking-[0.16em] font-body font-semibold hover:bg-charcoal rounded-sm shadow-2xs"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STATS & METRICS SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-card border border-border rounded-sm p-8 shadow-2xs">
          {/* Average Rating Block */}
          <div className="md:col-span-4 text-center md:border-r md:border-border md:pr-8">
            <span className="font-heading text-6xl text-charcoal font-medium">
              {avgRating}
            </span>
            <div className="flex justify-center text-burgundy my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-warm-grey font-body">
              Based on {totalReviews} Verified Patron Submissions
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle size={13} /> 100% Genuine Buyers
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="md:col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars as 1 | 2 | 3 | 4 | 5] || 0;
              const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs font-body text-warm-grey">
                  <span className="w-12 font-medium text-charcoal">{stars} Stars</span>
                  <div className="flex-1 h-2 bg-champagne/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-burgundy rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right">{pct}% ({count})</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-12 mb-8 pb-4 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: `All Reviews (${totalReviews})` },
              { id: 'verified', label: 'Verified Purchases' },
              { id: 'photos', label: 'With Visuals' },
              { id: 'five-star', label: '5-Star Praises' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-body uppercase tracking-[0.12em] font-medium transition-all ${
                  filter === f.id
                    ? 'bg-mocha text-ivory shadow-xs'
                    : 'bg-champagne/40 text-charcoal hover:bg-champagne'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-warm-grey font-body">
            Showing {filteredReviews.length} Reviews
          </span>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </div>
    </div>
  );
}
