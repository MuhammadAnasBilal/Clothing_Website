import { ChevronDown } from 'lucide-react';

export interface SortOption {
  label: string;
  value: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Featured Curations', value: 'featured' },
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Selling Suits', value: 'best-selling' },
  { label: 'Highest Rated', value: 'highest-rated' },
];

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function SortDropdown({ value, onChange, className = '' }: SortDropdownProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-card border border-border rounded-xs px-3.5 py-2 pr-9 text-xs font-body text-charcoal hover:border-mocha focus:outline-none focus:border-mocha transition-colors cursor-pointer"
        aria-label="Sort product catalog"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-warm-grey"
      />
    </div>
  );
}
