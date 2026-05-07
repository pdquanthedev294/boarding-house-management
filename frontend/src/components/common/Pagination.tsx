import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Button
        variant="outline"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Trước
      </Button>

      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? "bg-violet-600" : ""}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Sau
      </Button>
    </div>
  );
};

export default Pagination;