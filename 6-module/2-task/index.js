import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    // this.product = product;
    this.elem = this.render(product);
    // this.product.id = product.id;
    // this.divCard = this.render(product);
    // this.customClick (divCard, this.product.id);
    // this.elem = this.divCard;
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

    this.customClick (divCard, product.id);

    return divCard;
  }

  customClick (elem, id) {
    elem.querySelector (".card__button");
    elem.addEventListener ('click', event => {
      event.target.closest (".card").dispatchEvent (new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      }))

    })
  }
}



// // let event = new Event('product-add', {bubbles: true});
// // elem.dispatchEvent(new CustomEvent ('product-add'), {
// //   detail: this.product.id
// // });


// let divCard = document.createElement ('div');
//     divCard.className = 'card';
//     let divCardTop = document.createElement ('div');
//     divCardTop.className = 'card__top';
//     let divCardBody = document.createElement ('div');
//     divCardBody.className = 'card__body';
//     divCard.appendChild(divCardTop);
//     divCard.appendChild(divCardBody);

//     divCardTop.insertAdjacentHTML('afterbegin', `<img src="/assets/images/products/${product.image}" class="card__image" alt="product">`);

//     let spanCardPrice = document.createElement ('span');
//     spanCardPrice.className = 'card__price';
//     spanCardPrice.innerHTML = `€${product.price.toFixed(2)}`; // добавить toFixed(2)
//     divCardTop.appendChild(spanCardPrice);

//     let divCardTitle = document.createElement ('div');
//     divCardTitle.className = 'card__title';
//     divCardTitle.innerHTML = `${product.name}`;
//     divCardBody.appendChild(divCardTitle);

// let btnCard = document.createElement ('button');
// // btnCard.className = 'card__button';
// btnCard.innerHTML = `<img src="/assets/images/icons/plus-icon.svg" alt="icon"></img>`;
// divCardBody.appendChild(btnCard);
