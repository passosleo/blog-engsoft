import { Pageable } from "@/types/generic";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  pathname: string;
};

export function usePagination(
  pathname: string,
  { page = 1, size = 5 }: Partial<Pageable> = {}
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(Array.from(searchParams.entries()));

  const [pagination, setPagination] = useState<Pageable>({
    page: Number(query.get("page")) || page,
    size: Number(query.get("size")) || size,
  });

  function onPaginate(page: number) {
    setPagination((prev) => ({ ...prev, page }));
    router.replace(`${pathname}?page=${page}&size=${pagination.size}`);
  }

  return {
    pagination,
    onPaginate,
  };
}
