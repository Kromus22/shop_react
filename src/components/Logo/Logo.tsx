import { Link } from "react-router-dom";

export function Logo(props: { class?: string, isWhite?: boolean }) {
  const src = props.isWhite ? "./images/icons/logo_white.svg" : "./images/icons/logo.svg";

  return (
    <Link to="/" className={`${props.class ? props.class : ''} logo`} >
      <img src={src} alt="logo" className="logo__image" />
    </Link>
  );
}