import { useState } from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { Review } from '../../types';
import { Link } from 'react-router-dom';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="bg-card border border-border rounded-sm p-6 flex flex-col justify-between h-full shadow-2xs hover:shadow-xs transition-shadow">
      <div>
        {/* Header: Customer Name & Verified Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-heading text-base text-charcoal font-medium">
              {review.customerName}
            </span>
            {review.isVerified && (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-xs font-body font-medium">
                <CheckCircle size={10} /> Verified Order
              </span>
            )}
          </div>
          <span className="text-[11px] text-warm-grey/70 font-body">
            {review.date}
          </span>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mt-2 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-champagne'}
            />
          ))}
        </div>

        {/* Review Title & Body */}
        <h4 className="font-body text-sm font-semibold text-charcoal mt-3 leading-snug">
          &ldquo;{review.title}&rdquo;
        </h4>
        <p className="font-body text-xs md:text-sm text-warm-grey leading-relaxed mt-2">
          {review.content}
        </p>

        {/* Customer Photo if available */}
        {review.hasPhoto && review.photoUrl && (
          <div className="mt-3.5">
            <img
              src={review.photoUrl}
              alt="Customer product photo"
              className="w-16 h-20 rounded-xs object-cover border border-border/80 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Footer: Purchased Product & Helpful */}
      <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-body text-warm-grey">
        <Link
          to={`/product/${review.productId}`}
          className="text-mocha hover:text-charcoal hover:underline truncate max-w-[200px]"
        >
          Suit: {review.productName}
        </Link>

        <button
          type="button"
          onClick={handleHelpful}
          className={`flex items-center gap-1.5 transition-colors ${
            hasVoted ? 'text-mocha font-semibold' : 'text-warm-grey hover:text-charcoal'
          }`}
          aria-label="Mark review as helpful"
        >
          <ThumbsUp size={12} className={hasVoted ? 'fill-mocha' : ''} />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>
    </div>
  );
}
