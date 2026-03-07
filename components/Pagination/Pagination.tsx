"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={totalPages}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      activeLinkClassName={css.activeLink}
      previousClassName={css.previous}
      nextClassName={css.next}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      disabledClassName={css.disabled}
      previousLabel="Previous"
      nextLabel="Next"
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      breakLabel="..."
    />
  );
}
