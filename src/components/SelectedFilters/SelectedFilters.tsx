import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterFields } from "../../mocks/FilterField";

export function SelectedFilters() {
  const filters = useTypedSelector(state => state.filters);
  const { careTypes, manufacturersList, price_max, price_min } = filters;

  return (
    <div className="catalog-content__selected-filters selected-filters">
      {careTypes.length > 0 ?
        <div className="selected-filters__care-types">
          <h2>типы ухода: </h2>
          <ul>
            {careTypes.map(careType => {
              const index = filterFields.findIndex(item => item.value === careType);
              return <li key={careType}>{filterFields[index].title.toLowerCase()};</li>
            })}
          </ul>
        </div> : null
      }
      <div className="selected-filters__others">
        {manufacturersList.length > 0 ?
          <div className="selected-filters__manufacturer">
            <h2>производители: </h2>
            <ul>
              {manufacturersList.map(manufacturer => <li key={manufacturer} >{manufacturer};</li>)}
            </ul>
          </div> : null
        }
        {price_max !== '' || price_min !== '' ?
          <div className="selected-filters__prices">
            {price_min !== '' ?
              <div className="selected-filters__price">
                минимальная цена: <span>{price_min} ₸;</span>
              </div> : null
            }
            {price_max !== '' ?
              <div className="selected-filters__price">
                максимальная цена: <span>{price_max} ₸</span>
              </div> : null
            }
          </div> : null
        }
      </div>
    </div>
  );
}