import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setPageTo } from "../../store/slices/paginationSlice";

export function Pagination() {
  const products = useTypedSelector(state => state.products);
  const pagination = useTypedSelector(state => state.pagination);

  const currentPage = pagination.currentPage;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const numberOfPages = Math.ceil(products.listToShow.length / pagination.visibleProductsNumber);
  const keys = Array.from(Array(numberOfPages).keys());

  const handlePrevClick = () => {
    if (currentPage !== 1) {
      const newPage = currentPage - 1;
      if (newPage === 1) {
        navigate("/");
      } else {
        navigate(`?page=${newPage}`);
        dispatch(setPageTo(newPage));
      }
    }
  }

  const handleNextClick = () => {
    if (currentPage !== numberOfPages) {
      navigate(`?page=${currentPage + 1}`);
      dispatch(setPageTo(currentPage + 1));
    }
  }

  const handleArbitraryPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pageNumber = (e.target as HTMLInputElement).dataset.pageNumber;
    if (pageNumber) {
      if (+pageNumber === 1) {
        navigate("/");
      } else {
        navigate(`/?page=${pageNumber}`);
      }
      dispatch(setPageTo(+pageNumber));
    }
  }

  const result = (<div className="catalog-content__pagination pagination">
    {numberOfPages > 1 ?
      <div className="pagination__row">
        <div className="pagination__prev" onClick={handlePrevClick}>
          <img src="./images/icons/arrow_left_yellow.svg" alt="arrow_left" />
        </div>
        <ul className="pagination__list">
          {keys.map(key => <li className="pagination__item"
            key={key}  >
            <button className={`${currentPage === key + 1 ? "_current" : ''}`} data-page-number={key + 1} onClick={handleArbitraryPageClick}>
              {key + 1}
            </button>
          </li>)}
        </ul>
        <div className="pagination__next" onClick={handleNextClick}>
          <img src="./images/icons/arrow_right_yellow.svg" alt="arrow_right" />
        </div>
      </div> : null
    }
  </div>);

  return products.status === 'loading' ? null : result;
}