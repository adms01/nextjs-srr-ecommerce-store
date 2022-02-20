import React from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import router from "next/router";

interface Props {
  count: number;
}

export const Pagination = ({ count }: Props) => {
  const onPageChangeHandler = (e: { selected: number }) => {
    const page = e.selected + 1;
    router.push(`?page=${page}`);
  };

  const pageCount = Math.min(count / 20);

  return (
    <S.Pagination>
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={onPageChangeHandler}
        breakClassName={"break-me"}
        containerClassName={"pagination"}
        activeClassName={"active"}
        disabledClassName={"disabled"}
        pageRangeDisplayed={pageCount}
        marginPagesDisplayed={5}
      />
    </S.Pagination>
  );
};

const S: any = {};

S.Pagination = styled.div`
  .pagination {
    margin: 25px auto;
    display: flex;
    list-style: none;
    outline: none;
    border: 1px solid #d5d9d9;
    white-space: nowrap;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
    background-color: #fff;
  }

  .pagination > li > a {
    padding: 5px 20px;
    height: 100%;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;
    color: #0f1111;
    line-height: 46px;
  }

  .pagination > .active {
    border: 1px solid black;
  }

  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    /* background-color: #febd69; */
    /* border: 1px solid black; */
    outline: none;
    color: #0f1111;
  }
  .pagination > li > a,
  .pagination > li > span {
    color: black;
  }
  .pagination > li:first-child > a,
  .pagination > li:first-child > span,
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-radius: unset;
  }

  .disabled a {
    color: #6f7373 !important;
    cursor: default !important;
  }
`;
