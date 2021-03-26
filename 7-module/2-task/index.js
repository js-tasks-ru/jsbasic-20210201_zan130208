import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
    this.closeButton = this.elem.querySelector('.modal__close');
    this.container = document.querySelector('.container');
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.close = this.close.bind(this);
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
    this.container.append(this.elem);
    document.body.classList.add('is-modal-open');

    document.addEventListener('keydown', this.handleKeyDown);
    this.closeButton.addEventListener('click', this.close);
  }

  handleKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  setTitle(title) {
    const modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody(elem) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.replaceWith(elem);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.container.remove(this.elem);
  }
}
