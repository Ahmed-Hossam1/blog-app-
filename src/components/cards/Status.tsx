import React from "react";
import { IconType } from "react-icons";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
}) => {
  return (
    <div className="relative group overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-zinc-200 dark:border-zinc-800">
      {/* Background Gradient Blob */}
      <div
        className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {value}
            </h3>
            {trend && (
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.isUp
                  ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30"
                  : "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30"
                  }`}
              >
                {trend.isUp ? "+" : "-"}{trend.value}%
              </span>
            )}
          </div>
        </div>

        <div
          className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          <Icon size={28} />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
        <span>Updated just now</span>
        <div className="flex -space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
