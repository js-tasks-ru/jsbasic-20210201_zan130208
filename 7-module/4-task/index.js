import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.render();
    this.valueGet(value);
    this.onClick();
    // this.value = value;
    this.steps = steps;
    this.segments = steps - 1;
  }

  render () {
    const slider = createElement(`
    <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      <span class="slider__step-active"></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    </div>
    `);
    return slider;
  }

  valueGet (value) {

    this.value = value;
    // this.steps = steps;
    // this.segments = steps - 1;

    // let left = event.clientX - this.elem.getBoundingClientRect().left; // расстояние от начала элемента слайдера до курсор в момент клика
    // let leftRelative = left / this.elem.offsetWidth; // значение в процентах относительно всего слайдера
    // let segments = this.steps - 1;
    // let approximateValue = leftRelative * segments; // получить конкретное значение слайдера:
    // берем относительное значение и * на колво сегментов
    // let value = Math.round(approximateValue); // округлили до целого

    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = value; // добавили значение  // +

    const sliderStep = this.elem.querySelector('.slider__steps');
    const activeSteps = sliderStep.querySelectorAll('span');
    // преобразование в массив, визуально выделили шаг на слайдере
    [...activeSteps].forEach((element, index) => {  // +
      if(index === value) {
        element.classList.add('slider__step-active')
      }
      else {
        element.classList.remove('slider__step-active')
      }
    });

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let valuePercents = value / this.segments * 100; // + // добавила this

    thumb.style.left = `${valuePercents}%`;  // +
    progress.style.width = `${valuePercents}%`;  // +
  }

  onClick () {
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;  // +

    thumb.onpointerdown = (event) => {
      event.preventDefault();

      this.elem.classList.add('slider_dragging');  // +

      document.addEventListener('pointermove', this.pointerMove);  // +
      document.addEventListener('pointerup', this.pointerUp);  // +

      // const value = this.valueGet(value);

      this.elem.dispatchEvent(new CustomEvent('slider-change'), { // не отрабатывает
        detail: this.value,  // +
        bubbles: true
      })
    }

    this.elem.addEventListener('click', this.makeMore); // другой способ перемещения
  }

  makeMore = (event) => {
    // const value = this.valueGet(value);
    let otherLeft = event.clientX - this.elem.getBoundingClientRect().left;  // +
    let leftRelative = otherLeft / this.elem.offsetWidth;  // +
    // let segments = this.steps - 1;
    let approximateValue = leftRelative * this.segments; // + // добавила this
    this.valueGet(Math.round(approximateValue));  // ????
    // let value = Math.round(approximateValue); // -
    // let valuePercents = value / segments * 100; // ?

    // const sliderValue = this.elem.querySelector('.slider__value');
    // sliderValue.innerHTML = value;

    // const sliderStep = this.elem.querySelector('.slider__steps');
    // const activeSteps = sliderStep.querySelectorAll('span');

    // // преобразование в массив
    // [...activeSteps].forEach((element, index) => {
    //   if(index === value) {
    //     element.classList.add('slider__step-active')
    //   }
    //   else {
    //     element.classList.remove('slider__step-active')
    //   }
    // });

    // let thumb = this.elem.querySelector('.slider__thumb');
    // let progress = this.elem.querySelector('.slider__progress');

    // thumb.style.left = `${valuePercents}%`;
    // progress.style.width = `${valuePercents}%`;

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

  pointerMove = (event) => {
    event.preventDefault();

    let left = event.clientX - this.elem.getBoundingClientRect().left; // расстояние от начала элемента слайдера до курсор в момент клика
    let leftRelative = left / this.elem.offsetWidth; // значение в процентах относительно всего слайдера
    if (leftRelative < 0) {leftRelative = 0;} // +
    if (leftRelative > 1) {leftRelative = 1;}  // +

    const leftPercents = leftRelative * 100;  // +

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;  // перемещаем ползунок и «закрашиваем» область до него
    progress.style.width = `${leftPercents}%`;  // +

    // const segments = this.steps - 1;
    const approximateValue = leftRelative * this.segments; // добавила this // получить конкретное значение слайдера:
    // берем относительное значение и * на колво сегментов
    this.value = Math.round(approximateValue); // округлили до целого  // +

    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = this.value; // добавили значение  // + // добавила this

    const sliderStep = this.elem.querySelector('.slider__steps');
    const activeSteps = sliderStep.querySelectorAll('span');
    // преобразование в массив, визуально выделили шаг на слайдере
    [...activeSteps].forEach((element, index) => {
      if(index === this.value) {
        element.classList.add('slider__step-active')
      }
      else {
        element.classList.remove('slider__step-active')
      }
    });
  }

  pointerUp = () => {
    document.removeEventListener('pointermove', this.pointerMove);
    document.removeEventListener('pointerup', this.pointerUp);

    this.elem.classList.remove('slider_dragging');

    this.elem.dispatchEvent(new CustomEvent('slider-change'), { // не отрабатывает
      detail: this.value,
      bubbles: true
    })
  }
}
