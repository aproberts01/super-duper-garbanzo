import React from "react";
import Pagination from "react-bootstrap/Pagination";

type PaginationProps = {
  handlePageChange: (params: { direction?: string; page?: number }) => void;
  paginationStartNumber: number;
  currentPage: number;
  lastPage: number;
  paginationArray: number[];
};

const ListPagination: React.FC<PaginationProps> = ({
  handlePageChange,
  paginationStartNumber,
  currentPage,
  lastPage,
  paginationArray,
}) => {
  return (
    <div className="my-4 d-flex justify-content-center">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() =>
            handlePageChange({
              direction: "prev",
              page: currentPage - 1,
            })
          }
        />
        {paginationStartNumber === lastPage + 1 - paginationArray.length && (
          <>
            <Pagination.Item
              onClick={() =>
                handlePageChange({
                  page: 1,
                })
              }
            >
              1
            </Pagination.Item>
            <Pagination.Ellipsis />
          </>
        )}
        {paginationArray.map((page: number) => (
          <Pagination.Item
            onClick={() => handlePageChange({ page })}
            active={currentPage === page}
            key={page}
          >
            {page}
          </Pagination.Item>
        ))}
        {paginationStartNumber !== lastPage + 1 - paginationArray.length && (
          <>
            <Pagination.Ellipsis />
            <Pagination.Item
              active={currentPage === lastPage}
              onClick={() =>
                handlePageChange({
                  page: lastPage,
                })
              }
            >
              {lastPage}
            </Pagination.Item>
          </>
        )}
        <Pagination.Next
          disabled={currentPage === lastPage}
          onClick={() =>
            handlePageChange({
              direction: "next",
              page: currentPage + 1,
            })
          }
        />
      </Pagination>
    </div>
  );
};

export default ListPagination;
