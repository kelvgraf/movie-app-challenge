import { Icons } from "@/components/icons/icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2));

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Botão anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
      >
        <Icons size={28} name="ArrowLeftIcon" color="var(--mauve-dark-12)" />
      </button>

      {/* Páginas */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "bg-gray-900 text-white"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
      >
        <Icons size={28} name="ArrowRightIcon" color="var(--mauve-dark-12)" />
      </button>
    </div>
  );
}

export { Pagination };
