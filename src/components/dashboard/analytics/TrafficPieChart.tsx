"use client";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type PieItem = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: PieItem[];
};

const TrafficPieChart = ({ data }: Props) => {
  const { t } = useTranslation("dashboard");
  const organicValue = data[0]?.value ?? 0;

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center h-full">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 self-start">
        {t("analytics.charts.traffic_distribution")}
      </h3>

      <div className="relative w-40 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-zinc-900 dark:text-white">
            {organicValue}%
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {t("analytics.charts.labels.organic")}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-5 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {t(`analytics.charts.labels.${item.name.toLowerCase()}`)} {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficPieChart;
