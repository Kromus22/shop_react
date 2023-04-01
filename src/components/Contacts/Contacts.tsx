export function Contacts(props: { isMobile: boolean, class?: string }) {
  return (
    <div className={`${props.class}__info`}>
      {props.isMobile ? <p className={`${props.class}__sales-dep`}>Отдел продаж</p> : null}
      <a href="tel:+77774900091" className={`${props.class}__phone-number`}>+7 (777) 490-00-91</a>
      <p className={`${props.class}__work-times`}>время работы: <span>9:00-20:00</span></p>
      <a href="tel:+77774900091" className={`${props.class}__call`}>
        {props.isMobile ?
          <div className={`${props.class}__images-box`}>
            <img src="./images/icons/phone_white.svg" alt="phone" className={`${props.class}__call-image`} />
          </div> : null
        }
        <span>Заказать звонок</span>
      </a>
    </div>
  );
}