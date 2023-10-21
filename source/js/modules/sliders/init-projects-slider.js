const projects = document.querySelector('.projects');

const initProjectsSlider = () => {
  if (!projects) {
    return;
  }

  const swiper = projects.querySelector('.swiper');

  const slider = new Swiper(swiper, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    watchOverflow: true,
    loop: false,
  });
};

export {initProjectsSlider};

