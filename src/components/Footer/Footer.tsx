import { useLocation } from 'react-router-dom';
import { List } from "../List/List";
import { Logo } from "../Logo/Logo";
import { PriceBtn } from "../PriceBtn/PriceBtn";
import { Contacts } from '../Contacts/Contacts';
import { MailLink } from "../MailLink/MailLink";
import { useTypedSelector } from '../../hooks/useTypedSelector';

export function Footer() {

  const menuLinks: string[] = ["О компании", "Доставка и оплата", "Возврат", "Контакты"];
  const categoryLinks: string[] = ["Бытовая химия", "Косметика и гигиена", "Товары для дома", "Товары для детей и мам", "Посуда"];

  const { pathname } = useLocation();
  const isDropDownOpen = useTypedSelector(state => state.dropDown.isOpen);

  if (pathname.includes('/admin-page') || isDropDownOpen) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row">
          <div className="footer__subscribe-logo">
            <Logo class='footer-logo' isWhite={true} />
            <p className="footer__company-description">
              Компания «Султан» — снабжаем розничные магазины товарами <span>"под ключ"</span> в Кокчетаве и Акмолинской области
            </p>
            <div className="footer__subscribe subscribe-footer">
              <p className="subscribe-footer__title">Подпишись на скидки и акции</p>
              <form className="subscribe-footer__form">
                <input type="text" className='subscribe-footer__input' placeholder='Введите ваш E-mail' />
                <button className="subscribe-footer__submit">
                  <img src="./images/icons/arrow-right.svg" alt="arrow-right" />
                </button>
              </form>
            </div>
          </div>
          <div className="footer__lists">
            <List class='footer-list' list={menuLinks} title="Меню сайта: " />
            <List class='footer-list' list={categoryLinks} title="Категории: " />
          </div>
          <div className="footer__messengers-pricelist messengers-pricelist">
            <div className="messengers-pricelist__pricelist">
              <h3>Скачать прайс-лист:</h3>
              <PriceBtn class='footer-pricelist' />
            </div>
            <div className="messengers-pricelist__messengers messengers">
              <h3 className="messengers__title">Связь в мессенджерах:</h3>
              <div className="messengers__buttons">
                <button className='messengers__whatsapp'>
                  <img src="./images/icons/whatsapp.svg" alt="whatsapp" />
                </button>
                <button className='messengers__telegram'>
                  <img src="./images/icons/telegram.svg" alt="telegram" />
                </button>
              </div>
            </div>
          </div>
          <div className="footer__contacts contacts">
            <h3 className="contacts__title">Контакты:</h3>
            <Contacts isMobile={false} class='contacts' />
            <MailLink image={false} class='contacts' />
            <div className="contacts__cards">
              <a href="/">
                <img src="./images/icons/visa.svg" alt="visa" />
              </a>
              <a href="/">
                <img src="./images/icons/masterCard.svg" alt="masterCard" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}