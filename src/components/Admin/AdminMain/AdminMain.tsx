import { ProductType } from "../../../types/products";
import { AdminItemList } from "../AdminItemList/AdminItemList";


export function AdminMain(props: { allProducts: ProductType[] }) {
  const { allProducts } = props;


  return (
    <div className="admin-page__content">
      <div className="container">
        <div className="content-admin">
          <h1 className="content-admin__title">Все товары</h1>
          <ul className="content-admin__list">
            {allProducts.map(item => <AdminItemList key={item.barcode} product={item} />)}
          </ul>
        </div>
      </div>
    </div>
  );
}