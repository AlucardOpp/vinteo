const initClientsSlider = () => {
  const clientsNode = document.querySelector('.clients .swiper');

  if (!clientsNode) {
    return;
  }

  // eslint-disable-next-line no-undef
  const swiper = new Swiper(clientsNode, {
    slidesPerView: 2.5,
    spaceBetween: 20,
    loop: true,
    slidesPerGroup: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1280: {
        slidesPerView: 7,
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerView: 7,
        slidesPerGroup: 3,
      },
      500: {
        slidesPerView: 4,
        slidesPerGroup: 1,
      },
    },
  });
};

export {initClientsSlider};
