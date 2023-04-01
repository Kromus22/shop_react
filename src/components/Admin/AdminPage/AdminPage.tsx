import { ProductType } from "../../../types/products";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminHeader } from "../AdminHeader/AdminHeader";
import { AdminMain } from "../AdminMain/AdminMain";


export function AdminPage() {
  const allProducts: ProductType[] = useTypedSelector(state => state.products.list);

  return (
    <div className="admin-page">
      <AdminHeader onAdminMain={true} />
      <AdminMain allProducts={allProducts} />
    </div>
  );
}