"use client";
import { useTranslation } from "react-i18next";
import { HiOutlineDocumentText, HiOutlineUsers, HiOutlineEye, HiOutlineChartBar } from "react-icons/hi2";
import { motion, Variants } from "framer-motion";

const PlatformStats = () => {
  const { t } = useTranslation("home");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
  };

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <HiOutlineChartBar className="text-3xl text-primary" />
          <h2 className="text-3xl font-bold dark:text-white">
            {t("stats.title") || "Platform Stats"}
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id} 
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 transition-transform hover:scale-105"
            >
              <div className={`p-4 rounded-2xl ${stat.bgColor} mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStats;
