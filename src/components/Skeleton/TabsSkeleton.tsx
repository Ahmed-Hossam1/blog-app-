const TabsSkeleton = ({ numberOfSkeleton }: { numberOfSkeleton: number }) => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3 animate-pulse">
      {Array.from({ length: Number(numberOfSkeleton) }).map((_, i) => (
        <div key={i} className="h-9 w-24 bg-gray-200 rounded-sm" />
      ))}
    </div>
  );
};

export default TabsSkeleton;
