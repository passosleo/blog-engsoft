import { ChevronLeft, ChevronRight } from "lucide-react";

export type CustomPaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function CustomPagination({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  return (
    <div className="flex items-center justify-center gap-5 my-5 select-none">
      <div className="w-6">
        <ChevronLeft
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          className={isFirstPage ? "opacity-50" : "cursor-pointer"}
        />
      </div>

      <div>
        <span>{currentPage + 1 + " / " + totalPages}</span>
      </div>

      <div className="w-6">
        <ChevronRight
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          className={isLastPage ? "opacity-50" : "cursor-pointer"}
        />
      </div>
    </div>
  );
}
