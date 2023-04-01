import { FilterFieldType } from "../../mocks/FilterField";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Props {
  className?: string,
  list: FilterFieldType[],
  clickHandler: any,
  top?: boolean
}

export function FiltersTop(props: Props) {
  const { className, list } = props;

  const filters = useTypedSelector(state => state.filters);

  return (
    <div className={`${className} filters-top`}>
      <ul className={`filters-top__list ${props.top ? 'top-only' : ''}`}>
        {list.map(item => {
          return (
            <li key={item.value} onClick={props.clickHandler} data-value={item.value}
              className={`filters-top__item ${filters.careTypes.includes(item.value) ? '_active-filter' : ''}`}>
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}