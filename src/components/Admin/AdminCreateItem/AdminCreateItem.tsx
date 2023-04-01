import { AdminHeader } from "../AdminHeader/AdminHeader";
import { AdminProduct } from "../AdminProduct/AdminProduct";


export function AdminCreateItem() {

  return (
    <div className="admin-page">
      <AdminHeader onAdminMain={false} />
      <AdminProduct isEditingProduct={false} product={null} id={null} />
    </div>
  );
}