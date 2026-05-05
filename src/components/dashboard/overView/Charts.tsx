"use client";

import { IPerformanceData } from "@/types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type Props = {
  title?: string;
  description?: string;
  data: IPerformanceData[];
};

interface ICustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    name: string;
    payload: IPerformanceData;
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: ICustomTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          {value}{" "}
          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
            Blogs
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const Charts = ({ title, description, data }: Props) => {
  return (
    <div className="group w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-100 dark:border-zinc-800/50 hover:border-indigo-500/30 transition-all duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 rounded-full border border-indigo-100 dark:border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">
            Live Data
          </span>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorBlogs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              className="text-zinc-100 dark:text-zinc-800"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#6366f1",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
            />
            <Area
              type="monotone"
              dataKey="blogs"
              stroke="#6366f1"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorBlogs)"
              animationBegin={0}
              animationDuration={2000}
              animationEasing="ease-in-out"
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: "#6366f1",
                className: "shadow-lg",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
