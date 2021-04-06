import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.render();
    this.onClick();
    this.value = value;
    this.steps = steps;
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

  onClick () {
    let thumb = this.elem.querySelector('.slider__thumb');
    console.log('this.elem', this.elem);
    console.log('trumb', this.trumb);
    thumb.ondragstart = () => false;

    trumb.onpointerdown = (event) => {
      event.preventDefault();

      this.elem.classList.add('slider_dragging');

      document.addEventListener('pointermove', pointerMove);
      document.addEventListener('pointerup', pointerUp);

      pointerMove = (event) => {
        event.preventDefault();
        let left = event.clientX - this.elem.getBoundingClientRect().left; // расстояние от начала элемента слайдера до курсор в момент клика
        let leftRelative = left / this.elem.offsetWidth; // значение в процентах относительно всего слайдера
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        let leftPercents = leftRelative * 100;

        let thumb = this.elem.querySelector('.slider__thumb');
        let progress = this.elem.querySelector('.slider__progress');

        thumb.style.left = `${leftPercents}%`;  // перемещаем ползунок и «закрашиваем» область до него
        progress.style.width = `${leftPercents}%`;

        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments; // получить конкретное значение слайдера:
        // берем относительное значение и * на колво сегментов
        let value = Math.round(approximateValue); // округлили до целого

        const sliderValue = this.elem.querySelector('.slider__value');
        sliderValue.innerHTML = value; // добавили значение

        const sliderStep = this.elem.querySelector('.slider__steps');
        const activeSteps = sliderStep.querySelectorAll('span');
        // преобразование в массив, визуально выделили шаг на слайдере
        [...activeSteps].forEach((element, index) => {
          if(index === value) {
            element.classList.add('slider__step-active')
          }
          else {
            element.classList.remove('slider__step-active')
          }
        });

        pointerUp = () => {
          document.removeEventListener('pointermove', pointerMove);
          document.removeEventListener('pointerup', pointerUp);

          this.elem.classList.remove('slider_dragging');
        }
      }
    }

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }))
  }
}
