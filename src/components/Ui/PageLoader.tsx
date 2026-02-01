"use client";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-white">
      <span className="text-5xl font-bold animate-fade-scale">Blogy</span>

      {/* animation */}
      <style jsx>{`
        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        .animate-fade-scale {
          animation: fadeScale 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
