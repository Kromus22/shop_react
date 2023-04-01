export function MailLink(props: { image: boolean, class?: string }) {
  return (
    <a href="mailto:opt.sultan@mail.ru" className={`${props.class}__mail mail`}>
      {props.image ? <img src="./images/icons/mail.svg" alt="mail" className="mail__icon" /> : null}
      <div className="mail__email">
        <p className="bold">opt.sultan@mail.ru</p>
        <p>На связи в любое время</p>
      </div>
    </a>
  );
}