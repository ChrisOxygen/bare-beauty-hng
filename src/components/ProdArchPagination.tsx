import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type ProdArchPaginationProps = {
  totalPages: number;
  currentPage: number;
  handleNewPageSelection: (newPage: number) => void;
};

function ProdArchPagination({
  totalPages,
  currentPage,
  handleNewPageSelection,
}: ProdArchPaginationProps) {
  return (
    <div className="pagination-block block">
      <div className="box-container">
        <div className="prod-pagination">
          {currentPage !== 1 && (
            <button
              className="prod-pagination__btn--arrow"
              onClick={() => handleNewPageSelection(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <LuChevronLeft />
            </button>
          )}
          {Array.from(Array(totalPages).keys()).map((page) => (
            <button
              key={page + 1}
              className={`prod-pagination__btn ${
                currentPage === page + 1 ? "prod-pagination__btn--active" : ""
              }`}
              onClick={() => handleNewPageSelection(page + 1)}
            >
              {page + 1}
            </button>
          ))}

          {currentPage !== totalPages && (
            <button
              className="prod-pagination__btn--arrow"
              onClick={() => handleNewPageSelection(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <LuChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProdArchPagination;
