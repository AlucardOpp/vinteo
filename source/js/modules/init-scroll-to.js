import MoveTo from '../vendor/move-to';

const links = document.querySelectorAll('[data-anchor]');

const getDuration = (distance, step) => {
  const defaultDuration = 500;
  const durationIncrement = 100;
  const count = Math.ceil(distance / step);

  return defaultDuration + (durationIncrement * count);
};

const getElTop = (el) => {
  return el.getBoundingClientRect().top + window.pageYOffset;
};

const scrollTo = (target) => {
  document.activeElement.blur();

  if (!target) {
    return;
  }

  const targetTopPosition = getElTop(target);
  const distance = Math.abs(targetTopPosition - window.scrollY);

  const moveTo = new MoveTo({
    tolerance: 0,
    duration: getDuration(distance, 300),
    easing: 'easeOutQuart',
    container: window,
  });
  moveTo.move(target);
};

const initScrollTo = () => {
  if (!links.length) {
    return;
  }

  links.forEach((link) => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const target = document.querySelector('#' + link.dataset.anchor);
      scrollTo(target);
    });
  });
};

export {initScrollTo};
