const initConsentModalBtns = () => {
  const consentCheckboxes = document.querySelectorAll('[data-consent="checkbox"]');

  if (!consentCheckboxes.length) {
    return;
  }

  const acceptBtn = document.querySelector('[data-consent="yes"]');
  const declineBtn = document.querySelector('[data-consent="no"]');

  acceptBtn.addEventListener('click', () => {
    consentCheckboxes.forEach((it) => {
      const input = it.querySelector('input[type=checkbox]');
      it.classList.add('is-valid');
      it.classList.remove('is-invalid');

      input.checked = true;
    });
  });

  declineBtn.addEventListener('click', () => {
    consentCheckboxes.forEach((it) => {
      const input = it.querySelector('input[type=checkbox]');
      it.classList.add('is-invalid');
      it.classList.remove('is-valid');

      input.checked = false;
    });
  });
};

export {initConsentModalBtns};
