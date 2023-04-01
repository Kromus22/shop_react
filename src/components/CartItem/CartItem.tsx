import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductType, sizeTypes } from "../../types/products";
import { changeQuantityInCart, removeProductFromCart } from "../../store/slices/cartSlice";


export function CartItem(props: { product: ProductType, quantity: number }) {

  const { product, quantity } = props;
  const [count, setCount] = useState(quantity);
  const dispatch = useDispatch();
  const sizeIconURL = `./images/icons/size_${product?.sizeType}.svg`;

  const handleIncrease = () => {
    setCount(count + 1);
  }

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart(product.barcode));
  }

  useEffect(() => {
    if (count !== quantity) {
      dispatch(changeQuantityInCart({ barcode: product.barcode, count }));
    }
  }, [count]);

  return (
    <li className="cart-page__item item-cart">
      <div className="item-cart__image-box">
        <img src={product.image_url} alt="Картинка товара" />
      </div>
      <div className="item-cart__info">
        <div className="item-cart__size">
          <img src={sizeIconURL} alt="Иконка ёмкости" />
          <p>{product.size} {product.sizeType === sizeTypes.volume ? 'мл' : 'г'}</p>
        </div>
        <div className="item-cart__title">{product.title}</div>
        <div className="item-cart__description">{product.description}</div>
      </div>
      <div className="item-cart__quantity quantity-cart">
        <button type="button" onClick={handleDecrease} className="quantity-cart__decrease">-</button>
        <div className="quantity-cart__count">{count}</div>
        <button type="button" onClick={handleIncrease} className="quantity-cart__increase">+</button>
      </div>
      <div className="item-cart__prices prices-cart">
        <span className="prices-cart__single-item-price">{product.price}</span>
        <span> x </span>
        <span className="prices-cart__quantity">{quantity}</span>
        <span> = </span>
        <span className="prices-cart__total-price">{product.price * quantity}</span>
        <span className="prices-cart__currency"> ₸</span>
      </div>
      <div className="item-cart__remove-button-box">
        <button type="button" onClick={handleRemoveClick} className="item-cart__remove-button">
          <img src="./images/icons/bin.svg" alt="Корзина" />
        </button>
      </div>
    </li>
  );
}