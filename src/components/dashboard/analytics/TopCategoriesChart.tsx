"use client";

type CategoryItem = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: CategoryItem[];
};

const TopCategoriesChart = ({ data }: Props) => {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 h-full">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
        Top Categories Views
      </h3>

      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.name} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {item.name}
              </span>
              <span className="text-sm font-bold text-zinc-900 dark:text-white">
                {item.value}%
              </span>
            </div>
            <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out group-hover:opacity-80"
                style={{
                  width: `${item.value}%`,
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategoriesChart;
