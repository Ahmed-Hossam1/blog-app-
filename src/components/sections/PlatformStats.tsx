"use client";
import { useTranslation } from "react-i18next";
import { HiOutlineDocumentText, HiOutlineUsers, HiOutlineEye, HiOutlineChartBar } from "react-icons/hi2";

const PlatformStats = () => {
  const { t } = useTranslation("home");

  const stats = [
    {
      id: 1,
      label: t("stats.blogs"),
      value: "120+",
      icon: <HiOutlineDocumentText className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: 2,
      label: t("stats.authors"),
      value: "40+",
      icon: <HiOutlineUsers className="w-8 h-8 text-purple-600" />,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      id: 3,
      label: t("stats.reads"),
      value: "3K+",
      icon: <HiOutlineEye className="w-8 h-8 text-orange-600" />,
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-surface-secondary/50 rounded-3xl border border-gray-100 dark:border-gray-800 my-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <HiOutlineChartBar className="text-3xl text-primary" />
          <h2 className="text-3xl font-bold dark:text-white">
            {t("stats.title") || "Platform Stats"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center p-6 transition-transform hover:scale-105">
              <div className={`p-4 rounded-2xl ${stat.bgColor} mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
