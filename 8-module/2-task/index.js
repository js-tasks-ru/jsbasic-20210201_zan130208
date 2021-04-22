import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render();
  }

  render() {
    const productsGrid = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">${this.renderCards()}
    </div>
    </div>`);
    return productsGrid;
  }

  renderCards = () => {
    const cards = this.products.map((product) => {
      const newProduct = new ProductCard(product);
      return newProduct.elem.innerHTML;
    });

    this.updateFilter(this.filters);

    return cards.join('');
  }

  updateFilter(filters) {
    // console.log({filters}); отрабатывает
    // console.log('this.products', this.products); отрабатывает, возвращает массив
    // console.log('products', products); не находит

    return cards = products.filter((item) => item.spiciness <= filters.maxSpiciness &&
      item.nuts !== filters.noNuts &&
      item.vegeterian == filters.vegeterianOnly &&
      item.category == filters.category
    );
  }
}
