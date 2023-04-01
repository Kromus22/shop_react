import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Product } from "../Product/Product";

export function ProductsList() {
  const productsState = useTypedSelector(state => state.products);
  const productsToShow = productsState.pageList;
  const status = productsState.status;

  const emptyResult = productsToShow.length === 0 ?
    <div className="products__empty">Выбранных товаров нет.</div> : null;

  const result = status === 'loading' ? <div className="catalog-content__loading">Пожалуйста подождите.</div> :
    <div className="catalog-content__products products">
      {productsToShow.length !== 0 ?
        <ul className="products__list">
          {productsToShow.map(item => <Product key={item.barcode} product={item} />)}
        </ul> : null
      }

      {emptyResult}
    </div>

  return result;
}