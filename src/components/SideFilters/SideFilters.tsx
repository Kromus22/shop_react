import React, { useLayoutEffect, useState } from "react";
import { FiltersTop } from "../FiltersTop.tsx/FiltersTop";
import { filterFields } from "../../mocks/FilterField";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { resetFilters, setFilters } from "../../store/slices/filterSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setPageTo } from "../../store/slices/paginationSlice";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import { closeDropDown, openDropDown } from "../../store/slices/dropDownSlise";


export function SideFilters(props: { clickHandler: any }) {
  const filters = useTypedSelector(state => state.filters);
  const productInLS = useTypedSelector(state => state.products.list);
  const allManufacturersFromDB = Array.from(new Set(productInLS.map(product => product.manufacturer)));

  const [minValue, setMinValue] = useState<string>(filters.price_min);
  const [maxValue, setMaxValue] = useState<string>(filters.price_max);
  const [manufacturerInput, setManufacturerInput] = useState('');
  const [allManufacturers, setAllManufacturers] = useState(allManufacturersFromDB);
  const [allShown, setAllShown] = useState(false);
  const [maxShownItems, setMaxShownItems] = useState(4);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(filters.manufacturersList);

  const areProductsLoading = useTypedSelector(state => state.products.status) === 'loading';
  const isDropDownOpen = useTypedSelector(state => state.dropDown.isOpen);
  const [formTop, setFormTop] = useState<number | null>(null);

  const [width, height] = useWindowSize();

  useLayoutEffect(() => {
    if (width > 768) {
      dispatch(closeDropDown());
    }
  }, [width]);

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  function handlePriceChange(e: { target: HTMLInputElement }) {
    const name = e.target.name;
    const valueStr = e.target.value;

    if (name === 'price_min') {
      setMinValue(valueStr);
    } else if (name === 'price_max') {
      setMaxValue(valueStr);
      if (minValue && minValue > valueStr) {
        setMinValue(valueStr);
      }
    }
  }

  function handleManufacturerChange(e: { target: HTMLInputElement }) {
    const value = e.target.value;
    setManufacturerInput(value);
    setAllManufacturers(allManufacturersFromDB.filter(item => item.toLowerCase().includes(value.toLowerCase())))
  }

  function handleShowHideClick(e: React.MouseEvent<HTMLParagraphElement>) {
    setAllShown(!allShown);
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const changedValue = e.target.value;
    const newSelectedManufacturers = [...selectedManufacturers];
    if (selectedManufacturers.includes(changedValue)) {
      const index = newSelectedManufacturers.findIndex(el => el === changedValue);
      newSelectedManufacturers.splice(index, 1);
      setSelectedManufacturers(newSelectedManufacturers);
    } else {
      setSelectedManufacturers([...selectedManufacturers, changedValue]);
    }
  }

  function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setFilters({ list: selectedManufacturers, price_min: minValue, price_max: maxValue }));
    dispatch(setPageTo(1));
    navigate("/");
    dispatch(closeDropDown());
  }

  function handleFiltersReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(resetFilters());
    setManufacturerInput('');
    setAllShown(false);
    setSelectedManufacturers([]);
    setMinValue('');
    setMaxValue('');
    dispatch(closeDropDown());
  }

  function handleDropDown(e: React.MouseEvent<HTMLHeadElement>) {
    if (width <= 768) {
      setFormTop((e.target as HTMLHeadElement).getBoundingClientRect().bottom + 15);
      isDropDownOpen ? dispatch(closeDropDown()) : dispatch(openDropDown());
    }
  }

  return (
    <div className="catalog-content__sidebar sidebar">
      {areProductsLoading ? null :
        <h1 onClick={handleDropDown} className={`sidebar__title ${isDropDownOpen ? 'open' : ''}`}>
          <span>Подбор по параметрам</span>
          {width <= 768 ? <div className={`image-box ${isDropDownOpen ? 'reverse' : ''}`}>
            <img src="./images/icons/arrow_down.svg" alt="arrow_down" />
          </div> : null
          }
        </h1>
      }
      <form className={`sidebar__form ${isDropDownOpen ? 'open' : ''}`} onSubmit={handleFilterSubmit}
        onReset={handleFiltersReset} style={{ top: formTop + 'px' }}>
        <div className="sidebar__price">
          <label htmlFor="price-min">Цена <span> ₸</span></label>
          <div className="sidebar__price_inputs-box">
            <input min={0} type="number" onChange={handlePriceChange}
              value={minValue} placeholder='0'
              name="price_min" id="price-min" />
            <span>-</span>
            <input min={0} type="number" onChange={handlePriceChange} value={maxValue} placeholder='10 000'
              name="price_max" id="price-max" />
          </div>
        </div>
        <div className="sidebar__manufacturer">
          <label htmlFor="manufacturer">Производитель</label>
          <input type="text" value={manufacturerInput} placeholder="Поиск..." onChange={handleManufacturerChange}
            name="manufacturer" id="manufacturer" />
          <ul>
            {allManufacturers.map((item, index) => {
              return (
                <li key={index} className={(index >= maxShownItems && !allShown) ? 'hide' : ''}>
                  <input type="checkbox" id={`manufacturer_${item}`} onChange={handleCheckboxChange}
                    name="manufacturers" value={item} checked={selectedManufacturers.includes(item)} />
                  <label htmlFor={`manufacturer_${item}`}>{item}</label>
                </li>
              );
            })}
          </ul>
          {allManufacturers.length > maxShownItems ?
            <p className="sidebar__manufacturer_show-hide" onClick={handleShowHideClick}>
              {allShown ? "Свернуть" : "Показать всё"}
            </p> : null}
        </div>
        <div className="sidebar__controls">
          <button type="submit" className="sidebar__submit">Показать</button>
          <button type="reset" className="sidebar__reset">
            <img src="./images/icons/bin.svg" alt="bin" />
          </button>
        </div>
      </form>
      <FiltersTop list={filterFields} clickHandler={props.clickHandler} className='sidebar__filters-top' />
    </div>
  );
}