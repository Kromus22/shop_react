export function PriceBtn(props: { class?: string }) {
  return (
    <button type="button" className={`${props.class ? props.class : ''}`}>
      <span >Прайс-лист</span>
      <img src="./images/icons/download.svg" alt="download" className="pricelist__image" />
    </button>
  );
}