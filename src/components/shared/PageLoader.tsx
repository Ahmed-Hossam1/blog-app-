"use client";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white dark:bg-surfaceDark">
      <span className="text-5xl font-bold animate-[fadeScale_2s_ease-in-out_infinite] dark:text-white">
        Blogy
      </span>
    </div>
  );
};

export default PageLoader;
