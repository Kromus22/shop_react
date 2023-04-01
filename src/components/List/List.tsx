import { Link } from "react-router-dom";

export function List(props: { class?: string, list: string[], singleClass?: string, title: string }) {

  return (
    <div className={`${props.class} ${props.singleClass ? props.singleClass : ''}`}>
      <h2 className={`${props.class}__title`}>{props.title}</h2>
      <ul className={`${props.class}__list`}>
        {props.list.map((item, index) => {
          return (
            <li key={index} className={`${props.class}__item`}>
              <Link to='/' className={`${props.class}__link`}>{item}</Link>
            </li>
          );
        })}
        <li className={`${props.class}__item`} >
          <Link className={`${props.class}__link`} to='/admin-page'>Админка</Link>
        </li>
      </ul>
    </div>
  );
}