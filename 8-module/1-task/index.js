import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>'); // отрисовка пустой корзины
  }

  update(cart) {  // заполнить корзину данными из объекта cart
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {  // позиционирование корзины на экране
    let initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset; // координата верх.лев по y-оси корзины + координата прокрутки
    document.querySelector('.container').getBoundingClientRect().right + 20; // отступ слева от корзины
    document.documentElement.clientWidth - this.elem.offsetWidth - 10;  // отступ справа
    let leftIndent = Math.min(  // наименьшее из значений
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    ) + 'px'

    if (window.pageYOffset > initialTopCoord) {
      Object.assign(this.elem.style, {  // корзина фиксирована на экране при прокрутке
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        right: '10px',
        left: leftIndent
      });
    } else {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }

    let isMobile = document.documentElement.clientWidth <= 767;  // просмотр на мобильном - корзина скрыта при прокрутке

    if (document.documentElement.clientWidth <= 767) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }
}
