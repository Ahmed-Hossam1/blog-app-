"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: { day: string; comments: number }[];
};

const CommentsActivityChart = ({ data }: Props) => {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
        Comments Activity (Last 30 Days)
      </h3>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <defs>
              <linearGradient id="commentsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
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
              labelFormatter={(label) => `Day ${label}`}
              cursor={{ fill: "rgba(99, 102, 241, 0.08)" }}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              dy={10}
              interval={1}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <Bar
              dataKey="comments"
              fill="url(#commentsGrad)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CommentsActivityChart;
