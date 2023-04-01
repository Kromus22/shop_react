import { ProductType } from "../../types/products";
import { CartItem } from "../CartItem/CartItem";


export function CartList(props: { cartInfo: { product: ProductType, quantity: number }[] }) {
  const { cartInfo } = props;

  return (
    <ul className="cart-page__list" >
      {cartInfo.map(item => <CartItem key={item.product.barcode} quantity={item.quantity} product={item.product} />)}
    </ul>
  );
}