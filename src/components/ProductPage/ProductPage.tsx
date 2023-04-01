import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useWindowSize } from "../../hooks/useWindowSize";
import { addProductToCart } from "../../store/slices/cartSlice";
import { sizeTypes } from "../../types/products";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { CartBtn } from "../CartBtn/CartBtn";

export function ProductPage() {
  const params = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const product = useTypedSelector(state => state.products.list).find(product => product.barcode === params.id);
  const [width] = useWindowSize();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [addToCartMessage, setAddToCartMessage] = useState(false);

  const handleDescriptionClick = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  }

  const handleCharacteristicsClick = () => {
    setIsCharacteristicsOpen(!isCharacteristicsOpen);
  }

  const handleIncrease = () => {
    setCount(count + 1);
  }

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const handleAddToCartClick = () => {
    if (addToCartMessage !== true) {
      dispatch(addProductToCart({
        product: product,
        quantity: count
      }));
      setAddToCartMessage(true);
      setTimeout(() => {
        setAddToCartMessage(false);
        setCount(1);
      }, 1500);
    }
  }

  let sizeIconURL = `./images/icons/size_${product?.sizeType}.svg`;
  if (product) {
    return (
      <div>
        <Breadcrumbs page='product' productName={product.title + ' ' + product.description} />
        <div className="product-page">
          <div className="container">
            <div className="product-page__row">
              <div className="product-page__full-product full-product">
                <div className="full-product__image-box">
                  <img src={product.image_url} alt={`product-${product.barcode}`} />
                </div>
                <div className="full-product__info">
                  <div className="full-product__in-stock-status">В наличии</div>
                  <div className="full-product__title">
                    <span>{product.title}.</span> {product.description}
                  </div>
                  <div className="full-product__size">
                    <img src={sizeIconURL} alt='size icon' />
                    <p>{product.size} {product.sizeType === sizeTypes.volume ? 'мл' : 'г'}</p>
                  </div>
                  <div className="full-product__purchase-block">
                    <div className="full-product__price">
                      {product.price.toString().replace('.', ',')} руб.
                    </div>
                    <div className="full-product__quantity quantity">
                      <button type="button" onClick={handleDecrease} className="quantity__decrease">-</button>
                      <div className="quantity__count">{count}</div>
                      <button type="button" onClick={handleIncrease} className="quantity__increase">+</button>
                    </div>
                    {width > 600 ? <CartBtn clickHandler={handleAddToCartClick} /> : null}
                    {addToCartMessage ? <div className="full-product__message">
                      Товар добавлен в корзину в количестве: {count} шт.
                    </div> : null
                    }
                  </div>
                  <div className="full-product__add-info add-info">
                    {width <= 600 ? <CartBtn clickHandler={handleAddToCartClick} /> : null}
                    <button type="button" className="add-info__share">
                      <img src="./images/icons/share.svg" alt="share" />
                    </button>
                    <div className="add-info__free-delivery">
                      При покупке от <span>10 000 ₸</span> бесплатная доставка по Кокчетаву и области
                    </div>
                    <button className="add-info__pricelist">
                      <span>Прайс-лист</span>
                      <img src="./images/icons/download_black.svg" alt="download" />
                    </button>
                  </div>
                  <div className="full-product__params params">
                    <div className="params__param params__manufacturer">
                      Производитель: <span>{product.manufacturer}</span>
                    </div>
                    <div className="params__param params__brand">
                      Бренд: <span>{product.brand}</span>
                    </div>
                    <div className="params__param params__vendor">
                      Артикул: <span>{product.barcode.slice(0, 6)}</span>
                    </div>
                    <div className="params__param params__barcode">
                      Штрихкод: <span>{product.barcode}</span>
                    </div>
                  </div>
                  <div className="full-product__description">
                    <h2 onClick={handleDescriptionClick}>
                      <span>Описание</span>
                      <img src="./images/icons/triangle_down.svg" alt="triangle" />
                    </h2>
                    <div className={`${isDescriptionOpen ? 'shown' : ''}`}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo,
                      vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis.
                      Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis.
                      Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
                    </div>
                  </div>
                  <div className="full-product__characteristics">
                    <h2 onClick={handleCharacteristicsClick}>
                      <span>Характеристики</span>
                      <img src="./images/icons/triangle_down.svg" alt="triangle" />
                    </h2>
                    <ul className={`${isCharacteristicsOpen ? 'shown' : ''}`} >
                      <li className="params__param">Штрихкод: <span>{product.barcode}</span></li>
                      <li className="params__param">Бренд: <span>{product.brand}</span></li>
                      <li className="params__param">Производитель: <span>{product.manufacturer}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-page">
        Товара не найдено.
      </div>
    )
  }
}