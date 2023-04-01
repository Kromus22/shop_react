import { Link } from "react-router-dom";


export function Breadcrumbs(props: { page: string, productName?: string }) {

  const main = props.page === 'main' ? <li className="breadcrumbs__item">Главная</li> :
    <li className="breadcrumbs__item"><Link to='/'>Главная</Link></li>;
  const catalog = props.page === 'catalog' ? <li className="breadcrumbs__item">Каталог</li> :
    <li className="breadcrumbs__item"><Link to='/'>Каталог</Link></li>;
  const product = props.page === 'product' ? <li className="breadcrumbs__item">{props.productName}</li> : null;
  const cart = props.page === 'cart' ? <li className="breadcrumbs__item">Корзина</li> : null;

  return (
    <div className="content__breadcrumbs breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {main}
          {catalog}
          {product}
          {cart}
        </ul>
      </div>
    </div>
  );
}