import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs font-body ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5 text-warm-grey">
        <li>
          <Link to="/" className="hover:text-mocha transition-colors">
            Home
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight size={12} strokeWidth={1.5} className="text-warm-grey/60" />
              {isLast || !item.href ? (
                <span className="text-charcoal font-medium truncate max-w-[200px] md:max-w-[320px]">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-mocha transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
