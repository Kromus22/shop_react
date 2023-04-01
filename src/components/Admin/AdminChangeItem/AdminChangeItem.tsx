import { useParams } from "react-router-dom";
import { ProductType } from "../../../types/products";
import { getSingleProductFromLocalStorage } from "../../../utils/localStorageFunks";
import { AdminHeader } from "../AdminHeader/AdminHeader";
import { AdminProduct } from "../AdminProduct/AdminProduct";

export function AdminChangeItem() {
  const id = useParams().id;
  let productObj: { index: number, product: ProductType } | null = null;
  if (id) {
    productObj = getSingleProductFromLocalStorage(id);
  }

  const product = productObj?.product;

  return (
    <div className="admin-page">
      <AdminHeader onAdminMain={false} />
      {product && id ?
        <AdminProduct isEditingProduct={true} product={product} id={id} /> : null
      }
    </div>
  );
}