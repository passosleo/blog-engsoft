import { ChevronLeft, ChevronRight } from "lucide-react";

export type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hideOnSinglePage?: boolean;
  onPageChange: (page: number) => void;
};

export function CustomPagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  hideOnSinglePage = true,
}: CustomPaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  function onPrevPage() {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0 });
    }
  }

  function onNextPage() {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0 });
    }
  }

  if (totalItems === 0 || (totalPages === 1 && hideOnSinglePage)) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-center gap-5 my-5 select-none">
      <div className="w-6">
        <ChevronLeft
          onClick={onPrevPage}
          className={
            isFirstPage
              ? "opacity-25"
              : "cursor-pointer hover:bg-black-secundary rounded-sm"
          }
        />
      </div>

      <div>
        <span>{currentPage + " / " + totalPages}</span>
      </div>

      <div className="w-6">
        <ChevronRight
          onClick={onNextPage}
          className={
            isLastPage
              ? "opacity-25"
              : "cursor-pointer hover:bg-black-secundary rounded-sm"
          }
        />
      </div>
    </div>
  );
}
