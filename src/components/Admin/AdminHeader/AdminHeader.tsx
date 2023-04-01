import { Link } from "react-router-dom";


export function AdminHeader(props: { onAdminMain: boolean }) {

  return (
    <div className="admin-page__header">
      <div className="container">
        <div className="header-admin">
          <ul>
            <li>
              <Link to="/admin-page-create">Добавить новый товар</Link>
            </li>
            {props.onAdminMain ? null : <li><Link to="/admin-page">Админка</Link></li>}
            <li className="to-right">
              <Link to="/">Вернуться в магазин</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}