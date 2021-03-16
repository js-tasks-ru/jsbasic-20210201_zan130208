import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render(categories);
    this.scrollMenu();
    this.categorieSelect(); // вызов
  }

  render (categories) {
    let menu = createElement (`
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">${this.innerBlock(categories)}</nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>`);

    return menu;
  }

  // divA (categories) {
  //   let categoriesList = categories.forEach(element => {
  //     `<a href="#" class="ribbon__item" data-id="${element.id}">${element.name}</a>`;
  //   });
  //   return categoriesList;
  // }

  innerBlock (categories) {
    let categoriesList = categories.map ( item => {
      return `
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
    }).join('')

    return categoriesList;
  }

  scrollMenu () {
    const btnLeft = this.elem.querySelector ('.ribbon__arrow_left');
    let btnRight = this.elem.querySelector ('.ribbon__arrow_right');
    let menuList = this.elem.querySelector ('.ribbon__inner');

    btnLeft.addEventListener ('click', () => {
      menuList.scrollBy(-350, 0);

      let listWidthLeft = menuList.scrollLeft;
      if (listWidthLeft < 1 ) {
      btnLeft.classList.remove ('ribbon__arrow_visible');
      }
      else {
        btnLeft.classList.add ('ribbon__arrow_visible');
      }
    });

    btnRight.addEventListener ('click', () => {
      menuList.scrollBy(350, 0);

      let listWidthLeft = menuList.scrollLeft;
      let WidthMenu = menuList.scrollWidth;
      let visiableWidth = menuList.clientWidth;
      let listWidthRight = WidthMenu - listWidthLeft - visiableWidth;
      if (listWidthRight < 1 ) {
        btnRight.classList.remove ('ribbon__arrow_visible');
      }
      else {
        btnRight.classList.add ('ribbon__arrow_visible');
      }
    });
  }
  // после прокрутки в обе стороны пропадают обе кнопки
  // // Важный момент, прокрутка – это асинхронное действие,
  // она занимает какое-то время, а не происходит моментально.
  // Поэтому скрывать кнопки нужно, когда прокрутка закончена –
  // в обработчике события scroll на элементе с классом ribbon__inner,
  // а не сразу после вызова метода scrollBy.

  categorieSelect () {
    let point = this.elem.querySelector ('.ribbon__item');
    let pointAll = this.elem.querySelectorAll ('.ribbon__item');
    let pointActive = this.elem.querySelector ('.ribbon__item_active');

    point.addEventListener ('click', event => {
      event.preventDefault();

      let inner = this.elem.querySelector ('.ribbon__inner');
      let aAll = inner.children;
      let aDiv = event.target;
      for ( let a of aAll ) {
        if (a.classList.contains ('ribbon__item_active')) {
          a.classList.remove ('ribbon__item_active');
        }
        aDiv.classList.add ('ribbon__item_active');
      }

      // pointAll.classList.remove ('ribbon__item_active');
      // point.classList.add ('ribbon__item_active');

      event.target.closest ('.ribbon').dispatchEvent (new CustomEvent ('ribbon-select', {
        detail: pointActive.closest ('.ribbon__inner').category.id,
        bubbles: true
      }))
    })

    // отменить браузерное событие - переход по ссылке.
    // как тут понять какое именно событие он отменил и надо ли его указывать в коде?

    // как удалить класс выбора с остальных ссылок?

    // созданное событие должно содержать в себе уникальный идентификатор товара ("id")
    // TypeError: Cannot read property 'detail' of undefined
    // at UserContext.<anonymous> (7-module/1-task/task.test.js:94:32)

    // после клика по ссылке, должно быть создано событие
    // Error: Expected false to be true.
    // at UserContext.<anonymous> (7-module/1-task/task.test.js:90:56)

  }
}
