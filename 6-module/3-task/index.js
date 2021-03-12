import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render(slides);
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

    this.slidesMove(slides);
    // let btnslide = document.querySelector ('.carousel__arrow');
    // btnslide.addEventListener ('click', this.slidesMove.bind(this));

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

    this.addProduct (slidesAll);

    return slidesAll;
  }

  slidesMove (slides) {
    let startMove = 0;
    let slide = document.querySelector ('.carousel__slide');
    // debugger;
    let slideWidth = slide.offsetWidth;
    let btnLeft = document.querySelector ('.carousel__arrow_left');
    let btnRight = document.querySelector ('.carousel__arrow_right');
    let slideAll = document.querySelector ('.carousel__inner');

    btnLeft.addEventListener ('click', () => {
      startMove += slideWidth;
      slideAll.style.transform = `translateX(-${slideWidth}px)`;

      btnRight.style.display = '';
      if (startMove == 0) {
        btnLeft.style.display = 'none';
      }
    });

    btnRight.addEventListener ('click', () => {
      startMove -= slideWidth;
      slideAll.style.transform = `translateX(${slideWidth}px)`;

      btnLeft.style.display = '';
      if (startMove == -slideWidth * ( slideAll.length-1 )) {
        btnRight.style.display = 'none';
      }
    });

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
  }

  addProduct (slides) {
    let btnAdd = document.querySelector ('.carousel__button');
    btnAdd.addEventListener ('click', event => {
      event.target.closest ('.carousel').dispatchEvent (new CustomEvent("product-add", {
        detail: btnAdd.closest('.carousel__slide').dataset.id,
        bubbles: true
      }))
    })
  }
}

