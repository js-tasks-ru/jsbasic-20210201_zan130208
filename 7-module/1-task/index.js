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

  innerBlock (categories) {
    let categoriesList = categories.map( item => {
      return `
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
    }).join('')

    return categoriesList;
  }

  scrollMenu () {
    const btnLeft = this.elem.querySelector('.ribbon__arrow_left');
    const btnRight = this.elem.querySelector('.ribbon__arrow_right');
    const menuList = this.elem.querySelector('.ribbon__inner');

    btnLeft.addEventListener('click', () => {
      let stepX = 350;
      let stepY = 0;
      menuList.scrollBy(-stepX, stepY);

      let listWidthLeft = menuList.scrollLeft;
      if (listWidthLeft < 1 ) {
      btnLeft.classList.remove('ribbon__arrow_visible');
      }
      else {
        btnLeft.classList.add('ribbon__arrow_visible');
        btnRight.classList.add('ribbon__arrow_visible');
      }
    });

    btnRight.addEventListener('click', () => {
      let stepX = 350;
      let stepY = 0;
      menuList.scrollBy(stepX, stepY);

      let listWidthLeft = menuList.scrollLeft;
      let WidthMenu = menuList.scrollWidth;
      let visiableWidth = menuList.clientWidth;
      let listWidthRight = WidthMenu - listWidthLeft - visiableWidth;
      if (listWidthRight < 1 ) {
        btnRight.classList.remove('ribbon__arrow_visible');
      }
      else {
        btnRight.classList.add('ribbon__arrow_visible');
        btnLeft.classList.add('ribbon__arrow_visible');
      }
    });
  }

  categorieSelect () {
    let points = this.elem.querySelectorAll('.ribbon__item');

    for(let point of points) {
      point.addEventListener('click', event => {
        event.preventDefault();

        if(!point) {
          points.classList.remove('.ribbon__item_active')
        }
        else {
          point.classList.add('.ribbon__item_active')
        }

        event.target.closest('.ribbon').dispatchEvent(new CustomEvent('ribbon-select', {
          detail: point.dataset.id,
          bubbles: true
        }))
      })
    }
  }
}


    // point.addEventListener('ribbon-select', event => { // подписка на событие

    //   event.preventDefault();
    //   const inner = this.elem.querySelector('.ribbon__inner');
    //   let otherPoints = inner.children;
    //   let point = event.target;
    //   if (!point) {
    //     otherPoints.classList.remove('.ribbon__item_active')
    //   }
    //   else {
    //     point.classList.add('.ribbon__item_active')
    //   }
    // });


    // point.dispatchEvent(new CustomEvent('ribbon-select', { // издать событие
    //     detail: point.dataset.id,
    //     bubbles: true
    //   }))
