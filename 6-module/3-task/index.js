import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render(slides);
    this.slidesMove(slides);
    this.addProduct(slides);
  }

  render (slides) {
    let carusel = createElement (`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">${this.caruselSlides(slides)}
      </div>
    </div>`);

    return carusel;
  }

  caruselSlides (slides) {
    let slidesAll = slides.map ( item => {
      return `
      <div class="carousel__slide" data-id="${item.id}">
      <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
      <span class="carousel__price">€${item.price.toFixed(2)}</span>
      <div class="carousel__title">${item.name}</div>
      <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button></div></div>`;
    }).join('')

    return slidesAll;
  }

  slidesMove (slides) {
    let btnLeft = this.elem.querySelector ('.carousel__arrow_left');
    let btnRight = this.elem.querySelector ('.carousel__arrow_right');
    let innerSlide = this.elem.querySelector ('div.carousel__inner');
    let startPosition = 0;

    let slideAll = this.elem.querySelectorAll ('div.carousel__slide');

    btnLeft.style.display = 'none';

    btnLeft.addEventListener ('click', () => {
      let slideWidth = this.elem.querySelector ('.carousel__slide').offsetWidth;
      startPosition += slideWidth;
      innerSlide.style.transform = `translateX(${startPosition}px)`;

      btnRight.style.display = '';
      if (startPosition == 0) {
      btnLeft.style.display = 'none';
      }
    });

    btnRight.addEventListener ('click', () => {
      let slideWidth = this.elem.querySelector ('.carousel__slide').offsetWidth;
      startPosition -= slideWidth;
      innerSlide.style.transform = `translateX(${startPosition}px)`;

      btnLeft.style.display = '';
      if (startPosition == -slideWidth * ( slideAll.length-1 )) {
      btnRight.style.display = 'none';
      }
    });
  }

  addProduct (slides) {
    let allButton = this.elem.querySelectorAll ('.carousel__button');

    for (let oneButton of allButton) {
      oneButton.addEventListener ('click', event => {
        event.target.closest ('.carousel').dispatchEvent (new CustomEvent('product-add', {
          detail: oneButton.closest ('.carousel__slide').dataset.id,
          bubbles: true
        }))
      })
    }
  }
}

 // for ( let i=0; i < slideAll.length; i++) {
    //   if (i=0) {
    //     btnLeft.style.display = 'none';
    //   }
    //   if (i= objAll.length) {
    //     btnLeft.style.display = 'none';
    //   }
    // };

    // slides.forEach ( function (item, index, slides) {
    //   if (index == 0) {
    //     btnLeft.style.display = 'none';
    //   }
    //   if (index = slides.length) {
    //     btnRight.style.display = 'none';
    //   }
    // });
