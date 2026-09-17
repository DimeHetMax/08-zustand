// import ReactPaginateModule from "react-paginate";
import ReactPaginate from "react-paginate";
// import type { ReactPaginateProps } from "react-paginate";
// import type { ComponentType } from "react";
import css from "./Pagination.module.css"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (number: number)=>void
}
// type ModuleWithDefault<T> = { default: T };

// const ReactPaginate = (
//   ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
// ).default;
const Pagination = ({ totalPages, setPage, currentPage }: PaginationProps) => {
  const handlePageClick =({ selected }: { selected: number })=>{
       setPage(selected+1)
  }
  return (
    <ReactPaginate
      className={css.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      disabledClassName={css.disabled}
      previousLabel="<"
      renderOnZeroPageCount={null}
      activeClassName={css.active}
    />
  );
};

export default Pagination;
