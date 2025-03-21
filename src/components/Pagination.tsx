"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const generatePages = () => {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(currentPage - half, 0);
      const end = Math.min(start + maxVisiblePages, totalPages);

      if (totalPages - end > 0) {
        start = Math.max(end - maxVisiblePages, 0);
      }

      return Array.from({ length: end - start }, (_, i) => start + i);
    };

    setPages(generatePages());
  }, [currentPage, totalPages, maxVisiblePages]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        aria-label="Próxima página"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}