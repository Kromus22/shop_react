import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProductType } from "../../../types/products";

export function AdminItemList(props: { product: ProductType }) {
  const { product } = props;
  const dispatch = useDispatch();

  function handleRemoveProduct() {
    dispatch({ type: 'removeProductFromLocalStorage', payload: product.barcode });
  }

  return (
    <li className="content-admin__item item-admin">
      <div className="item-admin__image-box">
        <img src={product.image_url} alt="product" />
      </div>
      <div className="item-admin__info">
        <div className="info-admin__title">{product.title}</div>
        <div className="info-admin__description">{product.description}</div>
        <div className="info-admin__barcode">{product.barcode}</div>
        <div className="info-admin__price">Цена: <span>{product.price}</span> руб.</div>
      </div>
      <div className="item-admin__controls controls-admin">
        <ul className="controls-admin__list">
          <li>
            <button onClick={handleRemoveProduct}>Удалить товар</button>
          </li>
          <li>
            <Link to={`/admin-page/edit-product/${product.barcode}`}>Изменить данные о товаре</Link>
          </li>
        </ul>
      </div>
    </li>
  );
}