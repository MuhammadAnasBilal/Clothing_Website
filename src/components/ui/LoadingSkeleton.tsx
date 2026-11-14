export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="aspect-[3/4] bg-champagne/70 rounded-sm w-full" />
      <div className="pt-3.5 space-y-2">
        <div className="h-3 bg-champagne/60 rounded-xs w-1/3" />
        <div className="h-4 bg-champagne/80 rounded-xs w-4/5" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-4 bg-champagne/90 rounded-xs w-1/4" />
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-champagne/80" />
            <div className="w-3.5 h-3.5 rounded-full bg-champagne/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-24 animate-pulse space-y-8">
      <div className="h-4 bg-champagne/60 rounded-xs w-48" />
      <div className="h-10 bg-champagne/80 rounded-xs w-96" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="h-64 bg-champagne/50 rounded-sm" />
        <div className="h-64 bg-champagne/50 rounded-sm" />
        <div className="h-64 bg-champagne/50 rounded-sm" />
      </div>
    </div>
  );
}
