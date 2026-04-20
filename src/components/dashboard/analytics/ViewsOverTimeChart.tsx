"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTranslation } from "react-i18next";

type Props = {
  data: { day: string; views: number }[];
};

const ViewsOverTimeChart = ({ data }: Props) => {
  const { t } = useTranslation("dashboard");
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
        {t("analytics.charts.views_over_time")}
      </h3>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              opacity={0.4}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "13px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "#a1a1aa" }}
              labelFormatter={(label) => `${tCommon("time.day")} ${label}`}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v
              }
            />

            <Area
              type="monotone"
              dataKey="views"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#viewsGrad)"
              dot={{ r: 4, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{
                r: 6,
                fill: "#6366f1",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViewsOverTimeChart;
