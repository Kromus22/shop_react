import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import { filterFields } from "../../../mocks/FilterField";
import { ProductType } from "../../../types/products";
import { getProductsFromLocalStorage } from "../../../utils/localStorageFunks";

interface PropsType {
  product: ProductType | null,
  id: string | null,
  isEditingProduct: boolean
}

export function AdminProduct(props: PropsType) {
  const { product, id } = props;
  const edit = props.isEditingProduct;

  const selectOptions = filterFields.map(item => {
    return { label: item.title, value: item.value }
  });
  const defaultValue = selectOptions.filter(item => product?.careTypes.includes(item.value));

  const dispatch = useDispatch();
  const [careTypes, setCareTypes] = useState<{ value: string, label: string }[]>(edit ? defaultValue : []);
  const navigate = useNavigate();

  function handleSelectChange(option: any) {
    setCareTypes(option);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value;
    const manufacturer = ((e.target as HTMLFormElement)[1] as HTMLInputElement).value;
    const imageURL = ((e.target as HTMLFormElement)[2] as HTMLInputElement).value;
    const description = ((e.target as HTMLFormElement)[3] as HTMLInputElement).value;
    const price = +((e.target as HTMLFormElement)[4] as HTMLInputElement).value;
    const sizeType = ((e.target as HTMLFormElement)[5] as HTMLInputElement).checked ? 'weight' : 'volume';
    const size = +((e.target as HTMLFormElement)[7] as HTMLInputElement).value;
    const brand = ((e.target as HTMLFormElement)[8] as HTMLInputElement).value;
    const correctCareTypes = careTypes.map(el => el.value);

    if (edit) {
      dispatch({
        type: 'changeProductInLocalStorage', payload: {
          barcode: product?.barcode,
          data: {
            title,
            manufacturer,
            imageURL,
            description,
            price,
            sizeType,
            size,
            brand,
            careTypes: correctCareTypes
          }
        }
      });
    } else {
      const productsFromLS: ProductType[] = getProductsFromLocalStorage();
      const barcodes = productsFromLS.map(item => +item.barcode);
      const newBarcode = Math.max(...barcodes) + 1;


      dispatch({
        type: 'createProductInLocalStorage', payload: {
          barcode: newBarcode.toString(),
          data: {
            title,
            manufacturer,
            imageURL,
            description,
            price,
            sizeType,
            size,
            brand,
            careTypes: correctCareTypes
          }
        }
      });
    }
    navigate('/admin-page');
  }


  return (
    <div className="admin-page__change">
      <div className="container">
        <div className="change-admin">
          {edit ?
            <div className="change-admin__title">
              Изменение данных о товаре <span>№{id}</span>
            </div> :
            <div className="change-admin__title">
              Создание нового товара
            </div>
          }
          <div className="change-admin__product product-admin">
            <form onSubmit={handleSubmit} className="product-admin__form">
              <div className="product-admin__group product-admin__group_title">
                <label htmlFor="title">Название</label>
                <input type="text" id="title" name='title' defaultValue={edit ? product?.title : ''} required />
              </div>
              <div className="product-admin__group product-admin__group_manufacturer">
                <label htmlFor="manufacturer">Производитель</label>
                <input type="text" id="manufacturer" name='manufacturer'
                  defaultValue={edit ? product?.manufacturer : ''} required />
              </div>
              <div className="product-admin__group product-admin__group_image-url">
                <label htmlFor="image-url">URL картинки</label>
                <input type="text" id="image-url" name='image-url'
                  defaultValue={edit ? product?.image_url : ''} required />
              </div>
              <div className="product-admin__group product-admin__group_description">
                <label htmlFor="description">Описание</label>
                <textarea id="description" name='description'
                  defaultValue={edit ? product?.description : ''} required>

                </textarea>
              </div>
              <div className="product-admin__group product-admin__group_price">
                <label htmlFor="price">Цена (в руб.)</label>
                <input type="number" id="price" name='price'
                  defaultValue={edit ? product?.price : ''} required />
              </div>
              <div className="product-admin__group product-admin__group_sizeType">
                <label htmlFor="sizeType">Тип размера</label>
                <div className="sizeType__type">
                  <input type="radio" id="sizeType1" defaultChecked={edit ? product?.sizeType === 'weight' : true}
                    name='sizeType' value='weight' />
                  <label htmlFor="sizeType_weight">Масса в граммах</label>
                </div>
                <div className="sizeType__type">
                  <input type="radio" id="sizeType2" defaultChecked={edit ? product?.sizeType === 'volume' : false}
                    name='sizeType' value='volume' />
                  <label htmlFor="sizeType_volume">Объём в миллилитрах</label>
                </div>
              </div>
              <div className="product-admin__group product-admin__group_size">
                <label htmlFor="size">Размер</label>
                <input type="number" id="size" name='size' defaultValue={edit ? product?.size : ''} required />
              </div>
              <div className="product-admin__group product-admin__group_brand">
                <label htmlFor="brand">Бренд</label>
                <input type="text" id="brand" name='brand' defaultValue={edit ? product?.brand : ''} required />
              </div>
              <div className="product-admin__group product-admin__group_caretypes">
                <label htmlFor="caretypes">Типы ухода</label>
                <Select
                  name="careTypes"
                  options={selectOptions}
                  isMulti={true}
                  value={careTypes}
                  required
                  onChange={handleSelectChange}
                />
              </div>
              <div className="product-admin__group product-admin__group_controls">
                <button type="submit">{edit ? 'Принять изменения' : "Создать товар"}</button>
                <button type="reset">{edit ? "Сбросить изменения" : "Очистить поля"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}