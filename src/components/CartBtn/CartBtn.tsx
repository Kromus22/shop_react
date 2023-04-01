export function CartBtn(props: { clickHandler: any }) {
  return (
    <button type='button' onClick={props.clickHandler} className="full-product__cart-button">
      <span>В корзину</span>
      <img src="./images/icons/cart_white.svg" alt="cart" />
    </button>
  );
}