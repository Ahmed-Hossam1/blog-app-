const FeaturedCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={`max-w-5xl ${className}`}>
      <div className="relative overflow-hidden rounded-2xl shadow-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse">
        {/* Image */}
        <div className="h-105 w-full bg-zinc-300 dark:bg-zinc-700" />

        {/* Category badge */}
        <div className="absolute right-4 top-4 h-8 w-24 rounded-full bg-zinc-300 dark:bg-zinc-700" />

        {/* Avatar */}
        <div className="absolute left-4 top-4 h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700 border-2 border-white/40" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6">
          {/* Title lines */}
          <div className="space-y-3 mb-6 max-w-xl">
            <div className="h-5 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700" />
            <div className="h-5 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700" />
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
            </div>

            <div className="h-4 w-24 rounded bg-zinc-300 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCardSkeleton;
