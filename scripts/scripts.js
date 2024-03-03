document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('projects-frontend-carousel');
  const nextBtn = carousel.querySelector('.--carousel-controll-next');
  const prevBtn = carousel.querySelector('.--carousel-controll-previous');
  const carouselItems = carousel.querySelectorAll('.--carousel-item');
  let currentIndex = 0;

  nextBtn.addEventListener('click', () => changeActiveSlide('next'));
  prevBtn.addEventListener('click', () => changeActiveSlide('prev'));

  function changeActiveSlide(direction) {
    const numSlides = carouselItems.length;
    const loopedIndex = (currentIndex + (direction === 'next' ? 1 : -1) + numSlides) % numSlides;

    carouselItems[currentIndex].classList.remove('active');
    carouselItems[loopedIndex].classList.add('active');

    currentIndex = loopedIndex;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  });

  const cards = document.querySelectorAll(".flip-card-wrapper");
  cards.forEach((card) => {
    observer.observe(card);
  });
});

function flip(element) {
  const cardInner = element.querySelector(".flip-card-inner");

  cardInner.classList.toggle("flip");

  const frontFace = cardInner.querySelector(".flip-card-front");
  const backFace = cardInner.querySelector(".flip-card-back");

  const isFlipped = cardInner.classList.contains("flip");
  frontFace.setAttribute("aria-hidden", isFlipped ? "false" : "true");
  backFace.setAttribute("aria-hidden", isFlipped ? "true" : "false");

  const adjustLinks = (face) => {
    const links = face.querySelectorAll("a");
    links.forEach(link => {
      if (isFlipped) {
        link.removeAttribute("tabindex");
        link.removeAttribute("aria-disabled");
      } else {
        link.setAttribute("tabindex", "-1");
        link.setAttribute("aria-disabled", "true");
      }
    });
  };

  adjustLinks(frontFace);
  adjustLinks(backFace);
}



