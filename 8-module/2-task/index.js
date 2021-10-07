import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
    </div>
    </div>`);
    this.renderCards();
  }

  renderCards() {
    const inner = this.elem.querySelector('.products-grid__inner');
    inner.innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {continue;}
      if (this.filters.vegeterianOnly && !product.vegeterian) {continue;}
      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        continue;}
      if (this.filters.category && product.category != this.filters.category) {continue;}

      const card = new ProductCard(product);
      inner.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderCards();
  }
}

// constructor(products) {
  //   this.products = products;
  //   this.filters = {};
  //   this.elem = this.render();
  // }

  // render() {
  //   const productsGrid = createElement(`
  //   <div class="products-grid">
  //   <div class="products-grid__inner">${this.renderCards()}
  //   </div>
  //   </div>`);
  //   return productsGrid;
  // }

  // renderCards = () => {
  //   const cards = this.products.map((product) => {
  //     const newProduct = new ProductCard(product);
  //     return newProduct.elem.innerHTML;
  //   });

  //   this.updateFilter(this.filters);
  //   return cards.join('');
  // }

  // updateFilter(filters) {
  //   Object.assign(this.filters, filters);
  //   this.renderCards();
  // //   // console.log({filters}); //отрабатывает
  // //   // console.log('this.products', this.products); // отрабатывает, возвращает массив
  // //   // НЕ ФИЛЬТРУЕТ НА СТРАНИЦЕ

  //   // return this.cards = this.products.filter((item) => item.spiciness <= filters.maxSpiciness &&
  //   //   item.nuts !== filters.noNuts &&
  //   //   item.vegeterian == filters.vegeterianOnly &&
  //   //   item.category == filters.category
  //   // );
  // }
