import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    // this.product = product;
    this.elem = this.render(product);
  }

  render (product) {
    let divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.innerHTML = `<div class="card__top">
    <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
    <span class="card__price">€${product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
    <div class="card__title">${product.name}</div>
    <button type="button" class="card__button">
    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button></div>`;

    this.customClick(divCard, product.id);

    return divCard;
  }

  customClick(elem, id) {
    elem.querySelector (".card__button");
    elem.addEventListener ('click', event => {
      event.target.closest (".card").dispatchEvent (new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      }))
    })
  }
}
