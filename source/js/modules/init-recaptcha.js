const API_KEY = '6LeJfsseAAAAAKSHgjmEWggX6ZtzPRDsa9OUw1wx';

const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length);

const createCaptcha = (id) => {
  const captcha = document.createElement('div');
  captcha.classList.add('g-recaptcha');
  captcha.setAttribute('id', id);
  return captcha;
};

const initRecaptcha = () => {
  const myCaptchaEls = document.querySelectorAll('.my-captcha');

  if (!myCaptchaEls.length) {
    return;
  }

  myCaptchaEls.forEach((element) => {
    const form = element.closest('form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const id = generateRandomString(12);

    element.append(createCaptcha(id));
    submitBtn.setAttribute('disabled', true);

    window.grecaptcha.render(id, {
      sitekey: API_KEY,
      callback: (response) => {
        if (response) {
          submitBtn.removeAttribute('disabled');
        }
      },
    });
  });
};

export {initRecaptcha};
