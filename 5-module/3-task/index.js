function initCarousel() {

  let btnLeft = document.querySelector (".carousel__arrow_left");
  let btnRight = document.querySelector (".carousel__arrow_right");
  let innerSlide = document.querySelector('div.carousel__inner');
  let startPosition = 0;

  btnLeft.style.display = 'none';

  let slideWidth = document.querySelector (".carousel__slide").offsetWidth;
  let slideAll = document.querySelectorAll ("div.carousel__slide");

  btnLeft.addEventListener ("click", () => {
    startPosition += slideWidth;
    innerSlide.style.transform = `translateX(${startPosition}px)`;
    btnRight.style.display = '';
    if (startPosition == 0) {
      btnLeft.style.display = 'none';
    }
  });

  btnRight.addEventListener ("click", () => {
    startPosition -= slideWidth;
    btnLeft.style.display = '';
    innerSlide.style.transform = `translateX(${startPosition}px)`;
    if (startPosition == -slideWidth * ( slideAll.length-1 )) {
      btnRight.style.display = 'none';
    }
  });
}
