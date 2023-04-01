import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTo } from "../../store/slices/paginationSlice";
import { setSortState } from "../../store/slices/sortSlice";

export function Sort() {
  const [selectOption, setSelectOption] = useState('title_asc');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const [sortParam, sortOrder] = selectOption.split('_');
    dispatch(setSortState({ order: sortOrder, param: sortParam }));
    dispatch(setPageTo(1));
    navigate("/");
  }, [selectOption]);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectOption(value);
  }

  return (
    <div className="catalog-content__sort sort-content">
      <form className="sort-content__form">
        <label htmlFor="sort_select" className="sort-content__label">Сортировка: </label>
        <select id="sort_select" className="sort-content__select" onChange={handleSelect} value={selectOption}>
          <option value="title_asc" className="sort-content__option sort-content__option_name-asc">
            по названию (по возрастанию)
          </option>
          <option value="title_desc" className="sort-content__option sort-content__option_name-desc">
            по названию (по убыванию)
          </option>
          <option value="price_asc" className="sort-content__option sort-content__option_price-asc">
            по цене (по возрастанию)
          </option>
          <option value="price_desc" className="sort-content__option sort-content__option_price-desc">
            по цене (по убыванию)
          </option>
        </select>
      </form>
    </div>
  );
}