import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
    this.btnX = this.elem.querySelector('.modal__close');
    document.addEventListener('keydown', function (event) {
      if (event.code === 'Escape') {
        this.close();
      }
    });

    this.closeBtnX();
  }

  render () {
    const modal = createElement(`
    <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div></div>`);
    return modal;
  }

  open () {
    const container = document.querySelector('.container');
    container.append(this.elem); // ругается
    document.body.classList.add('is-modal-open');
  }

  // keydownListener(event) {
  //   if (event.code === 'Escape') {
  //     console.log(this);
  //     // event.preventDefault();
  //     this.close.apply();
  //   }
  // }

  setTitle (title) { // title здесь строка, произвольное имя содержимого тега
    const titleDiv = this.elem.querySelector('.modal__title');
    titleDiv.innerHTML = title; // передаем аргумент, а не текст, потому без кавычек
  }

  setBody (elem) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.replaceWith(elem); // вставка с заменой предыдущего содержимого
  }

  close () {
    const container = document.querySelector('.container');
    document.body.classList.remove('is-modal-open');
    container.remove(this.elem);
  }

  closeBtnX () {
    // let btnX = this.elem.querySelector('.modal__close');
    this.btnX.addEventListener('click', this.close);
  }

  // closeBtnEsc () {
  //   document.addEventListener('keydown', function (event) {
  //     if (event.code == 'Escape') {
  //       this.close();
  //     }
  //   })
  // }
}

// как объединить три метода закрытия в один код
