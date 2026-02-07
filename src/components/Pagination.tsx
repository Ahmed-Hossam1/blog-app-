"use client";

import Button from "./ui/Button";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handleNext = () => {
    if (!isLastPage) onPageChange(currentPage + 1);
  };

  const handlePrevious = () => {
    if (!isFirstPage) onPageChange(currentPage - 1);
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-6">
      {/* Previous */}
      <Button
        onClick={handlePrevious}
        disabled={isFirstPage}
        className="
          px-3 py-2 text-sm font-medium text-gray-600
          hover:text-black transition
          disabled:text-gray-300 disabled:cursor-not-allowed
        "
      >
        ← Prev
      </Button>

      {/* Page Info */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-semibold text-black">{currentPage}</span>
        <span>/</span>
        <span>{totalPages}</span>
      </div>

      {/* Next */}
      <Button
        onClick={handleNext}
        disabled={isLastPage}
        className="
          px-3 py-2 text-sm font-medium text-gray-600
          hover:text-black transition
          disabled:text-gray-300 disabled:cursor-not-allowed
        "
      >
        Next →
      </Button>
    </div>
  );
};

export default Pagination;
